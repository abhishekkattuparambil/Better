import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import firebase from 'firebase'
import { BaseballScreen } from "./screens/HomeStack/BaseballScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { HomeStackScreen } from './navigation/HomeStackScreen';
import { BasketballScreen } from './screens/HomeStack/BasketballScreen';

const firebaseConfig = require("./keys.json");
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <BasketballScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

