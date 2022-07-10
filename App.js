import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import House from './screens/House';
import EditHouse from './screens/EditHouse'
import InsertHouse from './screens/InsertHouse'
import Splash from './screens/Splash';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/forgotPassword'
import interceptor from './services/interceptor'
import stylesColor from './style/colorApp'



const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: stylesColor.primaryColor,
    card: stylesColor.secondaryColor,
    text: stylesColor.primaryColor,
    border: stylesColor.secondaryColor,
    notification: stylesColor.primaryColor,
  },
};

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      
    }}
      activeColor="green"
       presentation="modal">
      <Stack.Screen options={{headerShown: false,}} name="Splash" component={Splash} />
      <Stack.Screen options={{headerShown: false,}}  name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false,}} name="Home" component={Home} />
      <Stack.Screen options={{gestureEnabled: true, headerShown: false,}}name="SignUp" component={SignUp} />
      <Stack.Screen options={{gestureEnabled: true, headerShown: false,}} name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen options={{gestureEnabled: true, headerShown: false,}} name="House" component={House} />
      <Stack.Screen options={{gestureEnabled: true, headerShown: false,}} name="EditHouse" component={EditHouse} />
      <Stack.Screen options={{gestureEnabled: true, headerShown: false,}} name="InsertHouse" component={InsertHouse} />
      
    
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