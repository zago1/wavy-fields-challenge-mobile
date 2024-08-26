import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoList from '../components/TodoList'
import { TodosContext } from '../data/contexts/TodosContext'
import Input from '../components/Input'
import Button from '../components/Button'

type Props = {}

const Todos = (props: Props) => {
  const [newTodo, setNewTodo] = useState('');
  const { createTodo, loading } = useContext(TodosContext);

  const handleChange = (text: string) => setNewTodo(text);

  const handleAddTodo = async () => {
    const response = await createTodo(newTodo);
    if (response) { setNewTodo(''); }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inputContainer}>
        <Input
          inputContainerStyle={styles.input}
          value={newTodo}
          onChangeText={handleChange}
          label="Create your Todo"
        />
        <Button
          style={styles.btn}
          title="ADD"
          onPress={handleAddTodo}
          loading={loading}
          disabled={loading}
        />
      </View>
      <TodoList />
    </SafeAreaView>
  )
}

export default Todos;

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 0,
    backgroundColor: '#1a1c20',
    gap: 16,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    width: '75%'
  },
  btn: {
    width: '20%',
  }
})