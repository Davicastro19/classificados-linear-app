import { View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, StatusBar, BackHandler, SafeAreaView,ImageBackground } from 'react-native';
import * as React from 'react';
import { Text, Input, Button, FAB } from 'react-native-elements';

import { Skeleton, VStack, HStack, Center, NativeBaseProvider } from "native-base";
import stylesColor from '../style/colorApp';
import styles from './input/style'

const LInputButton = (props) => {
    return (
        <NativeBaseProvider>
    <Center w="100%">
      <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
      borderColor: "white"
    }} _light={{
      borderColor: "white"
    }} p="4">
        <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" /> 
      </HStack>
    </Center>
    </NativeBaseProvider>      
    )
}

export default LInputButton