import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/AppNavogator'
const App = () => {
  return (
    <View style={{backgroundColor:"#212832",flex:1}}>
      <AppNavigator />
    </View>
  )
}

export default App