import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";

export async function GET(req: Request, res: Response) {
  const collection = await connectToDatabase("Movie");

  try {
    const movies = await collection.find().toArray();

    return NextResponse.json(
      {
        success: true,
        message: "Film gefunden",
        data: movies,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
