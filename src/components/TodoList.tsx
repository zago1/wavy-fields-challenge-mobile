import React, { useContext, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { TodosContext } from '../data/contexts/TodosContext'

import { Todo } from '../data/interfaces/Todos'
import TodoItem from './TodoItem'
import EditTodoModal from './EditTodoModal'
import Button from './Button'
import { ActivityIndicator } from 'react-native-paper'
import ErrorHandler from './ErrorHandler'

type Props = {}

const TodoList = (props: Props) => {
  const [open, setOpen] = useState(false);

  const {
    todos,
    toggleDone,
    deleteTodo,
    addTodoToEdit,
    listLoading,
    loadMore,
    error,
    retry
  } = useContext(TodosContext);

  const handleEdit = (id: string) => {
    addTodoToEdit(id);
    setOpen(true);
  }

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  }

  const handleDone = async (todo: Todo) => {
    await toggleDone(todo.id, !todo.done);
  }

  const handleClose = () => {
    addTodoToEdit('');
    setOpen(false);
  }

  if (error) {
    return <ErrorHandler retry={retry} title="Ops! Something went wrong..." />
  }

  return (
    <>
      <EditTodoModal open={open} onClose={handleClose} />
      <FlatList 
        data={todos}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({item}) => 
          <TodoItem
            text={item.text}
            done={item.done}
            onDelete={() => handleDelete(item.id)}
            onDone={() => handleDone(item)}
            onEdit={() => handleEdit(item.id)}
          />}
        ListFooterComponent={() => 
          listLoading 
          ? <ActivityIndicator size={20} color="#FFF" />
          : 
            <>
              {
                todos.length >= 20 && <Button
                  textStyle={styles.loadMoreBtnText}
                  style={styles.loadMoreBtn}
                  onPress={loadMore}
                  title="Load More" 
                />
              }
            </>
        }
      />
    </>
  )
}

export default TodoList

const styles = StyleSheet.create({
  loadMoreBtn: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingVertical: 8
  },
  loadMoreBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
})