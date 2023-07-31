/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Darkcolors} from './colors';
import {Lightcolors} from './colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
const theme = Darkcolors;
const List = (props, {refresh, temp}) => {
  const [dataK, setData] = useState('');
  const [idK, setid] = useState('');

  useEffect(() => {
    if (props.data) {
      console.log(props.data.Data);
      const data = props.data.Data;
      const id = props.data.id;
      setData(data);
      setid(id);
    }
  }, []);
  return (
    <View>
      <View style={styles.ListItem}>
        <Text style={styles.textEntry}>{dataK.Title}</Text>
        <TouchableOpacity
          onPress={() => {
            props.temp();
          }}>
          <Image
            style={{
              height: 34,
              width: 'auto',
              aspectRatio: 1,
              backgroundColor: theme.actionColor,
              borderRadius: 3,
            }}
            source={require('../Assets/done.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 3.5,
            backgroundColor: theme.actionColor,
            borderRadius: 3,
          }}
          onPress={() => {
            firestore()
              .collection('Users')
              .doc(auth().currentUser.email)
              .collection('Tasks')
              .doc(idK)
              .delete()
              .then(() => {
                props.refresh();
                console.log('User deleted!');
                Snackbar.show({
                  text: 'Todo deleted',
                  duration: 500,
                  action: {
                    text: 'OK',
                    textColor: 'green',
                    onPress: () => {
                      // navigation.replace('Login');
                    },
                  },
                });
              });
          }}>
          <Image
            style={{
              height: 28,
              width: 'auto',
              aspectRatio: 1,
              backgroundColor: theme.actionColor,
              borderRadius: 3,
            }}
            source={require('../Assets/Trash.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default List;
const styles = StyleSheet.create({
  textEntry: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '500',
    width: '70%',
    maxWidth: '70%',
  },
  ListItem: {
    backgroundColor: theme.ElementColor,
    margin: 2.5,
    marginVertical: 4,
    borderRadius: 3,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
