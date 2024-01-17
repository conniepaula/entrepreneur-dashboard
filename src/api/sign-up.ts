import { api } from "@/lib/axios";
import { BusinessBase } from "@/types";

type SignUpBody = BusinessBase;

export async function signUp(body: SignUpBody) {
  const { businessName, representativeName, email, phoneNumber } = body;
  await api.post("/businesses", {
    businessName,
    representativeName,
    phone: phoneNumber,
    email,
  });
}
