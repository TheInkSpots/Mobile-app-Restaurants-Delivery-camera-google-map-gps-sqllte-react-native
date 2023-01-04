import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

export const TopBar = ({ leftIcon, rightIcon, headerText, leftPress,rightPress }) => (
  
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        style={styles.headerImageContainer}
        onPress={() => !!leftPress && leftPress()}
      >
        <Image
          source={leftIcon}
          resizeMode="contain"
          style={styles.headerImage}
        />
      </TouchableOpacity>

      <View style={styles.headerLocationContainer}>
        <TextInput
        style={styles.headerLocationTextWrapper}
        label="Search"

        onChangeText={(text) => { }}
        
      ></TextInput>
    
      </View>

      <TouchableOpacity 
        style={styles.headerRightImageContainer}
        onPress={() => !!leftPress && rightPress()}
      >
        <Image
          source={rightIcon}
          resizeMode="contain"
          style={styles.headerImage}
        />
      </TouchableOpacity>
    </View>
  
);

const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//    // height: 220,
//     backgroundColor: COLORS.foodpanda,
//     width: 450,
//   },
//   headerImageContainer: {
//     width: 50,
//     paddingLeft: SIZES.padding * 5,
//     justifyContent: 'center',
//    // marginTop: 100,
//   },
//   headerImage: {
//     width: 30,
//     height: 100,
//   },
//   headerLocationContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerLocationTextWrapper: {
//     marginTop: 100,
//     width: '70%',
//     height: '20%',
//     backgroundColor: COLORS.lightGray3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: SIZES.radius,
//   },
//   headerRightImageContainer: {
//     width: 50,
//     paddingRight: SIZES.padding ,
//     justifyContent: 'center',
//     //marginTop: 100,

//   },
headerContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    height: 120,
    backgroundColor: COLORS.foodpanda,
    width: 450,
    margin:0,
  },
  headerImageContainer: {
    width: 50,
    paddingLeft: SIZES.padding *4,
    justifyContent: 'center',
    marginTop: 20,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  headerLocationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerLocationTextWrapper: {
    width: '70%',
    height: '40%',
    backgroundColor: COLORS.lightGray3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  headerRightImageContainer: {
    width: 70,
    paddingRight: 30 ,
    justifyContent: 'center',
    marginTop: 20,
  },
});
