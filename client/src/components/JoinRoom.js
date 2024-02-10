import React, { useState } from "react";
import Chat from "./Chat";
import { Box, Button, Input } from '@chakra-ui/react'

const JoinRoom = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isChatBox, setIsChatBox] = useState(false);

  const handlelJoinRoom = () => {
    if (username && room) {
      socket.emit("join_room", {username, room});
      setIsChatBox(true);
    }
  };

  return (
    <Box h='100vh' display='flex' alignItems='center' justifyContent='center'>
      {!isChatBox ? (
        <Box display='flex' flexDirection='column'>
          <Input
            type="text"
            placeholder="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            mt='10px'
            type="text"
            placeholder="Room..."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Button mt='20px' onClick={handlelJoinRoom}>Join Room</Button>
        </Box>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </Box>
  );
};

export default JoinRoom;
