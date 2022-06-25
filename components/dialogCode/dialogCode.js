import React, { memo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Button, Actionsheet, useDisclose, Text, Box, Center, NativeBaseProvider } from "native-base";
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import Notification from '../notification/notification';
import { TextComponent } from 'react-native';
import { Input } from 'react-native-elements';
import dialogCode from './style'
const DialogCode = (props) => {
    return (
        <NativeBaseProvider>
            <Center>
                <Actionsheet isOpen={props.visable} onTouchMove={() => props.close()} disableOverlay>
                    <Actionsheet.Content background={stylesColor.primaryColor}>
                        <Actionsheet.Item background={stylesColor.primaryColor}>
                            <View style={{ height: hp('25%'), width: wp('90%') }}>
                                <Center>
                                    <Text style={{ color: 'white', fontFamily: "Raleway-SemiBold" }}>Verificação de usuario</Text>
                                    <Text style={{ color: 'white',fontFamily: "Raleway-LightItalic" }}>Confira o código no seu email.</Text>
                                    <Text style={dialogCode.errorMessage}>{props.erroMessageCode}</Text>
                                    <Input onChangeText={value => {props.onChangeText(value)} } inputContainerStyle={dialogCode.inputIcon} placeholderTextColor={stylesColor.tertiaryColor20} style={dialogCode.input} placeholder="Código" leftIcon={{ size: hp('2.2%'), type: 'material-community', name:'form-textbox-password' , color: stylesColor.tertiaryColor}} />    
                                    <PButton onPress={() => props.FullSignUp()} title="Verificar" type='material-community' name='check-outline' size={hp('2.0%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-SemiBold' />

                                </Center>

                            </View>

                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        </NativeBaseProvider>
    )//
}

export default memo(DialogCode)