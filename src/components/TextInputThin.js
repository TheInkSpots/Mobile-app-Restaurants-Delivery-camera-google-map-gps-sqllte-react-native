import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    marginVertical: 0,
    height: 30,
    
  },
  input: {
    backgroundColor: 'white',
    height: 40,
  },
  description: {
    fontSize: 2,
    color: theme.colors.secondary,
    paddingTop: 1,
  },
  error: {
    fontSize: 2,
    color: theme.colors.error,
    paddingTop: 1,
  },
})
