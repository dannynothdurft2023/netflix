import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { ObjectId } from "mongodb";

export async function POST(req: Request, res: Response) {
  const userCol = await connectToDatabase("User");

  try {
    const { movieId, userId } = await req.json();
    const id = new ObjectId(userId);
    const favoriteId = new ObjectId(movieId);

    const user = await userCol.findOne({ _id: id });

    if (user) {
      const updatedUser = await userCol.updateOne(
        { _id: id },
        { $addToSet: { favoriteIds: favoriteId } }
      );

      if (updatedUser.acknowledged) {
        return NextResponse.json(
          {
            success: true,
            message: "Film gefunden",
            data: "Yes",
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
