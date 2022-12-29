import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Entypo } from '@expo/vector-icons';

import * as SQLite from 'expo-sqlite';


import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function SearchByDate() {
    const db = SQLite.openDatabase('db.visitRecond');

    const getToday = () => {
        const today = new Date();
        return (
            today.getFullYear() + '-' +
            (today.getMonth() + 1) + '-' +
            (today.getDate())
        );
    }

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [jobDate, setJobDate] = useState(getToday());
    const [jobs, setJobs] = useState([]);
    const [selectDateButtonTitle, setSelectDateButtonTitle] = useState('Select Date')

    useEffect(() => {
        setSelectDateButtonTitle(jobDate + '- Click to select')
    }, [jobDate]);

    const retrieveJobs = () => {
        console.log('retrieveJobs() called');
        setJobs([]);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM jobs WHERE jobdate=?',
                [jobDate],
                (txObj, resultSet) => {
                    for (let i = resultSet.rows.length - 1; i >= 0; i--) {
                        let row = resultSet.rows.item(i);
                        console.log(row.jobid, row.jobtype, row.jobdate, row.jobstarttime, row.jobendtime, row.imageuri, row.longitude, row.latitude, row.amount);
                        setJobs((currentJobs) => {
                            return [row, ...currentJobs]
                        })
                    }
                },
                (txObj, error) => {
                    console.log('Error:', error);
                }
            )
        });
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffb3' }}>
            <Text style={styles.titleStyle}>Search by Date</Text>
            <Button
                title={selectDateButtonTitle}
                color='orange'
                style={styles.buttonStyle}
                onPress={() => { setShowDatePicker(true) }}
            />

            {
                showDatePicker && (
                    <RNDateTimePicker
                        value={new Date()}
                        mode='date'
                        onChange={(event, date) => {
                            setShowDatePicker(false
                            );
                            setJobDate(
                                date.getFullYear() + '-' +
                                (date.getMonth() + 1) + '-' +
                                (date.getDate())
                            );
                        }}
                    />
                )
            }
            <View style={{ marginTop: 3, marginBottom: 3 }}></View>

            <Button
                title='Search'
                color='orange'
                style={styles.buttonStyle}
                onPress={() => { retrieveJobs() }}
            />

            <FlatList
                data={jobs}
                keyExtractor={(item) => item.jobid}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.job}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Type: {item.jobtype}</Text>

                            <View style={styles.jobRow}>
                                {/* <TouchableOpacity onPress={() => {
                                }}>
                                    <Entypo name='image-inverted' size={22} />
                                </TouchableOpacity> */}
                                <Image source={{ uri: item.imageuri }} style={styles.miniImage} />


                                <TouchableOpacity onPress={() => { }}>
                                    <Entypo name='location-pin' size={22} />
                                </TouchableOpacity>

                                <Text style={styles.textOutput}>{item.jobdate}</Text>
                                <Text style={styles.textOutput}>{item.jobstarttime} - {item.jobendtime}</Text>
                                <Text style={styles.textOutput}>HK${item.amount}</Text>

                                <TouchableOpacity onPress={() => { }}>
                                    <Entypo name='trash' size={22} color='grey' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { }}>
                                    <Entypo name='edit' size={22} color='grey' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10,
        textAlignVertical: 'center',
        backgroundColor: 'orange'
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    }, 
    job: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'yellow',
        textAlign: 'center',
        alignItems: 'center',
    },
    jobRow: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'yellow',
        textAlign: 'center',
        alignItems: 'flex-start',
    },
    miniImage: {
        width: 50,
        height: 50,
    }
})
