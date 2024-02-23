// api route for /api/notifications/increment
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import UserChannel from "@/app/api/lib/models/UserChannel";

/**
Returns the userChannel with the new notifcation count
{
  userId: 
  channelId: 
  notificationCount: 
  order:
}
 */
export async function POST(req) {
  const { userId, channelId } = await req.json();
  try {
    const userChannel = await UserChannel.incrementNotification({
      userId,
      channelId,
    });
    return NextResponse.json(userChannel, { status: 200 });
    // TO DO: Handle 400 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
