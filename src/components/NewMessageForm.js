import React, { useState } from "react";
import { API_ROOT, HEADERS } from "../constants";

const NewMessageForm = ({ room_id }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      text: text,
      room_id: room_id,
    };

    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(info),
    });
    setText("");
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <label>New Message:</label>
        <br />
        <input type="text" value={text} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewMessageForm;
