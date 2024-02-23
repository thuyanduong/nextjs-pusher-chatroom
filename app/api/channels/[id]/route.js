// api route for /api/channels/:id
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import Channel from "@/app/api/lib/models/Channel";

/**
Returns a channel object with messages and each message's author:
{
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
  ]
}
 */
export async function GET(req, context) {
  const id = context.params.id;
  try {
    const channel = await Channel.findById({ id });
    return NextResponse.json(channel, { status: 200 });
    // TO DO: Handle 404 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
