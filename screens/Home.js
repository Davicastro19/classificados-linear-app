import React, { useState, useEffect } from 'react'
import Profile from '../screens/Profile'
import Houses from '../screens/Houses'
import stylesColor from '../style/colorApp';
import MyHouses from '../screens/MyHouses'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../style/Login';


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
        name="Casas"
        component={Houses}
        options={{
          headerShown: false,
          tabBarLabel: 'Casa/Aptoº',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="search-location" color={color} size={hp('3%')} />
          ),
        }}
      />



      <Tab.Screen
        name="Atulizar casas"
        component={MyHouses}

        options={{

          headerShown: false,
          tabBarLabel: 'Minha casa',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="house-user" color={color} size={hp('3%')} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-edit" color={color} size={hp('4%')} />
          ),
        }}
      />
      <Tab.Screen
        name="Perjfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfijl',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="code" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfilk"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfik',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="code" color={color} size={26} />
          ),
        }}
      />



    </Tab.Navigator>
  );
}
