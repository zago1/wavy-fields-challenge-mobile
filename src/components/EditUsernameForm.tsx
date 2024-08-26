import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Input from './Input'
import { AuthContext } from '../data/contexts/AuthContext'
import Button from './Button'
import { useUser } from '../data/hooks/useUser'

type Props = {
  onCancel(): void;
}

const EditUsernameForm = ({ onCancel }: Props) => {
  const [newName, setNewName] = useState('');

  const { name, userId } = useContext(AuthContext);

  const { loading, editUserName } = useUser();

  const handleChange = (text: string) => setNewName(text);

  const handleConfirm = useCallback(async () => {
    await editUserName(userId, newName);
    onCancel();
  }, [userId, newName]);

  useEffect(() => {
    setNewName(name);
  }, [name])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input
          style={styles.input}
          label=""
          value={newName}
          onChangeText={handleChange}
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

export default EditUsernameForm

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