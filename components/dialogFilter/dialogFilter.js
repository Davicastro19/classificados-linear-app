

import React, { memo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { View, Text, Center, NativeBaseProvider,Pressable } from "native-base";
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dialogCode from './style'
import stylesColor from '../../style/colorApp';


const DialogFilter = (props) => {
    return (
                    <Pressable onPress={() => props.close()} style={dialogCode.bottomNavigationView}>
                        <Center>
                         <View style={{backgroundColor:stylesColor.primaryColor, width:wp('20%'), height:hp('0.8%'), borderRadius:50, alignItems:'center', marginBottom:hp('1%')}}><MaterialCommunityIcons name='close' size={6} color={stylesColor.primaryColor20}/></View>
                            <Text style={dialogCode.title}>{props.question}</Text>
                            {props.type === 'city' &&
                            <SelectDropdown
                                    dropdownIconPosition={'right'}
                                    buttonTextStyle={dialogCode.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} color={stylesColor.tertiaryColor} size={hp('3%')} />;
                                    }}
                                    dropdownStyle={dialogCode.dropdown1DropdownStyle}
                                    rowStyle={dialogCode.dropdown1RowStyle}
                                    rowTextStyle={dialogCode.dropdown1RowTxtStyle}
                                    defaultButtonText={props.dataSelect[0]}
                                    buttonStyle={dialogCode.buttonStyle}
                                    data={props.dataSelect}
                                    onSelect={(selectedItem, index) => {
                                        props.setOrderCity(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            }
                            {props.type === 'district' &&
                                <SelectDropdown
                                    dropdownIconPosition={'right'}
                                    buttonTextStyle={dialogCode.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} color={stylesColor.tertiaryColor} size={hp('3%')} />;
                                    }}
                                    dropdownStyle={dialogCode.dropdown1DropdownStyle}
                                    rowStyle={dialogCode.dropdown1RowStyle}
                                    rowTextStyle={dialogCode.dropdown1RowTxtStyle}
                                    defaultButtonText={props.dataSelect[0]}
                                    buttonStyle={dialogCode.buttonStyle}
                                    data={props.dataSelect}
                                    onSelect={(selectedItem, index) => {
                                        props.setOrderDistrict(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            }
                            {props.type === 'order' &&
                            <SelectDropdown
                                    dropdownIconPosition={'right'}
                                    buttonTextStyle={dialogCode.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} color={stylesColor.tertiaryColor} size={hp('3%')} />;
                                    }}
                                    dropdownStyle={dialogCode.dropdown1DropdownStyle}
                                    rowStyle={dialogCode.dropdown1RowStyle}
                                    rowTextStyle={dialogCode.dropdown1RowTxtStyle}
                                    defaultButtonText={props.dataSelect[0]}
                                    buttonStyle={dialogCode.buttonStyle}
                                    data={props.dataSelect}
                                    onSelect={(selectedItem, index) => {
                                        props.setOrderDistrict(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            }
                            
                        </Center>
                    </Pressable>
    )
}

export default memo(DialogFilter)


