import { View, Text, StyleSheet, TextInput, Image ,ScrollView} from 'react-native'
import FastImage from 'react-native-fast-image'
import React from 'react'

const SignUp = ({navigation}) => {
    return (
        <View style={{ backgroundColor: "#212832", flex: 1, alignContent: 'center', alignItems: 'center' }}>
            <Image
                source={
                    require('../Assets/Icon.png')
                }
                style={{
                    width: "auto",
                    height: "8%",
                    aspectRatio: (2512 / 2048),
                    marginTop: "4%",

                }} />
            <Text style={styles.Title} >Your Daily <Text style={{ color: "#2E93EA", fontWeight: '700' }}>Toddler </Text></Text>

            <ScrollView style={{width:'100%',marginLeft:"10%"}}>
            <View style={{ alignItems: 'flex-start', width: '90%' }}>
                <Text style={styles.Title}>Create Your Account</Text>
                <Text style={styles.Entries}>Full Name</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholderTextColor={"#c0c0c0"}
                    placeholder='Your Full Name'></TextInput>
                <Text style={styles.Entries}>Email Address</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholderTextColor={"#c0c0c0"}
                    placeholder='Your Email Address'></TextInput>
                <Text style={styles.Entries}>Email Address</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholderTextColor={"#c0c0c0"}
                    placeholder='Your Password'></TextInput>
                {/* <Text style={[{ alignSelf: "flex-end", marginTop: '-3%', color: "#8CAAB9", fontSize: 16 }]}>Forget Password?</Text> */}
                <Text adjustsFontSizeToFit={true} allowFontScaling style={styles.lgnBtn}>Sign Up</Text>
                <Text style={[styles.Entries, { alignSelf: 'center', marginBottom: "4.5%" }]}>---- Or Continue with ----</Text>
                <Text style={styles.googleBtn}>Google</Text>
                <Text style={[styles.Entries, { alignSelf: 'center' }]}>Already have a account? <Text
                onPress={()=>{
                    navigation.replace("Login")
                }} style={{ color: "#2E93EA", fontWeight: '700' }}>Log In</Text></Text>
            </View>
                    </ScrollView>

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    Title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#fff",
        margin:"2%"
    },
    Entries: {
        color: "#8CAAB9",
        marginTop: "2%",
        marginBottom: "1%",
        fontSize: 16
    },
    inputBox: {
        backgroundColor: "#455A64",
        width: "100%",
        marginTop: "1%",
        marginBottom: "3%",
        borderRadius: 2,
        elevation: 4,
        paddingHorizontal: "3%"
    },
    lgnBtn: {
        marginTop: "10%",
        backgroundColor: '#2E93EA',
        width: '100%',
        textAlign: 'center',
        color: 'black',
        fontWeight: "900",
        fontSize: 18,
        padding: 10,
        marginVertical: "5%",
        borderRadius: 2,
    },
    googleBtn: {
        marginTop: "14%",
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 2,
        marginTop: "6%",
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontWeight: "900",
        fontSize: 18,
        padding: 10,
        marginVertical: "8%"
    }
})