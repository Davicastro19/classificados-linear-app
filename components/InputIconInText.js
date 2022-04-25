import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/InputIconInText';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const InputIconInText = (props) => {
    return ( 
        <View style={{ marginLeft:props.marginLeft ,marginRight:props.marginLeft, width:props.width, height: props.height, borderColor: '#122829', borderWidth: 1, borderRadius: 8, backgroundColor: "#fdf5e8", alignItems: 'center', }}>
            <View ><Text style={{fontSize:15, color:'#122829'}}>{props.text}</Text></View>
           
            
            <Input autoComplete={true}
                    value={props.value}
                    inputContainerStyle={styles.inputIcon}
                    placeholderTextColor='rgba(190, 170, 128, 0.51)' style={styles.input}
                    onChangeText={value => { props.setValue(value) }}
                    placeholder={props.placeholder}
                    returnKeyType="done" />
        </View>
    )
}
export default InputIconInText