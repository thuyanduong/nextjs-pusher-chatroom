// api route for /api/channels/leaveChannel
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import User from "@/app/api/lib/models/User";

/**
 * Returns true if successfully left a channel
 */
export async function POST(req) {
  const { userId, channelId } = await req.json();
  try {
    const channel = await User.leaveChannel({ userId, channelId });
    return NextResponse.json(channel, { status: 200 });
    // TO DO: Handle 400 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
