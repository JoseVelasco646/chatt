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
        <Text style={styles.checkIcon}>✓✓</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    backgroundColor: "#000",
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  time: {
    color: "#bbb",
    fontSize: 12,
  },
  message: {
    fontSize: 14,
    color: "#fff",
    marginTop: 2,
  },
  checkIcon: {
    alignSelf: "flex-end",
    color: "#1E90FF",
    fontSize: 12,
    marginTop: 5,
  },
});

export default MensajeCard;
