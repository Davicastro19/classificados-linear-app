

import React, { memo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { View, Text, Center, Pressable,Divider } from "native-base";
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dialogCode from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';


const DialogFilter = (props) => {

    return (
                    <Pressable onPress={() => props.close()} style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: stylesColor.secondaryColor,
                        width: wp('100%'),
                        height: hp('20%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <Center>
                         <View style={{backgroundColor:stylesColor.primaryColor, width:wp('20%'), height:hp('0.8%'), borderRadius:50, alignItems:'center', marginBottom:hp('3%')}}><MaterialCommunityIcons name='close' size={6} color={stylesColor.primaryColor20}/></View>
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
                                        props.setFilter(selectedItem)
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
                                        props.setFilter(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            }
                            {props.type === 'category' && 
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
                                        props.setFilter(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            }
                            {props.type === 'subcategory' && 
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
                                        props.setFilter(selectedItem)
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
                            <><SelectDropdown
                        dropdownIconPosition={'right'}
                        buttonTextStyle={dialogCode.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} color={stylesColor.tertiaryColor} size={hp('3%')} />;
                        } }
                        dropdownStyle={dialogCode.dropdown1DropdownStyle}
                        rowStyle={dialogCode.dropdown1RowStyle}
                        rowTextStyle={dialogCode.dropdown1RowTxtStyle}
                        defaultButtonText={props.dataSelect[0]}
                        buttonStyle={dialogCode.buttonStyle}
                        data={props.dataSelect}
                        onSelect={(selectedItem, index) => {
                            props.setFilter(selectedItem);
                        } }
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        } }
                        rowTextForSelection={(item, index) => {
                            return item;
                        } } />
                        <Divider my="1" _light={{
        bg: "muted.800"
      }} _dark={{
        bg: "muted.50"
      }} />
                        <PButton onPress={() => props.onPress()} title="Filtrar" type='material-community' name='filter-check-outline' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' height={hp('5%')}/></>
                   
                            }
                            
                        </Center>
                    </Pressable>
    )
}

export default memo(DialogFilter)


