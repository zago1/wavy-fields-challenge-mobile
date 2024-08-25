import { StatusBar } from 'expo-status-bar';

import Router from './src/Router';
import { AuthProvider } from './src/data/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="inverted" />
      <Router />
    </AuthProvider>
  );
}
