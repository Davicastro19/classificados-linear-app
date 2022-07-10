import React, { memo } from 'react'
import stylesColor from '../../style/colorApp';
import styles from './style'
import { Input } from 'react-native-elements';

const PInputLong = (props) => {
    return (
        <Input 
        {...props}
        
        returnKeyType="done" 
     
        inputContainerStyle={styles.inputIcon}  
        
        style={styles.input} 
       
        placeholder={props.placeholder} 
        
        leftIcon={{ size: props.size, type: props.type, name: props.name, color: stylesColor.primaryColor}} 
        />       
    )
}

export default memo(PInputLong)