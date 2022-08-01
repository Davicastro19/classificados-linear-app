import React, { memo } from 'react';
import { Text} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import {  VStack, HStack, Center, Image } from "native-base";
import cardClassifieds from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { MaterialCommunityIcons, Ionicons, FontAwesome, MaterialIcons, SimpleLineIcons, Octicons,Fontisto,Zocial } from '@expo/vector-icons';
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
const CardMyClassifieds = (props) => {
    const price = setFullBrl(props.item.classified_price)
    return (

            <Center  flex={1} px="1" my={1}>
            
                <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
                    _light={{
                        borderColor: stylesColor.tertiaryColor10,
                        backgroundColor: stylesColor.tertiaryColor
                    }} p="2">
                    
                    <VStack flex="1" >
                     
                            {props.item.classified_category === 'Immobile' &&
                        <><View style={cardClassifieds.containerRow}>
                            <MaterialIcons name="house" color='#000' size={hp('2.4%')} />
                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_col7}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="warehouse" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_subcategory}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="bed" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Quartos: {props.item.classified_col1}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Ionicons name="car-sport" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                Vagas: {props.item.classified_col3}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>


                    }
                    {props.item.classified_category === 'Car' &&

                        <><View style={cardClassifieds.containerRow}>
                            {props.item.classified_subcategory == 'Carro' &&
                                <Ionicons name={"car-sport"} color='#000' size={hp('2.4%')} />}
                            {props.item.classified_subcategory == 'Moto' &&
                                <FontAwesome name={"motorcycle"} color='#000' size={hp('2.4%')} />}
                            {props.item.classified_subcategory == 'Embarcação' &&
                                <MaterialCommunityIcons name={"sail-boat"} color='#000' size={hp('2.4%')} />}
                            {props.item.classified_subcategory == 'Van' &&
                                <MaterialCommunityIcons name={"car-estate"} color='#000' size={hp('2.4%')} />}


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_col2} - {props.item.classified_col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="calendar" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Ano: {props.item.classified_col4}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="speedometer" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col5} Km
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="fuel-cell" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col7}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>

                    }
                    {(props.item.classified_category === 'Electronic') &&

                        <><View style={cardClassifieds.containerRow}>
                            {props.item.classified_subcategory == 'Smartphone' &&
                                <SimpleLineIcons name={"screen-smartphone"} color='#000' size={hp('2.4%')} />}
                            {props.item.classified_subcategory == 'Tv' &&
                                <FontAwesome name={"tv"} color='#000' size={hp('2.4%')} />}
                            {props.item.classified_subcategory == 'Embarcação' &&
                                <MaterialCommunityIcons name={"sail-boat"} color='#000' size={hp('2.4%')} />}
                            {props.item.classified_subcategory == 'Van' &&
                                <MaterialCommunityIcons name={"car-estate"} color='#000' size={hp('2.4%')} />}


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_col2} - {props.item.classified_col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                        {props.item.classified_subcategory === "Tv" &&
                                            <><View style={cardClassifieds.containerItem}>
                                                <FontAwesome name="tv" color='#000' size={hp('2.4%')} />
                                                <Text style={cardClassifieds.fontNumber}>
                                                    {props.item.classified_col16} Plegadas
                                                </Text>
                                            </View></>}
                                        {props.item.classified_subcategory !== "Tv" &&
                                            <><View style={cardClassifieds.containerItem}>
                                                <MaterialCommunityIcons name="memory" color='#000' size={hp('2.4%')} />
                                                <Text style={cardClassifieds.fontNumber}>
                                                    RAM {props.item.classified_col3}GB
                                                </Text>
                                            </View><View style={cardClassifieds.containerItem}>
                                                    <FontAwesome name="hdd-o" color='#000' size={hp('2.4%')} />
                                                    <Text style={cardClassifieds.fontNumber}>
                                                        Mem.{props.item.classified_col4}GB
                                                    </Text>
                                                </View></>
                                        }


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Ionicons name="color-palette" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col17}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.classified_subcategory === "Tv" &&
                                            <><View style={cardClassifieds.containerItem}>
                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View></>}

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>

                    }
                    {(props.item.classified_category === 'Baskets') &&
                        <><View style={cardClassifieds.containerRow}>
                            <SimpleLineIcons name={"basket-loaded"} color='#000' size={hp('2.4%')} />


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_subcategory} - {props.item.classified_col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Octicons name="number" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Q. Itens {props.item.classified_col2}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Ionicons name="" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Ionicons name="" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                            </Text>
                                        </View>

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>
                    }
                    {(props.item.classified_category === 'Fashion') &&
                        <><View style={cardClassifieds.containerRow}>
                            <Fontisto name={"shopping-bag-1"} color='#000' size={hp('2.4%')} />


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_subcategory} - {props.item.classified_col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Octicons name="number" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Q. Itens {props.item.classified_col7}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col4}
                                            </Text>
                                        </View>
                                        {props.item.classified_subcategory !== 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Octicons name="number" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                    Tamanho: {props.item.classified_col3}
                                                </Text>
                                            </View>
                                        }

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.classified_subcategory === 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Ionicons name="" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View>}

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>
                    }
                    {(props.item.classified_category === 'Job' || props.item.classified_category === 'Services') &&
                        <><View style={cardClassifieds.containerRow}>
                             { props.item.classified_category !== 'Services' && 
                            <MaterialCommunityIcons name={"toolbox"} color='#000' size={hp('2.4%')} />}
                            
                            { props.item.classified_category === 'Services' && 
                            <Zocial name={"persona"} color='#000' size={hp('2.4%')} />}

                            
                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_subcategory} - {props.item.classified_col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                    <View style={cardClassifieds.containerItem}>
                                    { props.item.classified_category !== 'Services' && 
                            <MaterialCommunityIcons name={"toolbox"} color='#000' size={hp('2.4%')} />}
                            
                            { props.item.classified_category === 'Services' && 
                            <Zocial name={"persona"} color='#000' size={hp('2.4%')} />}
                                            <Text style={cardClassifieds.fontNumber}>
                                            { props.item.classified_category !== 'Services' && 
                            "Vaga de Trab."}
                            
                            { props.item.classified_category === 'Services' && 
                            "Serviço | Job"}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Octicons name="number" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Q. Itens {props.item.classified_col7}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col4}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.classified_subcategory === 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Ionicons name="" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View>}
                                        

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>
                    }
                    {(props.item.classified_category === 'Animal') &&
                        <><View style={cardClassifieds.containerRow}>
                            <MaterialIcons name={"pets"} color='#000' size={hp('2.4%')} />
                            
                            <Text style={cardClassifieds.fontItem}>
                                {props.item.classified_subcategory} - {props.item.classified_col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                    <View style={cardClassifieds.containerItem}>
                                   
                            <MaterialCommunityIcons name={"calendar"} color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col3} Mêses
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Octicons name="number" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Quantid. {props.item.classified_col7}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.classified_col4}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.classified_subcategory === 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Ionicons name="" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View>}
                                        

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.classified_city} - {props.item.classified_district}
                            </Text></>
                    }
                        <Text style={cardClassifieds.fontFooter}>
                            {props.item.classified_classified_city} - {props.item.classified_classified_district}
                        </Text>
                    </VStack>

                </HStack>
                
            </Center>
    )
}

export default memo(CardMyClassifieds)