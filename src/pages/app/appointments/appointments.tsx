import { Helmet } from "react-helmet-async";

import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppointmentTableFilters } from "./appointment-table-filters";
import { AppointmentTableRow } from "./appointment-table-row";

export function Appointments() {
  return (
    <>
      <Helmet title="Appointments" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
      </div>
      <div className="space-y-2.5">
        <AppointmentTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Appointment ID</TableHead>
                <TableHead className="w-[140px]">Created at</TableHead>
                <TableHead className="w-[180px]">Appointment date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="w-[140px]">Total</TableHead>
                <TableHead className="w-[164px]">Status</TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <AppointmentTableRow key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination itemCount={10} pageIndex={1} perPage={5} />
      </div>
    </>
  );
}
