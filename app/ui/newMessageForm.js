"use client";

import { useState, useContext } from "react";
import ChatContext from "./lib/context/chatContext";
import { createMessageFetch } from "./lib/fetchActions";
import { sendPusherMessage } from "./lib/pusher/pusherClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function NewMessageForm() {
  const { currentChannel, user, channels, setChannels } =
    useContext(ChatContext);

  const formSchema = z.object({
    textInput: z.string().trim().min(1),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { text: "" },
    resolver: zodResolver(formSchema),
  });

  async function sendMessage({ textInput }) {
    try {
      // make a fetch request to create a new message
      const newMessage = await createMessageFetch({
        text: textInput,
        channelId: currentChannel.id,
        authorId: user.id,
      });
      // add the new message to the channels state
      const channel = channels[currentChannel.name];
      channel.messages.push(newMessage);
      // update the channels state
      setChannels((prevState) => ({ ...prevState }));
      // trigger the pusher channel to send the new message
      sendPusherMessage(channel, newMessage);
      //reset the text input
      reset();
    } catch (e) {
      setError("root", { message: "Send Failed" });
    }
  }

  function checkEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      handleSubmit(sendMessage)();
    }
  }

  return (
    <form
      className="new-message-container"
      onSubmit={handleSubmit(sendMessage)}
    >
      <textarea
        {...register("textInput")}
        className={"new-message-input"}
        id="new-message"
        placeholder="Your message..."
        onKeyDown={checkEnterPress}
      />
      <div>
        <input type="submit" value="Send" className="send-button" />
        {errors.root && (
          <div id="log-in-form-error" className="red-error-message text-center">
            {errors.root.message}
          </div>
        )}
      </div>
    </form>
  );
}
