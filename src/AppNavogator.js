// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './HomeLogin.js/Login';
import SignUp from './HomeLogin.js/Signup';
import Home from './Home/home';
import DashBoard from './DashBoard';
import Header from './Helper/Header';
import Profile from './HomeLogin.js/Profile';
import NewTask from './Helper/newTask';
import Temp from './Helper/Temp';
// import Home from './Home/home';
import ModifyTask from './Helper/ModifyTask';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator options={{statusBarColor: 'red'}}>
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, statusBarColor: '#212832'}}
        /> */}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
        <Stack.Screen
          name="newTask"
          component={NewTask}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
        <Stack.Screen
          name="Modify"
          component={ModifyTask}
          options={{headerShown: false, statusBarColor: '#212832'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
