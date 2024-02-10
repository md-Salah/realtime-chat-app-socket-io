import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Icon, Input, Text, Circle } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (currentMessage === "") return;
    const messageData = {
      room,
      author: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      message: currentMessage,
    };

    await socket.emit("send_message", messageData);
    // console.log(messageData);
    setMessageList([...messageList, messageData]);
    setCurrentMessage("");
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      setMessageList([...messageList, messageData]);
    });
    scrollToBottom();
  }, [socket, messageList]);

  return (
    <Box>
      <Box bg="gray.100" p="10px" borderRadius="5px 5px 0 0" fontWeight="500">
        <Flex alignItems="center">
          Live Chat
          <Circle size="10px" bg="green.500" ml="10px" mt="2px" />
        </Flex>
        <Text fontSize="sm" fontWeight="600">
          {messageList.find((content) => content.author !== username) !== undefined
            ? messageList.find((content) => content.author !== username).author
            : ""}
          {/* {console.log(messageList.find((content) => content.author !== username).author)} */}
        </Text>
      </Box>
      <Box
        overflowY="auto"
        h="350px"
        bg="gray.50"
        p="5px"
        display="flex"
        flexDirection="column"
      >
        {messageList.map((content, index) => (
          <Flex
            key={index}
            w="100%"
            justifyContent={
              content.author === username ? "flex-end" : "flex-start"
            }
          >
            <Flex w="max-content" direction="column">
              <Text
                textAlign="center"
                bg={content.author === username ? "teal.200" : "red.200"}
                p="5px"
                borderRadius="10px"
              >
                {content.message}
              </Text>
              <Flex justifyContent="flex-end">
                <Text fontSize="xs" px="5px">
                  {content.time}
                </Text>
                <Text fontSize="xs" px="5px" mb="10px">
                  {content.author === username ? "you" : content.author}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
        <div ref={messageEndRef} />
      </Box>
      <Box display="flex" bg="gray.100" p="10px" borderRadius="0 0 5px 5px">
        <Input
          bg="white"
          size="sm"
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <Button
          bg="white"
          size="sm"
          variant="outline"
          ml="5px"
          borderRadius="2px"
          onClick={handleSendMessage}
        >
          <Icon as={IoMdSend} />
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
