import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../components/Icon';

import { AuthContext } from '../data/contexts/AuthContext';
import Button from '../components/Button';
import { useUser } from '../data/hooks/useUser';
import CustomModal from '../components/CustomModal';
import EditUsernameForm from '../components/EditUsernameForm';
import ChangeUserPasswordForm from '../components/ChangeUserPasswordForm';

type Props = {}

const Profile = (props: Props) => {
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);

  const { name, email, signOut } = useContext(AuthContext);

  const { deleteCurrentUser, loading } = useUser();

  const handleEditNameClose = () => setOpenEditName(false);
  const handleEditPasswordClose = () => setOpenEditPassword(false);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Icon name='account-circle' size={142} />
          <View style={styles.nameContainer}>
            <Text style={styles.text}>{name}</Text>
            <Icon name="pencil" size={20} onPress={() => setOpenEditName(true)} />
          </View>
          <Text style={styles.text}>{email}</Text>

        </View>
        <View style={styles.infoContainer}>
          <Button title="Change Password" onPress={() => setOpenEditPassword(true)}/>
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={styles.btnDelete}
            title="Delete my user"
            onPress={deleteCurrentUser}
            textStyle={styles.btnText}
            loading={loading}
            disabled={loading}
          />
          <Button
            style={styles.btnLogout}
            title="Logout"
            onPress={signOut}
            textStyle={styles.btnText}
            disabled={loading}
          />
        </View>
      </View>

      { 
        openEditName &&
          <CustomModal open={openEditName} title="Edit name" onClose={handleEditNameClose}>
            <EditUsernameForm onCancel={handleEditNameClose} />
          </CustomModal>
      }

      {
        openEditPassword && 
          <CustomModal height="50%" open={openEditPassword} title="Change Password" onClose={handleEditPasswordClose}>
            <ChangeUserPasswordForm onCancel={handleEditPasswordClose} />
          </CustomModal>
      }
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#1a1c20',
    padding: 32
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
    gap: 8,
  },

  nameContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingLeft: 20,
  },

  infoContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },

  infoContainerTitle: {
    fontSize: 32,
    color: '#FFF',
    alignSelf: 'flex-start'
  },
  text: {
    color: '#A1A1A1',
    fontSize: 16
  },

  actionContainer: {
    width: '100%',
    gap: 16
  },

  btnDelete: {
    backgroundColor: '#db3535',
    paddingHorizontal: 8,
  },

  btnText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  btnLogout: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 8,
  },
})