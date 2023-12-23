import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
      data: null,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
