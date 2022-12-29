import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
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
        onPress={dropTable}
      >
        Drop Table
      </Button>
    </Background>
  )
}
