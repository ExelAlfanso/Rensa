import { api } from "@/lib/axios";

export async function uploadFormData(formData: FormData) {
  const res = await api.post("/photos/upload", formData);
  return res.data.data;
}
