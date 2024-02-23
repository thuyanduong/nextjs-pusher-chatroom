import Channel from "@/app/models/Channel";
import { NextResponse } from "next/server";
import ServerError from "@/app/models/ServerError";

export async function GET(req, context) {
  const id = context.params.id;
  try {
    const channel = await Channel.findById({ id });
    return NextResponse.json(channel, { status: 200 });
    // TO DO: Handle 400 errors like when channel name is invalid or not found
  } catch (e) {
    return NextResponse.json(ServerError(e), { status: 500 });
  }
}
