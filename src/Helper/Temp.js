import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Temp = () => {
  const [first, setFirst] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .collection('Tasks')
      .onSnapshot(onResult, onError);

    return () => unsubscribe();
  }, []);

  function onResult(querySnapshot) {
    console.log('Got Users collection result.');
    getData(querySnapshot);
  }

  function onError(error) {
    console.error(error);
  }

  const getData = (querySnapshot) => {
    console.log('Got Users collection ');
    let low = [];
    let high = [];
    let meduim = [];
    querySnapshot.forEach((task) => {
      // console.log(task.data().priority)
      if (task.data().priority === 3 && task.data().Location === 'Active') {
        // console.log(task.data().Title);
        low.push({ id: task.id, Data: task.data() });
      }
      if (task.data().priority === 2 && task.data().Location === 'Active') {
        // console.log(task.data().Title);
        meduim.push({ id: task.id, Data: task.data() });
      }
      if (task.data().priority === 1 && task.data().Location === 'Active') {
        // console.log(task.data().Title);
        high.push({ id: task.id, Data: task.data() });
      }
      console.log(task.id);
    });
    // Do something with the categorized data (low, medium, high)
    // setFirst([...low, ...meduim, ...high]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#c0c0c0' }}>
      <Text>Temp</Text>
    </View>
  );
};

export default Temp;
