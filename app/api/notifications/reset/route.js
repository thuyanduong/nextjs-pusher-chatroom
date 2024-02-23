// api route for /api/notifications/reset
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import UserChannel from "@/app/api/lib/models/UserChannel";

/**
Returns true if successfully reset the notification count
 */
export async function POST(req) {
  const { channelId, userId } = await req.json();
  try {
    const results = await UserChannel.resetNotification({ channelId, userId });
    return NextResponse.json(results, { status: 200 });
    // TO DO: Handle 400 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
