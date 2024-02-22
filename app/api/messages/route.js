// api route for /messages
import { NextResponse } from "next/server";
import Message from "@/app/models/Message";
import ServerError from "@/app/models/ServerError";

export async function POST(req) {
  const { text, channelId, authorId } = await req.json();
  try {
    const message = await Message.create({ text, channelId, authorId });
    return NextResponse.json(message, { status: 200 });
    // TO DO: Handle 400 errors like when channel name is invalid
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
