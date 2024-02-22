// api route for /users
"use server";

import ServerError from "@/app/models/ServerError";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username } = await req.json();
  try {
    const user = await User.findOrCreate({ username });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}
