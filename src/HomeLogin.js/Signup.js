/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import EmailValidator from 'aj-email-validator';
import Snackbar from 'react-native-snackbar';
import Loader from '../Helper/Loader';

const SignUp = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Validname, setValidName] = useState('');
  const [ValidEmail, setValidEmail] = useState('');
  const [ValidPassword, setValidPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log('Auth running');
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    console.log('useEffect running');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const valditor = () => {
    let validC = true;
    setValid(true);
    if (name.length <= 2) {
      setValidName('Enter Full Name');
      validC = false;
    } else {
      setValidName('');
    }
    if (EmailValidator(Email) === true) {
      setValidEmail('');
    } else {
      setValidEmail('Enter a valid email');
      validC = false;
    }
    if (Password.length <= 5) {
      setValidPassword('Password must be at least 6 characters');
      validC = false;
    } else {
      setValidPassword('');
    }
    if (validC) {
      createAccount();
    }
  };

  const createAccount = async () => {
    // setModalVisible(true);
    Snackbar.show({
      text: 'Creating Account',
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'Ok',
        textColor: 'green',
        onPress: () => {
          // navigation.replace('Login');
        },
      },
    });
    await auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(() => {
        auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log('profile updated');
            // console.log("");
            // setModalVisible(false);
            Snackbar.show({
              text: 'Verification Mail Sent',
              duration: Snackbar.LENGTH_SHORT,
              action: {
                text: 'Login',
                textColor: 'green',
                onPress: () => {
                  navigation.replace('Login');
                },
              },
            });
            auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                console.log('mail sent Succes');
               
                auth()
                  .signOut()
                  .then(() => {
                    console.log('m');
                    
                  });
              });
          });
      })
      .catch(error => {
        // console.log(auth().currentUser);
        setModalVisible(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Snackbar.show({
            text: 'Account already in use',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'OK',
              textColor: 'green',
              onPress: () => {
                setEmail('');
              },
            },
          });
        } else if (error.code === 'auth/network-request-failed') {
          console.error(error);
          Snackbar.show({
            text: 'No Network',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Retry',
              textColor: 'green',
              onPress: () => {
                valditor();
              },
            },
          });
        } else {
          console.error(error);
          Snackbar.show({
            text: 'Something went wrong',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Retry',
              textColor: 'green',
              onPress: () => {
                valditor();
              },
            },
          });
        }
      });
  };

  return (
    <View
      style={{
        backgroundColor: '#212832',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../Assets/Icon.png')}
        style={{
          width: 'auto',
          height: '8%',
          aspectRatio: 2512 / 2048,
          marginTop: '4%',
        }}
      />
      <Text style={styles.Title}>
        Your Daily{' '}
        <Text
          onPress={() => setModalVisible(true)}
          style={{color: '#2E93EA', fontWeight: '700'}}>
          Toddler{' '}
        </Text>
      </Text>

      <ScrollView style={{width: '100%', marginLeft: '10%'}}>
        <View style={{alignItems: 'flex-start', width: '90%'}}>
          <Text style={styles.Title}>Create Your Account</Text>
          <Text style={styles.Entries}>
            Full Name
            <Text style={{color: 'red', alignSelf: 'center', fontSize: 14}}>
              {' '}
              {Validname}
            </Text>
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholderTextColor={'#c0c0c0'}
            placeholder="Your Full Name"
            value={name}
            onChangeText={e => {
              setName(e);
            }}
          />
          <Text style={styles.Entries}>
            Email Address
            <Text style={{color: 'red', alignSelf: 'center', fontSize: 14}}>
              {'  '}
              {ValidEmail}
            </Text>
          </Text>
          <TextInput
            inputMode="email"
            style={styles.inputBox}
            placeholderTextColor={'#c0c0c0'}
            placeholder="Your Email Address"
            value={Email}
            onChangeText={e => {
              setEmail(e);
            }}
          />
          <Text style={styles.Entries}>Password</Text>
          {ValidPassword.length > 2 ? (
            <Text style={{color: 'red', marginTop: -5}}> {ValidPassword}</Text>
          ) : null}
          <TextInput
            style={styles.inputBox}
            placeholderTextColor={'#c0c0c0'}
            placeholder="Your Password"
            value={Password}
            onChangeText={e => {
              setPassword(e);
            }}
          />
          {/* <Text style={[{ alignSelf: "flex-end", marginTop: '-3%', color: "#8CAAB9", fontSize: 16 }]}>Forget Password?</Text> */}
          <TouchableOpacity
            style={styles.lgnBtn}
            onPress={() => {
              valditor();
            }}>
            <Text
              adjustsFontSizeToFit={true}
              allowFontScaling
              style={[styles.btnText, {color: '#000'}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.Entries,
              {alignSelf: 'center', marginBottom: '4.5%'},
            ]}>
            ---- Or Continue with ----
          </Text>
          <TouchableOpacity style={{width:'100%'}} onPress={()=>{
            Snackbar.show({
              text: 'Coming Soon',
              duration: Snackbar.LENGTH_SHORT,
              action: {
                text: 'OK',
                textColor: 'green',
                onPress: () => {
                  // navigation.replace('Login');
                },
              },
            });
          }}>

          <Text style={styles.googleBtn}>Google</Text>
          </TouchableOpacity>
          <Text style={[styles.Entries, {alignSelf: 'center'}]}>
            Already have a account?{' '}
            <Text
              onPress={() => {
                navigation.replace('Login');
              }}
              style={{color: '#2E93EA', fontWeight: '700', marginBottom: 10}}>
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>
      <Loader
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textData={'Creating Account...'}
        animation={'signUp'}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  Title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    margin: '2%',
  },
  Entries: {
    color: '#8CAAB9',
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 16,
  },
  inputBox: {
    backgroundColor: '#455A64',
    width: '100%',
    marginTop: '1%',
    marginBottom: '3%',
    borderRadius: 2,
    elevation: 4,
    paddingHorizontal: '3%',
  },
  lgnBtn: {
    // marginTop: '10%',
    backgroundColor: '#2E93EA',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontWeight: '900',
    fontSize: 18,
    // padding: 2,
    marginVertical: '5%',
    borderRadius: 2,
    elevation: 4,
  },
  googleBtn: {
    marginTop: '10%',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 2,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    padding: 10,
    marginVertical: '8%',
  },
  btnText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
});
