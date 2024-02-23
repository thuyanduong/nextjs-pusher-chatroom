// api route for /api/users/:id
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import User from "@/app/api/lib/models/User";

/**
Returns a user object and its userChannels
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
export async function GET(req, context) {
  const id = context.params.id;
  try {
    const user = await User.findById({ id });
    return NextResponse.json(user, { status: 200 });
    // TO DO: Handle 404 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
