import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import Button from '../components/Button';
import { useLogin } from '../data/hooks/useLogin';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackParamsList } from '../Router';

type LoginScreenNavigationProp = NativeStackNavigationProp<StackParamsList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp
};

const Login = ({ navigation }: Props) => {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    login,
    loading
  } = useLogin();

  const handleSignup = () => {
    navigation.navigate('Signup')
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, styles.logoTextDecoration]}>TODO</Text>
        <Text style={styles.logoText}>List</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="E-mail"
          value={email}
          onChangeText={onEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your e-mail"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          secureTextEntry
        />
        <Button
          title="Sign In"
          onPress={login}
          loading={loading}
          disabled={loading}
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          disabled={loading}
          style={styles.signupBtn}
          textStyle={styles.signupBtnText}
        />
      </View>
    </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    backgroundColor: '#1a1c20',
    paddingHorizontal: 32,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5
  },
  logoText: {
    fontSize: 50,
    color: '#FFF',
  },
  logoTextDecoration: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0'
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    gap: 16
  },
  signupBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A1A1A1',
  },
  signupBtnText: { color: '#FFF', fontWeight: 'bold' }
})