import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void
}

const Icon = ({ name, size = 16, color = '#FFF', onPress = () => {} }: Props) => {
  return (
    <MaterialCommunityIcons color={color} name={name} size={size} onPress={onPress} />
  )
}

export default Icon

const styles = StyleSheet.create({})