import { api } from "@/lib/axios";

export interface GetRepresentedBusinessResponse {
  id: string;
  name: string;
  description: string | null;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  representativeId: string | null;
}

export async function getRepresentedBusiness() {
  const response = await api.get<GetRepresentedBusinessResponse>(
    "/represented-business",
  );
  return response.data;
}
