import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

interface Contacto {
  id: string;
  nombre: string;
  avatarUrl: string;
  status: string;
}

const contactos: Contacto[] = [
  {
    id: "1",
    nombre: "Jose",
    avatarUrl:
      "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
    status: "últ. vez recientemente",
  },
  {
    id: "2",
    nombre: "Eleazar",
    avatarUrl: "https://img.lovepik.com/element/45006/1283.png_860.png",
    status: "últ. vez recientemente",
  },
  {
    id: "3",
    nombre: "Elian Buzo",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYPRLSISP2uoEdGxNPVFrz02gI2KWiJ_VwNA&s",
    status: "últ. vez recientemente",
  },
  {
    id: "4",
    nombre: "Mario",
    avatarUrl: "https://img.lovepik.com/element/45006/1283.png_860.png",
    status: "últ. vez hace mucho tiempo",
  },
  {
    id: "5",
    nombre: "Olan",
    avatarUrl: "https://img.lovepik.com/element/45006/1283.png_860.png",
    status: "últ. vez hace mucho tiempo",
  },
];

const ContactosScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredContactos, setFilteredContactos] =
    useState<Contacto[]>(contactos);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContactos(filtered);
    } else {
      setFilteredContactos(contactos);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredContactos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.contactContainer}>
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
              <View>
                <Text style={styles.contactName}>{item.nombre}</Text>
                <Text style={styles.contactStatus}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  searchBar: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  contactStatus: {
    fontSize: 14,
    color: "#888",
  },
});

export default ContactosScreen;
