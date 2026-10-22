import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const TOKEN = /^[A-Za-z0-9_-]{22}$/;

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN.test(token)) return new NextResponse("Not found", { status: 404 });

  const result = await get(`photos/${token}.webp`, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return new NextResponse("Not found", { status: 404 });
  }

  const download = request.nextUrl.searchParams.get("download") === "1";
  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "image/webp",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="caricature-${token}.webp"`,
      "Cache-Control": "private, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
