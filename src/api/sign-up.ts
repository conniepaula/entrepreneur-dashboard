import { api } from "@/lib/axios";
import { Business } from "@/types";

type SignUpBody = Omit<Business, "description" | "businessId">;

export async function signUp(body: SignUpBody) {
  const { businessName, representativeName, email, phoneNumber } = body;
  await api.post("/businesses", {
    businessName,
    representativeName,
    phone: phoneNumber,
    email,
  });
}
