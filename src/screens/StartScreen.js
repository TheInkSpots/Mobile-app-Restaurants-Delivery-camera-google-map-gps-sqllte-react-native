import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import {Button as Button1 }from 'react-native'
import Paragraph from '../components/Paragraph'
import * as SQLite from 'expo-sqlite';
export default function StartScreen({ navigation }) {
  const db = SQLite.openDatabase('db.visitRecord');

  const dropTable = () => {

      db.transaction(tx => {
          tx.executeSql('DROP TABLE user; ',
              [],
              (txObj, resultSet) => { 
                  console.log('Dropped tables.1' );
             },
              (txObj, error) => { 
                  console.log('Error:', error);
              
              }
          )
      })

      db.transaction(tx => {
        tx.executeSql('DROP TABLE visit_record;',
            [],
            (txObj, resultSet) => { 
                console.log('Dropped tables.2' );
           },
            (txObj, error) => { 
                console.log('Error:', error);
            
            }
        )
    })
  }

  const dummyData = () => {
    db.transaction(tx => {
      tx.executeSql('insert INTO visit_record (id,  userID, visitdate, dishJSON) VALUES (?, ?,?,?)',
          [998,`LocalUserUUID','31/12/2022','[{price:'30'},{price:'30'},{price:30}]`],
          (txObj, resultSet) => { 
              console.log('insert dummry data good ' );
         },
          (txObj, error) => { 
              console.log('Error:', error);
          
          }
      )
  })
  }

  return (
    <Background>
      <Logo />
      <Header>F&B review manager</Header>
      <Paragraph>
      
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Home',{ uuid : 'LocalUserUUID'})}
      >
        Local Use
      </Button>
      <Button1
         title={'Dev: INSERT dummy Data'}
        onPress={dummyData}
      >
        Dev: INSERT hardcode Data
      </Button1>
      <Button1
        title={'Dev: DropTable'}
        onPress={dropTable}
      >
        Dev: DropTable
      </Button1>
    </Background>
  )
}
