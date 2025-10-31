"use client"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { useBurn } from "@/hooks/useBurn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UpdateStatusBurnin() {
    const { serialnumber, changesn } = useBurn()
    const { refresh } = useRouter()
    return (
        <>
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
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const response = await fetch("/api", {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ serialnumber }),
                            });
                            const body = await response.json();
                            if (response.ok) {
                                toast.success(body.message)
                                refresh()
                            } else {
                                toast.error(body.message)
                            }
                        }
                        }
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
                                onChange={changesn}
                                value={serialnumber}
                            />
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}