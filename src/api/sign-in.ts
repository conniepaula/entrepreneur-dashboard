import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
}

export async function signIn(body: SignInBody) {
  const { email } = body;
  await api.post("/authenticate", { email });
}
