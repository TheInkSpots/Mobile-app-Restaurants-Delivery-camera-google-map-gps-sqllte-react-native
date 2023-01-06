import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppStyles } from '../../AppStyles';
import { COLORS, FONTS, SIZES } from '../../constants';
import { OrderItem } from '../../types';

type VisitationOrderProps = {
  onEdit: (e: '+' | '-') => void;
  quantity: number;
};


export const VisitationFoodQuantity = ({ onEdit, quantity }: VisitationOrderProps) => {
  return (
    <View style={styles.quantityContainer}>
    
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    position: 'absolute',
    bottom: -20,
    width: SIZES.width,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    ...AppStyles.shadow,
  },
  quantityAddButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  quantityButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  quantityText: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});