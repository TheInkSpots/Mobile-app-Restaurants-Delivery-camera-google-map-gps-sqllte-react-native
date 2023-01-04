import React from 'react';
import { StyleSheet, Button, TextInput, View, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as SQLite from 'expo-sqlite';



export default function NewJobTypes( {setModalOpen, retrieveJobTypes}) {
    const db = SQLite.openDatabase('db.visitRecond');

    const createJobType = (values) => {
        //console.log('create job type');
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO jobtypes (jobtype, description) VALUES (?, ?)',
                [values.jobtype, values.description], 
                (txObj, resultSet) => {
                    //console.log('new job type created', resultSet.insertId);
                    retrieveJobTypes();
                    ToastAndroid.showWithGravity(
                        'New job type created', 
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                }, 
                (txObj, error) => {
                    //console.log('Error:', error);
                    ToastAndroid.showWithGravity(
                        'Failed to create new job type', 
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                }
            )
        });
        setModalOpen(false);
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ jobtype: '', description: '' }}
                onSubmit={(values) => {
                    //console.log(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Type name'
                            onChangeText={props.handleChange('jobtype')}
                            value={props.values.jobtype}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Description'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                        />
                        <Button
                            title='Create'
                            color='maroon'
                            onPress={() => {createJobType(props.values)}} />
                    </View>
                )}
            </Formik>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    }
})
