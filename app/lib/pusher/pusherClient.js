import PusherClient from "pusher-js";

// PusherClient.logToConsole = true;

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || ""

export const pusherClient = new PusherClient(
  PUSHER_KEY,
  {
    cluster: PUSHER_CLUSTER,
    authEndpoint: "/api/pusher/auth",
  }
);
