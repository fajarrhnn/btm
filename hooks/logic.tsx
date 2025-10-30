"use client";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function useOnBurn() {
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [units, setUnits] = useState<any[]>([]);
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();

  // ✅ Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("unit") || "[]");
      setUnits(stored);
    } catch {
      setUnits([]);
    }
  }, []);

  // ✅ Save to localStorage when `units` changes — but only if it’s not empty from mount
  useEffect(() => {
    if (units && units.length > 0) {
      localStorage.setItem("unit", JSON.stringify(units));
    }
  }, [units]);

  const handleSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerialNumber(e.target.value);
  };

  const input = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    const newUnit = {
      serialNumber,
      timestamp: new Date().toISOString(),
      status: "In Testing",
    };

    setUnits((prev) => {
      const updated = [...prev, newUnit];
      localStorage.setItem("unit", JSON.stringify(updated)); // immediate persist
      return updated;
    });

    setSerialNumber("");

    startTransition(() => {
      refresh();
    });
  };

  const updateStatus = (serial: string) => {
    setUnits((prev) => {
      const updated = prev.map((unit) =>
        unit.serialNumber === serial
          ? { ...unit, status: "Reported", reportedAt: new Date().toISOString() }
          : unit
      );

      localStorage.setItem("unit", JSON.stringify(updated)); // ✅ save immediately
      return updated;
    });

    startTransition(() => {
      refresh();
    });
  };

  return {
    serialNumber,
    handleSerialNumberChange,
    input,
    updateStatus,
    units,
    isPending,
  };
}
