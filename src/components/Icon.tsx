import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  name: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

const Icon = ({ name, size = 16, color = '#FFF', style, onPress = () => {} }: Props) => {
  return (
    <MaterialCommunityIcons style={style} color={color} name={name} size={size} onPress={onPress} />
  )
}

export default Icon

const styles = StyleSheet.create({})