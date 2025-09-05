import Photo from "@/models/Photo";

export async function GET() {
  try {
    const res = await Photo.find({});
  } catch (err) {
    return new Response("Failed to fetch photos", { status: 500 });
  }
}
