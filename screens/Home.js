import {  View,  Linking} from 'react-native';
import { Button,Text, Divider, NativeBaseProvider } from "native-base";
import React from 'react'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function LogOut({navigation}){
	AsyncStorage.removeItem("TOKEN").then(()=> {
	navigation.reset({index:0,
	routes:[{name: "Login" }]
	})}).catch(()=> {
		<Text>Settings!</Text>
	})
}

const title = 'www.garratrading.com.br\n🤖: Bem-vindo ao GARRA TRADING TOOLS. \n\nFUTUROS SERVIÇOS \n\n📊TENDÊNCIA📊 (Analisar a tendência do mercado força compradora ou vendedora) \n\n📡NOTÍCIAS📡(Saber as notícias do mercado para uma melhor assertividade nas operações) \n\n🔰2º CATALOGAR SINAIS 🔰(Faça sua Própria lista de sinais para usar ou sua sala de sinais) \n\n🔢CALCULADORAS🔢(Saiba como será as operações de Sorosgale, Gale e Ciclos) \n\n🔣JUROS C.🔣(Calcule seu lucro baseado em juros compostos saiba como será o seu futuro seguindo gerenciamento) \n\nAgendar Sinais(será apenas para usuário STAR)\n\nLIVES\n\nSINAIS AO VIVO'
function Index(navigation) {
  return (
    <NativeBaseProvider>
    <View style={{ backgroundColor:'#C89A5B', flex: 1,  alignItems: 'center' }}>
      
      <Text  style={{ color:'rgba(150, 150, 150,1)', paddingLeft:20, paddingRight:20 }}>{title}</Text>
      <Button onPress={() => LogOut(navigation)} title="   Sair" icon={{ name: 'arrow-right', type: 'font-awesome', size: 19, color: 'black', }} iconRight iconContainerStyle={{ marginLeft: 10 }}  titleStyle={{ fontWeight: '700', backgroundColor:'rgba(106,255, 16, 1)',color:'black'}} buttonStyle={{ backgroundColor: 'rgba(106,255, 16, 1)', borderColor: 'rgba(139,255,88,1)', borderWidth: 1.5, borderRadius: 30, }} containerStyle={{ width: 110, marginHorizontal: 50, marginVertical: 10, }} />
      <Divider style={{paddingLeft:20, paddingRight:20 }} bg="#1B1B1B" thickness="1" my="4" />
      <Text  onPress={() => { Linking.openURL('https://aboutreact.com');}}  style={{ color:'#91FFA36D'}}  ><MaterialCommunityIcons name="whatsapp" color='#91FFA36D' size={15} />WhatsApp</Text>
      <Divider  style={{fontWeight:'bold' }} bg="#1B1B1B" thickness="1" my="4" />  
      <Text  onPress={() => { Linking.openURL('https://t.me/SrDevTrader');}}   style={{ color:'#71F6FF6D', paddingBottom:80, }}><MaterialCommunityIcons name="telegram" color='#71F6FF6D' size={16} />Telegram</Text>     
      
    </View>
    </NativeBaseProvider>
  );
}


const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'rgba(106,255, 16, 1)',
      tabBarInactiveTintColor: 'rgba(150,150, 150, 1)'
    }}
      initialRouteName="Catalog"
      activeColor="green"
      
    >
	<Tab.Screen
        name="-"
        component={Index}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Checar Lista"
        component={CheckList}
        options={{
          tabBarLabel: 'Checar Lista',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={26}  />
          ),
        }}
      />
      <Tab.Screen
        name="Estratégia"
        component={Strategy}
        options={{
          tabBarLabel: 'Estratégias',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-donut-variant" color={color} size={26}  />
          ),
        }}
      />
      <Tab.Screen
        name="Catalogar"
        component={Catalog}
        options={{
          tabBarLabel: 'Catalogar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted-type" color={color} size={26}  />
          ),
        }}
      />
      
	  
    </Tab.Navigator>
  );
}
