import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import { BaseballScreen } from "./screens/BaseballScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const firebaseConfig = require("./keys.json");
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <BaseballScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

