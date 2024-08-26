import { StyleSheet, Text, TextInput, TextInputComponent, TextInputProps, View, ViewStyle } from 'react-native'
import React from 'react'

interface Props extends TextInputProps {
  label: string;
  labelColor?: string;
  inputContainerStyle?: ViewStyle;
}

const Input = ({ label, labelColor, inputContainerStyle,...props }: Props) => {
  return (
    <View style={[styles.container, inputContainerStyle]}>
      <Text style={[styles.label, !!labelColor && { color: labelColor }]}>{ label }</Text>
      <TextInput 
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor="#A1A1A1"
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
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
    padding: 4
  }
})