import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Alert, StyleSheet} from "react-native";
import {BaseballCard} from '../components/Card'
import firebase from "firebase/app";
import "firebase/firestore";
import { BaseballModel } from "../models/game.js";
import { Styles } from '../constants/Styles.js'
  
export function BaseballScreen() {
    const firebaseConfig = require("../keys.json");
    const [games, setGames] = useState<BaseballModel[]>([]);
  
    useEffect(() => {
      var db = firebase.firestore();
      const unsubscribe = db
        .doc("baseball").collection("")
        .orderBy("date", "asc")
        .onSnapshot((querySnapshot: any) => {
          var readGames: BaseballModel[] = [];
          querySnapshot.forEach((doc: any) => {
            const game = doc.data() as BaseballModel;
            game.id = doc.id
            readGames.push(game)
          });
          setGames(readGames);
          console.log(games.length)
        });
      return unsubscribe;
    }, []);

    const renderGames = ({ item }: { item: BaseballModel }) => {
      const onPress = () => {
        /*navigation.navigate("DetailScreen", {
          social: item,
        });*/
        console.log(item.away_ml)
      };
  
      return BaseballCard(item);
    };

    return (
      <View style={Styles.container}>
      <FlatList
        data={games}
        renderItem={renderGames}
        keyExtractor={(_: any, index: number) => "key-" + index}
        ListEmptyComponent={<Text style={{fontSize: 32, alignSelf: 'center', marginTop: 20}}>No games today :(</Text>}
      />
    </View>
    )
  }