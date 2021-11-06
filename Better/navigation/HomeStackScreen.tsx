import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BaseballScreen } from "../screens/HomeStack/BaseballScreen";
import { BasketballScreen} from "../screens/HomeStack/BasketballScreen";

export type HomeStackParamList = {
  BaseballScreen: undefined;
  BasketballScreen: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="BasketballScreen" screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="BasketballScreen"
        component={BasketballScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="BaseballScreen"
        component={BaseballScreen}
      />
    </HomeStack.Navigator>
  );
}