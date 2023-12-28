import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: any) {
  const userCol = await connectToDatabase("User");
  const movieCol = await connectToDatabase("Movie");

  try {
    const { params } = context;
    const id = new ObjectId(params.userId);

    const user = await userCol.findOne({ _id: id });

    if (user) {
      const favoriteIds = user.favoriteIds;

      const movies = await movieCol
        .find({ _id: { $in: favoriteIds } })
        .toArray();

      if (movies) {
        return NextResponse.json(
          {
            success: true,
            message: "Favorits gefunden",
            data: movies,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Favorits gefunden",
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
