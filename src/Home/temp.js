/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Darkcolors} from '../Helper/colors';
import {Lightcolors} from '../Helper/colors';
import List from '../Helper/listItem';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
const theme = Darkcolors;
const Temp = props => {
  const [, forceUpdate] = useState();

  const markTrash = id => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .collection('Tasks')
      .doc(id)
      .update({
        Location: 'Trash',
        lastLocation: 'Active',
      })
      .then(() => {
        // getData();    
        console.log('Task Deleted');
        Snackbar.show({
          text: 'Moved To Trash',
          duration: 500,
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
  const markComplete = (id, lastLocation) => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .collection('Tasks')
      .doc(id)
      .update({
        Location: 'Completed',
        lastLocation: 'Active',
      })
      .then(() => {
        console.log('Task Deleted');
        Snackbar.show({
          text: 'Moved To Completed',
          duration: 500,
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

  const [meduimTasks, setMeduimTasks] = useState([]);
  const [highTasks, setHighTasks] = useState([]);
  const [lowTasks, setLowTasks] = useState([]);

  useEffect(() => {
    console.log(props.data);
    setLowTasks(props.data);
  }, [props.data]);
  return (
    <View style={{backgroundColor: theme.primaryBGColor, flex: 1}}>
      <View style={styles.searchHeader}>
        <TextInput
          allowFontScaling
          adjustsFontSizeToFit
          fontSize={20}
          placeholder="Search Todo's"
          style={styles.serachBox}
          maxFontSizeMultiplier={1}
        />
        <View
          style={{
            padding: 5,
            height: '89%',
            backgroundColor: theme.actionColor,
            borderRadius: 2,
            paddingHorizontal: 9,
          }}>
          <Image
            style={styles.SearchPic}
            source={require('../Assets/Search.png')}
          />
        </View>
      </View>
      <Text>bbb</Text>
      {highTasks.length === 0 ? null : (
        <View style={[styles.TaskItems, {borderColor: 'red'}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontWeight: '700', fontSize: 17}}>High Priority</Text>
            <Text style={{fontWeight: '700', fontSize: 17}}>Time:</Text>
          </View>
          <FlatList
            scrollEnabled
            data={highTasks}
            renderItem={task => {
              return (
                <List
                  data={task.item}
                  delete={markTrash}
                  complete={markComplete}
                />
              );
            }}
          />
        </View>
      )}
      {lowTasks.length === 0 ? null : (
        <View style={[styles.TaskItems, {borderColor: 'orange'}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              onPress={() => {
                forceUpdate();
                console.log('dger');
              }}
              style={{fontWeight: '700', fontSize: 17}}>
              Meduim Priority
            </Text>
            <Text style={{fontWeight: '700', fontSize: 17}}>Time:</Text>
          </View>
          <FlatList
            scrollEnabled
            data={lowTasks}
            renderItem={task => {
              // console.log(task.item.Data.Title);
              return (
                <View>
                  {/* <Text>{task.item.Data.Title}</Text> */}

                  <List
                    data={task.item}
                    delete={markTrash}
                    complete={markComplete}
                  />
                </View>
              );
            }}
          />
        </View>
      )}
      {lowTasks.length === 0 ? null : (
        <View style={[styles.TaskItems, {borderColor: 'green'}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontWeight: '700', fontSize: 17}}>Low Priority</Text>
            <Text style={{fontWeight: '700', fontSize: 17}}>Time:</Text>
          </View>

          <FlatList
            scrollEnabled
            data={lowTasks}
            renderItem={task => {
              return (
                <View>
                  {task.item.Data.Location == 'Active' ? (
                    <List
                      data={task.item}
                      delete={markTrash}
                      complete={markComplete}
                    />
                  ) : null}
                </View>
              );
            }}
          />
        </View>
      )}
      {/* <Text
        onPress={() => {
          console.log(highTasks);
        }}>
        Temp
      </Text> */}
    </View>
  );
};

export default Temp;

const styles = StyleSheet.create({
  HdrWel: {
    color: theme.actionColor,
    fontWeight: '700',
  },
  headerUser: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
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
    height: '90%',
    aspectRatio: 1,
    backgroundColor: theme.actionColor,
    padding: '5%',
    borderRadius: 4,
    tintColor: '#000',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 3,
    width: '100%',
    height: 80,
    justifyContent: 'space-between',
  },
  serachBox: {
    backgroundColor: theme.ElementColor,
    width: '80%',
    // height: 'auto',
    borderRadius: 2,
    height: '88%',
    paddingHorizontal: 10,
  },
  searchHeader: {
    height: 80,
    flexDirection: 'row',
    padding: '3%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  TaskItems: {
    borderWidth: 2,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
});