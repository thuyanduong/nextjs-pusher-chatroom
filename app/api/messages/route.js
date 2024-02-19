// api route for /messages
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { author, text, channelId } = body
  try {
    let message = await prisma.message.create({
      data: {
        author,
        text, 
        channelId
      },
    });
    return NextResponse.json(message, { status: 200 });
  } catch (e) {
    return NextResponse.json({
      error: true,
      errorMessage: e,
      message: "Could not add message to database",
      status: 500,
    });
  }
}

export async function GET(req) {
  const channels = await prisma.message.findMany();
  return NextResponse.json(
    {
      channels,
      message: "You made a GET request to the endpoint: /api/messages",
    },
    { status: 200 }
  );
}
