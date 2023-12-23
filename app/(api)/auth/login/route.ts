import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import connectToDatabase from "@/utils/db";

export async function POST(req: Request) {
  const collection = await connectToDatabase("User");

  try {
    const { data } = await req.json();

    const user = await collection.findOne({ email: data.email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Es gibt keine Benutzer mit dieser E-Mail adresse",
        },
        { status: 422 }
      );
    }

    const isCorrectPassword = await compare(data.password, user.hashedPassword);

    if (!isCorrectPassword) {
      return NextResponse.json(
        { message: "Password stimmt nicht überein!" },
        { status: 422 }
      );
    }

    if (user && isCorrectPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
        password: user.password,
        username: user.username,
      };

      const token = jwt.sign(tokenData, "AUTH", {
        expiresIn: 60 * 60,
      });

      const response = NextResponse.json({
        success: true,
        message: "Du bist eingelogt",
        token: token,
        data: user,
      });

      const cookieOptions: [string, string, any] = [
        "token",
        token,
        {
          httpOnly: true,
          path: "/",
          sameSite: "None",
          secure: true,
        },
      ];

      response.cookies.set(...cookieOptions);

      return response;
    } else {
      return NextResponse.json(
        { message: "Etwas ist schief gelaufen" },
        { status: 422 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
