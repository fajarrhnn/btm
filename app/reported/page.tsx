"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useOnBurn from "@/hooks/logic";
import dayjs from "dayjs";

export default function HomePage() {
  const { serialNumber, handleSerialNumberChange, updateStatus, units } =
    useOnBurn();

  const reportedUnit = units.filter((item) => item.status === "Reported");

  return (
    <>
      <h1 className="font-semibold text-right text-base sticky top-5">
        Total Unit has Reported: {reportedUnit.length}
      </h1>
      <Table>
        <TableCaption>Unit list has been reported.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Serial Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportedUnit?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.serialNumber}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog>
        <DialogTrigger asChild>
          <div className="bottom-5 right-5 fixed">
            <Button size={"icon"}>
              <Plus />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateStatus(serialNumber);
            }}
          >
            <DialogHeader>
              <DialogTitle>Input Serial Number</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                type="text"
                id="serialNumber"
                placeholder="Enter serial number"
                required
                onChange={handleSerialNumberChange}
                value={serialNumber}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
