import { useState } from "react";

const MAXLENGTH = 25;
const MINLENGTH = 4;

export default function JoinChannelForm({ joinChannel }) {
  const [textInput, setTextInput] = useState("");
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errors = {};
    if (!textInput) {
      errors.channelNameError = "Channel name is required.";
    } else if (textInput.length > MAXLENGTH || textInput.length < MINLENGTH) {
      errors.channelNameError = `Channel name must be between ${MINLENGTH} and ${MAXLENGTH} characters.`;
    }
    //Is there are no form validation errors, join the channel
    if (Object.keys(errors).length === 0) {
      try {
        joinChannel(textInput);
        setTextInput("");
        setErrors({});
      } catch (e) {
        //TO DO: handle error
      }
    } else {
      setErrors(errors);
    }
  }

  return (
    <>
      <form className="join-channel-container" onSubmit={handleSubmit}>
        <input
          className="channel-name-input"
          type="text"
          id="join-channel"
          minLength={MINLENGTH}
          maxLength={MAXLENGTH}
          placeholder="Channel to join"
          value={textInput}
          onChange={handleChange}
        />
        <input type="submit" className="join-button" value="+Join" />
      </form>
      <div id="username-error" aria-live="polite" aria-atomic="true">
        {errors.channelNameError && (
          <p className="red-error-message">{errors.channelNameError}</p>
        )}
      </div>
    </>
  );
}
