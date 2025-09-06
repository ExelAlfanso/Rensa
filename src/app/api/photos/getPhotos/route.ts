import { exiftool } from "exiftool-vendored";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const photoUrl = searchParams.get("photo");
  if (!photoUrl)
    return NextResponse.json({ error: "Missing photo" }, { status: 400 });

  try {
    // fetch file
    const res = await fetch(photoUrl);
    const buffer = Buffer.from(await res.arrayBuffer());

    // temp save
    const tmpPath = path.join(os.tmpdir(), "upload.jpg");
    await writeFile(tmpPath, buffer);

    // read metadata
    const metadata = await exiftool.read(tmpPath);
    return NextResponse.json(metadata);
  } catch (err) {
    console.error("Exif error:", err);
    return NextResponse.json(
      { error: "Failed to fetch EXIF" },
      { status: 500 }
    );
  }
}
