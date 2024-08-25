import { useCallback, useContext, useState } from "react";
import useAPI from "./useAPI";
import { AuthContext } from "../contexts/AuthContext";


export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
  const { httpPost } = useAPI();

  const onEmailChange = (text: string) => setEmail(text);
  const onPasswordChange = (text: string) => setPassword(text);

  const login = async () => {
      setLoading(true);
      console.log('[email]', email);
      const { data, ok, error } = await httpPost('/login', { email, password });
      setLoading(false);

      if (!ok) {
        console.log('[error]', error);
        alert('User not found!');
        return;
      }

      await signIn(data.id, data.name, data.email);
  };

  return {
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChange,
    login,
  }
}