import React from 'react'

import { View, Text } from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from './screens/Splash'
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='Splash'
        component={Splash}
        options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'ATTRACTIONS LISTS', headerTitleAlign: 'center', headerBackVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App