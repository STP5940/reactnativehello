// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {
  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      if (isFocused) { // Check if the screen is currently focused
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true; // Prevent default back action
      }
      return false; // Allow default back action if not focused
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    // Cleanup listener on unmount
    return () => backHandler.remove();
  }, [isFocused]); // Dependency array includes isFocused

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
