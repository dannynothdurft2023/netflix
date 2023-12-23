import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const token = reqBody.headers.Authorization;
  try {
    const user = jwt.verify(token, "AUTH");

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Korrekt",
        data: user,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Nöp",
    });
  }
}
