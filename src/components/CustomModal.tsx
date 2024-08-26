import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, ViewStyle, DimensionValue } from 'react-native';

import Button from './Button';
import Input from './Input';

import { TodosContext } from '../data/contexts/TodosContext';
import Icon from './Icon';

type Props = {
  open: boolean;
  onClose(): void;
  title: string;

  width?: DimensionValue;
  height?: DimensionValue;
}

const CustomModal = ({
  open,
  title,
  onClose,
  children,
  width = '70%',
  height = '30%'
}: PropsWithChildren<Props>) => {
  const handleClose = () => {
    onClose();
  };

  const contentStyle: ViewStyle = {
    width,
    height,
  }

  return (
    <Modal animationType="fade" visible={open} transparent onDismiss={onClose}>
      <View style={styles.container}>
        <View style={[styles.content, contentStyle]}>
          <Icon style={styles.closeIcon} name="close" size={20} onPress={handleClose} color="#000" />
          <View style={styles.header}>
            <Text style={styles.headerText}>{title} </Text>
          </View>
          <View style={styles.body}>
            { children }
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal

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
  closeIcon: { alignSelf: 'flex-end' },
})