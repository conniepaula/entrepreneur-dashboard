import { AppointmentStatus as AppointmentStatusType } from "@/types";

interface AppointmentStatusProps {
  status: AppointmentStatusType;
}

const convertStatusToString: Record<AppointmentStatusType, string> = {
  booked: "Booked",
  prepaid: "Pre-paid",
  completed: "Completed",
  awaiting_payment: "Awaiting payment",
  canceled: "Canceled",
};

const convertStatusToColor: Record<AppointmentStatusType, string> = {
  booked: "bg-slate-500 dark:bg-slate-400",
  prepaid: "bg-cyan-500 dark:bg-cyan-400",
  completed: "bg-success",
  awaiting_payment: "bg-yellow-300",
  canceled: "bg-destructive",
};

export function AppointmentStatus(props: AppointmentStatusProps) {
  const { status } = props;
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${convertStatusToColor[status]}`}
      />
      <span className="font-medium text-muted-foreground">
        {convertStatusToString[status]}
      </span>
    </div>
  );
}
