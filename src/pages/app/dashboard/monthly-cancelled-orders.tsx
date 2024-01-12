import { Ban } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthlyCancelledOrders() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelled orders
        </CardTitle>
        <Ban className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">17</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-teal-500 dark:text-teal-400">-2%</span> from
          last month
        </p>
      </CardContent>
    </Card>
  );
}
