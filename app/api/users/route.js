// api route for /api/users
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import User from "@/app/api/lib/models/User";

/**
Returns an existing or newly created user object with the userChannels
{
  id:
  email:
  displayName:
  userChannels: [
    userId:
    channelId:
    notificationCount:
    order:
    channel: {
      id:
      name:
    }
  ]
}
 */
export async function POST(req) {
  const { email } = await req.json();
  try {
    const user = await User.findOrCreate({ email });
    return NextResponse.json(user, { status: 200 });
    // TO DO: Handle 400 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
