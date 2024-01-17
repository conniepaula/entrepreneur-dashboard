import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { getAppointments } from "@/api/get-appointments";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  // TODO: Handle cases where users type in page number > last page

  const { data: result } = useQuery({
    queryKey: ["appointments", pageIndex],
    queryFn: () => getAppointments({ pageIndex }),
  });

  const handlePaginationChange = (pageIndex: number) => {
    setSearchParams((params) => {
      params.set("page", (pageIndex + 1).toString());
      return params;
    });
  };

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
                <TableHead className="w-[180px]">Appointment ID</TableHead>
                <TableHead className="w-[140px]">Date</TableHead>
                <TableHead className="w-[140px]">Time</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="w-[140px]">Total</TableHead>
                <TableHead className="w-[164px]">Status</TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result &&
                result?.appointments?.map((appointment) => (
                  <AppointmentTableRow
                    key={appointment.appointmentId}
                    {...appointment}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
        {result && (
          <Pagination
            itemCount={result.meta?.totalCount}
            pageIndex={pageIndex}
            perPage={result.meta?.perPage}
            onPageChange={handlePaginationChange}
          />
        )}
      </div>
    </>
  );
}
