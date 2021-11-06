import React from 'react'
import { useState } from 'react'
import {TextInput, TouchableOpacity} from 'react-native'
import {Styles} from '../constants/Styles.js'
import {BaseballModel, BasketballModel} from '../models/game.js'
import {
    Box,
    Image,
    NativeBaseProvider,
    Text,
    HStack,
    VStack,
  } from "native-base"
import { Bet } from '../models/money.js'

const active: Bet[] = [];

function getMatchup(home : String, away: String) {
    var homesplit = home.split(' ')
    var awaysplit = away.split(' ')
    var homestr = ''
    var awaystr = ''
    
    if (homesplit[homesplit.length-1] == 'Sox'){
        homestr = homesplit[homesplit.length-2] + ' ' + homesplit[homesplit.length-1]
    } else { homestr = homesplit[homesplit.length-1] }

    if (awaysplit[awaysplit.length-1] == 'Sox'){
        awaystr = awaysplit[awaysplit.length-2] + ' ' + awaysplit[awaysplit.length-1]
    } else { awaystr = awaysplit[awaysplit.length-1] }

    return homestr + ' at ' + awaystr
}

function oddsToMultiplier(odds: string) {
    if (odds == "EVEN") {return 1;}
    const oddNum = parseFloat(odds);
    if (oddNum < 0){
      return -100/oddNum;
    }
    else {
      return oddNum / 100;
    }
  }

export function getHeader(game: BaseballModel | BasketballModel, type: String) {
    return (
    <HStack alignSelf='center' alignItems='center' space={10}>
                    <Image
                        source={{
                            uri: `https://cdn.statmuse.com/img/${type}/teams/${type}_`+ game.home.replaceAll(' ', '_').toLowerCase() +'_primary.png',
                        }}
                        fallbackSource={{
                            uri: `https://cdn.statmuse.com/img/${type}/teams/${type}_`+ game.home.replaceAll(' ', '_').toLowerCase() +'_secondary.png',
                          }}
                        alt="Alternate Text"
                        size={"8"}
                        resizeMode='contain'
                    />
                        <VStack>
                            <Text>{game.date}</Text>
                            <Text>{game.time}</Text>
                        </VStack>
                    <Image
                    source={{
                        uri: `https://cdn.statmuse.com/img/${type}/teams/${type}_` + game.away.replaceAll(' ', '_').toLowerCase() + '_primary.png',
                    }}
                    fallbackSource={{
                        uri: `https://cdn.statmuse.com/img/${type}/teams/${type}_` + game.away.replaceAll(' ', '_').toLowerCase() + '_secondary.png',
                    }}
                    alt="Alternate Text"
                    size={"8"}
                    resizeMode='contain'
                />
                    </HStack>
    )
}

function ML(game: BaseballModel | BasketballModel, home: boolean){
    var odds = home ? game.home_ml : game.away_ml
    if (odds[0] == "+") {
        odds = odds.substr(1);
    }
    const bet = {odds: odds, 
        multiplier: oddsToMultiplier(odds),
        title: home ? game.home : game.away, 
        game: getMatchup(game.home, game.away)} as Bet;
    active.push(bet)
    console.log(active)
}

function spread(game: BaseballModel | BasketballModel, home: boolean) {
    var nameArr = home ? game.home.split(' ') : game.away.split(' ')
    var name = nameArr[nameArr.length-1]
    var odd = home ? game.home_spread : game.away_spread
    const oddTitle = odd.split(' ')[0]
    odd = odd.split('(')[1]
    odd = odd.substr(0,odd.length-1)
    if (odd[0] == "+") {
        odd = odd.substr(1);
    }
    const bet = {odds: home ? game.home_spread : game.away_spread, 
        multiplier: oddsToMultiplier(odd),
        title: name+' '+oddTitle, 
        game: getMatchup(game.home, game.away)} as Bet;
    active.push(bet);
}

function total(game: BaseballModel | BasketballModel, under: boolean) {
    var odd = under ? game.under : game.over
    const oddTitle = odd.split(' ')[0]
    odd = odd.split('(')[1]
    odd = odd.substr(0,odd.length-1)
    if (odd[0] == "+") {
        odd = odd.substr(1);
    }
    const bet = {odds: under ? game.under : game.over, 
        multiplier: oddsToMultiplier(odd),
        title: oddTitle, 
        game: getMatchup(game.home, game.away)} as Bet;
    active.push(bet);
}

export function BaseballCard(game: BaseballModel) {
    return (
        <NativeBaseProvider>
            <HStack>
                <Box style={Styles.card}>
                {getHeader(game, "mlb")}
                <Text alignSelf='center'>{getMatchup(game.home, game.away)}</Text>
                    <HStack>
                        <VStack>
                            <TouchableOpacity style={Styles.market} onPress={() => spread(game, false)}>
                                <Text>{game.away_spread}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => ML(game, false)}>
                                <Text>{game.away_ml}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => total(game, false)}>
                                <Text>{game.over}</Text>
                            </TouchableOpacity>
                        </VStack>
                        <VStack>
                            <TouchableOpacity style={Styles.market} onPress={() => spread(game, true)}>
                                <Text>{game.home_spread}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => ML(game, true)}>
                                <Text>{game.home_ml}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => total(game, true)}>
                                <Text>{game.under}</Text>
                            </TouchableOpacity>
                        </VStack>
                    </HStack>
                </Box>
                <TouchableOpacity onPress={() => console.log('transition')}>
                    <VStack>
                        <Text style={Styles.body}>{game.away_pitcher}</Text>
                        <Text style={Styles.body}>—————@—————</Text>
                        <Text style={Styles.body}>{game.home_pitcher}</Text>
                    </VStack>
                </TouchableOpacity>
            </HStack>
        </NativeBaseProvider>
    )
}

export function BasketballCard(game: BasketballModel) {
    return (
        <NativeBaseProvider>
            <HStack>
                <Box style={Styles.card}>
                {getHeader(game, "nba")}
                <Text alignSelf='center'>{getMatchup(game.home, game.away)}</Text>
                    <HStack>
                        <VStack>
                            <TouchableOpacity style={Styles.market} onPress={() => spread(game, false)}>
                                <Text>{game.away_spread}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => ML(game, false)}>
                                <Text>{game.away_ml}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => total(game, false)}>
                                <Text>{game.over}</Text>
                            </TouchableOpacity>
                        </VStack>
                        <VStack>
                            <TouchableOpacity style={Styles.market} onPress={() => spread(game, true)}>
                                <Text>{game.home_spread}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => ML(game, true)}>
                                <Text>{game.home_ml}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => total(game, true)}>
                                <Text>{game.under}</Text>
                            </TouchableOpacity>
                        </VStack>
                    </HStack>
                </Box>
            </HStack>
        </NativeBaseProvider>
    )
}

export function BetCard(bet: Bet) {
    return (
        <NativeBaseProvider>
            <Box style={Styles.card}>
            <Text alignSelf='center' style={Styles.h3}>{bet.game}</Text>
            <Text alignSelf='center' style={Styles.h3}>{bet.title+bet.odds}</Text>
            <TextInput
            placeholder="Bet Amount"
            style={ Styles.input }
          />
            </Box>
        </NativeBaseProvider>
    )
}
