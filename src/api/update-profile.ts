import { api } from "@/lib/axios";

interface UpdateProfileRequestBody {
  name: string;
  description: string | null;
}

// TODO: Add support for phone number and opening hours

export async function updateProfile(body: UpdateProfileRequestBody) {
  const { name, description } = body;
  await api.put("/profile", { name, description });
}
