import {StyleSheet} from 'react-native'
import { borderWidth } from 'styled-system';

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
        fontSize: 32,
    },
    h2: {
        fontSize: 24,
    },
    h3: {
        fontSize: 20,
    },
    body: {
        fontSize: 14,
    },
    market: {
        height: 25,
        width: 150,
        borderWidth: 1,
        alignItems: 'center',
      },
    card: {
        margin: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRightWidth: 0
    }
  });