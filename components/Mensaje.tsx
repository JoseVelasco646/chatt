import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

interface MensajeCardProps {
  nombre: string;
  avatarUrl: string;
  mensaje: string;
  hora: string;
}

const MensajeCard: React.FC<MensajeCardProps> = ({
  nombre,
  avatarUrl,
  mensaje,
  hora,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{nombre}</Text>
          <Text style={styles.time}>{hora}</Text>
        </View>
        <Text style={styles.message}>{mensaje}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  time: {
    color: "#888",
    fontSize: 12,
  },
  message: {
    fontSize: 14,
    color: "white",
  },
});

export default MensajeCard;
