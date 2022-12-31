import React from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CategoryData } from '../../types';
import { AppStyles } from '../../AppStyles';


export const HomeMainCategoryItem = ({
  item,
  selectedCategory,
  onSelectCategory,
}) => (
  <TouchableOpacity
    style={{
      ...styles.itemContainer,
      backgroundColor: (selectedCategory?.id === item.id) ? COLORS.foodpanda : COLORS.white,
    }}
    onPress={() => onSelectCategory(item)}>
    <View style={{
      ...styles.item,
      backgroundColor: (selectedCategory?.id === item.id) ? COLORS.white : COLORS.lightGray,
    }}>
      <Image 
        source={item.icon} 
        resizeMode="contain" 
        style={styles.itemImage} 
      />
    </View>
    <Text 
      style={{
        ...styles.itemText,
        color: (selectedCategory?.id === item.id) ? COLORS.white : COLORS.black,
      }}
    >
      {item.name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding ,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.padding * 2,
    ...AppStyles.shadow,
  },
  item: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  itemImage: {
    width: 30,
    height: 30,
  },
  itemText: {
    marginTop: SIZES.padding,
    ...FONTS.body5,
  },
});