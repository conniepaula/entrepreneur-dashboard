import { BoxesIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthlyOrderAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orders placed this month
        </CardTitle>
        <BoxesIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">291</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-teal-500 dark:text-teal-400">+14%</span> from
          last month
        </p>
      </CardContent>
    </Card>
  );
}
