import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Alert, StyleSheet} from "react-native";
import {BasketballCard} from '../../components/Card'
import firebase from "firebase";
import "firebase/firestore";
import { BaseballModel } from "../../models/game.js";
import { Styles } from '../../constants/Styles.js'
import moment from 'moment'
  
export function BasketballScreen() {
    const [games, setGames] = useState<BaseballModel[]>([]);
  
    useEffect(() => {
      const td = new Date()
      
      const today = moment(td, 'MM/DD/YY')  
      var db = firebase.firestore();
      const unsubscribe = db
        .collection("basketball")
        .where("date", "!=", "12/25/21")
        .onSnapshot((querySnapshot: any) => {
          var readGames: BaseballModel[] = [];
          querySnapshot.forEach((doc: any) => {
            const game = doc.data() as BaseballModel;
            game.id = doc.id
            readGames.push(game)
          });
          setGames(readGames);
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
  
      return BasketballCard(item);
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