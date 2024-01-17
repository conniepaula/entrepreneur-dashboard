export interface Business {
  businessId: string;
  businessName: string;
  representativeName: string;
  email: string;
  phoneNumber: string;
  description: string | null;
}

export interface Appointment {
  appointmentId: string;
  createdAt: Date;
  appointmentDate: Date;
  status: "booked" | "prepaid" | "canceled" | "awaiting_payment" | "completed";
  clientName: string;
  total: number;
}
