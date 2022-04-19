import { View, Text,TextInput } from 'react-native';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/InputILongText';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const InputILongText = (props) => {
    return ( 
        <View style={{ height:'80%', width: props.width, borderColor: '#FFC77A', borderWidth: 1, borderRadius: 8, backgroundColor: "#122829"}}>
            <View style={{  marginLeft:5 }}>
                <Text style={{ fontSize: 15, color: '#FFC77A', fontWeight: 'bold' }}>{props.text}</Text>
            </View>
            <TextInput multiline={true} maxLength={392} style={styles.inputList} onChangeText={valuesList => { props.setValue(valuesList) }} value={props.value} placeholder="A casa é arejada, visão bonita e ..." />
            
        </View>
    )
}
export default InputILongText