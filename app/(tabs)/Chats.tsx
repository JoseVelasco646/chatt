import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import MensajeCard from "@/components/Mensaje";
import ejemplos from "@/utils/ejemplos.json";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ChatsPage = () => {
  const router = useRouter();

  const handleChatPress = (item: any) => {
    router.push(
      `/ChatScreen?nombre=${item.nombre}&avatarUrl=${item.avatarUrl}&mensaje=${item.mensaje}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <FontAwesome
          name="edit"
          size={24}
          color="#008dd5"
          style={styles.icon}
        />
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={20}
          color="#bbb"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#bbb"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={ejemplos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatPress(item)}>
            <MensajeCard
              nombre={item.nombre}
              avatarUrl={item.avatarUrl}
              mensaje={item.mensaje}
              hora={item.hora}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000101",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ChatsPage;
