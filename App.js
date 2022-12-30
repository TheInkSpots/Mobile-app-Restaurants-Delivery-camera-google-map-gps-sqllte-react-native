import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import LoginRealStack from './routes/loginRealStack';
import {TEST_API_KEY} from '@env';

export default function App() {
  //require('dotenv').config();
  console.log('1 google-api-key: ' + process.env.GOOGLE_API_KEY +' , \ntest key : '+ TEST_API_KEY);

  const db = SQLite.openDatabase('db.visitRecord');



  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS visit_record (id INTEGER PRIMARY KEY AUTOINCREMENT, userID TEXT ,cat TEXT, visitdate TEXT, visitStarttime TEXT, visitEndtime TEXT, title TEXT, remark TEXT, dishJSON TEXT, longitude NUMERIC, latitude NUMERIC, amount NUMERIC)',
        [],
        (txObj, resultSet) => {
          console.log('record table created successfully')
        },
        (txObj, error) => {
          console.log('Error:', error)
        }
      )
    }), 
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, userUUID TEXT,  email TEXT,  username TEXT, password TEXT)',
        [],
        (txObj, resultSet) => {
          console.log('table usr created successfully')
        },
        (txObj, error) => {
          console.log('Error:', error)
        }
      )
    })
  }

  useEffect(() => {
    createTable()
  }, [])

  return (

    <NavigationContainer>

      <LoginRealStack></LoginRealStack>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
