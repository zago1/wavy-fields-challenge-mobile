import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface IAuthContext {
  userId: string;
  name: string;
  email: string;
  loading: boolean;
  loggedIn: boolean;
  
  signIn(email: string, password: string): Promise<any>;
  signUp(name: string, email: string, password: string): Promise<any>;
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

  const signIn = useCallback(async (email: string, password: string) => {
    // login user
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    // sign up user
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
        
        setUserId(user.userId);
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
      signUp
    }}>
      { children }
    </AuthContext.Provider>
  )
}