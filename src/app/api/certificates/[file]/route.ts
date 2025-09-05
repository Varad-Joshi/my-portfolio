import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ file: string }> }
) {
  const { file } = await context.params;   // 🔑 FIX: await params
  const filePath = path.join(process.cwd(), "public", "certificates", file);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": `inline; filename="${file}"`,
      "Content-Type": file.endsWith(".pdf")
        ? "application/pdf"
        : "image/jpeg", // add png if you have them
    },
  });
}
