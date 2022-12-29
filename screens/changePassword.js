import React from 'react-native';
import { View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

export default function ChangePassword({route, navigation}) {
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const db = SQLite.openDatabase('db.accountDb');
    var username = route.params.username;
    console.log('test333:' +username);
    const change = () => {
        if (newPassword1 != newPassword2) {
            console.log('not equal');
            Alert.alert('Ooops', 'Passwords do not match');
        } else {
            console.log('equal')
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE account SET password=? WHERE username=?',
                    [newPassword1, username], 
                    (txObj, resultSet) => {console.log('record updated:')},
                    (txObj, error) => {console.log('Error:', error)}
                )
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.body}>
                <TextInput
                    style={globalStyles.textInput}
                    editable={false}
                    value={username}>
                </TextInput>
                <TextInput
                    style={globalStyles.textInput}
                    placeholder='Enter new password'
                    value={newPassword1}
                    onChangeText={(value) => setNewPassword1(value)}>
                </TextInput>
                <TextInput
                    style={globalStyles.textInput}
                    placeholder='Re-enter new password'
                    value={newPassword2}
                    onChangeText={(value) => setNewPassword2(value)}>
                </TextInput>
                <View style={globalStyles.buttonView}>
                    <Button
                        title="Submit"
                        color='orange'
                        onPress={change} />
                </View>
                <View style={globalStyles.buttonView}>
                <Button
                    title="Home"
                    color='#1eb900'
                    onPress={() => {navigation.popToTop()}}
                />
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
}