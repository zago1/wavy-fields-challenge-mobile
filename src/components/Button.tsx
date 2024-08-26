import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

type Props = {
  onPress(): void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button = ({ title, onPress, disabled = false, loading = false, style, textStyle }: Props) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}>
        { 
          loading 
            ? <ActivityIndicator color="#FFF" /> 
            : <Text style={[styles.text, textStyle]}>{ title }</Text>
        }      
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#EEE',
    borderRadius: 4
  },
  text: {
    color: '#1a1c20',
    fontSize: 16
  },
  disabled: {
    backgroundColor: '#A1A1A1'
  },
})