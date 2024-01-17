import { format } from "date-fns";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Appointment } from "@/types";

import { AppointmentDetails } from "./appointment-details";
import { AppointmentStatus } from "./appointment-status";

type AppointmentTableRowProps = Omit<Appointment, "createdAt">;

export function AppointmentTableRow(props: AppointmentTableRowProps) {
  const { appointmentId, appointmentDate, clientName, total, status } = props;
  const date = format(appointmentDate, "dd-MM-yyyy");
  const time = format(appointmentDate, "hh:mm a");
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Appointment details</span>
            </Button>
          </DialogTrigger>
          <AppointmentDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {appointmentId}
      </TableCell>
      <TableCell className="text-muted-foreground">{date}</TableCell>
      <TableCell className="text-muted-foreground">{time}</TableCell>
      <TableCell className="font-medium">{clientName}</TableCell>
      <TableCell className="font-medium">
        {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </TableCell>
      <TableCell>
        <></>
        <AppointmentStatus status={status} />
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
