// api route for /channels
import { NextResponse } from "next/server";
import ServerError from "@/app/models/ServerError";
import Channel from "@/app/models/Channel";

export async function POST(req) {
  const { name } = await req.json();
  try {
    const channel = await Channel.findOrCreate({ name });
    return NextResponse.json(channel, { status: 200 });
    // TO DO: Handle 400 errors like when channel name is invalid
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const channels = await Channel.getAllChannels();
    return NextResponse.json(channels, { status: 200 });
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
