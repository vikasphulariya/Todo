import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Darkcolors } from './Helper/colors'
import { Lightcolors } from './Helper/colors'
import FastImage from 'react-native-fast-image'
import Home from './Home/home'
const theme = Darkcolors
const DashBoard = () => {
    return (
        <View style={{ flex: 1, backgroundColor: theme.primaryBGColor }}>
            <Home />
            <View style={styles.Footer}>
                <View style={{}}>
                    <Image source={require('./Assets/Todo.png')} style={styles.FooterIcons} />
                    <Text style={styles.FooterText}>Todo's</Text>
                </View>
                <View style={{ backgroundColor: theme.actionColor,borderRadius:4,paddingHorizontal:10 }}>
                    <Image source={require('./Assets/ass.png')} style={[styles.FooterIcons,{tintColor:'black',height:'80%'}]} />
                    {/* <Text style={styles.FooterText}>Todo's</Text> */}
                </View>
                <View style={{}}>
                    <Image source={require('./Assets/History.png')} style={styles.FooterIcons} />
                    <Text style={styles.FooterText}>History</Text>
                </View>
            </View>
        </View>
    )
}

export default DashBoard

const styles = StyleSheet.create({
    Footer: {
        backgroundColor: "#263238",
        position: 'absolute',
        bottom: 0,
        height: 90,
        width: '100%',
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingHorizontal:20,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
    },
    FooterIcons: {
        width: 50,
        height: "auto",
        aspectRatio: 1,
        tintColor: theme.actionColor,
        // backgroundColor:'red'
        alignSelf: 'center'
    },
    FooterText: {
        fontWeight: '500',
        color: theme.actionColor,
        alignSelf: 'center'
    }
})