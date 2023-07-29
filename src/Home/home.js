import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { Darkcolors } from '../Helper/colors'
import { Lightcolors } from '../Helper/colors'
const theme = Darkcolors
const Home = () => {
  return (
    <View style={{ backgroundColor: theme.primaryBGColor, flex: 1 }}>
      <View style={styles.header}>
        <View>
          <Text  style={styles.HdrWel}>Welcome Back</Text>
          <Text style={styles.headerUser}>Vikas Phulriya</Text>
        </View>
        <Image style={styles.UserPic}
          source={require('../Assets/User.png')}>
        </Image>
      </View>
      <View  style={styles.searchHeader}>
        <TextInput allowFontScaling adjustsFontSizeToFit fontSize={20} placeholder="Search Todo's"
        style={styles.serachBox}
        maxFontSizeMultiplier={1}
        f
        ></TextInput>
        <View style={{padding:5,height:'89%',backgroundColor:theme.actionColor,borderRadius:2,paddingHorizontal:9}}>

        <Image style={styles.SearchPic} source={require("../Assets/Search.png")}></Image>
        </View>
      </View>

      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  HdrWel: {
    color: theme.actionColor,
    fontWeight: "700"
  },
  headerUser: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900"
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
    height: "90%",
    aspectRatio: 1,
    backgroundColor:theme.actionColor,
    padding:'5%',borderRadius:4,
    tintColor:'#000',
  },
  header: {
    flexDirection: 'row',
    padding:10,
    marginHorizontal:3,
    width: "100%",
    height: 80,
    justifyContent: 'space-between',
  },
  serachBox: {
    backgroundColor: theme.ElementColor,
    width:'80%',
    height:'auto',
    borderRadius:2,
    height:'88%',
    paddingHorizontal:10
  },
  searchHeader:{
    height:80,
    flexDirection: 'row',
    padding:'3%',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    
  }
})