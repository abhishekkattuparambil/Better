import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Styles} from '../constants/Styles.js'
import {BaseballModel, BasketballModel} from '../models/game.js'
import { formatDate, getDate , formatTime } from '../Utils.js'
import {
    Box,
    Image,
    NativeBaseProvider,
    Text,
    HStack,
    Stack,
    VStack,
  } from "native-base"


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

    return homestr + ' @ ' + awaystr
}

export function getHeader(game: BaseballModel, type: String) {
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
                        size={"7"}
                        resizeMode='contain'
                    />
                        <VStack>
                            <Text>{formatDate()}</Text>
                            <Text>{formatTime()}</Text>
                        </VStack>
                    <Image
                    source={{
                        uri: `https://cdn.statmuse.com/img/${type}/teams/${type}_` + game.away.replaceAll(' ', '_').toLowerCase() + '_primary.png',
                    }}
                    fallbackSource={{
                        uri: `https://cdn.statmuse.com/img/${type}/teams/${type}_` + game.away.replaceAll(' ', '_').toLowerCase() + '_secondary.png',
                    }}
                    alt="Alternate Text"
                    size={"7"}
                    resizeMode='contain'
                />
                    </HStack>
    )
}
export function BaseballCard(game: BaseballModel) {
    getDate(game.date['seconds']);
    return (
        <NativeBaseProvider>
            <HStack>
                <Box style={Styles.card}>
                {getHeader(game, "mlb")}
                <Text alignSelf='center'>{getMatchup(game.home, game.away)}</Text>
                    <HStack>
                        <VStack>
                            <TouchableOpacity style={Styles.market} onPress={() => console.log(game.away_spread)}>
                                <Text>{game.away_spread}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => console.log(game.away_ml)}>
                                <Text>{game.away_ml}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => console.log(game.over)}>
                                <Text>{game.over}</Text>
                            </TouchableOpacity>
                        </VStack>
                        <VStack>
                            <TouchableOpacity style={Styles.market} onPress={() => console.log(game.home_spread)}>
                                <Text>{game.home_spread}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => console.log(game.home_ml)}>
                                <Text>{game.home_ml}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.market} onPress={() => console.log(game.under)}>
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
