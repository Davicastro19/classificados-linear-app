import React, { memo } from 'react'
import { Spinner, HStack, Center, NativeBaseProvider } from "native-base";
import mLoad from './style'
//import * as Device from 'expo-device';

const MLoad = (props) => {
    return (
        <NativeBaseProvider>
        <HStack space={0} justifyContent="center">
        <Spinner  style={ mLoad.left } color={props.color}  />
        <Spinner  style={ mLoad.right } color={props.borderColor} />
    </HStack>  
    </NativeBaseProvider>    
    )
}

export default memo(MLoad)