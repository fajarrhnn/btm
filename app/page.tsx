import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import dayjs from "dayjs";
import InputNewSerialNumber from "@/components/input-new-sn";
import { GetData } from "@/service/get-data";

export default async function HomePage() {
  const body = await GetData();
  const listUnit = await body.data;
  const filteredUnit = listUnit.filter((u: any) => u.status === "burn");
  return (
    <>
      <h1 className="font-semibold text-right text-base sticky top-5">
        Total Unit in Testing: {filteredUnit.length}
      </h1>

      <Table>
        <TableCaption>Unit list currently being tested.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Serial Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>File Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUnit.map(
            (
              item: { serialnumber: string; status: string; timestamp: string },
              index: number
            ) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.serialnumber}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <InputNewSerialNumber />
    </>
  );
}