import React, { memo } from 'react';
import { Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import { VStack, HStack, Center, NativeBaseProvider, Image, ScrollView, Text } from "native-base";
import cardHouse from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
const CardHouse = (props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="0" my={0} >
                <HStack w={wp('100%')} borderWidth={wp("0.1%")} space={8} rounded="md"
                    _light={{
                        borderColor: stylesColor.tertiaryColor10,
                        backgroundColor: stylesColor.tertiaryColor
                    }} p="2"  >
                    
                    <VStack flex="1" >
                    <Text style={{ fontSize: hp('1.5%'),fontFamily:'Raleway-LightItalic' }}> Anunciado: {props.specificHouse.houses_creationDate.split(' ')[0]}  </Text>
                        <View >
                        <ScrollView  horizontal={true} >
                            <Image alt={'a'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificHouse.houses_images.split(',')[0]) }} />
                            <Image alt={'b'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificHouse.houses_images.split(',')[1]) }} />
                            <Image alt={'c'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificHouse.houses_images.split(',')[2]) }} />
                            <Image alt={'d'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificHouse.houses_images.split(',')[3]) }} />
                            <Image alt={'e'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificHouse.houses_images.split(',')[4]) }} />
                            <Image alt={'f'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificHouse.houses_images.split(',')[5]) }} />

                        </ScrollView>
                        </View>
                        <View >
                            <Text style={cardHouse.fontTitle} >
                                {props.specificHouse.houses_publicPlace} - {props.specificHouse.houses_district}
                            </Text>
                            <View style={{ flexDirection: "row",marginTop:hp('2%') }} >
                                <View style={{ flexDirection: "row", marginRight: hp('3%') }} >
                                    <Text style={cardHouse.fontItem} ><MaterialCommunityIcons name="bed" color='#000' size={hp('2.4%')} /></Text>
                                    <Text style={cardHouse.fontNumber} >{props.specificHouse.houses_bed} </Text>
                                </View>
                                <View style={{ flexDirection: "row", marginRight: hp('3%') }} >
                                    <Text style={cardHouse.fontItem} ><FontAwesome5 name="couch" color='#000' size={hp('2.0%')} /></Text>
                                    <Text style={cardHouse.fontText} >{props.specificHouse.houses_furniture} </Text>
                                </View>
                                <View style={{ flexDirection: "row", marginRight: hp('3%') }} >
                                    <Text style={cardHouse.fontItem} ><MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.4%')} /></Text>
                                    <Text style={cardHouse.fontNumber} >{props.specificHouse.houses_shower} </Text>
                                </View>
                                <View style={{ flexDirection: "row", marginRight: hp('3%') }} >
                                    <Text style={cardHouse.fontItem} ><Ionicons name="car-sport" color='#000' size={hp('2.4%')} /></Text>
                                    <Text style={cardHouse.fontNumber} >{props.specificHouse.houses_car} </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginRight: hp('0%') }} >
                                    <Text style={cardHouse.fontItem} ><MaterialCommunityIcons name="dog" color='#000' size={hp('2.4%')} /></Text>
                                    <Text style={cardHouse.fontText} >{props.specificHouse.houses_pet} </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", }} >
                                <View style={{ flexDirection: "row", marginRight: hp('3%') }} >
                                    <Text style={cardHouse.fontItem} ><MaterialCommunityIcons name="ruler-square" color='#000' size={hp('2.4%')} /></Text>
                                    <Text style={cardHouse.fontNumber} >{props.specificHouse.houses_squareMeter}m² </Text>
                                </View>
                                <View style={{ flexDirection: "row", marginRight: hp('5%') }} >
                                    <Text style={cardHouse.fontPItem} >IPTU</Text>
                                    <Text style={cardHouse.fontNumber} >R${props.specificHouse.houses_tax} </Text>
                                </View>
                                <View style={{ flexDirection: "row", marginRight: hp('0%') }} >
                                    <Text style={cardHouse.fontItem} ><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} /></Text>
                                    <Text style={cardHouse.fontText} >{props.specificHouse.houses_type} </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop:hp('3%')}} >
                            <Text style={cardHouse.fontNumberPrice} >
                                   R${props.specificHouse.houses_price}
                                </Text>
                            </View>
                            <View style={{marginTop:hp('3%'), width:wp('90%')}} >
                                <Text style={cardHouse.fontTitle} >
                                    Descrição
                                </Text>
                                <Text style={cardHouse.fontText} >
                                    {props.specificHouse.houses_description} </Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop:hp('2%'),  width:wp('90%')}} >
                             <PButton onPress={() => { Linking.openURL(`https://api.whatsapp.com/send?phone=55${props.specificHouse.tenant_phone}&text=Gostaria de saber mais sobre a casa que vi no app Linear ímoveis.`);  }} title="Contato" type='material-community' name='whatsapp' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#25d366' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                            </View>



                        </View>
                    </VStack>

                </HStack>
            </Center>
        </NativeBaseProvider>
    )//
}

export default memo(CardHouse)