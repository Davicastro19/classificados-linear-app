import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/InputIconInText';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const InputIconInText = (props) => {
    return ( 
        <View style={{ height:'100%', width: props.width, borderColor: '#FFC77A', borderWidth: 1, borderRadius: 8, backgroundColor: "#122829", flexDirection: "row" }}>
            <View style={{ paddingTop: 10, marginLeft:5 }}>
                <Text style={{ fontSize: 15, color: '#FFC77A', fontWeight: 'bold' }}>{props.text}</Text>
            </View>
            
            <Input autoComplete={true}
                    value={props.value}
                    inputContainerStyle={styles.inputIcon}
                    placeholderTextColor='rgba(190, 170, 128, 0.51)' style={styles.input}
                    onChangeText={value => { props.setValue(value) }}
                    placeholder={props.placeholder}
                    keyboardType="number-pad"
                    returnKeyType="done" />
        </View>
    )
}
export default InputIconInText