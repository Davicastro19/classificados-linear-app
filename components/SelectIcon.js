import { View } from 'react-native';
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/RegisterHouse';
import { FontAwesome } from '@expo/vector-icons';

const SelectDropdownIconLinear = (props) => {
    return (
        <View style={{width: props.width, borderColor: '#FFC77A', borderWidth: 1, borderRadius: 8, backgroundColor: "#122829", flexDirection: "row", alignItems: 'center', }}>
            <View style={{ paddingLeft: 5, paddingRight: 7 }}>{props.icon}</View>
            <View><SelectDropdown dropdownIconPosition={'right'} buttonTextStyle={styles.dropdown1BtnTxtStyle} renderDropdownIcon={isOpened => { return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#1E4344'} size={5} />; }}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                defaultButtonText={props.value}
                buttonStyle={{ height: '100%', width: '100%',  backgroundColor: '#122829', borderRadius: 8, borderLeftWidth: 1, borderRightWidth:0, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center" }}

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
export default SelectDropdownIconLinear