import React from 'react';
import { StyleSheet, View, Text, Image,ScrollView } from 'react-native';
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
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
type VisitationOrderSectionProps = {
  basketCount: number;
  total: number;
  placeOrder: () => void;
  visitation:[];
  sum:number
  menu: any;
  start: any;
  end: any;
  remark: any;
  rating: number;
};

export const VisitationOrderSection = ({
  basketCount,
  total,
  placeOrder,
  visitation,
  sum,
  menu,
  start,
  end,
  remark,
  rating,
}: VisitationOrderSectionProps) => {
  console.log('really 2 array: ',JSON.stringify(menu));
  console.log('really  2time: ',JSON.stringify(start));
  console.log('really  2 obj: ',JSON.stringify(visitation));
  console.log('really 2 remark: ',JSON.stringify(remark));
  // let totalAmount = 0;

  // visitation.menu.forEach(element => totalAmount += element.price);
  const [item, setItem] = useState(visitation);
  const [remark2, setRemark2] = useState('');
  const [end2, setEnd2] = useState(end);
  const db = SQLite.openDatabase('db.visitRecord');
  const [rate, setRate] = useState(5);
  const [image, setImageOut] = useState(null); 
  const [cameraPermission, setHasCameraPermission] = useState(false);

  const getCameraPermission = async () => {
      //console.log('getCameraPermission');
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted')
      //console.log('camera permission is : ',cameraStatus.status);
  }



  useEffect(() => {
    setItem(visitation);
    setRemark2(remark);
    setEnd2(end);
    setRate(rating);
    
  },[visitation]);


  const updateRec = (col, val) => {
    val = val.replace("'","\'");
    db.transaction(tx => {
            tx.executeSql(
        `UPDATE visit_record SET ${col} = '${val}', visitEndtime = '${end2}', rating = '${rate}' WHERE id = ${item.id}`, 
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
      setItem(visitation);
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
      <Text style={{...FONTS.h3}}> Rate: {rate}</Text>
      <Slider
                style={{ width: 200, height: 20}}
                minimumValue={0}
                maximumValue={10}
                maximumTrackTintColor='#fff'
                minimumTrackTintColor='#000'
                step={1}
                value={3}
                onValueChange={(value) => {  setRate(value) }}
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
    paddingTop:0,
    marginTop:0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orderButton: {
    width: SIZES.width * 0.35,
    height: 60,
    padding: SIZES.padding,
    paddingTop:0,
    marginTop:0,
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