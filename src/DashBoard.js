/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Darkcolors} from './Helper/colors';
import {Lightcolors} from './Helper/colors';
import Home from './Home/home';
import Header from './Helper/Header';
import Motivation from './Home/Motivation';
import Trash from './Home/Trash';
import Completed from './Home/completed';
// import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Temp from './Home/temp';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused} from '@react-navigation/native';
const theme = Darkcolors;
const DashBoard = ({navigation}) => {
  // const isFocused = useIsFocused();
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .collection('Tasks')
      .onSnapshot(onResult, onError);

    return () => unsubscribe();
  }, [CompletedTasks, ActiveTasks, TrashTasks]);
  useEffect(() => {}, []);

  const saveToDevice = async dataToBeSaved => {
    try {
      const jsonValue = JSON.stringify(dataToBeSaved);
      await AsyncStorage.setItem('TaskData', jsonValue);
      console.log('Saving Successfully');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  function onResult(querySnapshot) {
    console.log('Got Users collection result.');
    saveToDevice(querySnapshot);
    getData(querySnapshot);
  }

  function onError(error) {
    console.error('ss', error);
  }

  const [CompletedTasks, setCompletedTasks] = useState([]);
  const [TrashTasks, setTrashTasks] = useState([]);
  const [ActiveTasks, setActiveTasks] = useState([]);
  const getData = result => {
    console.log('Home');

    let Active = [];
    let Completedk = [];
    let Trashk = [];
    result.forEach(task => {
      // console.log(task.data().Location)
      if (task.data().Location === 'Active') {
        // console.log(task.data().Title);
        Active.push({id: task.id, Data: task.data()});
        // setActiveTasks([...ActiveTasks, {id: task.id, Data: task.data()}]);
      }
      if (task.data().Location === 'Completed') {
        console.log(task.data().Title);
        Completedk.push({id: task.id, Data: task.data()});
      }
      if (task.data().Location === 'Trash') {
        // console.log(task.data().Title);
        Trashk.push({id: task.id, Data: task.data()});
      }
    });
    console.log('Update Completed', Active);
    setActiveTasks(Active);
    setCompletedTasks(Completedk);
    setTrashTasks(Trashk);
    // console.log('Update Completed');
  };
  const [MenuChosen, setMenuChosen] = useState(1);
  return (
    <View style={{flex: 1, backgroundColor: theme.primaryBGColor}}>
      <Header />
      {MenuChosen === 1 ? <Home data={ActiveTasks} /> : null}
      {MenuChosen === 2 ? <Motivation /> : null}
      {MenuChosen === 3 ? <Trash data={TrashTasks} /> : null}
      {/* {MenuChosen === 5 ? <Temp data={CompletedTasks} /> : null} */}
      {MenuChosen === 4 ? <Completed data={CompletedTasks} /> : null}
      <View style={styles.Footer}>
        <TouchableOpacity onPress={() => setMenuChosen(1)}>
          <View style={{}}>
            <Image
              source={require('./Assets/Todo.png')}
              style={[
                styles.FooterIcons,
                {tintColor: MenuChosen === 1 ? theme.actionColor : '#617D8A'},
              ]}
            />
            <Text
              style={[
                styles.FooterText,
                {color: MenuChosen === 1 ? theme.actionColor : '#617D8A'},
              ]}>
              Todo's
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuChosen(2)}>
          <View style={{}}>
            <Image
              source={require('./Assets/reward.png')}
              style={[
                styles.FooterIcons,
                {tintColor: MenuChosen === 2 ? theme.actionColor : '#617D8A'},
              ]}
            />
            <Text
              style={[
                styles.FooterText,
                {color: MenuChosen === 2 ? theme.actionColor : '#617D8A'},
              ]}>
              Motivation
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>{}}> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('newTask');
            // setMenuChosen(5);
          }}
          style={{borderRadius: 4, paddingHorizontal: -1}}>
          <Image
            source={require('./Assets/ass.png')}
            style={[
              styles.FooterIcons,
              {
                tintColor: 'black',
                height: '70%',
                backgroundColor: theme.actionColor,
                borderRadius: 5,
              },
            ]}
          />
          {/* <Text style={[styles.FooterText,{color:MenuChosen===1?theme.actionColor:"#617D8A"}]}>Todo's</Text> */}
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuChosen(3)}>
          <View style={{}}>
            <Image
              source={require('./Assets/Trash.png')}
              style={[
                styles.FooterIcons,
                {tintColor: MenuChosen === 3 ? theme.actionColor : '#617D8A'},
              ]}
            />
            <Text
              style={[
                styles.FooterText,
                {color: MenuChosen === 3 ? theme.actionColor : '#617D8A'},
              ]}>
              Trash
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuChosen(4)}>
          <View style={{}}>
            <Image
              source={require('./Assets/completed.png')}
              style={[
                styles.FooterIcons,
                {tintColor: MenuChosen === 4 ? theme.actionColor : '#617D8A'},
              ]}
            />
            <Text
              style={[
                styles.FooterText,
                {color: MenuChosen === 4 ? theme.actionColor : '#617D8A'},
              ]}>
              Completed
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  Footer: {
    backgroundColor: '#263238',
    position: 'absolute',
    bottom: 0,
    height: 90,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    elevation: 20,
  },
  FooterIcons: {
    width: 40,
    height: 'auto',
    aspectRatio: 1,
    // backgroundColor:'red'
    alignSelf: 'center',
  },
  FooterText: {
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 10,
  },
});
