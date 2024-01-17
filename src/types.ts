export interface BusinessBase {
  businessName: string;
  representativeName: string;
  email: string;
  phoneNumber: string;
}

export interface Business extends BusinessBase {
  businessId: string;
  description: string | null;
}

export interface Service {
  serviceId: string;
  name: string;
  description: string | null;
  priceInCents: number;
  businessId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type AppointmentStatus =
  | "booked"
  | "prepaid"
  | "canceled"
  | "awaiting_payment"
  | "completed";

export interface Appointment {
  appointmentId: string;
  createdAt: string | Date;
  appointmentDate: string | Date;
  status: AppointmentStatus;
  clientName: string;
  total: number;
}
