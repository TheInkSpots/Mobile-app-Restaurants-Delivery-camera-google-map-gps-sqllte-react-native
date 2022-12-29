import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: '#ffffff' },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
      color="#f08e25"
      backgroundColor= '#d60265'//#d60265

    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'whtie',
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: "#d60265"
  },
})
