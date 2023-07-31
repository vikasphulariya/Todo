/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Darkcolors} from './colors';
import Snackbar from 'react-native-snackbar';
import {Lightcolors} from './colors';
const theme = Darkcolors;
const ProfileList = props => {
  return (
    <View>
      <View style={styles.ListItem}>
        <Text style={styles.textEntry}>{props.data}</Text>
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: 'coming soon',
              duration: 700,
              action: {
                text: 'OK',
                textColor: 'green',
                onPress: () => {
                  // navigation.replace('Login');
                },
              },
            });
          }}>
          <Image
            style={{
              height: 35,
              width: 'auto',
              aspectRatio: 1,
              // backgroundColor: theme.actionColor,
              tintColor: '#8CAAB9',
              // margin: -10,
            }}
            source={require('../Assets/edit.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileList;
const styles = StyleSheet.create({
  textEntry: {
    fontSize: 16,
    paddingHorizontal: 5,
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
    justifyContent: 'space-around',
  },
});
