import React, { memo } from 'react';
import { Text} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import {  VStack, HStack, Center, NativeBaseProvider, Image } from "native-base";
import cardHouses from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons,Ionicons } from '@expo/vector-icons';
const CardHouses = (props) => {
    return (
        
            <Center  flex={1} px="1" my={1}>
                <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
                    _light={{
                        borderColor: stylesColor.tertiaryColor10,
                        backgroundColor: stylesColor.tertiaryColor
                    }} p="2">
                    <VStack flex="1" >
                        <View style={cardHouses.containerRow}>
                            <Text style={cardHouses.fontItem} >
                                {props.item.publicPlace}
                            </Text>

                        </View>
                        <View style={cardHouses.containerRow}>
                            <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                uri: props.validateImage()
                            }} />
                            <View >
                           <View>
                            <View style={cardHouses.containerItem}>
                            <MaterialCommunityIcons name="bed" color='#000' size={hp('2.4%')}  />
                                <Text style={cardHouses.fontNumber} >
                                Quartos: {props.item.bed} 
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.4%')}  />
                                <Text style={cardHouses.fontNumber} >
                                   Banheiro: {props.item.shower} 
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <Ionicons name="car-sport" color='#000' size={hp('2.4%')}  />
                            
                                <Text style={cardHouses.fontNumber} >
                                 Vagas: {props.item.car}  
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')}  />
                            
                                <Text style={cardHouses.fontNumber} >
                                 {props.item.type}
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <Text style={cardHouses.fontNumber} >
                            R${props.item.price}
                                </Text>
                            </View>
                            <PButton onPress={() => props.selectHouseById()} title="Ver mais" type='material-community' name='information-variant' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='MPLUS1p-Regular' marginLeft={hp('1%')} width={wp('25%')}/>
                            </View>
                            </View>
                        </View>
                        <Text style={cardHouses.fontFooter}>
                            {props.item.city} - {props.item.district}
                        </Text>
                    </VStack>

                </HStack>
            </Center>
    )//
}

export default memo(CardHouses)