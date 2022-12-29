import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/Food-Panda-new-logo-1.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 310,
    height: 210,
    marginBottom: 8,
  },
})
