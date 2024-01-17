import { Helmet } from "react-helmet-async";

import { MonthlyRevenueCard } from "@/pages/app/dashboard/monthly-revenue-card";

import { AppointmentAmountInMonthCard } from "./appointment-amount-in-month-card";
import { AppointmentAmountToday } from "./appointment-amount-today-card";
import { CanceledAppointmentsInMonthCard } from "./canceled-appointments-in-month-card";
import { PopularServicesChart } from "./popular-categories-chart";
import { RevenueChart } from "./revenue-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <MonthlyRevenueCard />
          <AppointmentAmountInMonthCard />
          <AppointmentAmountToday />
          <CanceledAppointmentsInMonthCard />
        </div>
        <div className="grid gap-4 md:grid-cols-9">
          <RevenueChart />
          <PopularServicesChart />
          <div></div>
        </div>
      </div>
    </>
  );
}
