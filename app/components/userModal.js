import { useContext, useState } from "react";
import ChatContext from "@/app/lib/context/chatContext";

export default function UserModal() {
  const [inputField, setInputField] = useState("");
  const { setUser } = useContext(ChatContext);

  function handleChange(e) {
    setInputField(e.target.value.trim());
  }

  function submit() {
    setUser(inputField);
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <h2>Choose a display name</h2>
          </div>
          <form onSubmit={submit}>
            <div className="modal-content">
              <input
                className="border border-slate-400 rounded-sm p-0.5 w-full"
                placeholder="Display Name"
                onChange={handleChange}
                value={inputField}
              />
            </div>
            <div className="modal-buttons-container">
              <input
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
