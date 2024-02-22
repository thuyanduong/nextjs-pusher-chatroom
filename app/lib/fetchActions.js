export async function postFetchMessage(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch("/api/messages", options);
  const message = await response.json();
  if (message.error) {
    //TO DO: handle error
  }
  return message;
}

export async function postFetchUser(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch("/api/users", options);
  const user = await response.json();
  if (user.error) {
    //TO DO: handle error
  }
  return user;
}

export async function postFetchChannel(name) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  };
  const response = await fetch("/api/channels", options);
  const channel = await response.json();
  if (channel.error) {
    //TO DO: handle error
  }
  return channel;
}
