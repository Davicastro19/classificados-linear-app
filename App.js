import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SignUp from './screens/SignUp';
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
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }} presentation="modal">
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false,}} name="Home" component={Home} />
      <Stack.Screen  name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default function App() {
  interceptor.refresh()
  return (
    <NavigationContainer theme={MyTheme}>
      <MyStack />
    </NavigationContainer>
  );
}