import React, { memo } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Button, Actionsheet, useDisclose, Text, Box, Center, NativeBaseProvider } from "native-base";
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { Input } from 'react-native-elements';
import dialogCode from './style'
const DialogCode = (props) => {
    return (
        <NativeBaseProvider>
            <Center>
                <Actionsheet isOpen={true} disableOverlay>
                    <Actionsheet.Content  background={props.containerColor}>
                        <Actionsheet.Item background={props.containerColor}>
                            <View style={{ height: hp('25%'), width: wp('90%') }}>
                                <Center>
                                    <Text style={dialogCode.title}>Verificação de usuario</Text>
                                    <Text style={dialogCode.description}>Confira o código no seu email.</Text>
                                    <Text style={dialogCode.errorMessage}>{props.erroMessageCode}</Text>
                                    <Input onChangeText={value => {props.onChangeText(value)} } inputContainerStyle={dialogCode.inputIcon} placeholderTextColor={stylesColor.tertiaryColor20} style={dialogCode.input} placeholder="Código" leftIcon={{ size: hp('2.2%'), type: 'material-community', name:'form-textbox-password' , color: stylesColor.tertiaryColor}} />    
                                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                    <View style={{marginRight:10}}>
                                    <PButton onPress={() => props.FullSignUp()} title="Verificar" type='material-community' name='check-outline' size={hp('2.0%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.secondaryColor} fontFamily='MPLUS1p-Medium'  />
                                    </View> 
                                    <PButton onPress={() => props.close()} title="Cancelar" type='material-community' name='close-outline' size={hp('2.0%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='MPLUS1p-Medium' />
                                    
                                    </View>
                                    
                                </Center>
                            </View>
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        </NativeBaseProvider>
    )
}

export default memo(DialogCode)