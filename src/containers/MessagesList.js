import React, { useState, useEffect } from "react";
import { ActionCable } from "react-actioncable-provider";

import MessagesArea from "./MessagesArea";
import NewRoomForm from "../components/NewRoomForm";
import Cable from "../components/Cable";
import { API_ROOT } from "../constants";

const MessagesList = () => {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    fetch(`${API_ROOT}/rooms`)
      .then((response) => response.json())
      .then((resp) => setRooms(resp));
  }, []);

  const handleClick = (id) => {
    setActiveRoom(id);
  };

  const handleReceivedRooms = (response) => {
    const { rooms } = response;
    setRooms(rooms);
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    const tempRooms = [...rooms];
    const conversationIndex = rooms.findIndex(
      (room) => room.id === message.room_id
    );
    const tempElement = tempRooms[conversationIndex];
    tempElement.messages = [...tempElement.messages, message];
    tempRooms[conversationIndex] = tempElement;
    setRooms(tempRooms);
  };

  const findActiveRoom = () => {
    console.log("rooms", rooms);
    const room = rooms.find((room) => room.id === activeRoom);
    return room;
  };

  const mapRooms = () => {
    return rooms.map((room) => {
      return (
        <li key={room.id} onClick={() => handleClick(room.id)}>
          {room.title}
        </li>
      );
    });
  };

  return (
    <div className="roomsList">
      <ActionCable
        channel={{ channel: "RoomsChannel" }}
        onReceived={handleReceivedRooms}
      />
      {rooms.length ? (
        <Cable rooms={rooms} handleReceivedMessage={handleReceivedMessage} />
      ) : null}
      <h2>Rooms</h2>
      <ul>{rooms.length ? mapRooms() : null}</ul>
      <NewRoomForm />
      {activeRoom ? <MessagesArea room={findActiveRoom()} /> : null}
    </div>
  );
};

export default MessagesList;
