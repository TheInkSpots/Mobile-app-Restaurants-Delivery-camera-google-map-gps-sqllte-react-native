import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import {  Alert } from 'react-native';
import { emailValidator } from '../helpers/emailValidator'
import { CommonActions } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  //   // Remove  all route from the stack after login to home page
  // navigation.dispatch(state => {

  //   const routes = state.routes.filter(r => r.name !== 'LoginScreen' && r.name != 'StartScreen'&& r.name != 'RegisterScreen'&& r.name != 'Dashboard');

  //   return CommonActions.reset({
  //     ...state,
  //     routes,
  //     index: routes.length - 1,
  //   });
  // });
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const db = SQLite.openDatabase('db.accountDb');
  var username = ''; // from 
  //console.log('test333:' +username);
  const change = () => {
      if (newPassword1 != newPassword2) {
          //console.log('not equal');
          Alert.alert('Ooops', 'Passwords do not match');
      } else {
          //console.log('equal')
          db.transaction(tx => {
              tx.executeSql(
                  'UPDATE user SET password=? WHERE username=?',
                  [newPassword1, username], 
                  (txObj, resultSet) => {console.log('record updated:')},
                  (txObj, error) => {console.log('Error:', error)}
              )
          });
      }
  }
  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="outlined"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
