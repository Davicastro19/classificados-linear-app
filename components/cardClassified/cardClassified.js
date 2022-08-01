import React, { memo } from 'react';
import { Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import { VStack, HStack, Center, NativeBaseProvider, Image, ScrollView, Text } from "native-base";
import cardClassified from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, FontAwesome, Octicons, SimpleLineIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
function setFullBrl(value) {
    if (value === '') {
        return value
    } else {
        value = value.replace(/\D/gim, '');
        value = value + '';
        value = parseInt(value.replace(/[\D]+/g, ''));
        value = value + '';
        value = value.replace(/([0-9]{2})$/g, ",$1");

        if (value.length > 6) {
            value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        return value
    }

}
const CardClassified = (props) => {
    const price = setFullBrl(props.specificClassified.classified_price)
    return (
        <NativeBaseProvider>
            <Center flex={1} px="0" my={0} >
                <HStack w={wp('100%')} h={hp('100%')} borderWidth={wp("0.1%")} space={8} rounded="md"
                    _light={{
                        borderColor: stylesColor.tertiaryColor10,
                        backgroundColor: stylesColor.tertiaryColor
                    }} p="2"  >

                    <VStack flex="1" >
                        <Text style={{ fontSize: hp('1.5%'), fontFamily: 'Raleway-Medium' }}>{props.specificClassified.classified_subcategory} - Anunciado: {props.specificClassified.classified_creationDate.split(' ')[0]}  <View style={{ flexDirection: "row", marginRight: hp('0%') }}>

                        </View></Text>
                        <View >
                            <ScrollView horizontal={true} >
                                <Image alt={'a'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificClassified.classified_images.split(',')[0]) }} />
                                <Image alt={'b'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificClassified.classified_images.split(',')[1]) }} />
                                <Image alt={'c'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificClassified.classified_images.split(',')[2]) }} />
                                <Image alt={'d'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificClassified.classified_images.split(',')[3]) }} />
                                <Image alt={'e'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificClassified.classified_images.split(',')[4]) }} />
                                <Image alt={'f'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: props.validateImages(props.specificClassified.classified_images.split(',')[5]) }} />

                            </ScrollView>
                        </View>

                        <View >
                            {props.specificClassified.classified_category === 'Immobile' &&
                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_col7} - {props.specificClassified.classified_district}
                                </Text>
                                    <Text style={cardClassified.fontTitle}>
                                        {props.specificClassified.classified_city} - {props.specificClassified.classified_cep}
                                    </Text>
                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="bed" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col1} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                            <Text style={cardClassified.fontItem}><FontAwesome5 name="couch" color='#000' size={hp('2.0%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col6} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col2} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                            <Text style={cardClassified.fontItem}><Ionicons name="car-sport" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col3} </Text>
                                        </View>

                                        <View style={{ flexDirection: "row", marginRight: hp('0%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="dog" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col4} </Text>
                                        </View>
                                    </View><View style={{ flexDirection: "row", }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="ruler-square" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col5}m² </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontPItem}>IPTU</Text>
                                            <Text style={cardClassified.fontNumber}>R${props.specificClassified.classified_tax} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="warehouse" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_subcategory} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('0%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_type} </Text>
                                        </View>
                                    </View><View style={{ flexDirection: "row", marginTop: hp('3%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View></>}
                            {props.specificClassified.classified_category === 'Car' &&
                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_city}  - {props.specificClassified.classified_district} - {props.specificClassified.classified_cep}


                                </Text><Text style={cardClassified.fontTitle}>
                                        {props.specificClassified.classified_col2} - {props.specificClassified.classified_col1}
                                    </Text><View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="fuel-cell" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col7} </Text>
                                        </View>
                                        {props.specificClassified.classified_subcategory !== 'Embarcação' &&
                                            <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                                <Text style={cardClassified.fontItem}><FontAwesome5 name="superpowers" color='#000' size={hp('2.0%')} /></Text>
                                                <Text style={cardClassified.fontText}>{props.specificClassified.classified_col6} </Text>
                                            </View>
                                        }
                                        <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="calendar" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col4} </Text>
                                        </View>
                                        {(props.specificClassified.classified_subcategory !== 'Van' && props.specificClassified.classified_subcategory !== 'Embarcação') &&
                                            <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                                <Text style={cardClassified.fontItem}><Ionicons name="car-sport" color='#000' size={hp('2.4%')} /></Text>
                                                <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col3} </Text>
                                            </View>}

                                    </View>
                                    <View style={{ flexDirection: "row", }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="speedometer" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col5}Km </Text>
                                        </View>
                                        {(props.specificClassified.classified_subcategory !== 'Embarcação') &&
                                            <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                                <Text style={cardClassified.fontPItem}>IPVA</Text>
                                                <Text style={cardClassified.fontNumber}>R${props.specificClassified.classified_tax} </Text>
                                            </View>
                                        }

                                        <View style={{ flexDirection: "row", marginRight: hp('0%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_type} </Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", }}>
                                        {(props.specificClassified.classified_subcategory !== 'Embarcação' && props.specificClassified.classified_subcategory !== 'Moto') &&
                                            <><View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                                <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="steering" color='#000' size={hp('2.4%')} /></Text>
                                                <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col8}</Text>
                                            </View><View style={{ flexDirection: "row", marginRight: hp('4%') }}>
                                                    <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="car-door" color='#000' size={hp('2.4%')} /></Text>
                                                    <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col9} </Text>
                                                </View></>
                                        }
                                        {(props.specificClassified.classified_subcategory !== 'Embarcação') &&
                                            <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                                <Text style={cardClassified.fontItem}><Octicons name="number" color='#000' size={hp('2.4%')} /></Text>
                                                <Text style={cardClassified.fontNumber}>F.Placa: {props.specificClassified.classified_col10} </Text>
                                            </View>
                                        }
                                    </View>
                                    {(props.specificClassified.classified_subcategory !== 'Embarcação' && props.specificClassified.classified_subcategory !== 'Moto') &&
                                        <View style={{ flexDirection: "row", }}>
                                            <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                                <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="airbag" color='#000' size={hp('2.4%')} /></Text>
                                                <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col11}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                                <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="electric-switch-closed" color='#000' size={hp('2.4%')} /></Text>
                                                <Text style={cardClassified.fontNumber}>Trava E:{props.specificClassified.classified_col13} </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                                <Text style={cardClassified.fontItem}><Entypo name="air" color='#000' size={hp('2.4%')} /></Text>
                                                <Text style={cardClassified.fontNumber}>Ar: {props.specificClassified.classified_col12} </Text>
                                            </View>
                                        </View>}

                                    <View style={{ flexDirection: "row", }}>
                                        {(props.specificClassified.classified_subcategory !== 'Embarcação' && props.specificClassified.classified_subcategory !== 'Moto') &&
                                            <><View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                                <Text style={cardClassified.fontItem}>Kit GNV</Text>
                                                <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col16} </Text>
                                            </View><View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                                    <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="electric-switch" color='#000' size={hp('2.4%')} /></Text>
                                                    <Text style={cardClassified.fontNumber}>Vidro E: {props.specificClassified.classified_col15} </Text>
                                                </View><View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                                    <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="surround-sound" color='#000' size={hp('2.4%')} /></Text>
                                                    <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col12}</Text>
                                                </View></>}

                                        <View style={{ flexDirection: "row", marginRight: hp('0%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialIcons name="color-lens" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col17} </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View>

                                </>}
                            {props.specificClassified.classified_category === 'Electronic' &&
                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_city} - {props.specificClassified.classified_district} - {props.specificClassified.classified_cep}

                                </Text>
                                    <Text style={cardClassified.fontTitle}>
                                        {props.specificClassified.classified_col2} - {props.specificClassified.classified_col1}
                                    </Text>
                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialIcons name="color-lens" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col17} </Text>
                                        </View>
                                        {props.specificClassified.classified_subcategory !== 'Tv' &&
                                            <><View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                                <Text style={cardClassified.fontItem}><MaterialIcons name="memory" color='#000' size={hp('2.0%')} /></Text>
                                                <Text style={cardClassified.fontText}>RAM {props.specificClassified.classified_col3}GB </Text>
                                            </View><View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                                    <Text style={cardClassified.fontItem}><FontAwesome name="hdd-o" color='#000' size={hp('2.4%')} /></Text>
                                                    <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col4}GB </Text>
                                                </View></>}
                                        {props.specificClassified.classified_subcategory === 'Tv' &&

                                            <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                                <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="ruler-square" color='#000' size={hp('2.0%')} /></Text>
                                                <Text style={cardClassified.fontText}>{props.specificClassified.classified_col16} Polegadas </Text>
                                            </View>
                                        }

                                        <View style={{ flexDirection: "row", marginRight: hp('0%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_type} </Text>
                                        </View>
                                    </View><View style={{ flexDirection: "row", marginTop: hp('3%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View></>}
                            {props.specificClassified.classified_category === 'Baskets' &&
                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_city} - {props.specificClassified.classified_district} - {props.specificClassified.classified_cep}

                                </Text>
                                    <Text style={cardClassified.fontTitle}>
                                        {props.specificClassified.classified_col1}
                                    </Text>
                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('2%') }}>
                                            <Text style={cardClassified.fontItem}><Octicons name="number" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>Quantidade de itens: {props.specificClassified.classified_col2} </Text>
                                        </View>

                                        <View style={{ flexDirection: "row", marginRight: hp('0%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_type} </Text>
                                        </View>
                                    </View><View style={{ flexDirection: "row", marginTop: hp('3%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View></>}
                            {props.specificClassified.classified_category === 'Fashion' &&
                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_city}  - {props.specificClassified.classified_district} - {props.specificClassified.classified_cep}


                                </Text><Text style={cardClassified.fontTitle}>
                                        {props.specificClassified.classified_col1}
                                    </Text><View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><Octicons name="number" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>Quatidade: {props.specificClassified.classified_col7} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.5%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col4} </Text>
                                        </View>


                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><Octicons name="number" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontNumber}>Tamanho {props.specificClassified.classified_col3} </Text>
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View>

                                </>}
                            {(props.specificClassified.classified_category === "Job" || props.specificClassified.classified_category === "Services") &&

                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_city}  - {props.specificClassified.classified_district} - {props.specificClassified.classified_cep}


                                </Text><Text style={cardClassified.fontTitle}>
                                        {props.specificClassified.classified_category === "Services" ? props.specificClassified.user_name : props.specificClassified.classified_col5} - {props.specificClassified.classified_col1}
                                    </Text>

                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><FontAwesome5 name="cube" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontItem}>Contratação:</Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_type}</Text>
                                        </View>


                                        <View style={{ flexDirection: "row", marginRight: hp('3%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.5%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col4} </Text>
                                        </View>


                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>


                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><FontAwesome5 name="cubes" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontItem}>Área:</Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_subcategory}</Text>
                                        </View>



                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View>

                                </>}
                                {(props.specificClassified.classified_category === "Animal") &&

                                <><Text style={cardClassified.fontTitle}>
                                    {props.specificClassified.classified_city}  - {props.specificClassified.classified_district} - {props.specificClassified.classified_cep}
                                </Text>
                                <Text style={cardClassified.fontTitle}>
                                  
                                Raça: {props.specificClassified.classified_col1}
                                </Text>

                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><FontAwesome5 name="cube" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontItem}>Mêses:</Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_col3}</Text>
                                        </View>


                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.5%')} /></Text>
                                            <Text style={cardClassified.fontText}>{props.specificClassified.classified_col4} </Text>
                                        </View>

                                        <View style={{ flexDirection: "row", marginRight: hp('1%') }}>
                                            <Text style={cardClassified.fontItem}><FontAwesome5 name="cubes" color='#000' size={hp('2.4%')} /></Text>
                                            <Text style={cardClassified.fontItem}>Animal:</Text>
                                            <Text style={cardClassified.fontNumber}>{props.specificClassified.classified_subcategory}</Text>
                                        </View>



                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: hp('2%') }}>
                                        <Text style={cardClassified.fontNumberPrice}>
                                            R${price}
                                        </Text>
                                    </View>

                                </>}
                            <View style={{ marginTop: hp('1%'), width: wp('90%') }} >
                                <Text style={cardClassified.fontTitle} >
                                    Descrição
                                </Text>
                                <Text style={cardClassified.fontText} >
                                    {props.specificClassified.classified_description} </Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: hp('2%'), width: wp('90%') }} >
                                <PButton onPress={() => { Linking.openURL(`https://api.whatsapp.com/send?phone=55${props.specificClassified.tenant_phone}&text=Gostaria de saber mais sobre a casa que vi no app Linear ímoveis.`); }} title="Contato" type='material-community' name='whatsapp' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#25d366' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                            </View>



                        </View>
                    </VStack>

                </HStack>
            </Center>
        </NativeBaseProvider>
    )
}

export default memo(CardClassified)