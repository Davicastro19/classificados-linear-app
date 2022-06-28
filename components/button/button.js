import * as React from 'react';
import {Button } from 'react-native-elements';
import button from './style'

const PButton = (props) => {
    return (
        <Button style={{}} onPress={() => props.onPress()} 
        title={props.title}
        icon={{ size: props.size, type: props.type, name: props.name, color: props.color }}
        iconLeft iconContainerStyle={ button.iconContainerStyle }  
        buttonStyle={{backgroundColor: props.backgroundColor, borderColor: props.color, borderWidth: 1, borderRadius: 6, }} 
        containerStyle={{ width: props.width ,marginLeft: props.marginLeft, height: props.height}} 
        titleStyle={{ color: props.color, fontSize:props.fontSize, fontFamily:props.fontFamily, marginRight:10}} />
                    
    )
}

export default PButton