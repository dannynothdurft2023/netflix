import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  await client.connect();
  const database = client.db();
  const collection = database.collection("User");

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

    if (data.password !== data.passwordRepeat) {
      return NextResponse.json(
        { message: "Password stimmt nicht überein!" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await collection.insertOne({
      email: data.email,
      name: data.username,
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
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
