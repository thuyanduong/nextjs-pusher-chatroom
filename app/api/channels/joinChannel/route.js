// api route for /api/channels/joinChannel
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import User from "@/app/api/lib/models/User";

/**
Returns a userChannel object with both joined channel and the channel's messages 
or returns false if user was already in the channel
{
  userId:
  channelId:
  notificationCount:
  order:
  channel: {
    id:
    name:
    messages: [
      id:
      text:
      channelId:
      createdAt:
      author: {
        id:
        email:
        displayName:
      }
    }
  }
}
 */
export async function POST(req) {
  const { userId, channelName } = await req.json();
  try {
    const userChannel = await User.joinChannel({ userId, channelName });
    return NextResponse.json(userChannel, { status: 200 });
    // TO DO: Handle 400 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
