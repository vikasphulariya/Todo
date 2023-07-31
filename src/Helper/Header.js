import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {Darkcolors} from './colors';
import {useNavigation} from '@react-navigation/native';
import {Lightcolors} from './colors';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const theme = Darkcolors;
const Header = props => {
  const elementRef = useRef(null);
  const [elementDimensions, setElementDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const onLayoutHandler = () => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setElementDimensions({width, height});
        console.log(width, height);
        storeData(height.toString())
      });
    }
  };
  const storeData = async (value) => {
    try { 
      await AsyncStorage.setItem('HeaderHeight', value);
    } catch (e) {
      // saving error
    }
  };
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header} ref={elementRef}
        onLayout={onLayoutHandler}>
        <View>
          <Text style={styles.HdrWel}>Welcome Back</Text>
          <Text style={styles.headerUser}>
            {auth().currentUser.displayName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // auth()
            //   .signOut()
            //   .then(() => {
            navigation.navigate('Profile');
            // });
          }}>
          <Image
            style={styles.UserPic}
            source={require('../Assets/User.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  HdrWel: {
    color: theme.actionColor,
    fontWeight: '700',
  },
  headerUser: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  UserPic: {
    // backgroundColor: '#FED36A',
    width: 'auto',
    height: '100%',
    aspectRatio: 1,
  },
  SearchPic: {
    // backgroundColor: '#FED36A',
    width: 'auto',
    height: '90%',
    aspectRatio: 1,
    backgroundColor: theme.actionColor,
    padding: '5%',
    borderRadius: 4,
    tintColor: '#000',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 0,
    width: '100%',
    height: 80,
    justifyContent: 'space-between',
    backgroundColor: theme.primaryBGColor,
  },
  serachBox: {
    backgroundColor: theme.ElementColor,
    width: '80%',
    height: 'auto',
    borderRadius: 2,
    height: '88%',
    paddingHorizontal: 10,
  },
  searchHeader: {
    height: 80,
    flexDirection: 'row',
    padding: '3%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
});
