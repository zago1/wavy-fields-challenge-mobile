import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './Button';

type Props = {
  retry(): void;
  title: string;
}

const ErrorHandler = ({ title, retry }: Props) => {
  const handleRetry = () => {
    retry();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button onPress={handleRetry} title="Try Again" />
    </View>
  )
}

export default ErrorHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF'
  }
})