import React, { useState, useEffect } from "react";
//import { Dropdown } from "react-native-material-dropdown";
 //import { SliderPicker } from "react-native-slider-picker";
 //import Slider from '@react-native-community/slider';
import Slider from '@react-native-community/slider';
import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./createRecScreen/styles";
import ImagePickerComp from "../core/utilities/ImagePicker";
import { useForm } from "../core/utilities/customHooks/useForm";
import DropDownPicker from 'react-native-dropdown-picker';


import {
  fuelData,
  typeData,
  seatingData,
  transmissionData,
  showAlert,
  isEmpty,
  pickImages,
  checkImageStatus
} from "../core/utilities/AppUtils";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";

export default function CreateRecScreen({ navigation , route}) {
  const [values, handleChange] = useForm({
    name: "",
    color: "",
    type: "",
    fuel: "",
    seating: "",
    address: "",
    transmission: ""
  });
  const [image, setImage] = useState(null);
  const [rate, setRate] = useState(25);
  const [Loading, isLoading] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  
  useEffect(() => {

    checkImageStatus();
  }, []);

  const handleSubmit = e => {
    const object = {
      ...values,
      rate,
      image
    };
    if (isEmpty(object)) {
      showAlert("Kindly fill all the fields");
    } else {
      isLoading(true);
      props.createCarList(object, props);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text>test</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
           <Text>test2</Text>
           <Text style={globalStyles.heading}>Car Information</Text>
            <TextInput
              placeholder="Restaurant name"
              style={globalStyles.input}
              onChangeText={txt => handleChange("name", txt)}
              value={values.name}
            />
            <TextInput
              placeholder="Car color"
              style={globalStyles.input}
              onChangeText={txt => handleChange("color", txt)}
              value={values.color}
            />
            <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1000}
                        maximumTrackTintColor='#fff'
                        minimumTrackTintColor='#000'
                        step={1}
                        value={3}
                        onValueChange={(value) => { handleChange(values.transmission) }}
                    />
            <View style={styles.container1}>
              <View style={styles.inputs} useNativeDriver={true}>
                      {/* <DropDownPicker
                                    open={dropDownOpen}
                                    items={}
                                    value={}
                                    setOpen={setDropDownOpen}
                                    setItems={}
                                    setValue={}
                                    placeholder='Job Type'
                                    textStyle={{ fontSize: 14, padding: 3 }}
                                    labelStyle={{ fontWeight: 'bold' }}
                                    maxHeight={400}
                                    containerStyle={{ width: 220, height: 40 }}
                                /> */}
                </View>
            </View>
            <Text>{values.rate}</Text>
            <Text style={globalStyles.heading}>Address line</Text>
            <TextInput
              placeholder="Address"
              style={globalStyles.input}
              onChangeText={txt => handleChange("address", txt)}
              value={values.address}
            />
              <ImagePickerComp
              image={image}
              pickImage={async () => setImage(await pickImages())}
            />  
            <TouchableOpacity
              onPress={handleSubmit}
              style={globalStyles.appButtonContainer}
            >
              <Text style={globalStyles.appButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </View>
  );
};


// const mapStateToProps = state => ({
//   status: state.my_car.status
// });

