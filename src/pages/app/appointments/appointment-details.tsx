import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AppointmentDetails() {
  return (
    <DialogContent className="px-2 py-6 md:p-6">
      <DialogHeader>
        <DialogTitle>Appointment 128394501</DialogTitle>
        <DialogDescription>Appointment details</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-400" />
                  <span className="font-medium text-muted-foreground">
                    Booked
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Client</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    Firstname Lastname
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Phone Number
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    +44 1234 567890
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    clientname@email.com
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Created at
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    15 minutes ago
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>TypeScript Course</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$399.00</TableCell>
              <TableCell className="text-right">$399.0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ReactJS Course</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$199.00</TableCell>
              <TableCell className="text-right">$199.0</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableCell colSpan={3}>Appointment total</TableCell>
            <TableCell className="text-right font-medium">$598.00</TableCell>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
