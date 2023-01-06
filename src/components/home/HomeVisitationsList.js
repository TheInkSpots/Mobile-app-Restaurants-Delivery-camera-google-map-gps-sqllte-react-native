import React from 'react';
import {
  FlatList, StyleSheet, View, TouchableOpacity
} from 'react-native';
import { SIZES } from '../../constants';
import { Visitation } from '../../types';
import { HomeVisitationItem } from './HomeVisitationItem';
import Icon from 'react-native-vector-icons/AntDesign'

export const HomeVisitationsList = ({
  restaurants,
  onPress,
}) => {
  function renderItem({item}) {
    return (
      <HomeVisitationItem 
        item={item} 
        onPress={(item) => onPress(item)} 
      />
    );
  }

  return (

    <FlatList
      data={restaurants}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
     
          

  );
};

{/* <TouchableOpacity onPress={()=>{}} activeOpacity={0.6} style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 1 }}>
         <Icon
            name="pluscircle" size={52} color='#1ba39c'
         />
      </TouchableOpacity> */}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: 30
  },
});
