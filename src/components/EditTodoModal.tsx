import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

import Button from './Button';
import Input from './Input';

import { TodosContext } from '../data/contexts/TodosContext';

type Props = {
  open: boolean;
  onClose(): void;
}

const EditTodoModal = ({ open, onClose }: Props) => {
  const { todoToEdit, editTodo, loading } = useContext(TodosContext);
  const [newText, setNewText] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleChange = (text: string) => setNewText(text);

  const handleConfirm = async () => {
    await editTodo(todoToEdit?.id ?? '', newText);
    handleClose();
  }

  useEffect(() => {
    setNewText(todoToEdit?.text ?? '');
  }, [todoToEdit])

  return (
    <Modal animationType="fade" visible={open} transparent onDismiss={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Edit Todo</Text>
          </View>
          <View style={styles.body}>
            <Input
              style={styles.input}
              label=""
              value={newText}
              onChangeText={handleChange}
            />
          </View>
          <View style={styles.footer}>
            <Button title="Cancel" onPress={handleClose} style={styles.cancelBtn} />
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
      </View>
    </Modal>
  )
}

export default EditTodoModal

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    width: '70%',
    height: '30%',
    padding: 16,
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 8,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20
  },
  input: { color: '#000', borderBottomColor: '#000' },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: 16
  },
  cancelBtn: {
    width: '45%',
  },
  confirmBtn: {
    width: '45%',
    backgroundColor: '#1750ec'
  },
  confirmBtnText: {
    color: '#FFF',
  },
})