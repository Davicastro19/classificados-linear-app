import React, { memo } from 'react';
import { Text} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import {  VStack, HStack, Center, Image } from "native-base";
import cardHouses from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons,Ionicons } from '@expo/vector-icons';
const CardMyHouses = (props) => {
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
                                {props.item.houses_publicPlace}
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
                                Quartos: {props.item.houses_bed} 
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.4%')}  />
                                <Text style={cardHouses.fontNumber} >
                                   Banheiro: {props.item.houses_shower} 
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <Ionicons name="car-sport" color='#000' size={hp('2.4%')}  />
                            
                                <Text style={cardHouses.fontNumber} >
                                 Vagas: {props.item.houses_car}  
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')}  />
                            
                                <Text style={cardHouses.fontNumber} >
                                 {props.item.houses_type}
                                </Text>
                            </View>
                            <View style={cardHouses.containerItem}>
                            <Text style={cardHouses.fontNumber} >
                            R${props.item.houses_price}
                                </Text>
                            </View>
                            <PButton onPress={() => props.selectHouseById()} title={props.title}  name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')}/>
                            </View>
                            </View>
                        </View>
                        <Text style={cardHouses.fontFooter}>
                            {props.item.houses_city} - {props.item.houses_district}
                        </Text>
                    </VStack>

                </HStack>
                
            </Center>
    )//
}

export default memo(CardMyHouses)