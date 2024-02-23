export async function createMessageFetch({text, authorId, channelId}) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({text, authorId, channelId}),
  };
  const response = await fetch("/api/messages", options);
  const message = await response.json();
  if (message.error) {
    //TO DO: handle error
  }
  return message;
}

export async function createOrFindUserFetch({email}) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email}),
  };
  const response = await fetch("/api/users", options);
  const user = await response.json();
  if (user.error) {
    //TO DO: handle error
  }
  return user;
}

export async function joinChannelFetch({userId, channelName}) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId, channelName}),
  };
  const response = await fetch("/api/channels/joinChannel", options);
  const channel = await response.json();
  if (channel.error) {
    //TO DO: handle error
  }
  return channel;
}

export async function leaveChannelFetch({userId, channelId}) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId, channelId}),
  };
  const response = await fetch("/api/channels/leaveChannel", options);
  const channel = await response.json();
  if (channel.error) {
    //TO DO: handle error
  }
}

export async function getChannelFetch({id}){
  const response = await fetch(`/api/channels/${id}`);
  const channel = await response.json();
  if (channel.error) {
    //TO DO: handle error
  }
  return channel;
}
