// api route for /api/messages
import { NextResponse } from "next/server";
import ServerError from "@/app/api/lib/models/ServerError";
import Message from "@/app/api/lib/models/Message";

/**
Returns a newly created message object
{
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
 */
export async function POST(req) {
  const { text, channelId, authorId } = await req.json();
  try {
    const message = await Message.create({ text, channelId, authorId });
    return NextResponse.json(message, { status: 200 });
    // TO DO: Handle 400 errors
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
