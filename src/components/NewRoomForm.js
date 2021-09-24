import React, { useState } from "react";
import { API_ROOT, HEADERS } from "../constants";

const NewRoomForm = () => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_ROOT}/rooms`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ room: { title: title } }),
    });
    setTitle("");
  };

  return (
    <div className="newConversationForm">
      <form onSubmit={handleSubmit}>
        <label>New Conversation:</label>
        <br />
        <input type="text" value={title} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewRoomForm;
