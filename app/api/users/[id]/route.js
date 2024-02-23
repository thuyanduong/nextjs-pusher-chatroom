import User from "@/app/models/User";
import ServerError from "@/app/models/ServerError";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    const id = context.params.id;
    try {
      const user = await User.findById({ id });
      return NextResponse.json(user, { status: 200 });
      // TO DO: Handle 400 errors like when channel name is invalid or not found
    } catch (e) {
      return NextResponse.json(ServerError(e), { status: 500 });
    }
  }