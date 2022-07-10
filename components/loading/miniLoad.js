import React, { memo } from 'react'
import { Spinner, HStack } from "native-base";
import mLoad from './style'

const MLoad = (props) => {
    return (
        <HStack space={0} justifyContent="center">
        <Spinner  style={ mLoad.left } color={props.color}  />
        <Spinner  style={ mLoad.right } color={props.borderColor} />
    </HStack>    
    )
}

export default memo(MLoad)