import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { FONTS, SIZES } from '../../constants';
import { CategoryData } from '../../types';
import { HomeMainCategoryItem } from './HomeMainCategoryItem';



export const HomeMainCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  function renderItem({ item }) {
    return (
      <HomeMainCategoryItem
        item={item}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{...FONTS.h3}}>Categories</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding ,
    width: SIZES.width
  },
  listContainer: {
    paddingVertical: SIZES.padding ,
    paddingHorizontal: 9,
    //height: 90
  }
});