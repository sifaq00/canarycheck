import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  try {
    const buf = await readFile(join(process.cwd(), "public", "rugradar-ext.zip"));
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="rugradar-ext.zip"',
      },
    });
  } catch {
    return NextResponse.json({ error: "zip not built yet" }, { status: 404 });
  }
}