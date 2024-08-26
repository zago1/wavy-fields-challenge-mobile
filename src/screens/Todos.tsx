import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoList from '../components/TodoList'
import { TodosContext } from '../data/contexts/TodosContext'

type Props = {}

const Todos = (props: Props) => {

  return (
    <SafeAreaView style={styles.screen}>
      <TodoList />
    </SafeAreaView>
  )
}

export default Todos;

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    padding: 32,
    backgroundColor: '#1a1c20',
  }
})