import React, { memo } from 'react';
import { Text} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import {  VStack, HStack, Center, NativeBaseProvider, Image } from "native-base";
import cardHouse from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
const CardHouse = (props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="1" my={1}>
                <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
                    _light={{
                        borderColor: stylesColor.primaryColor
                    }} p="2">
                    <VStack flex="1" >
                        <View style={cardHouse.containerRow}>
                            <Text style={cardHouse.fontItem} >
                                {props.item.publicPlace}
                            </Text>

                        </View>
                        <View style={cardHouse.containerRow}>
                            <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderRadius={4} source={{
                                uri: props.validateImage()
                            }} />
                            <View >
                           <View>
                            <View style={cardHouse.containerItem}>
                                <Text style={cardHouse.fontItem} >
                                bed {props.item.bed} 
                                </Text>
                            </View>
                            <View style={cardHouse.containerItem}>
                                <Text style={cardHouse.fontItem} >
                                   showe {props.item.shower} 
                                </Text>
                            </View>
                            <View style={cardHouse.containerItem}>
                                <Text style={cardHouse.fontItem} >
                                 car {props.item.car}  
                                </Text>
                            </View>
                            <View style={cardHouse.containerItem}>
                                <Text style={cardHouse.fontItem} >
                                type {props.item.type}
                                </Text>
                            </View>
                            <View style={cardHouse.containerItem}>
                                <Text style={cardHouse.fontItem} >
                                R${props.item.price}
                                </Text>
                            </View>
                            <PButton onPress={() => props.selectHouseById()} title="Ver mais" type='material-community' name='information-variant' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-Regular' marginLeft={hp('1%')} width={wp('25%')}/>
                            </View>
                            </View>
                        </View>
                        <Text style={cardHouse.fontFooter}>
                            {props.item.city} - {props.item.district}
                        </Text>
                    </VStack>

                </HStack>
            </Center>
        </NativeBaseProvider>
    )//
}

export default memo(CardHouse)