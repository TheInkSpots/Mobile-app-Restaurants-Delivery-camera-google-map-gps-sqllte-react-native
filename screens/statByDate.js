import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';


//expo install react-native-chart-kit
//expo install react-native-svg
let numJobTypes = 0;

const chartData = [
    {
        name: '',
        amount: 0,
        color: '#f00',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: '',
        amount: 0,
        color: '#0f0',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: '',
        amount: 0,
        color: '#00f',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: '',
        amount: 0,
        color: '#ff0',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: '',
        amount: 0,
        color: '#0ff',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
]

export default function StatByDate() {
    const db = SQLite.openDatabase('db.visitRecond');
    const screenWidth = Dimensions.get('window').width;

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
    const [jobTypes, setJobTypes] = useState([]);
    const [selectDateButtonTitle, setSelectDateButtonTitle] = useState('Select Date')

    useEffect(() => {
        setSelectDateButtonTitle(jobDate + '- Click to select')
    }, [jobDate]);

    // useEffect(() => {
    //     retrieveJobTypes();
    // }, [])


    useFocusEffect(
        React.useCallback(() => {
            retrieveJobTypes();
            retrieveJobs();
        }, [])
    )

    // assuming at most five job types
    const retrieveJobTypes = () => {
        //console.log('retrieveJobTypes() called');
        setJobTypes([]);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM jobtypes',
                [],
                (txObj, resultSet) => {
                    for (let i = resultSet.rows.length - 1; i >= 0; i--) {
                        let row = resultSet.rows.item(i);
                        //console.log(row.typeid, row.jobtype, row.description);
                        const jobType = {
                            label: row.jobtype,
                            value: row.jobtype
                        }
                        setJobTypes((currentJobTypes) => {
                            return [jobType, ...currentJobTypes]
                        })
                        chartData[resultSet.rows.length - i - 1].name = row.jobtype;
                    }
                    //console.log('number of job types: ', resultSet.rows.length)
                    //console.log(chartData)
                    numJobTypes = resultSet.rows.length;
                },
                (txObj, error) => {
                    //console.log('Error:', error);
                }
            )
        });
    }

    const retrieveJobs = () => {
        //console.log('retrieveJobs() called');
        //console.log(chartData)

        for (let j = 0; j < chartData.length; j++) {
            chartData[j].amount = 0;
        }

        setJobs([]);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM jobs WHERE jobdate=?',
                [jobDate],
                (txObj, resultSet) => {
                    for (let i = resultSet.rows.length - 1; i >= 0; i--) {
                        let row = resultSet.rows.item(i);
                        //console.log(row.jobid, row.jobtype, row.jobdate, row.jobstarttime, row.jobendtime, row.imageuri, row.longitude, row.latitude, row.amount);
                        setJobs((currentJobs) => {
                            return [row, ...currentJobs]
                        })
                    }
                    //console.log('chart data: ')
                    //console.log(chartData);
                },
                (txObj, error) => {
                    //console.log('Error:', error);
                }
            )
        });

        for (let i=0; i<jobs.length; i++) {
            for (let j=0; j<numJobTypes; j++) {
                // //console.log('row.jobtype:', row.jobtype);
                // //console.log('chartData: ', chartData[j].name)
                if (chartData[j].name === jobs[i].jobtype) {
                    //console.log('matched')
                    chartData[j].amount += jobs[i].amount;
                }
            }
        }
    }

    // const retrieveJobs = () => {
    //     //console.log('retrieveJobs() called');
    //     //console.log(chartData)

    //     for (let j=0; j<chartData.length; j++) {
    //         chartData[j].amount=0;
    //     }

    //     setJobs([]);
    //     db.transaction(tx => {
    //         tx.executeSql('SELECT * FROM jobs WHERE jobdate=?',
    //             [jobDate],
    //             (txObj, resultSet) => {
    //                 for (let i = resultSet.rows.length - 1; i >= 0; i--) {
    //                     let row = resultSet.rows.item(i);
    //                     //console.log(row.jobid, row.jobtype, row.jobdate, row.jobstarttime, row.jobendtime, row.imageuri, row.longitude, row.latitude, row.amount);
    //                     setJobs((currentJobs) => {
    //                         return [row, ...currentJobs]
    //                     })
    //                     for (let j=0; j<numJobTypes; j++) {
    //                         //console.log('row.jobtype:', row.jobtype);
    //                         //console.log('chartData: ', chartData[j].name)
    //                         if (chartData[j].name===resultSet.rows.item(i).jobtype) {
    //                             //console.log('matched')
    //                             chartData[j].amount += resultSet.rows.item(i).amount;
    //                             break;
    //                         }
    //                     }
    //                 }
    //                 //console.log('chart data: ')
    //                 //console.log(chartData);
    //             },
    //             (txObj, error) => {
    //                 //console.log('Error:', error);
    //             }
    //         )
    //     });
    // }

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffb3' }}>
            <Text style={styles.titleStyle}>Statistics by Date</Text>
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

            <PieChart
                data={chartData}
                width={screenWidth}
                height={240}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
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

})
