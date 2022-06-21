import LottieView from 'lottie-react-native';
import { View, Pressable, Keyboard, TextInput, Linking, RefreshControl, StatusBar } from 'react-native';
import React, { useState, useEffect,useMemo } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Splash({navigation}) {
    
    
    return (
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center',backgroundColor: '#fff'}}>
        <LottieView  style={{ height: hp('61%'), marginBottom: hp('0%') }} 
        source={require('../assets/splash.json')} 
        autoPlay
        loop={false} 
        speed={0.6}
        onAnimationFinish={() => navigation.navigate("Login")}
        />
    </View>
    );
}