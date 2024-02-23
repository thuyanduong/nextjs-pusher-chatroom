// api route for /api/channels/leaveChannel
import { NextResponse } from "next/server";
import ServerError from "@/app/models/ServerError";
import User from "@/app/models/User";

export async function POST(req) {
    const { userId, channelId } = await req.json();
    try {
      const channel = await User.leaveChannel({ userId, channelId });
      return NextResponse.json(channel, { status: 200 });
      // TO DO: Handle 400 errors like when sent data is invalid
    } catch (e) {
      return NextResponse.json(new ServerError(e), { status: 500 });
    }
  }