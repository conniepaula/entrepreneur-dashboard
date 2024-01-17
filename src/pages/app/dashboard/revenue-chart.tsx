import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CustomTooltip } from "./custom-tooltip";

interface Data {
  date: string;
  revenue: number;
}

const data: Array<Data> = [
  { date: "03/01", revenue: 150 },
  { date: "03/02", revenue: 97 },
  { date: "03/03", revenue: 310 },
  { date: "03/04", revenue: 280 },
  { date: "03/05", revenue: 520 },
  { date: "03/06", revenue: 220 },
  { date: "03/07", revenue: 410 },
];

export function RevenueChart() {
  return (
    <Card className="max-w-screen-xs overflow-x-scroll md:col-span-6">
      <CardHeader className="relative flex-row items-center justify-between pb-8">
        <div className="sticky left-6 right-6 top-6 space-y-1">
          <CardTitle className="text-base font-medium">Revenue</CardTitle>
          <CardDescription>Daily revenue in given time period</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="min-w-96">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart style={{ fontSize: 12 }} data={data} dataKey="date">
            <XAxis
              dataKey="date"
              stroke={colors.gray["400"]}
              axisLine={false}
              tickLine={false}
              dy={16}
            />
            <YAxis
              stroke={colors.gray["400"]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet["500"]}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
