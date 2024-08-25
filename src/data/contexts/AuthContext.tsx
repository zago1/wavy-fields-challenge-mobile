import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface IAuthContext {
  userId: string;
  name: string;
  email: string;
  loading: boolean;
  loggedIn: boolean;
  
  signIn(id: string, name: string, email: string): Promise<any>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetUser = () => {
    setUserId('');
    setName('');
    setEmail('');
  }


  const signIn = useCallback(async (id: string, name: string, email: string) => {
    await SecureStore.setItemAsync('user', JSON.stringify({ id, name, email }));
    setUserId(id);
    setName(name);
    setEmail(email);
  }, []);

  const signOut = useCallback(async () => {
    await SecureStore.setItemAsync('user', '');
    resetUser();
  }, []);

  const loggedIn = useMemo(() => !!userId, [userId]);

  useEffect(() => {
    const getUser = async () => {
        setLoading(true);
        const userItem = await SecureStore.getItemAsync('user');
        
        if (!userItem) {
          setLoading(false);
          return;
        }
        
        const user = JSON.parse(userItem);
        
        setUserId(user.id);
        setName(user.name);
        setEmail(user.email);
        setLoading(false);
    }

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      userId,
      name,
      email,
      loading,
      loggedIn,
      signIn,
      signOut,
    }}>
      { children }
    </AuthContext.Provider>
  )
}