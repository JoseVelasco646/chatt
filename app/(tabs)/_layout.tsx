import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#008dd5" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Contactos",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="user-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="paper-plane" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
