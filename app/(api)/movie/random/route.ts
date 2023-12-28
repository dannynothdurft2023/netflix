import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";

export async function GET(req: Request, res: Response) {
  const collection = await connectToDatabase("Movie");

  try {
    const moviesCount = await collection.countDocuments();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await collection
      .find()
      .skip(randomIndex)
      .limit(1)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        message: "Film gefunden",
        data: randomMovies,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
