import { View,Text } from 'react-native';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/RegisterHouse';
import { FontAwesome } from '@expo/vector-icons';
import { hasPlatformFeatureAsync } from 'expo-device';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SelectDropdownTextLinear = (props) => {
    return (
        <View style={{width: props.width, height:props.height, borderColor: '#122829', borderWidth: 1,   borderRadius: 8, backgroundColor: "#fdf5e8", padding:1,  alignItems: 'center', }}>
            <View ><Text style={{fontSize:15, color:'#122829'}}>{props.text}</Text></View><View>
            <SelectDropdown dropdownIconPosition={'right'} 
            buttonTextStyle={styles.dropdown1BtnTxtStyle} 
            renderDropdownIcon={isOpened => { return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#fdf5e8'} size={8} />; }}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                defaultButtonText={props.value}
                buttonStyle={{ height:hp('4%'), width: props.widthbt, backgroundColor: '#122829', borderRadius: 8, borderLeftWidth: 1, borderRightWidth:1,borderColor: '#295E60', alignItems: 'center', justifyContent: "center" }}

                data={props.data}
                onSelect={(selectedItem, index) => {
                    props.setValue(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            /></View>
        </View>
    )
}
export default SelectDropdownTextLinear