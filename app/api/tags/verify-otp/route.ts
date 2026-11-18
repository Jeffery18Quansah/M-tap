import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const baseUrl =
    process.env.MTAP_API_BASE_URL || "https://m-tap-backend.onrender.com";

  try {
    const body = await request.json();
    const response = await fetch(`${baseUrl}/api/v1/tags/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await response.text();
    return new NextResponse(payload || null, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("M-Tap verify-otp proxy failed:", error);
    return NextResponse.json(
      { code: "NETWORK_ERROR", message: "Unable to reach the M-Tap backend." },
      { status: 502 }
    );
  }
}
