import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/utils/db";

export async function POST(req: Request) {
  const collection = await connectToDatabase("User");

  try {
    const { data } = await req.json();

    const existingUser = await collection.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Es ist bereits diese E-Mail Adresse registriert",
        },
        { status: 422 }
      );
    }

    const emailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);

      return isValid;
    };

    if (!emailValid(data.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "E-Mail Adresse ist nicht gültig",
        },
        { status: 422 }
      );
    }

    if (data.username.length <= 2) {
      return NextResponse.json(
        { message: "Nutzername muss mindesten 3 Zeichen haben" },
        { status: 422 }
      );
    }

    const passwordValid = (pwd) => {
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const numberRegex = /\d/;
      const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
      const minLength = pwd.length >= 6;

      if (!minLength) {
        return {
          message: "mindest Länge von 6 Zeichen nicht erreicht",
          success: false,
        };
      }

      if (!lowerCaseRegex.test(pwd)) {
        return {
          message: "bitte gebe mindestens ein klein Buchstaben ein",
          success: false,
        };
      }

      if (!upperCaseRegex.test(pwd)) {
        return {
          message: "bitte gebe mindestens ein großen Buchstaben ein",
          success: false,
        };
      }

      if (!numberRegex.test(pwd)) {
        return {
          message: "bitte gebe mindestens eine Zahl ein",
          success: false,
        };
      }

      if (!specialCharacterRegex.test(pwd)) {
        return {
          message: "bitte gebe mindestens ein Sonderzeichen ein",
          success: false,
        };
      }

      return {
        message: "Alles okay",
        success: true,
      };
    };

    if (!passwordValid(data.password)?.success) {
      return NextResponse.json(
        { message: passwordValid(data.password)?.message },
        { status: 422 }
      );
    }

    if (data.password !== data.passwordRepeat) {
      return NextResponse.json(
        { message: "Password stimmt nicht überein!" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await collection.insertOne({
      email: data.email,
      username: data.username,
      hashedPassword: hashedPassword,
      image: "",
      createdAt: new Date(),
      sessions: [],
      accounts: [],
      favoriteIds: [],
    });

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Account wurde erfolgreich angelegt",
        data: data,
      });
    } else {
      return NextResponse.json(
        { message: "Etwas ist schief gelaufen" },
        { status: 422 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Leider ist ein Fehler aufgetretten" },
      { status: 400 }
    );
  }
}
