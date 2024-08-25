import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Todos from './screens/Todos';
import { AuthContext } from './data/contexts/AuthContext';


const Stack = createNativeStackNavigator();

const Router = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log('[loggedIn]', loggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { loggedIn 
          ?
            <>
              <Stack.Screen name="Todos" component={Todos} /> 
              <Stack.Screen name="Profile" component={Profile} /> 
            </>
          :
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router