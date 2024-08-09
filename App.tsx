// App.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookScreen from './screens/BookScreen';
import LoadingScreen from './screens/LoadingScreen';
import ChatScreen from './screens/ChatScreen';

import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type RouteName = 'HomeTab' | 'Search' | 'Settings' | 'Book';

const ICONS = {
  HomeTab: 'https://cdn-icons-png.flaticon.com/512/149/149852.png',
  Search: 'https://cdn-icons-png.flaticon.com/512/49/49739.png',
  Settings: 'https://cdn-icons-png.flaticon.com/512/134/134718.png',
  Book: 'https://cdn-icons-png.flaticon.com/512/15817/15817392.png',
};

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => {
        const routeName = route.name as RouteName;
        const iconUri = ICONS[routeName];

        return {
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: iconUri }}
              style={{ width: size * 1.2, height: size * 1.2, tintColor: color }}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarLabel: () => null,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: 'rgb(247, 58, 120)', // Color for selected tab
          tabBarInactiveTintColor: 'gray', // Color for unselected tabs
          // tabBarHideOnKeyboard: true, // Hide the tab bar when the keyboard is open
        };
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'ข้อความ', headerTitleAlign: 'left' }}
      />
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{ title: 'เพื่อน', headerTitleAlign: 'left' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'ChatScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 5,
    left: 3,
    right: 3,
    borderRadius: 18,
    height: 60,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
});
