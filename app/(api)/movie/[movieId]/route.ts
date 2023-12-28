import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: any) {
  const collection = await connectToDatabase("Movie");

  try {
    const { params } = context;
    const id = new ObjectId(params.movieId);

    const movie = await collection.findOne({ _id: id });

    return NextResponse.json(
      {
        success: true,
        message: "Film gefunden",
        data: movie,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
