import React, {  } from 'react'
import Profile from '../screens/Profile'
import Houses from '../screens/Houses'
import stylesColor from '../style/colorApp';
import MyHouses from '../screens/MyHouses'
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
        name="Houses"
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
        name="MyHouses"
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
