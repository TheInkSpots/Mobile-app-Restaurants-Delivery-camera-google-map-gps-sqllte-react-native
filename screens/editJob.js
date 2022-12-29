import React from 'react';
import { StyleSheet, Button, TextInput, Text, View, ToastAndroid } from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import * as SQLite from 'expo-sqlite';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';

export default function EditJob({ setEditModalOpen, targetJob, retrieveJobs }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const [jobTypes, setJobTypes] = useState([]);
    const [jobType, setJobType] = useState(targetJob.jobtype);
    const [jobStartTime, setJobStartTime] = useState(targetJob.jobstarttime);
    const [jobEndTime, setJobEndTime] = useState(targetJob.jobendtime);
    const [jobDate, setJobDate] = useState(targetJob.jobdate);
    const [amount, setAmount] = useState(targetJob.amount);

    const db = SQLite.openDatabase('db.visitRecond');

    useFocusEffect(
        React.useCallback(() => {
            retrieveJobTypes();
        }, [])
    )

    const retrieveJobTypes = () => {
        console.log('retrieveJobTypes() called');
        setJobTypes([]);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM jobtypes',
                [],
                (txObj, resultSet) => {
                    for (let i = resultSet.rows.length - 1; i >= 0; i--) {
                        let row = resultSet.rows.item(i);
                        console.log(row.typeid, row.jobtype, row.description);
                        const jobType = {
                            label: row.jobtype,
                            value: row.jobtype
                        }
                        setJobTypes((currentJobTypes) => {
                            return [jobType, ...currentJobTypes]
                        })
                    }
                },
                (txObj, error) => {
                    console.log('Error:', error);
                }
            )
        });
    }

    const saveJob = (values) => {
        console.log('Save editted job');
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE jobs SET jobtype=?, jobdate=?, jobstarttime=?, jobendtime=?, amount=? WHERE jobid=?',
                [jobType, jobDate, jobStartTime, jobEndTime, amount, targetJob.jobid],
                (txObj, resultSet) => {
                    console.log('job modified');
                    retrieveJobs();
                    ToastAndroid.showWithGravity(
                        'Job Modified',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                },
                (txObj, error) => {
                    console.log('Error:', error);
                    ToastAndroid.showWithGravity(
                        'Failed to modify job',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                }
            )
        });
        setEditModalOpen(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.formStyle}>
                <View style={styles.dataRow}>
                    <Text style={styles.textBox}>Job Type: </Text>
                    <Text style={styles.textBox}>{jobType}</Text>
                    <DropDownPicker
                        open={dropDownOpen}
                        items={jobTypes}
                        value={jobType}
                        setOpen={setDropDownOpen}
                        setItems={setJobTypes}
                        setValue={setJobType}
                        placeholder='Job Type'
                        textStyle={{ fontSize: 14, padding: 3 }}
                        labelStyle={{ fontWeight: 'bold' }}
                        maxHeight={400}
                        containerStyle={{ width: 220, height: 40 }}
                    />
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.textBox}>Job Date: </Text>
                    <Text style={styles.textBox}>{jobDate}</Text>
                    <Button
                        style={styles.buttonStyle}
                        title='Set Date'
                        onPress={() => { setShowDatePicker(true) }}
                    />
                    {
                        showDatePicker && (
                            <RNDateTimePicker
                                value={new Date()}
                                mode='date'
                                onChange={(event, date) => {
                                    if (event.type != 'dismissed') {
                                        console.log(event.type)
                                        setShowDatePicker(false);
                                        const formattedDate = date.getFullYear() + '-' +
                                            (date.getMonth() + 1) + '-' + date.getDate();
                                        setJobDate(formattedDate);
                                    } else {
                                        setShowDatePicker(false);
                                    }
                                }}
                            />
                        )
                    }
                </View>

                <View style={styles.dataRow}>
                    <Text style={styles.textBox}>Start Time: </Text>
                    <Text style={styles.textBox}>{jobStartTime}</Text>
                    <Button
                        style={styles.buttonStyle}
                        title='Set Start Time'
                        onPress={() => { setShowStartTimePicker(true) }}
                    />
                    {
                        showStartTimePicker && (
                            <RNDateTimePicker
                                value={new Date()}
                                mode='time'
                                onChange={(event, date) => {
                                    if (event.type != 'dismissed') {
                                        console.log(event.type)
                                        setShowStartTimePicker(false);
                                        const formattedTime = date.getHours() + ':' + date.getMinutes();
                                        setJobStartTime(formattedTime);
                                    } else {
                                        setShowStartTimePicker(false);
                                    }
                                }}
                            />
                        )
                    }
                </View>

                <View style={styles.dataRow}>
                    <Text style={styles.textBox}>End Time: </Text>
                    <Text style={styles.textBox}>{jobEndTime}</Text>
                    <Button
                        title='Set End Time'
                        style={styles.buttonStyle}
                        onPress={() => { setShowEndTimePicker(true) }}
                    />
                    {
                        showEndTimePicker && (
                            <RNDateTimePicker
                                value={new Date()}
                                mode='time'
                                onChange={(event, date) => {

                                    if (event.type != 'dismissed') {
                                        console.log(event.type)
                                        setShowEndTimePicker(false);
                                        const formattedTime = date.getHours() + ':' + date.getMinutes();
                                        setJobEndTime(formattedTime);
                                    } else {
                                        setShowEndTimePicker(false);
                                    }
                                }}
                            />
                        )
                    }
                </View>

                <View style={styles.dataRow}>
                    <Text style={styles.textBox}>Amount: </Text>
                    <Text style={styles.textBox}>{amount}</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1000}
                        maximumTrackTintColor='#fff'
                        minimumTrackTintColor='#000'
                        step={1}
                        value={amount}
                        onValueChange={(value) => { setAmount(value) }}
                    />
                </View>

                <Button
                    title='Save'
                    color='blue'
                    onPress={() => { saveJob() }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    formStyle: {
        flexDirection: 'column',
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 5,
        fontSize: 18,
        borderRadius: 6,
        height: 40,
        marginRight: 5,
    },
    dataRow: {
        flexDirection: 'row',
        marginTop: 3,
        marginBottom: 3,
    },
    buttonStyle: {
        height: 30,
        padding: 3,
        color: 'pink', 
    }
})
