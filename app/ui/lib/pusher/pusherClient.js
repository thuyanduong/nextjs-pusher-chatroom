import PusherClient from "pusher-js";

// PusherClient.logToConsole = true;

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "";

export const pusherClient = new PusherClient(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  authEndpoint: "/api/pusher/auth",
});

// Subscribe to a pusher channel and returns the pusher channel object
// which will need to be stored in the channel's state and then have the state updated
export const subscribeToPusher = (user, channel, currentChannel, handlePusherMessage) => {
  const pusherChannel = pusherClient.subscribe(`private-${channel.name}`);
  //This function is called whenever a message is received
  pusherChannel.bind("client-message", (message) => {
    channel.messages.push(message);
    handlePusherMessage(user, channel, currentChannel)
  });
  return pusherChannel;
};

// Unsubscribes from a pusher channel
export const unsubscribeFromPusher = (channelObj) => {
  channelObj.pusherChannel.unbind("client-message");
  delete channelObj.pusherChannel;
  pusherClient.unsubscribe(`private-${channelObj.name}`);
};

// Sends a message to a pusher channel to be received by other clients
export const sendPusherMessage = (channel, message) => {
  channel.pusherChannel.trigger("client-message", message);
};
