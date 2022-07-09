import React, { memo } from 'react'
import stylesColor from '../../style/colorApp';
import styles from './style'
import { Input } from 'react-native-elements';

const PInput = (props) => {
    return (
        <Input 
        {...props}
        
        returnKeyType="done" 
        //secureTextEntry={props.secureTextEntry}
        inputContainerStyle={styles.inputIcon}  
        //placeholderTextColor={stylesColor.tertiaryColor10} 
        style={styles.input} 
        //onChangeText={() => { props.setValue(), props.setErroMessage(null) }} 
        placeholder={props.placeholder} 
        //keyboardType={props.keyboardType} 
        //returnKeyType="done" 
        leftIcon={{ size: props.size, type: props.type, name: props.name, color: stylesColor.primaryColor}} 
        />       
    )
}

export default memo(PInput)