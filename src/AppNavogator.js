// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './HomeLogin.js/Login';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer >
      <Stack.Navigator options={{statusBarColor:"red"}} >
        <Stack.Screen  name="Login" component={Login} options={{headerShown:false,statusBarColor:"#212832"}} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default AppNavigator;