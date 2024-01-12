import { Helmet } from "react-helmet-async";

import { MonthlyRevenueCard } from "@/pages/app/dashboard/monthly-revenue-card";

import { DailyOrderAmountCard } from "./daily-order-amount-card";
import { MonthlyCancelledOrders } from "./monthly-cancelled-orders";
import { MonthlyOrderAmountCard } from "./monthly-order-amount-card";
import { PopularCategoriesChart } from "./popular-categories-chart";
import { RevenueChart } from "./revenue-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <MonthlyRevenueCard />
          <MonthlyOrderAmountCard />
          <DailyOrderAmountCard />
          <MonthlyCancelledOrders />
        </div>
        <div className="grid gap-4 md:grid-cols-9">
          <RevenueChart />
          <PopularCategoriesChart />
          <div></div>
        </div>
      </div>
    </>
  );
}
