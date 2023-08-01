/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Darkcolors} from '../Helper/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const theme = Darkcolors;
const Motivation = () => {
  const isFocused = useIsFocused();
  const [qoute, setQoute] = useState({
    q: '',
    a: '',
  });

  const [author, setAuthor] = useState('');
  const [HeaderHeight, setHeaderHeight] = useState(80);

  const getData = async () => {
    try {
      console.log('Get Data Ran');
      const value = await AsyncStorage.getItem('HeaderHeight');
      const qoute = await AsyncStorage.getItem('Qoute');
      if (value !== null) {
        // console.log(value);
        setHeaderHeight(parseInt(value));
      } else {
        console.log('aeffa');
      }
      if (qoute !== null) {
        setQoute(JSON.parse(qoute));
      } else {
        setQoute({
          q: 'The wise accomplish all that they want without arousing the envy or scorn of others.',
          a: 'Ming-Dao Deng',
        });

        getQoutes();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const setData = async value => {
    try {
      // console.log(value);
      const jsonValue = JSON.stringify(value);

      const qoute = await AsyncStorage.setItem('Qoute', jsonValue);
      console.log('Qoute Saved');
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getQoutes = async () => {
    const result = await fetch('https://zenquotes.io/api/random/[your_key]');
    let json = await result.json();
    console.log('Get Qoutes Ran');
    console.log(json[0].q, json[0].a);
    setQoute(json[0]);
    setData(json[0]);
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
          <Text
            selectable={true}
            style={{
              textAlign: 'justify',
              fontSize: 22,
              fontStyle: 'italic',
              fontWeight: '800',

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
