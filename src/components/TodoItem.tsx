import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Icon from './Icon';

type Props = {
  text: string;
  done: boolean;
  onEdit(): void;
  onDelete(): void;
  onDone(): void;
}

const TodoItem = ({
  text,
  done,
  onEdit,
  onDelete, 
  onDone,
}: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, done && styles.isDone]}>{text}</Text>
      </View>
      <View style={styles.actionContainer}>
        <Icon name="note-edit" size={24} onPress={onEdit} />
        <Icon name="trash-can-outline" size={24} onPress={onDelete} />
        <Icon name={done ? 'undo-variant' : 'check-circle'} size={24} onPress={onDone} />
      </View>
    </View>
  )
}

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 8
  },
  textContainer: {
    flex: 1,
    overflow: 'hidden',
    paddingRight: 8,
  },
  text: {
    color: '#FFF',
    fontSize: 18,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 8
  },
  isDone: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: '#a1a1a1'
  },
})