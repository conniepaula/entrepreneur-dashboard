import { api } from "@/lib/axios";
import { Appointment } from "@/types";

interface GetAppointmentsParams {
  pageIndex?: number;
}

export interface GetAppointmentsResponse {
  appointments: Array<Appointment>;
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getAppointments(params: GetAppointmentsParams) {
  const { pageIndex } = params;
  const response = await api.get<GetAppointmentsResponse>("/appointments", {
    params: { pageIndex },
  });

  return response.data;
}
