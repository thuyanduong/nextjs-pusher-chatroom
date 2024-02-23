// api route for /api/users
"use server";

import ServerError from "@/app/models/ServerError";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  try {
    const user = await User.findOrCreate({ email });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json(new ServerError(e), { status: 500 });
  }
}

