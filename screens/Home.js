import {  View,  Linking,StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react'
import {Button, Text} from 'react-native-elements';
import Profile from '../screens/Profile'
import {
  FlatList,
  NativeBaseProvider,
} from 'native-base';
import Homes from '../screens/Homes'
import MyHouses from '../screens/MyHouses'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { FontAwesome,FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function Home() {
  const Tab = createBottomTabNavigator();
  
  
  return (
    
    <Tab.Navigator
    screenOptions={{
      //tabBarShowLabel: false,
      
      tabBarActiveTintColor: '#FFC77A',
      tabBarInactiveTintColor: '#3F8D8F'
    }}
      initialRouteName="Catalog"
      activeColor="green"
      
    >
	<Tab.Screen
        name="Casas"
        component={Homes}
        options={{
          headerStyle: {
            height:'0%'
          },
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
          headerStyle: {
            height:'0%'
          },
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
          headerStyle: {
            height:'0%'
          },
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
      

      
	  
    </Tab.Navigator>
  );
}
