/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {Darkcolors} from '../Helper/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const theme = Darkcolors;
const Motivation = () => {
  const [HeaderHeight, setHeaderHeight] = useState(80);
  const getData = async () => {
    try {
      console.log('csf');
      const value = await AsyncStorage.getItem('HeaderHeight');
      if (value !== null) {
        console.log(value);
        setHeaderHeight(parseInt(value));
      } else {
        console.log('aeffa');
      }
    } catch (e) {
      // error reading value
    }
  };
  const isFocused = useIsFocused();
  const [qoute, setQoute] = useState('');
  const [author, setAuthor] = useState('');
  useEffect(() => {
    getData();
    getQoutes();
  }, [isFocused]);
  const getQoutes = async () => {
    const result = await fetch('https://zenquotes.io/api/random/[your_key]');
    let json = await result.json();
    console.log(json[0].q, json[0].a);
    setQoute(json[0]);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: theme.ElementColor,
          padding: 5,
          borderRadius: 7,
          marginTop: -HeaderHeight,
          alignSelf: 'centre',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            textDecorationStyle: 'dotted',
          }}>
          ❝{' '}
          <Text selectable={true}
            style={{
              textAlign: 'justify',
              fontSize: 22,
              fontStyle: 'italic',
              fontWeight:'800',
              
              // textalignLast: 'centre',
            }}>
            {qoute.q}
          </Text>{' '}
          ❞
        </Text>
        <Text style={{textAlign: 'center', color: '#32a0a8'}}>
          By:-{qoute.a}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          getQoutes();
        }}
        style={styles.refreshBtn}>
        <Image
          style={styles.refreshIcon}
          source={require('../Assets/refres.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Motivation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // backgroundColor:
  },
  refreshIcon: {
    height: 50,
    width: 'auto',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  refreshBtn: {
    elevation: 10,
    padding: 1,
    backgroundColor: theme.actionColor,
    width: 52,
    borderRadius: 30,
    position: 'absolute',
    bottom: 120,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
