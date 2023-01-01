import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'


export    default function AddButton  ({ onPress, title, style })  {
   return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={style}>
         <Icon
            name="pluscircle" size={52} color='#1ba39c'
         />
      </TouchableOpacity>
   )
}
