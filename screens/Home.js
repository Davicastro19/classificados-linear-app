import React, {  } from 'react'
import Profile from '../screens/Profile'
import Classifieds from './Classifieds'
import stylesColor from '../style/colorApp';
import MyClassifieds from './MyClassifieds'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Home() {
  const Tab = createBottomTabNavigator();


  return (

    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: stylesColor.primaryColor,
        tabBarInactiveBackgroundColor: stylesColor.primaryColor,
        tabBarActiveTintColor: stylesColor.tertiaryColor,
        tabBarInactiveTintColor: stylesColor.primaryColor20,
      }}

    >
      <Tab.Screen
        name="Classifieds"
        component={Classifieds}
        options={{
          headerShown: false,
          tabBarLabel: 'Casa/Aptoº',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="search" color={color} size={hp('3%')} />
          ),
        }}
      />



      <Tab.Screen
        name="MyClassifieds"
        component={MyClassifieds}

        options={{

          headerShown: false,
          tabBarLabel: 'Minha casa',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cubes" color={color} size={hp('3.5%')} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-edit" color={color} size={hp('4%')} />
          ),
        }}
      />
      


    </Tab.Navigator>
  );
}
