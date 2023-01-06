import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, Animated,Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { AppStyles } from '../../AppStyles';
import { COLORS, FONTS, icons, SIZES, } from '../../constants';
import { Menu, OrderItem, Visitation } from '../../types';
import { VisitationFoodQuantity } from './VisitationFoodQuantity';
import { VisitationOrderSection } from './VisitationOrderSection';

type VisitationFoodInfoProps = {
  visitation: Visitation | null;
  obj: any;
  menu: any;
  start: any;
  end: any;
  remark: any;
  orderItems: OrderItem[];
  setOrderItems: (orderItems: OrderItem[]) => void;
  placeOrder: () => void;
};

export const VisitationFoodInfo = ({
  obj,
  menu,
  start,
  end,
  remark,
  visitation,
  orderItems,
  setOrderItems,
  placeOrder,
}: VisitationFoodInfoProps) => {
  console.log('really array: ',JSON.stringify(menu));
  console.log('really time: ',JSON.stringify(start));
  console.log('really obj: ',JSON.stringify(visitation));
  console.log('really remark: ',JSON.stringify(remark));


  const [menu2, setmenu] = useState([]);
  const [remark2, setremark] = useState('');
  const [start2, setstart] = useState('');
  const [end2, setend] = useState('');

  const [obj2, setobj] = useState({});

  const scrollX = new Animated.Value(0);
  const dotPosition = Animated.divide(scrollX, SIZES.width);

  const setOrder = (action: '+' | '-', {menuId, price}: Menu) => {
    const itemIndex = orderItems.findIndex(
      (item: OrderItem) => item.menuId === menuId,
    );
   
  };

  const getOrderQty = (menuId: number): number => {
    return (
      orderItems.find((item: OrderItem) => item.menuId === menuId)?.qty || 0
    );
  };

  const getBasketItemCount = () =>
    orderItems.reduce((a, b) => a + (b.qty || 0), 0);

  const getTotal = () => orderItems.reduce((a, b) => a + (b.total || 0), 0);
  let sumAmount = 0;
  //console.log('total 1231 is: ',visitation);
  const sum = (arr) => {arr.forEach((item) =>{
      sumAmount += Number(item.price);
    });
    return sumAmount;
    //console.log('sum is: ',sumAmount);
  }

  useEffect(() => {
    //console.log('total is: ',visitation);
    //sum(menu);
    console.log('test')
    setmenu(menu);
    setremark(remark);
    setstart(start);
    setend(end);
 setobj(visitation);

    //console.log('visitation test is: ',visitation);
   // console.log('123123123 test is: ',visitation.test);
  });
 sum(menu);

  //
  return (
    <>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {visitation?.menu.map((item: Menu, index: number) => (
          <View key={`menu-${index}`} style={styles.container}>
            <View style={styles.menuContainer}>
              {/* Food image */}
              <Image
                source={{uri:item.photo}}
                resizeMode="cover"
                style={styles.menuImage}
              />

              {/* Quantity */}
              <VisitationFoodQuantity
                onEdit={(e) => setOrder(e, item)}
                quantity={getOrderQty(item.menuId)}
              />
            </View>

            <ScrollView style={{zIndex: -1}}>
              {/* Name and Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {item.name} - ${item.price}
                </Text>
                <Text style={{...FONTS.body3, textAlign: 'center'}}>
                  {item.description}
                </Text>
              </View>

              {/* Calories */}
              <View style={styles.caloriesContainer}>
                <Image source={icons.fire} style={styles.caloriesImage} />
                <Text style={styles.caloriesText}>
                  {item.calories} 
                </Text>
              </View>
            </ScrollView>
          </View>
        ))}
      </Animated.ScrollView>
      <View>
        <View style={styles.dotContainer}>
          {visitation?.menu.map((item: Menu, index: number) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  ...styles.dot,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: COLORS.foodpanda,
                  opacity: opacity,
                }}
              />
            );
          })}
        </View>
        <VisitationOrderSection
          basketCount={getBasketItemCount()}
          total={getTotal()}
          sum={sumAmount}
          menu={menu2}
        start={start2}
        end={end2}
        remark={remark2}
          placeOrder={() => placeOrder()}
          visitation={obj2}
        />
         {/* <Button onPress={()=>sum(visitation?.menu)} title='sdf'></Button>  */}
        {isIphoneX() && <View style={styles.fillEmptySpace}></View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 7,
    alignItems: 'center',
  },
  menuContainer: {
    height: SIZES.height * 0.35,
    ...AppStyles.shadow,
  },
  menuImage: {
    width: SIZES.width,
    height: '100%',
  },
  descriptionContainer: {
    width: SIZES.width,
    alignItems: 'left',
    marginTop: 3,
    paddingHorizontal: SIZES.padding * 2,
  },
  descriptionText: {
    marginVertical: 5,
    textAlign: 'center',
    ...FONTS.h2,
  },
  caloriesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'left',
    justifyContent: 'left',
    paddingBottom: 15,
  },
  caloriesImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  caloriesText: {
    ...FONTS.body3,
    color: COLORS.darkgray,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding,
    paddingVertical: 15,
  },
  dot: {
    borderRadius: SIZES.radius,
    marginHorizontal: 6,
  },
  fillEmptySpace: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: COLORS.white,
  },
});