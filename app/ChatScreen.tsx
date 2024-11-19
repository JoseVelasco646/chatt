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
  Image,
  SafeAreaView,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { io } from "socket.io-client";
import uuid from "react-native-uuid";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

interface Message {
  id: string;
  sender: string;
  message?: string;
  imageUri?: string;
  timestamp: string;
}

const socket = io("http://192.168.0.167:3000");

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };
    getCameraPermission();

    const onReceiveMessage = (mensaje: Message) => {
      setMessages((prevMessages) => [mensaje, ...prevMessages]);
    };

    socket.on("recibirMensaje", onReceiveMessage);

    return () => {
      socket.off("recibirMensaje", onReceiveMessage);
      socket.close();
    };
  }, [router]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: uuid.v4().toString(),
        sender: "Me",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("enviarMensaje", newMsg);
      setMessages((prevMessages) => [newMsg, ...prevMessages]);
      setNewMessage("");
    }
  };

  const openCamera = async () => {
    if (hasCameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newMsg: Message = {
          id: uuid.v4().toString(),
          sender: "Me",
          imageUri: result.assets[0].uri,
          timestamp: new Date().toLocaleTimeString(),
        };

        socket.emit("enviarMensaje", newMsg);
        setMessages((prevMessages) => [newMsg, ...prevMessages]);
      }
    } else {
      alert("Permiso de cámara denegado");
    }
  };

  const goToUserProfile = () => {
    router.push("/InfoContact");
  };

  const deleteMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  const confirmDeleteMessage = (id: string) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este mensaje?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => deleteMessage(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Modal visible={isModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullscreenImage}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={goToUserProfile}>
            <Image
              source={{
                uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
              }}
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              <Text style={styles.userName}>Jose Velasco</Text>
              <Text style={styles.lastSeen}>últ. vez recientemente</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.messageContainer,
              item.sender === "Me"
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
            onLongPress={() => confirmDeleteMessage(item.id)} // Detectar toque largo
          >
            {item.imageUri ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(item.imageUri);
                  setIsModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: item.imageUri }}
                  style={styles.messageImage}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.messageText}>{item.message}</Text>
            )}
            <View style={styles.messageMeta}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              {item.sender === "Me" && (
                <FontAwesome name="check" size={12} color="#4caf50" />
              )}
            </View>
          </Pressable>
        )}
        inverted
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputBar}>
          <TouchableOpacity>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje"
            placeholderTextColor="#888"
            value={newMessage}
            onChangeText={setNewMessage}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={openCamera}>
              <FontAwesome
                name="camera"
                size={20}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                name="microphone"
                size={20}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  headerText: {
    flexDirection: "column",
    justifyContent: "center",
  },

  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  lastSeen: {
    color: "#888",
    fontSize: 12,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1f1f1f",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  timestamp: {
    color: "#ccc",
    fontSize: 10,
    marginRight: 5,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  icon: {
    marginLeft: 10,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ChatScreen;
