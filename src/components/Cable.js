import React from "react";
import { ActionCable } from "react-actioncable-provider";

const Cable = ({ rooms, handleReceivedMessage }) => {
  return (
    <>
      {rooms.map((room) => {
        return (
          <ActionCable
            key={room.id}
            channel={{
              channel: "MessagesChannel",
              room: room.id,
            }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </>
  );
};

export default Cable;
