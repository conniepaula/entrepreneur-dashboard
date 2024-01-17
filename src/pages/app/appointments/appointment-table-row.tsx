import { ArrowRight, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { AppointmentDetails } from "./appointment-details";

export function AppointmentTableRow() {
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
        3810419305
      </TableCell>
      <TableCell className="text-muted-foreground">15 min ago</TableCell>
      <TableCell className="text-muted-foreground">14/02/2024</TableCell>
      <TableCell className="font-medium">Client Name</TableCell>
      <TableCell className="font-medium">$89.00</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          <span className="font-medium text-muted-foreground">Booked</span>
        </div>
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
