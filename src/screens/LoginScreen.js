import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-root-toast';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const db = SQLite.openDatabase('db.visitRecord');
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM user WHERE email=? and password=?',
          [email.value, password.value],
          (txObj, resultSet) => { 
              console.log(' resultSet.rows.length number:' + resultSet.rows.length);
              if (resultSet.rows.length>=1) {
                  console.log('login ok');
                  let row = resultSet.rows.item(0);
                  let name = row.username;
                  let uuid = row.userUUID;
                  console.log('name:' + name, ' email: ' + email.value, ' uid: ' + uuid);
                  console.log('go Home from here - LoginScreen.');
                  navigation.navigate('Home', {email: email.value ,name : name, uuid : uuid})
                  // navigation.reset({
                  //   index: 0,
                  //   routes: [{ name: 'Dashboard', params: {email,name,uuid} }],
                  // })
              } else {
                  console.log('login failed');
                  //Alert.alert('Ooops', 'Invalid username or password');
                  Toast.show('Invalid username or password.', {
                    duration: Toast.durations.LONG,
                  });
                  
              }                
            },
          (txObj, error) => { 
              console.log('Error:', error);
              setLoginOk(false);
          }
      )
  })
    
  }
  const login = () => {
    console.log('login() called')
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="outlined" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.forgot}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'white',
  },
  link: {
    fontWeight: 'bold',
    color: 'white',
  },
})
