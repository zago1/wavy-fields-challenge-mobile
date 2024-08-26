import { useCallback, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import useAPI from "./useAPI";
import { Alert } from "react-native";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const { userId, email, signOut, signIn } = useContext(AuthContext);

  const { httpDelete, httpPatch } = useAPI();

  const deleteUser = useCallback(async () => {
    setLoading(true);
    const response = await httpDelete(`/user/${userId}`);

    if (!response.ok) {
      alert('Error while deleting user!');
      setLoading(false);
      return;
    }

    setLoading(false);
    signOut();
  }, [userId]);

  const deleteCurrentUser = () => {
    Alert.alert('Delete user', 'This action will delete your user forever! Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      { text: "Yes, I'm sure!", onPress: deleteUser },
    ]);
  }

  const editUserName = async (id: string, name: string) => {
    const response = await httpPatch(`/user/name/${id}`, { name });

    if (!response.ok) {
      alert('Error while updating user name!');
      return;
    }

    signIn(id, response.data.name, email);

  };
  const changePassword = async (id: string, oldPassword: string, newPassword: string, confirmNewPassword: string) => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      alert('You need to fill all fields!');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      alert('Passwords not match!');
      return false;
    }

    setLoading(true);
    const response = await httpPatch(`/user/password/${id}`, { oldPassword, newPassword });

    if (!response.ok) {
      if (response.error === 'INVALID_PASSWORD_ERROR') { 
        alert('Current password invalid!');
      } else {
        alert('Error while changing password!');
      }
      setLoading(false);
      return false;
    } else {
      alert('Password changed!');
    }
    
    setLoading(false);
    return true;
  };

  return {
    loading,
    deleteCurrentUser,
    editUserName,
    changePassword, 
  }
}