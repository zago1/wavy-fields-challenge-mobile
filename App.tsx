import { StatusBar } from 'expo-status-bar';

import Router from './src/Router';
import { AuthProvider } from './src/data/contexts/AuthContext';
import { TodosProvider } from './src/data/contexts/TodosContext';

export default function App() {
  return (
    <AuthProvider>
      <TodosProvider>
        <Router />
        <StatusBar style="inverted" />
      </TodosProvider>
    </AuthProvider>
  );
}
