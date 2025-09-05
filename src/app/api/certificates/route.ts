import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

export async function GET(
  req: NextRequest,
  { params }: { params: { file: string } }
) {
  try {
    const filePath = join(process.cwd(), "public", "certificates", params.file);
    const file = await readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${params.file}"`,
      },
    });
  } catch (err) {
    return new NextResponse("File not found", { status: 404 });
  }
}
