import React, { useState, useEffect, useRef } from "react";
//import { Dropdown } from "react-native-material-dropdown";
 //import { SliderPicker } from "react-native-slider-picker";
 //import Slider from '@react-native-community/slider';
import Slider from '@react-native-community/slider';
import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./createRecScreen/styles";
import ImagePickerComp from "../core/utilities/ImagePicker";
import { useForm } from "../core/utilities/customHooks/useForm";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import { TopBar } from '../components/TopBar';

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import * as SQLite from 'expo-sqlite';
//import CheckBox from '@react-native-community/checkbox';
import {
  fuelData,
  typeData,
  seatingData,
  transmissionData,
  showAlertToast,
  isEmpty,
  pickImages,
  checkImageStatus
} from "../core/utilities/AppUtils";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  CheckboxItem,
  RNCCheckbox,
  KeyboardAvoidingView
} from "react-native";

import {categoryData} from "../dummy-data"
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import{COLORS, FONTS, SIZES, icons, images} from '../constants';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
export default function CreateRecScreen({ navigation , route}) {
  const db = SQLite.openDatabase('db.visitRecord');
  const {currentLocation, uuid} = route.params;
  console.log('create rec data : ', currentLocation.gps, uuid);
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth()+1 ;
  let year = date.getFullYear();
  
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;
  //let time = date.getHours() + ":" + date.getMinutes();
  let time = date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: true,
  });
  const [values, handleChange] = useForm({
    
    duration: "",
  //  location:'',
  //   courier:'',


  //   categories: '',
    remark:"",
    name: "",
  });
  let newArrayOfObj = [];
  const getCates = () => {
  
    //console.log('changing label: ');
    newArrayOfObj = categoryData.map(({id: value,name: label}) => ({value, label}));
     newArrayOfObj.forEach(v => v.value += '');
  };

  useEffect(()=>{
    setDishcnt(dishcnt+1);
    
   
	}, [])
  getCates();
  //console.log('new label: ', newArrayOfObj);
  // newArrayOfObj = newArrayOfObj.map(({name: label,...rest}) => ({label,...rest}));
  
  
  const [catesopen, setcatesOpen] = useState(false);
  const [catesvalue, setcatesValue] = useState(null);

  const [catesopen2, setcatesOpen2] = useState(false);
  const [catesvalue2, setcatesValue2] = useState(null);
  const [items, setItems] = useState(newArrayOfObj);

  const [image, setImageOut] = useState({'restImage':null}); //{key: "", url:""}
  const [trigger, setTrigger] = useState(false);
  const [fackcat, setfackcat] = useState('');

  const [dishcnt, setDishcnt] = useState(1);
  const [dishesList, setDishesList] = useState([{key: dishcnt, menuId: dishcnt, name:'', description:'',calories:0, price:0}]);

  const [dishName, setdishName] = useState({});
  const [dishdescription, setdishdescription] = useState({});
  const [dishcalories, setdishcalories] = useState({});
  const [dishprice, setdishprice] = useState({});

  const [rate, setRate] = useState(5);


  

  const appendDishes = () => {
    setDishcnt(dishcnt+1);
    const newDishesList = [...dishesList];
    newDishesList.push({key: dishcnt, menuId: dishcnt, name:'', photo:'', description:'',calories:0, price:0 });
    setDishesList(newDishesList);
  }

  const setDish2imageList = (key, value) => {
    image[key+""] = value;
  }

  const getDishImageList = (key) => {
     if (image[key+""] !== undefined) {
       return image[key+""];
     }else
      return null;
  }




  const setGoodsList = (list ,key, value) => {
    list[key+""] = value;
    setTrigger(!trigger);
  };

  const getGoodsList = (list, key) => {
     if (list[key+""] !== undefined) {
       return list[key+""];
     }else
      return null;
  }

  const [cameraPermission, setHasCameraPermission] = useState(false);

  const getCameraPermission = async () => {
      //console.log('getCameraPermission');
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted')
      //console.log('camera permission is : ',cameraStatus.status);
  }
 

  useEffect(() => {
    getCameraPermission();
    //checkImageStatus();
    const initializer = async () => {
     // handleChange('categories',[5,7]);
     // handleChange('courier',images.avatar_1);
  
     // handleChange('location',currentLocation);
      handleChange('duration',currentDate);
      //console.log('courier  is : ',images.avatar_1);
    }
    initializer().finally(async () => {
      //await RNBootSplash.hide({ fade: true })
    })
   
  }, []);


  //const categories = useRef([5,7]).current;
  const courier = useRef({avatar: images.avatar_1, name: 'courier'}).current;
  const location = useRef(currentLocation).current.gps;

  const handleSubmit = e => {
    let photo = image['restImage'];
    // categories= values.categories;
    //  courier= values.courier;
    // location = values.location;
    let newDishesList2 = [];
    const categories = [];

    if(catesvalue !== null) categories.push(Number(catesvalue));
    if(catesvalue2 !== null) categories.push(Number(catesvalue2));
   

    for (const [key, value] of Object.entries(dishName)) {
      newDishesList2.push({
        menuId: key,
       name: dishName[key], 
       photo:image[key], 
       description:dishdescription[key],
       calories:dishcalories[key], 
       price:dishprice[key] });
    }
    

    //  //console.log('saving 111111 :' , JSON.stringify((newDishesList2)));
    //  //console.log('saving :' , JSON.stringify((dishName)));
    //  //console.log('saving :' , JSON.stringify((dishdescription)));
    //  //console.log('saving :' , JSON.stringify((image)));
    //  //console.log('saving :' , JSON.stringify((dishprice)));
    //  //console.log('saving :' , JSON.stringify((dishcalories)));


     let menu =newDishesList2;
    const row = {
      ...values,
      rate,
      photo,

      categories,
      courier,
      location,
      menu
 

    };
    //if (isEmpty(object)) {
      //showAlert("Kindly fill all the fields");
      //} else {
     // isLoading(true);
      //props.createCarList(object, props);
      ////console.log(object);
    //}
    insertRecord(row);
    navigation.goBack();
  };

  const insertRecord = (row) => {
    db.transaction(tx => {
            tx.executeSql(
        'INSERT INTO visit_record (id, remark, rating, userID, cat, visitdate, visitStarttime, visitEndtime, restName, dishJSON, RestPhoto,longitude, latitude) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [null, 
          row.remark,
          rate,
        uuid, 
        JSON.stringify(row.categories),
        values.duration, 
        time,
        null,
        row.name,
        JSON.stringify(row.menu),
        row.photo,
        row.location.latitude,
        row.location.longitude,
        
          ], 
        (txObj, resultSet) => {
             console.log('local visit_record record inserted:', resultSet.insertId);
             showAlertToast('visit_record record inserted:'+ resultSet.insertId);
        },
        (txObj, error) => {
             console.log('Error:', error)
             showAlertToast('Error:'+ error)
        }
      ); 
    })
  }


  //const [toggleCheckBox, setToggleCheckBox] = useState(false)
  

  return (
   <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} sytle={{flex: 1,padding: 20,backgroundColor: "#fff"}} >
    {/* //<View style={globalStyles.container}> */}
      
      <ScrollView showsVerticalScrollIndicator={false} scrollViewProps={{
  decelerationRate: "fast"
}}>
      <TopBar
        leftIcon={icons.back}
        rightIcon={icons.list}
        //headerText={restaurant?.name}
        leftPress={() => navigation.goBack()}
        rightPress={() => {}}
        style={styles.bar}
      />
        <View style={styles.container}>

           <Text style={globalStyles.heading}>Create Visitation</Text>
           {/* <Text style={FONTS.h2}>{"Current Date: "+ currentDate}</Text> */}
           <Text style={FONTS.h2}>{"Current Time: "+ time}</Text>
            <TextInput
              label="Restaurant name"
              //style={globalStyles.input}
              onChangeText={txt => handleChange("name", txt)}
              value={values.name}
            />
            <TextInput
              label="Remark"
              //style={globalStyles.input}
              onChangeText={txt => handleChange("remark", txt)}
              value={values.remark}
            />
            <Text>{'Rate: ' +rate}</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={10}
                maximumTrackTintColor='#fff'
                minimumTrackTintColor='#000'
                step={1}
                value={3}
                onValueChange={(value) => {  setRate(value) }}
              />
            
             <View style={styles.checkboxContainer}>
             {/* <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)} 
              /> */}
                  {/* <Text style={styles.label}>Do you like React Native?</Text> */}
            </View> 
            <Text style={FONTS.h2}>Restaurant photo</Text>
              <ImagePickerComp
              id={'restImage'}
              image={getDishImageList('restImage')}
              setTrigger={setTrigger}
              trigger={trigger}
              // pickImage={pickImages}
              setImage={setDish2imageList}
            />  
             <DropDownPicker
                open={catesopen}
                value={catesvalue}
                items={items}
                setOpen={setcatesOpen}
                setValue={setcatesValue}
                setItems={setItems}
              /> 
              <DropDownPicker
                open={catesopen2}
                value={catesvalue2}
                items={items}
                setOpen={setcatesOpen2}
                setValue={setcatesValue2}
                setItems={setItems}
              />   
           
            

      
            {dishesList.map((dish, key )=>(

                 <View key={dish.menuId} style={styles.container1}>
                    <View style={styles.inputs} useNativeDriver={true}>
                   
                          <Text style={globalStyles.heading}>Dish {dish.menuId}</Text>
                          <TextInput
                            label="Dish name"
                           // style={globalStyles.input}
                            onChangeText={txt => setGoodsList(dishName,dish.menuId ,txt)}
                            value={getGoodsList(dishName,dish.menuId )}
                          />
                          <TextInput
                            label="Dish comment"
                            //style={globalStyles.input}
                            onChangeText={txt => setGoodsList(dishdescription,dish.menuId, txt)}
                            value={getGoodsList(dishdescription,dish.menuId )}
                          />
                          <TextInput
                            keyboardType="number-pad"
                            label="Price"
                           // style={globalStyles.input}
                            onChangeText={txt => setGoodsList(dishprice, dish.menuId ,txt)}
                            value={getGoodsList(dishprice,dish.menuId )}
                          />
                          <Text>{'Calories: ' +(getGoodsList(dishcalories,dish.menuId)*10)}</Text>
                          <Slider
                              style={{ width: 200, height: 40 }}
                              minimumValue={0}
                              maximumValue={30}
                              maximumTrackTintColor='#fff'
                              minimumTrackTintColor='#000'
                              step={1}
                              value={3}
                              onValueChange={(value) => { setGoodsList(dishcalories,dish.menuId, value * 10) }}
                            />
                            <Text style={FONTS.h3}>Dish photo</Text>
                            <ImagePickerComp
                            id={dish.menuId}
                            setTrigger={setTrigger}
                            image={getDishImageList(dish.menuId)}
                            trigger={trigger}
                            // pickImage={pickImages}
                            setImage={setDish2imageList}
                          />
                          
                    </View>
               </View>
               
               


            ))}

          
            <Button mode="outlined" onPress={appendDishes}>
              Add Button
            </Button>
            <Button mode="outlined" onPress={handleSubmit}>
              Save
            </Button>
          </View>
        </ScrollView>
    {/* //</View> */}
    </KeyboardAvoidingView>
  );
};


// const mapStateToProps = state => ({
//   status: state.my_car.status
// });

