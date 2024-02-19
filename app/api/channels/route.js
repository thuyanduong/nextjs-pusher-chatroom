// api route for /channels
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name } = await req.json();
  try {
    let channel = await prisma.channel.findFirst({
      where: {
        name
      }, 
      include: {
        messages: true
      }
    })
    if(!channel){
      channel = await prisma.channel.create({
        data: {
          name,
        },
        include: {
          messages: true
        }
      });
    }
    return NextResponse.json(channel, { status: 200 });
  } catch (e) {
    return NextResponse.json({
      error: true,
      errorMessage: e,
      message: "Could not add channel to database",
      status: 500,
    });
  }
}

export async function GET(req) {
  const channels = await prisma.channel.findMany();
  return NextResponse.json(
    {
      channels,
      message: "You made a GET request to the endpoint: /api/channels",
    },
    { status: 200 }
  );
}
