/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Appearance,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Darkcolors} from '../Helper/colors';
import Snackbar from 'react-native-snackbar';
import {useRoute} from '@react-navigation/native';
const theme = Darkcolors;
const ModifyTask = ({navigation}) => {
  const route = useRoute();
  const [title, setTitle] = useState('');
  const [Discription, setDiscription] = useState('');
  const [Time, setTime] = useState();
  useEffect(() => {
    console.log(route.params);
    setTitle(route.params.data.Data.Title);
    setDiscription(route.params.data.Data.Discription);
    setPrioritySelected(route.params.data.Data.priority);
    setTime(route.params.data.Data.time);
  }, [route.params, title]);
  const valditor = () => {
    console.log(Time);
    let valid = true;
    if (title.length < 4) {
      valid = false;
    }
    if (Time <= 0 || Time === undefined) {
      valid = false;
    }
    if (prioritySelected === 0) {
      valid = false;
    }
    if (valid) {
      console.log('validinputs');
      uploadTask();
    } else {
      Snackbar.show({
        text: 'Invalid Input',
        duration: 800,
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
  useEffect(() => {});
  const uploadTask = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .collection('Tasks')
      .add({
        Title: title,
        time: Time,
        Location: 'Active',
        priority: prioritySelected,
        Discription: Discription,
      })
      .then(() => {
        console.log('Task added!');
        setTime(0);
        setTitle('');
        setDiscription('');
        setPrioritySelected(0);
        Snackbar.show({
          text: 'Task added Successfully',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'OK',
            textColor: 'green',
            onPress: () => {
              // navigation.replace('Login');
            },
          },
        });
      });
  };

  const [prioritySelected, setPrioritySelected] = useState(0);
  // useEffect(() => {
  //   // const colorTheme = Appearance.getColorScheme();
  //   // console.log(colorTheme);
  // });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.Title, {position: 'absolute'}]}>Modify Task</Text>
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
      <ScrollView style={{height: '100%'}}>
        <View style={styles.DetailContainer}>
          <Text style={styles.text}>Task Title*</Text>
          <TextInput
            placeholder="E.g:- Study DSA Trees"
            style={styles.textInput}
            value={title}
            onChangeText={e => {
              // setTitle(e);
            }}
          />
          <Text style={styles.text}>Task Discription</Text>
          <TextInput
            multiline
            numberOfLines={4.5}
            textAlignVertical="top"
            placeholder={
              'E.g:- My task is to thoroughly study Data Structures and Algorithms (DSA) Trees. I will delve into various types of trees, such as binary trees, AVL trees, Red-Black trees, and more.'
            }
            style={styles.textInput}
            value={Discription}
            onChangeText={e => {
              setDiscription(e);
            }}
          />
          <Text style={styles.text}>Time Required*{'(In Mins)'}</Text>
          <TextInput
            placeholder="E.g:- 25"
            inputMode="numeric"
            style={styles.textInput}
            value={Time}
            onChangeText={e => {
              setTime(e);
            }}
          />
          <Text style={styles.text}>Priority*</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setPrioritySelected(1);
              }}
              style={[
                styles.priority,
                {
                  backgroundColor:
                    prioritySelected === 1 ? '#E74C3C' : theme.ElementColor,
                  elevation: prioritySelected === 1 ? 10 : 1,
                },
              ]}>
              <Text
                style={[
                  styles.priorityTxt,
                  {
                    fontWeight: prioritySelected === 1 ? '800' : '500',
                    color: prioritySelected === 1 ? 'black' : '#8CAAB9',
                  },
                ]}>
                High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPrioritySelected(2);
              }}
              style={[
                styles.priority,
                {
                  backgroundColor:
                    prioritySelected === 2 ? 'orange' : theme.ElementColor,
                  elevation: prioritySelected === 2 ? 10 : 1,
                },
              ]}>
              <Text
                style={[
                  styles.priorityTxt,
                  {
                    fontWeight: prioritySelected === 2 ? '800' : '500',
                    color: prioritySelected === 2 ? 'black' : '#8CAAB9',
                  },
                ]}>
                Meduim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPrioritySelected(3);
              }}
              style={[
                styles.priority,
                {
                  backgroundColor:
                    prioritySelected === 3 ? '#2ECC71' : theme.ElementColor,
                  elevation: prioritySelected === 3 ? 10 : 1,
                },
              ]}>
              <Text
                style={[
                  styles.priorityTxt,
                  {
                    fontWeight: prioritySelected === 3 ? '800' : '500',
                    color: prioritySelected === 3 ? 'black' : '#8CAAB9',
                  },
                ]}>
                Low
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.lgtBtn}
          onPress={() => {
            // valditor();
            // Snackbar.show({
            //   text: 'Coming Soon',
            //   duration: 1000,
            //   action: {
            //     text: 'OK',
            //     textColor: 'green',
            //     onPress: () => {
            //       // navigation.replace('Login');
            //     },
            //   },
            // });
          }}>
          <Text style={[styles.Title, {color: '#000'}]}>Modify Task</Text>
        </TouchableOpacity>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </View>
  );
};

export default ModifyTask;

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
    marginVertical: 30,
    // paddingLeft: 20,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  DetailContainer: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: theme.ElementColor,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 25,
    // paddingHorizontal: 10,
  },
  priority: {
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 20,
    elevation: 1,
    marginBottom: 40,
  },
  priorityTxt: {
    fontSize: 18,
  },
  lgtBtn: {
    backgroundColor: theme.actionColor,
    // margin: 10,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 4,
    marginVertical: 20,
  },
});
