import { StyleSheet, View, Modal, Text, FlatList, ToastAndroid, TouchableOpacity, Button, Image, Dimensions, PermissionsAndroid } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { globalStyles } from '../styles/globalStyles';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import EditJob from './editJob';
//import GOOGLE_API_KEY from '@env'


// expo install react-native-dropdown-picker
// expo install @react-native-community/datetimepicker
// expo install @react-native-community/slider
// expo install expo-location

export default function TodaysJobs() {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const [jobTypes, setJobTypes] = useState([]);
    const [jobType, setJobType] = useState(null);
    const [jobStartTime, setJobStartTime] = useState(new Date());
    const [jobEndTime, setJobEndTime] = useState(new Date());
    const [jobDate, setJobDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [targetJob, setTargetJob] = useState(null);

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null);
    const [cameraModalOpen, setCameraModalOpen] = useState(false);
    const [showPictureModalOpen, setShowPictureModalOpen] = useState(false);

    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [locationModalOpen, setLocationModalOpen] = useState(false);
    const [jobPositionModalOpen, setJobPositionModalOpen] = useState(false);

    const db = SQLite.openDatabase('db.visitRecond');

    useEffect(() => {
        (async () => {
            getCameraPermission();
            getLocationPermission();
            retrieveJobs();
        })();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            retrieveJobTypes();
        }, [])
    )

    const { width, height } = Dimensions.get("window");

    const positionMapRef = useRef(null);
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    const [jobPosition, setJobPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    // const getLocationPermission = async () => {
    //     console.log('getLocationPermission');
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status === 'granted') {
    //         console.log('Location permissions granted');
    //         setHasLocationPermission(true);
    //         // getLocation();
    //         console.log('attempt to get location')
    //         const location = await Location.getCurrentPositionAsync({});
    //         console.log(location);
    //         setPosition({
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude,
    //             latitudeDelta: LATITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA,
    //         })

    //     } else {
    //         console.log('location permissions not granted');
    //         setHasLocationPermission(false);
    //     }
    // }

    // const getLocation = async () => {
    //     const location = await Location.getCurrentPositionAsync({});
    //     console.log(location);
    //     setPosition({
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //     })
    // }

    // const getCameraPermission = async () => {
    //     console.log('getCameraPermission');
    //     MediaLibrary.requestPermissionsAsync();
    //     const cameraStatus = await Camera.requestCameraPermissionsAsync();
    //     setHasCameraPermission(cameraStatus.status === 'granted')
    // }

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

    const retrieveJobs = () => {
        console.log('retrieveJobs() called');
        setJobs([]);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM jobs',
                [],
                (txObj, resultSet) => {
                    for (let i = resultSet.rows.length - 1; i >= 0; i--) {
                        let row = resultSet.rows.item(i);
                        console.log(row.jobid, row.jobtype, row.jobdate, row.jobstarttime, row.jobendtime, row.imageuri, row.longitude, row.latitude, row.amount);
                        setJobs((currentJobs) => {
                            return [row, ...currentJobs]
                        })
                        setTotalAmount((amount) => {
                            return amount+row.amount;
                        })
                    }
                    console.log(totalAmount)
                },
                (txObj, error) => {
                    console.log('Error:', error);
                }
            )
        });
    }

    const createJob = () => {
        const jDate = jobDate.getFullYear() + '-' + (jobDate.getMonth() + 1) + '-' + jobDate.getDate();
        const jStartTime = jobStartTime.getHours() + ':' + jobStartTime.getMinutes();
        const jEndTime = jobEndTime.getHours() + ':' + jobEndTime.getMinutes();

        console.log('createJob:', jobType, jDate, jStartTime, jEndTime, amount);
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO jobs (jobtype, jobdate, jobstarttime, jobendtime, imageuri, longitude, latitude, amount) VALUES (?,?, ?, ?, ?, ?, ?, ?)',
                [jobType, jDate, jStartTime, jEndTime, image, position.longitude, position.latitude, parseFloat(amount)],
                (txObj, resultSet) => {
                    console.log('new job created', resultSet.insertId);
                    setImage(null);
                    retrieveJobs();
                    ToastAndroid.showWithGravity(
                        'New job created',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                },
                (txObj, error) => {
                    console.log('Error:', error);
                    ToastAndroid.showWithGravity(
                        'Failed to create new job',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                }
            )
        });
    }

    const deleteJob = (jobid) => {
        console.log('deleteJob:', jobid);
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM jobs WHERE jobid=?',
                [jobid],
                (txObj, resultSet) => {
                    retrieveJobs();
                    ToastAndroid.showWithGravity(
                        'Record deleted',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    )
                },
                (txObj, error) => {
                    console.log('Error:', error);
                }
            )
        })
    }

    const takePicture = async () => {
        console.log('take picture');
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            }
            catch (e) {
                console.log(e);
            }
        }

    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Picture saved');
                setCameraModalOpen(false);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const moveTo = async (newPosition) => {
        const camera = await positionMapRef.current.getCamera()
        if (camera) {
            console.log('new position', newPosition)
            camera.center = newPosition;
            positionMapRef.current.animateCamera(camera, { duration: 1000 })
            setPosition({
                latitude: newPosition.latitude,
                longitude: newPosition.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }
    }


    return (
        <View style={globalStyles.body}>
            <View style={styles.inputArea}>
                <View style={styles.dateTime}>
                    <TouchableOpacity onPress={() => { createJob() }}>
                        <Entypo name='plus' size={28} color='grey' />
                    </TouchableOpacity>

                    <DropDownPicker
                        open={dropDownOpen}
                        items={jobTypes}
                        value={jobType}
                        setOpen={setDropDownOpen}
                        setItems={setJobTypes}
                        setValue={setJobType}
                        placeholder='Job Type'
                        textStyle={{ fontSize: 15 }}
                        labelStyle={{ fontWeight: 'bold' }}
                        maxHeight={400}
                        style={{ backgroundColor: '#f1d3f1' }}
                    />
                </View>

                <View style={styles.dateTime}>
                    <Button title='Date' color='orange' onPress={() => { setShowDatePicker(true) }} />
                    {
                        showDatePicker && (
                            <RNDateTimePicker
                                value={new Date()}
                                mode='date'
                                onChange={(event, date) => {
                                    setShowDatePicker(false);
                                    setJobDate(date);
                                }}
                            />
                        )
                    }
                    <Text style={styles.textBox}>{jobDate.getFullYear()}-{jobDate.getMonth() + 1}-{jobDate.getDate()}</Text>

                    <Button title='Start' color='orange' onPress={() => { setShowStartTimePicker(true) }} />
                    {
                        showStartTimePicker && (
                            <RNDateTimePicker
                                value={new Date()}
                                mode='time'
                                is24Hour={true}
                                onChange={(event, date) => {
                                    setShowStartTimePicker(false);
                                    setJobStartTime(date);
                                    console.log(jobStartTime.getHours());
                                    console.log(jobStartTime.getMinutes());
                                }}
                            />
                        )
                    }
                    <Text style={styles.textBox}>{jobStartTime.getHours()}:{jobStartTime.getMinutes()}</Text>

                    <Button title='End' color='orange' onPress={() => { setShowEndTimePicker(true) }} />
                    {
                        showEndTimePicker && (
                            <RNDateTimePicker
                                value={new Date()}
                                mode='time'
                                is24Hour={true}
                                onChange={(event, date) => {
                                    setShowEndTimePicker(false);
                                    setJobEndTime(date);
                                    console.log(jobEndTime.getHours());
                                    console.log(jobEndTime.getMinutes());
                                }}
                            />
                        )
                    }
                    <Text style={styles.textBox}>{jobEndTime.getHours()}:{jobEndTime.getMinutes()}</Text>
                </View>

                <View style={styles.dateTime}>
                    <Button title='Amount' color='#f3ba60' />
                    <Text style={styles.textBox}>{amount}</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1000}
                        maximumTrackTintColor='#fff'
                        minimumTrackTintColor='#000'
                        step={1}
                        onValueChange={(value) => { setAmount(value) }}
                    />
                </View>

                <View style={styles.dateTime}>
                    <TouchableOpacity onPress={() => setCameraModalOpen(true)}>
                        <Entypo name='camera' size={28} color='#777' />
                    </TouchableOpacity>
                    <View style={{ marginRight: 15 }}></View>

                    {
                        hasLocationPermission ?
                            <View>
                                <TouchableOpacity onPress={() => {
                                    setLocationModalOpen(true);
                                }}
                                >
                                    <Entypo name='location' size={28} color='#777' />
                                </TouchableOpacity>
                            </View>
                            :
                            <View></View>
                    }
                </View>
            </View>

            <View><Text style={{fontSize: 18, fontWeight: 'bold'}}>Total amount: {totalAmount}</Text></View>

            <FlatList
                data={jobs}
                keyExtractor={(item) => item.jobid}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.job}>
                            {/* <Text style={styles.textOutput}>Type: {item.jobtype}</Text> */}
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Type: {item.jobtype}</Text>

                            <View style={styles.jobRow}>
                                <TouchableOpacity onPress={() => {
                                    setTargetJob(item);
                                    setShowPictureModalOpen(true)
                                }}>
                                    {/* <Entypo name='image-inverted' size={22} /> */}
                                    <Image source={{ uri: item.imageuri }} style={styles.miniImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setJobPosition({
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    })
                                    setJobPositionModalOpen(true);
                                }}>
                                    <Entypo name='location-pin' size={22} />
                                </TouchableOpacity>

                                <Text style={styles.textOutput}>{item.jobdate}</Text>
                                <Text style={styles.textOutput}>{item.jobstarttime} - {item.jobendtime}</Text>
                                <Text style={styles.textOutput}>HK${item.amount}</Text>

                                <TouchableOpacity onPress={() => { deleteJob(item.jobid) }}>
                                    <Entypo name='trash' size={22} color='grey' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setTargetJob(item);
                                    setEditModalOpen(true);
                                }}>
                                    <Entypo name='edit' size={22} color='grey' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            <Modal visible={showPictureModalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setShowPictureModalOpen(false)}
                    />
                    {
                        targetJob ?
                            <Image source={{ uri: targetJob.imageuri }} style={styles.camera} />
                            :
                            <Text style={{ alignItems: 'center' }}>Image not taken</Text>
                    }
                </View>
            </Modal>

            <Modal visible={editModalOpen} animationType='slide' >
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setEditModalOpen(false)}
                    />
                    <EditJob
                        setEditModalOpen={setEditModalOpen}
                        targetJob={targetJob}
                        retrieveJobs={retrieveJobs}
                    />
                </View>
            </Modal>

            <Modal visible={locationModalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <MapView
                        ref={positionMapRef}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={position}
                    >
                        <Marker coordinate={position} />
                    </MapView>
                    <View style={styles.searchContainer}>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            fetchDetails={true}
                            styles={{
                                textInput: {
                                    borderColor: '#888', borderWidth: 1,
                                }
                            }}
                            onPress={(data, details = null) => {
                                console.log(data, details);
                                moveTo({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                })
                            }}
                            query={{
                                key: GOOGLE_API_KEY,
                                language: 'en'
                            }}
                        />
                        <MaterialIcons
                            name='close'
                            size={24}
                            style={styles.modalToggle}
                            onPress={() => setLocationModalOpen(false)}
                        />
                    </View>
                </View>
            </Modal>

            <Modal visible={jobPositionModalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setJobPositionModalOpen(false)}
                    />
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={jobPosition}
                    >
                        <Marker coordinate={jobPosition} />
                    </MapView>
                </View>
            </Modal>

            <Modal visible={cameraModalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setCameraModalOpen(false)}
                    />
                    {
                        !image ?
                            <Camera
                                ref={cameraRef}
                                style={styles.camera}
                                type={cameraType}
                                flashMode={flashMode}
                            />
                            :
                            <Image source={{ uri: image }} style={styles.camera} />
                    }
                    {
                        image
                            ?
                            <View>
                                <Button title='Re-take' onPress={() => setImage(null)} />
                                <Button title='Save' onPress={saveImage} />
                            </View>
                            :
                            <Button title='Take Picture' onPress={takePicture} />
                    }
                </View>
            </Modal>
        </View>
    )
}
