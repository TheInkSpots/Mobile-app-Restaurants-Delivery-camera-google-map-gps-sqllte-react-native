import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

type RestaurantOrderSectionProps = {
  basketCount: number;
  total: number;
  placeOrder: () => void;
  restaurant:{};
  sum:number
};

export const RestaurantOrderSection = ({
  basketCount,
  total,
  placeOrder,
  restaurant,
  sum
}: RestaurantOrderSectionProps) => {
  // let totalAmount = 0;

  // restaurant.menu.forEach(element => totalAmount += element.price);



  return total == 0 ? (
    <View style={styles.container}>
      <View style={styles.amountDetailsContainer}>
        <Text style={{...FONTS.h3}}> Total Price</Text>
        <Text style={{...FONTS.h3}}>${sum.toFixed(2)}</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={icons.pin} resizeMode="contain" style={styles.image} />
          <Text style={styles.text}>Location</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
         
          {/* <Text style={styles.text}>{restaurant.location.latitude}, {restaurant.location.longitude}</Text> */}
        </View>
      </View>

      {/* Order Button */}
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity
          style={{ 
            ...styles.orderButton,
            ...total !== 0 ? styles.disabledOrderButton : { }
          }}
          disabled={total !== 0}
          onPress={() => placeOrder()}>
          <Text style={styles.orderButtonText}>Google Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  amountDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: COLORS.darkgray,
  },
  text: {
    marginLeft: SIZES.padding,
    ...FONTS.h4,
  },
  orderButtonContainer: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    width: SIZES.width * 0.85,
    height: 60,
    padding: SIZES.padding,
    backgroundColor: COLORS.foodpanda,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius / 1.5,
  },
  disabledOrderButton: {
    backgroundColor: COLORS.secondary,
  },
  orderButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
});