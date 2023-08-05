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
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
const theme = Darkcolors;
const List = (props, {refresh, temp}) => {
  const navigation = useNavigation();
  let k = 'done';
  const imgae = require(`../Assets/${k}.png`);
  const [imageIcon, setImageIcon] = useState(require(`../Assets/${k}.png`));
  const [dataK, setData] = useState('');
  const [idK, setid] = useState('');

  useEffect(() => {
    if (props.data) {
      // console.log(props.data)
      if (props.from == 'Trash' || props.from == 'Completed') {
        setImageIcon(require(`../Assets/reverse.png`));
      }
      // console.log(props.data.Data);
      const data = props.data.Data;
      const id = props.data.id;
      setData(data);
      setid(id);
    }
  }, [props.data]);
  return (
    <View>
      <View style={styles.ListItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Modify', {
              data: props.data,
            });
          }}
          style={{width: '75%'}}>
          <Text style={styles.textEntry}>{dataK.Title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.complete(idK, dataK.lastLocation);
          }}>
          <Image
            style={{
              height: 34,
              width: 'auto',
              aspectRatio: 1,
              backgroundColor: theme.actionColor,
              borderRadius: 3,
            }}
            source={imageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 3.5,
            backgroundColor: theme.actionColor,
            borderRadius: 3,
          }}
          onPress={() => {
            props.delete(idK);
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
