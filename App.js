import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import LoginRealStack from './routes/loginRealStack';
import {TEST_API_KEY} from '@env';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  //require('dotenv').config();
  console.log('1 google-api-key: ' + process.env.GOOGLE_API_KEY +' , \ntest key : '+ TEST_API_KEY);

  const db = SQLite.openDatabase('db.visitRecord');

  // const loadFont = async () => {
  //   try {
  //     await Font.loadAsync(
  //        {
  //         'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  //         'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf'),
  //         'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
  //       }
  //     )
  //   }
  //   catch (e) {
  //     console.warn(e);
  //   }
  //   finally {
  //   setFontIsLoaded (true);
  //   }
  // };


  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS visit_record (id INTEGER PRIMARY KEY AUTOINCREMENT, userID TEXT ,cat TEXT, visitdate TEXT, visitStarttime TEXT, visitEndtime TEXT, title TEXT, restName TEXT, remark TEXT, dishJSON TEXT, RestPhoto TEXT, longitude NUMERIC, latitude NUMERIC, amount NUMERIC)',
        [],
        (txObj, resultSet) => {
          console.log('record table created successfully')
        },
        (txObj, error) => {
          console.log('Error:', error)
        }
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, userUUID TEXT,  email TEXT,  username TEXT, password TEXT)',
        [],
        (txObj, resultSet) => {
          console.log('table usr created successfully');
        },
        (txObj, error) => {
          console.log('Error:', error)
        }
      );
      tx.executeSql(
        `SELECT * FROM user where userUUID = 'LocalUserUUID'`,
        [],
        (txObj, resultSet) => {
         if (resultSet.rows.length == 0) {
          tx.executeSql(
            'INSERT INTO user (userUUID, username, email, password) VALUES (?, ?, ?, ?)', 
            ['LocalUserUUID', 'LocalUserName', 'LocalUser@local.com', 'LocalUserPw'], 
            (txObj, resultSet) => {
                 console.log('local user record inserted:', resultSet.insertId);
            },
            (txObj, error) => {
                 console.log('Error:', error)
            }
          );
         }
        },
        (txObj, error) => {
          console.log('Error:', error)
        }
      );   

      

    })
    
      
  
  }

  useEffect(() => {
    createTable();
    // loadFont();
  }, [])

  return (
    <RootSiblingParent> 
    <NavigationContainer>

      <LoginRealStack></LoginRealStack>
    </NavigationContainer>
    </RootSiblingParent> 

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
