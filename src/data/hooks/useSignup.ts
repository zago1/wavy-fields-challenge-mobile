import { useCallback, useContext, useState } from "react";
import useAPI from "./useAPI";
import { validateEmail } from "../utils";
import { AuthContext } from "../contexts/AuthContext";

export const useSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
  const { httpPost } = useAPI();

  const handleSetName = (text: string) => setName(text);
  const handleSetEmail = (text: string) => setEmail(text);
  const handleSetPassword = (text: string) => setPassword(text);
  const handleSetConfirmPassword = (text: string) => setConfirmPassword(text);

  const handleSignup = useCallback(async () => {

    if (!name || !email || !password || !confirmPassword) {
      alert('You need to fill all fields!');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid email format!');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);

    const response = await httpPost('/user', { 
      name,
      email,
      password,
     });

     if (!response.ok) {
      if (response.error === 'EMAIL_ALREADY_EXISTS_ERROR') {
        alert('Email already exists!');
        setLoading(false);
        return;
      }

      alert('Error while creating user!');
      setLoading(false);
      return;
     }

     setLoading(false);
     signIn(response.data.id, response.data.name, response.data.email);

  }, [name, email, password, confirmPassword]);


  return {
    name,
    email,
    password,
    confirmPassword,
    loading,
    handleSetName,
    handleSetEmail,
    handleSetPassword,
    handleSetConfirmPassword,

    signup: handleSignup
  }
}