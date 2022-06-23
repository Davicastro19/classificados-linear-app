import React, { useState, useEffect } from 'react'
import Profile from '../screens/Profile'
import Homes from '../screens/Homes'
import MyHouses from '../screens/MyHouses'
import { FontAwesome,FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Home() {
  const Tab = createBottomTabNavigator();
  
  
  return (
    
    <Tab.Navigator
    screenOptions={{
      //tabBarShowLabel: false,
      
      tabBarActiveTintColor: '#FFC77A',
      tabBarInactiveTintColor: '#3F8D8F'
    }}
      initialRouteName="Casas"
      activeColor="green"
      
    >
	<Tab.Screen
        name="Casas"
        component={Homes}
        options={{
          headerShown: false,
          tabBarLabel: 'Casa/Aptoº',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="warehouse" color={color} size={26} />
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
            <FontAwesome5 name="laptop-house" color={color} size={26} />
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
            <FontAwesome name="user" color={color} size={26} />
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
            <FontAwesome name="user" color={color} size={26} />
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
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />

      
	  
    </Tab.Navigator>
  );
}
