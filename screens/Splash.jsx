import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'

const Splash = ({navigation}) => {
  const onPress = () =>{
    // alert("Hello")
    navigation.navigate('Home')
  }

  return (
    <Pressable onPress={onPress}>
    <View style={{ height: "100%", alignItems: 'center', backgroundColor: '#131414',}}>
      <View style={{ flex: 0.95, justifyContent:'center'}} >
        <Image source={require('../img/logo.png')} style={{width: 380, height: 150}} />
      </View>
      <View style={{flex: 0.05}} >
        <Text style={{ color: 'white' }}>EcsThai</Text>
    </View>
    </View>
    </Pressable>
  )
}

export default Splash