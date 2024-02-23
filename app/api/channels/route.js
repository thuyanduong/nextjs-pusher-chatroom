// api route for /api/channels
import { NextResponse } from "next/server";
import ServerError from "@/app/models/ServerError";
import Channel from "@/app/models/Channel";

export async function GET(req) {
  try {
    const channels = await Channel.getAllChannels();
    return NextResponse.json(channels, { status: 200 });
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
