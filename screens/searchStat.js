import * as React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
import SearchByDate from './searchByDate';
import StatByDate from './statByDate';

// expo install react-native-pager-view

export default function SearchStat() {
    const tabPage1 = () => (
        <SearchByDate/>
    );

    const tabPage2 = () => (
        <StatByDate/>
    );

    const tabPage3 = () => (
        <View style={{ flex: 1, backgroundColor: '#f2e6ff' }} />
    );

    const pageSequence = SceneMap({
        tab1: tabPage1,
        tab2: tabPage2,
        tab3: tabPage3,
    });

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'tab1', title: 'By Date' },
        { key: 'tab2', title: 'Stats on Date' },
        { key: 'tab3', title: 'Third'}
    ]);
    const layout = useWindowDimensions();

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={pageSequence}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    pagerView: {
        flex: 1,
    }
})
