import React, { useContext, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { TodosContext } from '../data/contexts/TodosContext'

import { Todo } from '../data/interfaces/Todos'
import TodoItem from './TodoItem'
import EditTodoModal from './EditTodoModal'

type Props = {}

const TodoList = (props: Props) => {
  const [open, setOpen] = useState(false);

  const { todos, toggleDone, deleteTodo, addTodoToEdit } = useContext(TodosContext);

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
      />
    </>
  )
}

export default TodoList

const styles = StyleSheet.create({})