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
import { GetData } from "@/service/get-data";
import UpdateStatusBurnin from "@/components/update-sn";

export default async function HomePage() {
  const body = await GetData();
  const listUnit = body.data;
  const filteredUnit = listUnit.filter((u: any) => u.status === "reported");


  return (
    <>
      <h1 className="font-semibold text-right text-base sticky top-5">
        Total Unit has Reported: {filteredUnit.length}
      </h1>
      <Table>
        <TableCaption>Unit list has been reported.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Serial Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>File Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUnit?.map((item: { serialnumber: string, status: string, timestamp: string }, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.serialnumber}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateStatusBurnin />
    </>
  );
}
