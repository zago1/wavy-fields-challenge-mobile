import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'
import { useSignup } from '../data/hooks/useSignup'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../Router'

type SignupScreenNavigationProp = NativeStackNavigationProp<StackParamsList, 'Signup'>;

type Props = {
  navigation: SignupScreenNavigationProp
};

const Signup = ({ navigation }: Props) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    loading,

    handleSetName,
    handleSetEmail,
    handleSetPassword,
    handleSetConfirmPassword,
    signup
  } = useSignup();


  const handleHaveAccount = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.body}>
        <Input
          value={name}
          onChangeText={handleSetName}
          label="Name"
          placeholder="John Doe"
        />
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={handleSetEmail}
          label="E-mail"
          placeholder="youremail@gmail.com"
        />
        <Input
          secureTextEntry
          value={password}
          onChangeText={handleSetPassword}
          label="Password"
          placeholder="Enter your password"
        />
        <Input
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleSetConfirmPassword}
          label="Confirm Password"
          placeholder="Confirm your password"
        />
      </View>
      <View style={styles.footer}>
        <Button title="Sign up" onPress={signup} loading={loading} disabled={loading} />
        <TouchableOpacity disabled={loading} style={styles.haveAccountBtn} onPress={handleHaveAccount}>
          <Text style={styles.haveAccountBtnText}>Already have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1a1c20',
    flex: 1,
    padding: 32,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 48, color: '#FFF', fontWeight: 'bold' },
  body: {
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 16
  },
  footer: {
    padding: 16,
    gap: 16,
  },
  haveAccountBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  haveAccountBtnText: {
    fontSize: 20,
    color: '#A1A1A1',
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
})