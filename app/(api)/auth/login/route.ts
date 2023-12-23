import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { compare } from "bcrypt";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  await client.connect();
  const database = client.db();
  const collection = database.collection("User");

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
      return NextResponse.json({
        success: true,
        message: "Du bist eingelogt",
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
