import React, { memo } from 'react';
import { Text} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import {  VStack, HStack, Center, Image } from "native-base";
import cardClassifieds from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
const CardClassifieds = (props) => {
    return (
        
            <Center  flex={1} px="1" my={1}>
                <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
                    _light={{
                        borderColor: stylesColor.tertiaryColor10,
                        backgroundColor: stylesColor.tertiaryColor
                    }} p="2">
                    <VStack flex="1" >
                        <View style={cardClassifieds.containerRow}>
                            <Text style={cardClassifieds.fontItem} >
                                {props.item.col7}
                            </Text>

                        </View>
                        <View style={cardClassifieds.containerRow}>
                            <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                uri: props.validateImage()
                            }} />
                            <View >
                           <View>
                            <View style={cardClassifieds.containerItem}>
                            <MaterialCommunityIcons name="bed" color='#000' size={hp('2.4%')}  />
                                <Text style={cardClassifieds.fontNumber} >
                                Quartos: {props.item.col1} 
                                </Text>
                            </View>
                            <View style={cardClassifieds.containerItem}>
                            <MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.4%')}  />
                                <Text style={cardClassifieds.fontNumber} >
                                   Banheiro: {props.item.col2} 
                                </Text>
                            </View>
                            <View style={cardClassifieds.containerItem}>
                            <Ionicons name="car-sport" color='#000' size={hp('2.4%')}  />
                            
                                <Text style={cardClassifieds.fontNumber} >
                                 Vagas: {props.item.col3}  
                                </Text>
                            </View>
                            <View style={cardClassifieds.containerItem}>
                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')}  />
                            
                                <Text style={cardClassifieds.fontNumber} >
                                 {props.item.type}
                                </Text>
                            </View>
                            <View style={cardClassifieds.containerItem}>
                            <Text style={cardClassifieds.fontNumber} >
                            R${props.item.price}
                                </Text>
                            </View>
                            <PButton onPress={() => props.selectClassifiedById()} title={props.title}  name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')}/>
                            </View>
                            </View>
                        </View>
                        <Text style={cardClassifieds.fontFooter}>
                            {props.item.city} - {props.item.district}
                        </Text>
                    </VStack>

                </HStack>
            </Center>
    )
}

export default memo(CardClassifieds)