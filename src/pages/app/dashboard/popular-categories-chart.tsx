import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CustomTooltip } from "@/pages/app/dashboard/custom-tooltip";

interface Data {
  category: string;
  amountSold: number;
}

const data: Data[] = [
  { category: "Courses", amountSold: 342 },
  { category: "Snippets", amountSold: 34 },
  { category: "Templates", amountSold: 78 },
  { category: "T-Shirts", amountSold: 110 },
  { category: "Software", amountSold: 52 },
  { category: "Mentorship Sessions", amountSold: 7 },
];

const COLORS = [
  colors.violet[500],
  colors.fuchsia[500],
  colors.teal[500],
  colors.rose[500],
  colors.cyan[500],
  colors.orange[500],
];

export function PopularCategoriesChart() {
  return (
    <Card className="md:col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between ">
          <CardTitle className="text-base font-medium">
            Popular Categories
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            {/* TODO: Figure out how to get custom tooltips working with pie charts and line charts concurrently */}
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Pie
              data={data}
              dataKey="amountSold"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={70}
              strokeWidth={3}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 items-center gap-1 md:grid-cols-3">
          {data.map((item, i) => (
            <div key={item.category} className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: COLORS[i],
                }}
                className="h-3 w-3 flex-shrink-0 rounded-sm"
              ></span>
              <span className="truncate text-muted-foreground">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
