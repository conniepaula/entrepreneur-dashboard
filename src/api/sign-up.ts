import { api } from "@/lib/axios";

export interface SignUpBody {
  businessName: string;
  representativeName: string;
  email: string;
  phoneNumber: string;
}

export async function signUp(body: SignUpBody) {
  const { businessName, representativeName, email, phoneNumber } = body;
  await api.post("/businesses", {
    businessName,
    representativeName,
    phone: phoneNumber,
    email,
  });
}
