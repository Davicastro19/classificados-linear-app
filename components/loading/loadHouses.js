import { View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, StatusBar, BackHandler, SafeAreaView, ImageBackground } from 'react-native';
import * as React from 'react';
import { Text, Input, Button, FAB } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Skeleton, VStack, HStack, Center, NativeBaseProvider } from "native-base";
import stylesColor from '../../style/colorApp';
import styles from '../input/style'

const LoadHouse = () => {
  return (
      <Center flex={1} px="1" my={1}>
        <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
          _light={{
            borderColor: stylesColor.secondaryColor
          }} p="2">
          <Skeleton  flex="2" h="200"   rounded="md" startColor={stylesColor.secondaryColor20} />
          <VStack flex="1" >
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            
            <HStack space="2" alignItems="center">
              <Skeleton h="10" flex="1" rounded="full" startColor="indigo.300" />
            </HStack>


          </VStack>

        </HStack>
        <View style={{marginTop:20}}></View>
        <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
          _light={{
            borderColor: stylesColor.secondaryColor
          }} p="2">
          <Skeleton  flex="2" h="200"   rounded="md" startColor={stylesColor.secondaryColor20} />
          <VStack flex="1" >
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            
            <HStack space="2" alignItems="center">
              <Skeleton h="10" flex="1" rounded="full" startColor="indigo.300" />
            </HStack>


          </VStack>

        </HStack>
        <View style={{marginTop:20}}></View>
        <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
          _light={{
            borderColor: stylesColor.secondaryColor
          }} p="2">
          <Skeleton  flex="2" h="200"   rounded="md" startColor={stylesColor.secondaryColor20} />
          <VStack flex="1" >
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            <Skeleton style={{marginTop:10, marginBottom:10}} h="3" flex="2" rounded="full" />
            
            <HStack space="2" alignItems="center">
              <Skeleton h="10" flex="1" rounded="full" startColor="indigo.300" />
            </HStack>


          </VStack>

        </HStack>
      </Center>
  )
}

export default LoadHouse