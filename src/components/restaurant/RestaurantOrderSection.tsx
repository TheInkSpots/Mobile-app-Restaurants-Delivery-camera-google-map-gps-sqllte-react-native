import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Button from '../Button'
import TextInputThin from '../TextInputThin'
import BackButton from '../BackButton'
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import {
  showAlertToast,
} from "../../core/utilities/AppUtils";

type RestaurantOrderSectionProps = {
  basketCount: number;
  total: number;
  placeOrder: () => void;
  restaurant:[];
  sum:number
  menu: any;
  start: any;
  end: any;
  remark: any;
};

export const RestaurantOrderSection = ({
  basketCount,
  total,
  placeOrder,
  restaurant,
  sum,
  menu,
  start,
  end,
  remark,
}: RestaurantOrderSectionProps) => {
  console.log('really 2 array: ',JSON.stringify(menu));
  console.log('really  2time: ',JSON.stringify(start));
  console.log('really  2 obj: ',JSON.stringify(restaurant));
  console.log('really 2 remark: ',JSON.stringify(remark));
  // let totalAmount = 0;

  // restaurant.menu.forEach(element => totalAmount += element.price);
  const [item, setItem] = useState(restaurant);
  const [remark2, setRemark2] = useState('');
  const [end2, setEnd2] = useState(end);
  const db = SQLite.openDatabase('db.visitRecord');

  useEffect(() => {
    setItem(restaurant);
    setRemark2(remark);
    setEnd2(end);
  },[restaurant]);


  const updateRec = (col, val) => {
    val = val.replace("'","\'");
    db.transaction(tx => {
            tx.executeSql(
        `UPDATE visit_record SET ${col} = '${val}', visitEndtime = '${end2}' WHERE id = ${item.id}`, 
        [], 
        (txObj, resultSet) => {
          console.log('update record is good: dddss');
          showAlertToast('update record is good:')
             //console.log('local visit_record record inserted:', resultSet.insertId);
        },
        (txObj, error) => {
             console.log('Error:', error)
             showAlertToast('Error:'+ error)
        }
      ); 
    })
  }


    const setEndTimeBtn =()=>{
        console.log('end time called: ', end2)
        let endTime = new Date;
        let time = endTime.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
            hour12: true,
        })
      setEnd2(time);
      console.log('end time done: ', end2)
    };
    
    console.log('sectionq2: ',item);

    useEffect(() => {
      setItem(restaurant);
    },[]);

  return total == 0 ? (
    <View style={styles.container}>
      <View style={styles.amountDetailsContainer}>
        <Text style={{...FONTS.h3}}> Remark</Text>
        <TextInputThin
                            
                            onChangeText={txt => {setRemark2(txt)}}
                            value={remark2} 
                          />
      </View>
      
      <View style={styles.amountDetailsContainer}>
        <Text style={{...FONTS.h3}}> Start Time</Text>
         <Text style={{...FONTS.h3}}>{start}</Text> 
      </View>
      <View style={styles.amountDetailsContainer}>
        <Text style={{...FONTS.h3}}> End Time</Text>
         <Text style={{...FONTS.h3}}>{end2}</Text> 
      </View>
      <View style={styles.amountDetailsContainer}>
        <Text style={{...FONTS.h3}}> Total Price</Text>
        <Text style={{...FONTS.h3}}>${sum.toFixed(2)}</Text>
      </View>
      {/* <View style={styles.cardDetailsContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={icons.pin} resizeMode="contain" style={styles.image} />
          <Text style={styles.text}>Location</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
         
           <Text style={styles.text}>{restaurant.location.latitude}, {restaurant.location.longitude}</Text> 
        </View>
      </View> */}

      {/* Order Button */}
      <View style={styles.orderButtonContainer}>
        
        <Button mode="outlined" onPress={() => placeOrder()} style={styles.orderButton}>
        Map
            </Button>
        <Button mode="outlined" onPress={() => updateRec('remark', remark2)} style={styles.orderButton}>
        Update
            </Button>
        <Button disabled={false} mode="outlined" onPress={setEndTimeBtn} style={styles.orderButton}>
        End
            </Button>
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
    paddingVertical: SIZES.padding ,
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
    flexDirection: 'row',
  },
  orderButton: {
    width: SIZES.width * 0.35,
    height: 60,
    padding: SIZES.padding,
    //backgroundColor: COLORS.foodpanda,
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