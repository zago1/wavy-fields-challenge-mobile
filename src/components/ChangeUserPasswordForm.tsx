import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Input from './Input'
import { AuthContext } from '../data/contexts/AuthContext'
import Button from './Button'
import { useUser } from '../data/hooks/useUser'

type Props = {
  onCancel(): void;
}

const ChangeUserPasswordForm = ({ onCancel }: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { userId } = useContext(AuthContext);

  const { loading, changePassword } = useUser();

  const handleCurrentPasswordChange = (text: string) => setCurrentPassword(text);
  const handleNewPasswordChange = (text: string) => setNewPassword(text);
  const handleConfirmNewPasswordChange = (text: string) => setConfirmNewPassword(text);

  const handleConfirm = useCallback(async () => {
    const response = await changePassword(userId, currentPassword, newPassword, confirmNewPassword);
    
    if (response) {
      onCancel();
    }
  }, [userId, currentPassword, newPassword, confirmNewPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input
          style={styles.input}
          label="Current Password"
          labelColor="#000"
          value={currentPassword}
          secureTextEntry
          onChangeText={handleCurrentPasswordChange}
        />
        <Input
          style={styles.input}
          label="New Password"
          labelColor="#000"
          value={newPassword}
          secureTextEntry
          onChangeText={handleNewPasswordChange}
        />
        <Input
          style={styles.input}
          label="Confirm New Password"
          labelColor="#000"
          secureTextEntry
          autoCapitalize="none"
          value={confirmNewPassword}
          onChangeText={handleConfirmNewPasswordChange}
        />
      </View>
      <View style={styles.footer}>
        <Button title="Cancel" onPress={onCancel} style={styles.cancelBtn} />
        <Button
          style={styles.confirmBtn}
          title="Confirm"
          onPress={handleConfirm}
          textStyle={styles.confirmBtnText}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  )
}

export default ChangeUserPasswordForm;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    gap: 16,
  },
  content: { 
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  input: { color: '#000', borderBottomColor: '#000' },
  footer: {
    flexDirection: 'row',
    gap: 16
  },
  confirmBtn: {
    width: '45%',
    backgroundColor: '#1750ec'
  },
  confirmBtnText: {
    color: '#FFF',
  },
  cancelBtn: {
    width: '45%',
  },
})