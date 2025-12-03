import { api } from "@/lib/axios";

/**
 * Uploads photo form data to the server and returns the server's data payload.
 *
 * @param formData - The FormData object containing fields and file(s) to upload
 * @returns The `data` field from the server response (`res.data.data`)
 */
export async function uploadFormData(formData: FormData) {
  const res = await api.post("/photos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
}