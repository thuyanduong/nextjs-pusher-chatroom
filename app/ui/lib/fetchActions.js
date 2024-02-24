export async function createMessageFetch({ text, authorId, channelId }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, authorId, channelId }),
  };
  const response = await fetch("/api/messages", options);
  const message = await response.json();
  if (message.error) {
    throw new Error(message.error);
  }
  return message;
}

export async function createOrFindUserFetch({ email }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };
  try {
    const response = await fetch("/api/users", options);
    const user = await response.json();
    if (user.error) {
      throw new Error(user.error);
    }
    return user;
  } catch (e) {
    throw new Error(e);
  }
}

export async function joinChannelFetch({ userId, channelName }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, channelName }),
  };
  const response = await fetch("/api/channels/joinChannel", options);
  const channel = await response.json();
  if (channel.error) {
    throw new Error(channel.error);
  }
  return channel;
}

export async function leaveChannelFetch({ userId, channelId }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, channelId }),
  };
  const response = await fetch("/api/channels/leaveChannel", options);
  const channel = await response.json();
  if (channel.error) {
    throw new Error(channel.error);
  }
}

export async function getChannelFetch({ id }) {
  const response = await fetch(`/api/channels/${id}`);
  const channel = await response.json();
  if (channel.error) {
    throw new Error(channel.error);
  }
  return channel;
}

export async function resetNotification({ userId, channelId }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, channelId }),
  };
  const response = await fetch("/api/notifications/reset", options);
  const boolean = await response.json();
  if (boolean.error) {
    throw new Error(boolean.error);
  }
  return boolean;
}

export async function incrementNotification({ userId, channelId }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, channelId }),
  };
  const response = await fetch("/api/notifications/increment", options);
  const userChannel = await response.json();
  if (userChannel.error) {
    throw new Error(userChannel.error);
  }
  return userChannel;
}
