

import React, { memo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { View, Text, Center, NativeBaseProvider, Pressable, Divider } from "native-base";
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import select from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';


const Select = (props) => {
    return (
        <SelectDropdown
            dropdownIconPosition={'right'}
            buttonTextStyle={select.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} color={stylesColor.tertiaryColor} size={hp('3%')} />;
            }}
            dropdownStyle={select.dropdown1DropdownStyle}
            rowStyle={select.dropdown1RowStyle}
            rowTextStyle={select.dropdown1RowTxtStyle}
            defaultButtonText={props.value}
            buttonStyle={{ width: props.width, height: hp('5%'), backgroundColor: stylesColor.primaryColor, borderRadius: 6, borderWidth: 1.5, borderColor: stylesColor.tertiaryColor, alignItems: 'center', justifyContent: "center" }}
            data={props.dataSelect}
            onSelect={(selectedItem, index) => {
                props.setSelect(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    )
}

export default memo(Select)


