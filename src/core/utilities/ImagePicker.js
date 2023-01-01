import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Platform,
  Text
} from "react-native";

import { globalStyles } from "../../../styles/globalStyles";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ImagePickerComp = props => {
  return (
    <TouchableOpacity onPress={props.pickImage}>
      {!props.image ? (
        <View style={globalStyles.upload}>
          <Text>Uploadm images</Text>
          <MaterialCommunityIcons name="upload" size={24} color="#0BB5FF" />
        </View>
      ) : (
        <Image style={globalStyles.imageUpload} source={{ uri: props.image }} />
      )}
    </TouchableOpacity>
  );
};
export default ImagePickerComp;
