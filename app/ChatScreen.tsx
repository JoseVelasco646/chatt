import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { io } from "socket.io-client";
import uuid from "react-native-uuid";

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  audioUri?: string;
}

const socket = io("http://192.168.0.167:3000");

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("jose");

  useEffect(() => {
    const onReceiveMessage = (mensaje: Message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === mensaje.id)) {
          return [mensaje, ...prevMessages];
        }
        return prevMessages;
      });
    };

    socket.on("recibirMensaje", onReceiveMessage);

    return () => {
      socket.off("recibirMensaje", onReceiveMessage);
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg: Message = {
        id: uuid.v4().toString(),
        sender: userName,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("enviarMensaje", newMsg);

      setMessages((prevMessages) => [newMsg, ...prevMessages]);

      setNewMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === userName ? styles.currentUser : styles.otherUser,
            ]}
          >
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje"
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  messageContainer: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  currentUser: {
    backgroundColor: "#0052cc",
    alignSelf: "flex-end",
  },
  otherUser: {
    backgroundColor: "#1f1f1f",
    alignSelf: "flex-start",
  },
  sender: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  message: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 30,
    paddingLeft: 10,
    color: "#fff",
  },
});

export default ChatScreen;
