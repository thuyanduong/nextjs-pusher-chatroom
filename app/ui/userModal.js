"use client";

import { useContext, useState, useEffect } from "react";
import ChatContext from "@/app/lib/context/chatContext";
import { postFetchUser } from "../lib/fetchActions";

const MAXLENGTH = 25;
const MINLENGTH = 1;

export default function UserModal() {
  const { setUser } = useContext(ChatContext);
  const [userNameField, setUserNameField] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let errors = {};
    if (!userNameField) {
      errors.userNameError = "Name is required.";
    } else if (userNameField.length > MAXLENGTH) {
      errors.userNameError = `Name must be ${MAXLENGTH} characters or less.`;
    }
    //Is there are no form validation errors, fetch the user
    if (Object.keys(errors).length === 0) {
      try{
        setIsLoading(true)
        const user = await postFetchUser({ username: userNameField });
        setIsLoading(false);
        setUser(user);
      }catch(e){
        //TO DO: handle error
      }
    }else{
      setErrors(errors);
    }
  }

  function handleChange(e) {
    if(!isLoading){
      setUserNameField(e.target.value.trim());
    }
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <h2>Choose a display name</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <input
                className="border border-slate-400 rounded-sm p-0.5 w-full"
                placeholder="Display Name"
                onChange={handleChange}
                minLength={MINLENGTH}
                maxLength={MAXLENGTH}
                aria-describedby="username-error"
                value={userNameField}
              />
              <div id="username-error" aria-live="polite" aria-atomic="true">
                {errors.userNameError && (
                  <p className="red-error-message">{errors.userNameError}</p>
                )}
              </div>
            </div>
            <div className="modal-buttons-container">
              <input
                disabled={isLoading}
                type="submit"
                className="display-name-button"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-background"></div>
    </div>
  );
}
