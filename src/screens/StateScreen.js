import {StyleSheet, View, Text} from 'react-native';
import { TopBar } from '../components/TopBar';
import React, { useState , useEffect} from 'react'
import Wall from '../components/Wall'
import { CommonActions,useFocusEffect } from '@react-navigation/native';

export default function StateScreen({navigation, route}) {
    return (
        <View sytle={styles.container}>
            <Text>States Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})
