import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Todos from './screens/Todos';

import { AuthContext } from './data/contexts/AuthContext';

export type StackParamsList = {
  Login: undefined,
  Signup: undefined
}


const Stack = createNativeStackNavigator<StackParamsList>();

const Tab = createMaterialBottomTabNavigator();

const navigationOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

const Icon = ({ color, name }: { color: string, name: string }) => 
  <MaterialCommunityIcons
    size={20}
    name={name}
    color={color}
  />

const Router = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log('[loggedIn]', loggedIn);
  return (
    <NavigationContainer>
      { loggedIn 
        ? 
          <Tab.Navigator 
            initialRouteName="Todos"
            activeColor="#FFF"
            activeIndicatorStyle={{ backgroundColor: 'transparent' }}
            barStyle={{ backgroundColor: '#000000' }}
          >
            <Tab.Screen
              name="Todos"
              component={Todos}
              options={{ 
                tabBarLabel: 'TODOS',
                tabBarIcon: ({ color }) => <Icon name="book-edit" color={color} /> }} 
              /> 
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: ({ color }) => <Icon name="account" color={color} /> }} 
              /> 
          </Tab.Navigator>
        :
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}  options={navigationOptions} />
            <Stack.Screen name="Signup" component={Signup}  options={navigationOptions} />
          </Stack.Navigator>
        }
    </NavigationContainer>
  )
}

export default Router