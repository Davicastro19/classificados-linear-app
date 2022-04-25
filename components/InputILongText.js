import { View, Text,TextInput } from 'react-native';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/InputILongText';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const InputILongText = (props) => {
    return ( 
        <View style={{ height:props.height, width: props.width, borderColor: '#295E60', borderWidth: 1, borderRadius: 8, backgroundColor: "#122829"}}>
            <View style={{  marginLeft:5 }}>
                <Text style={{ fontSize: 15, color: '#fdf5e8', }}>{props.text}</Text>
            </View>
            <TextInput multiline={true} maxLength={316} style={styles.inputList} onChangeText={valuesList => { props.setValue(valuesList) }} value={props.value} placeholder="A casa é arejada, visão bonita e ..." />
            
        </View>
    )
}
export default InputILongText