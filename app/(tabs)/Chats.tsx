import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MensajeCard from "@/components/Mensaje";
import ejemplos from "@/utils/ejemplos.json";

const ChatsPage = () => {
  const router = useRouter();

  const handleChatPress = (item: any) => {
    router.push(
      `/ChatScreen?nombre=${item.nombre}&avatarUrl=${item.avatarUrl}&mensaje=${item.mensaje}`
    );
  };

  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
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

export default ChatsPage;
