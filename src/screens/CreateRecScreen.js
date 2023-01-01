import React, { useState, useEffect } from "react";
//import { Dropdown } from "react-native-material-dropdown";
// import { SliderPicker } from "react-native-slider-picker";
import Slider from '@react-native-community/slider';
import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./createRecScreen/styles";
//import ImagePickerComp from "../core/utilities/ImagePicker";
import { useForm } from "../core/utilities/customHooks/useForm";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
// import { connect } from "react-redux";
import {
  // fuelData,
  // typeData,
  // seatingData,
  // transmissionData,
  // showAlert,
  // isEmpty,
  // pickImages,
  // checkImageStatus
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
  const [dropDownOpen, setDropDownOpen] = useState(false);
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
            
           
        </View>
      </ScrollView>
    </View>
  );
};


// const mapStateToProps = state => ({
//   status: state.my_car.status
// });

