/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import EmailValidator from 'aj-email-validator';
import Snackbar from 'react-native-snackbar';

const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ValidEmail, setValidEmail] = useState('');
  const [ValidPassword, setValidPassword] = useState('');
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
    if (auth().currentUser !== null) {
      if (auth().currentUser.emailVerified) {
        // console.log('going to Home page');
        navigation.replace('DashBoard');
      }
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const valditor = () => {
    let validC = true;
    if (EmailValidator(Email) === true) {
      setValidEmail('');
    } else {
      setValidEmail('Enter a valid email');
      validC = false;
    }
    if(Password.length === 0) {
validC=false;
    }
    if (validC) {
      loginAccount();
    } else {
      Snackbar.show({
        text: 'Invalid Input',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
    }
  };

  const loginAccount = () => {
    Snackbar.show({
      text: 'Loging In',
      duration: 700,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: () => {
          // navigation.replace('Login');
        },
      },
    });

    auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(result => {
        console.log(result);
        if (auth().currentUser.emailVerified) {
          navigation.replace('DashBoard');
          // Snackbar.show({
          //   text: 'Login Success',
          //   duration: Snackbar.LENGTH_SHORT,
          //   action: {
          //     text: 'ok',
          //     textColor: 'green',
          //     onPress: () => {
          //       // setPassword('');
          //     },
          //   },
          // });
        } else {
          Snackbar.show({
            text: 'Email Verification Pending',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Resend',
              textColor: 'green',
              onPress: () => {
                auth()
                  .currentUser.sendEmailVerification()
                  .then(() => {
                    auth().signOut();
                  });
              },
            },
          });
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          Snackbar.show({
            text: 'Wrong password',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Retry',
              textColor: 'green',
              onPress: () => {
                setPassword('');
              },
            },
          });
        } else if (err.code === 'auth/user-not-found') {
          Snackbar.show({
            text: 'No Account Found',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Sign Up',
              textColor: 'green',
              onPress: () => {
                navigation.replace('SignUp');
              },
            },
          });
        } else if (err.code === 'auth/network-request-failed') {
          Snackbar.show({
            text: 'Network Problem',
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
        console.log(err);
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
          width: 80,
          height: 'auto',
          aspectRatio: 2512 / 2048,
          marginTop: '4%',
        }}
      />
      <Text style={styles.Title}>
        Your Daily{' '}
        <Text style={{color: '#2E93EA', fontWeight: '700'}}>Toddler </Text>
      </Text>
      <View style={{alignItems: 'flex-start', width: '90%'}}>
        <Text style={styles.Title}>Welcome Back!</Text>
        <Text style={styles.Entries}>
          Email Address
          <Text style={{color: 'red', alignSelf: 'center', fontSize: 14}}>
            {'  '}
            {ValidEmail}
          </Text>
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholderTextColor={'#c0c0c0'}
          placeholder="Your Email Address"
          inputMode="email"
          keyboardType="email-address"
          value={Email}
          onChangeText={e => {
            setEmail(e);
          }}
        />
        <Text style={styles.Entries}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholderTextColor={'#c0c0c0'}
          placeholder="Your Password"
          value={Password}
          onChangeText={e => {
            setPassword(e);
          }}
        />
        <Text
          style={[
            {
              alignSelf: 'flex-end',
              marginTop: '-3%',
              color: '#8CAAB9',
              fontSize: 16,
            },
          ]}>
          Forget Password?
        </Text>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            valditor();
          }}>
          <Text style={styles.lgnBtn}>Login</Text>
        </TouchableOpacity>
        <Text
          style={[styles.Entries, {alignSelf: 'center', marginBottom: '4.5%'}]}>
          ---- Or Continue with ----
        </Text>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
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
          Don't have a account?{' '}
          <Text
            style={{color: '#2E93EA', fontWeight: '700'}}
            onPress={() => {
              navigation.replace('SignUp');
            }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    margin: '2%',
  },
  Entries: {
    color: '#8CAAB9',
    marginTop: '4%',
    marginBottom: '1%',
    fontSize: 16,
  },
  inputBox: {
    backgroundColor: '#455A64',
    width: '100%',
    marginTop: '1%',
    marginBottom: '4%',
    borderRadius: 2,
    elevation: 4,
    paddingHorizontal: '3%',
  },
  lgnBtn: {
    marginTop: '10%',
    backgroundColor: '#2E93EA',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontWeight: '900',
    fontSize: 18,
    padding: 10,
    marginVertical: '5%',
    borderRadius: 2,
  },
  googleBtn: {
    marginTop: '14%',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 2,
    // marginTop: 15,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    padding: 10,
    marginVertical: '10%',
  },
});
