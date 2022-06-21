import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import Splash from './screens/Splash';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/forgotPassword';
import interceptor from './services/interceptor'






const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(42, 42, 42 )',
    card: '#1E4344',
    text: '#EFC893',
    border: '#C89A5B',
    notification: 'rgb(255, 69, 58)',
  },
};

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      //headerShown: false,
      gestureEnabled: false,
      //cardOverlayEnabled: true,
      //...TransitionPresets.ModalPresentationIOS,
      
    }}
      activeColor="green"
       presentation="modal">
      <Stack.Screen options={{headerShown: false,}} name="Splash" component={Splash} />
      <Stack.Screen options={{headerShown: false,}}  name="Login" component={Login} />
      <Stack.Screen  options={{headerShown: false,}} name="Home" component={Home} />
      <Stack.Screen  options={{gestureEnabled: true,
        headerShown: false,}}name="SignUp" component={SignUp} />
      <Stack.Screen options={{gestureEnabled: true,
        headerShown: false,}} name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default function App() {
  interceptor.refresh()
  return (
    //<View style={styles.container}>
    //    <Image
    //      style={{width: wp('100%'), height:hp('60%'),marginBottom:hp('0%')}}
    //      source={{uri: Config.AWS_URL+'splash.gif'}} />
    //  </View>
    <NavigationContainer theme={MyTheme}>
      <MyStack />
    </NavigationContainer>
  );

  
}