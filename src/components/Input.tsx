import { StyleSheet, Text, TextInput, TextInputComponent, TextInputProps, View } from 'react-native'
import React from 'react'

interface Props extends TextInputProps {
  label: string;
}

const Input = ({ label,...props }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <TextInput 
        style={styles.input}
        placeholderTextColor="#A1A1A1"
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
  },
  label: {
    fontSize: 14,
    color: '#FFF',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    width: '100%',
    color: '#FFF',
  }
})