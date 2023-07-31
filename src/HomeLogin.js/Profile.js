import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Darkcolors} from '../Helper/colors';
import ProfileList from '../Helper/profileList';
import auth from '@react-native-firebase/auth';

const theme = Darkcolors;
const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.Title, {position: 'absolute'}]}>Profile</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../Assets/back.png')}
            style={{
              height: 25,
              width: 'auto',
              aspectRatio: 731 / 512,
              marginLeft: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={require('../Assets/User.png')}
        />
      </View>
      <View style={styles.details}>
        <ProfileList data={auth().currentUser.displayName} />
        <ProfileList data={auth().currentUser.email} />

        <ProfileList data={'Password'} />
      </View>
      <TouchableOpacity
        style={styles.lgtBtn}
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              navigation.reset({index: 0, routes: [{name: 'Login'}]});
            });
        }}>
        <Text style={[styles.Title, {color: '#000'}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryBGColor,
  },
  Title: {
    fontSize: 24,
    alignSelf: 'center',
    textAlign: 'center',
    // fontFamily:'Times',
    fontWeight: '800',
    color: '#fff',
    // position: 'absolute',
    width: '100%',
    // backgroundColor:'green'
  },
  header: {
    marginTop: 30,
    marginVertical: 20,
    // paddingLeft: 20,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  profilePicContainer: {
    // aspectRatio:1,
    // height:110,
    // width:'auto',
    // backgroundColor:'red',
    borderWidth: 2,
    borderColor: theme.actionColor,
    borderRadius: 99,
    alignSelf: 'center',
    padding: -5,
    marginVertical: 20,
  },
  profilePic: {
    aspectRatio: 1,
    height: 120,
    width: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: -10,
    margin: -10,
  },
  details: {
    padding: 10,
  },
  lgtBtn: {
    backgroundColor: theme.actionColor,
    margin: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    width: '90%',
    right: 10,
  },
});
