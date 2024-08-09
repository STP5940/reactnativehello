import React, { useCallback, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import LinearGradient from 'react-native-linear-gradient';

const initialCards = [
  { id: '1', name: 'Loni Weitzman', image: 'https://xsgames.co/randomusers/assets/avatars/female/1.jpg' },
  { id: '2', name: 'Martha Cheske', image: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg' },
  { id: '3', name: 'Sueann Zirk', image: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg' },
  { id: '4', name: 'Teresia Sassaman', image: 'https://xsgames.co/randomusers/assets/avatars/female/9.jpg' },
  { id: '5', name: 'Terresa Albuerne', image: 'https://xsgames.co/randomusers/assets/avatars/female/4.jpg' },
  // Add more cards as needed
];

const Card = React.memo(({ card, isFront }) => (
  <View style={styles.card}>
    {isFront ? (
      <ImageBackground source={{ uri: card.image }} style={styles.image} >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
          style={styles.gradientOverlay}
        >
        </LinearGradient>
      </ImageBackground>
    ) : (
      <ImageBackground source={{ uri: card.image }} style={styles.image} blurRadius={10}>
        {/* Optional: Add an overlay or text here */}
      </ImageBackground>
    )}
    <Text style={styles.name}>{card.name}</Text>
  </View>
));

export default function HomeScreen() {
  const [cards, setCards] = useState(initialCards);
  const [cardIndex, setCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  const handleSwiped = useCallback((index) => {
    setCardIndex(index + 1);
  }, []);

  const handleSwipedLeft = useCallback((index) => {
    console.log('Swiped left:', cards[index].name);
    // You can add any additional action here when the card is swiped left
  }, [cards]);

  const handleSwipedRight = useCallback((index) => {
    console.log('Swiped right:', cards[index].name);
    // You can add any additional action here when the card is swiped right
  }, [cards]);

  const handleSwipedAll = useCallback(() => {
    setLoading(true); // Show loading indicator
    setTimeout(() => {
      setCards([...initialCards]); // Reload cards (you can also load a different set of cards)
      setCardIndex(0);
      setLoading(false); // Hide loading indicator
    }, 1000); // Simulate a delay for loading
  }, []);

  const handleSwipeLeft = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
  }, []);

  const handleSwipeRight = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
  }, []);

  return (
    <View style={[styles.container, loading && styles.transparentBackground]}>
      {loading ? (
        <ActivityIndicator size="large" color="rgb(247, 58, 120)" />
      ) : (
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={cards}
            renderCard={(card) => <Card card={card} isFront={cardIndex === cards.indexOf(card)} />}
            onSwiped={handleSwiped}
            onSwipedAll={handleSwipedAll}
            onSwipedLeft={handleSwipedLeft}
            onSwipedRight={handleSwipedRight}
            cardIndex={cardIndex}
            backgroundColor={'#f0f0f0'}
            stackSize={2}
            containerStyle={styles.swiper}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSwipeLeft} style={[styles.button, styles.leftButton]}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2976/2976286.png' }} style={styles.leftButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSwipeRight} style={[styles.button, styles.rightButton]}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077086.png' }} style={styles.rightButtonImage} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSwipeLeft} style={[styles.button, styles.leftButton]}>
              <Text style={styles.buttonText}>Swipe Left</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSwipeRight} style={[styles.button, styles.rightButton]}>
              <Text style={styles.buttonText}>Swipe Right</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      )}
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
  transparentBackground: {
    backgroundColor: 'transparent', // Set background color to transparent when loading
  },
  swiperContainer: {
    width: '109%',
    height: '100%',
  },
  swiper: {
    flex: 1,
  },
  card: {
    width: '109%',
    height: '92%',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -50,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  name: {
    position: 'absolute',
    bottom: '15%',
    left: 10,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 85,
    left: '15%',
    right: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#f73878',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  leftButtonImage: {
    width: 35,
    height: 35,
    tintColor: '#cfcacb',
  },
  rightButtonImage: {
    width: 35,
    height: 35,
    tintColor: '#ff2b4f',
  },
  leftButton: {
    backgroundColor: '#474747',
    // opacity: 0.5,
  },
  rightButton: {
    backgroundColor: '#474747',
    // opacity: 0.5,
  },
});
