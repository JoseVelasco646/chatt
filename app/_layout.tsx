import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack>
        {/* Pantalla de autenticación */}

        <Stack.Screen name="auth/index" options={{ headerShown: false }} />

        {/* Pantalla para elegir nombre */}

        <Stack.Screen name="auth/chooseName" options={{ headerShown: false }} />

        {/* Pantalla de chat cuando el usuario está autenticado */}

        <Stack.Screen
          name="ChatScreen"
          options={{ title: "Chat", headerShown: false }}
        />
      </Stack>
    </>
  );
}
