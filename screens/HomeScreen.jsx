import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState([
    { id: 0, name: 'Alice Tan', image: 'https://xsgames.co/randomusers/assets/avatars/female/1.jpg' },
    { id: 1, name: 'Yuki Sato', image: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg' },
  ]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwipe = () => {
    console.log('Swipe detected');
    console.log('Current profiles:', profiles);

    // Alert.alert('Profile Swiped', 'You swiped the first profile!');

    setProfiles((prevProfiles) => {
      const newProfiles = [...prevProfiles.slice(1), prevProfiles[0]];
      return newProfiles;
    });

    translateX.value = 0; // Reset X position for the next card
    translateY.value = 0; // Reset Y position for the next card
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const threshold = 100; // Threshold for swipe to trigger the action
      if (Math.abs(event.translationX) > threshold || Math.abs(event.translationY) > threshold) {
        translateX.value = withSpring(event.translationX > 0 ? 500 : -500, {}, () => {
          runOnJS(handleSwipe)();
          runOnJS(handleSwipe)(profiles[0].id);
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
      opacity: withSpring(translateX.value === 0 && translateY.value === 0 ? 1 : 0.8),
    };
  });

  return (
    <View style={styles.container}>
      {profiles.slice(0, 2).map((profile, index) => (
        <View key={profile.id} style={[styles.cardContainer, { zIndex: profiles.length - index }]}>
          {index === 0 ? (
            <GestureDetector gesture={swipeGesture}>
              <Animated.View style={[styles.card, animatedCardStyle]}>
                <Image source={{ uri: profile.image }} style={styles.image} />
                <Text style={styles.name}>{profile.name}</Text>
              </Animated.View>
            </GestureDetector>
          ) : (
            <View style={styles.card}>
              <Image source={{ uri: profile.image }} style={styles.image} />
              <Text style={styles.name}>{profile.name}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '86%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    top: 13,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
