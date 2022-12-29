import { StyleSheet, View, Text, Button, Modal, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Formik } from 'formik';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import NewJobTypes from './newJobTypes';



export default function JobType() {
    const db = SQLite.openDatabase('db.visitRecond');
    const [jobTypes, setJobTypes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        retrieveJobTypes()
    }, [])

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
                        setJobTypes((currentJobTypes) => {
                            return [row, ...currentJobTypes]
                        })
                    }
                },
                (txObj, error) => {
                    console.log('Error:', error);
                }
            )
        });

    }

    const deleteJobType = (typeid) => {
        console.log('deleteJobType() called');
        console.log(typeid);
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM jobtypes WHERE typeid=?',
                [typeid],
                (txObj, resultSet) => {
                    console.log("deleted");
                    setJobTypes((currentJobTypes) => {
                        return currentJobTypes.filter(
                            jobtype => jobtype.typeid != typeid
                        )
                    })
                },
                (TxObj, error) => {
                    console.log('Error:', error);
                }
            )
        });
    }

    return (
        <View style={globalStyles.body}>
            <Modal visible={modalOpen} animationType='slide' >
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setModalOpen(false)} />
                    <NewJobTypes setModalOpen={setModalOpen} retrieveJobTypes={retrieveJobTypes} />
                </View>
            </Modal>

            <View style={globalStyles.buttonView}>
                <Button
                    title="Create New Job Types"
                    color='orange'
                    onPress={() => setModalOpen(true)}
                />
            </View>

            <FlatList
                data={jobTypes}
                keyExtractor={(item) => item.typeid}
                renderItem={({ item }) => (
                    <View style={styles.jobTypeRow}>
                        <TouchableOpacity onPress={() => { deleteJobType(item.typeid) }}>
                            <Entypo name='cross' size={28} color='grey' />
                        </TouchableOpacity>
                        <Text>
                            {item.jobtype}: {item.description}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    modalContent: {
        flex: 1
    },
    jobTypeRow: {
        flexDirection: 'row',
        marginTop: 5,
        padding: 10,
        backgroundColor: 'pink',
        fontSize: 14,
        width: 250,
        textAlign: 'center'
    },
})
