import React, { memo } from 'react';
import { Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import { VStack, HStack, Center, Image } from "native-base";
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
const CardClassifieds = (props) => {
    const price = setFullBrl(props.item.price)
    return (
        <Center flex={1} px="1" my={1}>
            <HStack w={wp('95%')} maxW="500" borderWidth={wp("0.1%")} space={8} rounded="md"
                _light={{
                    borderColor: stylesColor.tertiaryColor10,
                    backgroundColor: stylesColor.tertiaryColor
                }} p="2">
                <VStack flex="1" >
                    {props.item.category === 'Immobile' &&
                        <><View style={cardClassifieds.containerRow}>
                            <MaterialIcons name="house" color='#000' size={hp('2.4%')} />
                            <Text style={cardClassifieds.fontItem}>
                                {props.item.col7}
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
                                                {props.item.subcategory}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="bed" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Quartos: {props.item.col1}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Ionicons name="car-sport" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                Vagas: {props.item.col3}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
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
                                {props.item.city} - {props.item.district}
                            </Text></>


                    }
                    {props.item.category === 'Car' &&

                        <><View style={cardClassifieds.containerRow}>
                            {props.item.subcategory == 'Carro' &&
                                <Ionicons name={"car-sport"} color='#000' size={hp('2.4%')} />}
                            {props.item.subcategory == 'Moto' &&
                                <FontAwesome name={"motorcycle"} color='#000' size={hp('2.4%')} />}
                            {props.item.subcategory == 'Embarcação' &&
                                <MaterialCommunityIcons name={"sail-boat"} color='#000' size={hp('2.4%')} />}
                            {props.item.subcategory == 'Van' &&
                                <MaterialCommunityIcons name={"car-estate"} color='#000' size={hp('2.4%')} />}


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.col2} - {props.item.col1}
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
                                                Ano: {props.item.col4}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="speedometer" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.col5} Km
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="fuel-cell" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.col7}
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
                                {props.item.city} - {props.item.district}
                            </Text></>

                    }
                    {(props.item.category === 'Electronic') &&

                        <><View style={cardClassifieds.containerRow}>
                            {props.item.subcategory == 'Smartphone' &&
                                <SimpleLineIcons name={"screen-smartphone"} color='#000' size={hp('2.4%')} />}
                            {props.item.subcategory == 'Tv' &&
                                <FontAwesome name={"tv"} color='#000' size={hp('2.4%')} />}
                            {props.item.subcategory == 'Embarcação' &&
                                <MaterialCommunityIcons name={"sail-boat"} color='#000' size={hp('2.4%')} />}
                            {props.item.subcategory == 'Van' &&
                                <MaterialCommunityIcons name={"car-estate"} color='#000' size={hp('2.4%')} />}


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.col2} - {props.item.col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                        {props.item.subcategory === "Tv" &&
                                            <><View style={cardClassifieds.containerItem}>
                                                <FontAwesome name="tv" color='#000' size={hp('2.4%')} />
                                                <Text style={cardClassifieds.fontNumber}>
                                                    {props.item.col16} Plegadas
                                                </Text>
                                            </View></>}
                                        {props.item.subcategory !== "Tv" &&
                                            <><View style={cardClassifieds.containerItem}>
                                                <MaterialCommunityIcons name="memory" color='#000' size={hp('2.4%')} />
                                                <Text style={cardClassifieds.fontNumber}>
                                                    RAM {props.item.col3}GB
                                                </Text>
                                            </View><View style={cardClassifieds.containerItem}>
                                                    <FontAwesome name="hdd-o" color='#000' size={hp('2.4%')} />
                                                    <Text style={cardClassifieds.fontNumber}>
                                                        Mem.{props.item.col4}GB
                                                    </Text>
                                                </View></>
                                        }


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Ionicons name="color-palette" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.col17}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.subcategory === "Tv" &&
                                            <><View style={cardClassifieds.containerItem}>
                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View></>}

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.city} - {props.item.district}
                            </Text></>

                    }
                    {(props.item.category === 'Baskets') &&
                        <><View style={cardClassifieds.containerRow}>
                            <SimpleLineIcons name={"basket-loaded"} color='#000' size={hp('2.4%')} />


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.subcategory} - {props.item.col1}
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
                                                Q. Itens {props.item.col2}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
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
                                {props.item.city} - {props.item.district}
                            </Text></>
                    }
                    {(props.item.category === 'Fashion') &&
                        <><View style={cardClassifieds.containerRow}>
                            <Fontisto name={"shopping-bag-1"} color='#000' size={hp('2.4%')} />


                            <Text style={cardClassifieds.fontItem}>
                                {props.item.subcategory} - {props.item.col1}
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
                                                Q. Itens {props.item.col7}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.col4}
                                            </Text>
                                        </View>
                                        {props.item.subcategory !== 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Octicons name="number" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                    Tamanho: {props.item.col3}
                                                </Text>
                                            </View>
                                        }

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.subcategory === 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Ionicons name="" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View>}

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.city} - {props.item.district}
                            </Text></>
                    }
                    {(props.item.category === 'Job' || props.item.category === 'Services') &&
                        <><View style={cardClassifieds.containerRow}>
                             { props.item.category !== 'Services' && 
                            <MaterialCommunityIcons name={"toolbox"} color='#000' size={hp('2.4%')} />}
                            
                            { props.item.category === 'Services' && 
                            <Zocial name={"persona"} color='#000' size={hp('2.4%')} />}

                            
                            <Text style={cardClassifieds.fontItem}>
                                {props.item.subcategory} - {props.item.col1}
                            </Text>

                        </View><View style={cardClassifieds.containerRow}>
                                <Image alt={'s'} h={hp('24%')} w={wp("60%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{
                                    uri: props.validateImage()
                                }} />
                                <View>
                                    <View>
                                    <View style={cardClassifieds.containerItem}>
                                    { props.item.category !== 'Services' && 
                            <MaterialCommunityIcons name={"toolbox"} color='#000' size={hp('2.4%')} />}
                            
                            { props.item.category === 'Services' && 
                            <Zocial name={"persona"} color='#000' size={hp('2.4%')} />}
                                            <Text style={cardClassifieds.fontNumber}>
                                            { props.item.category !== 'Services' && 
                            "Vaga de Trab."}
                            
                            { props.item.category === 'Services' && 
                            "Serviço | Job"}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Octicons name="number" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Q. Itens {props.item.col7}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.col4}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.subcategory === 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Ionicons name="" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View>}
                                        

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.city} - {props.item.district}
                            </Text></>
                    }
                    {(props.item.category === 'Animal') &&
                        <><View style={cardClassifieds.containerRow}>
                            <MaterialIcons name={"pets"} color='#000' size={hp('2.4%')} />
                            
                            <Text style={cardClassifieds.fontItem}>
                                {props.item.subcategory} - {props.item.col1}
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
                                                {props.item.col3} Mêses
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <Octicons name="number" color='#000' size={hp('2.4%')} />
                                            <Text style={cardClassifieds.fontNumber}>
                                                Quantid. {props.item.col7}
                                            </Text>
                                        </View>


                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="handshake" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.type}
                                            </Text>
                                        </View>
                                        <View style={cardClassifieds.containerItem}>
                                            <MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.4%')} />

                                            <Text style={cardClassifieds.fontNumber}>
                                                {props.item.col4}
                                            </Text>
                                        </View>

                                        <View style={cardClassifieds.containerItem}>
                                            <Text style={cardClassifieds.fontNumber}>
                                                R${price}
                                            </Text>
                                        </View>
                                        {props.item.subcategory === 'Beleza e Saúde' &&
                                            <View style={cardClassifieds.containerItem}>
                                                <Ionicons name="" color='#000' size={hp('2.4%')} />

                                                <Text style={cardClassifieds.fontNumber}>
                                                </Text>
                                            </View>}
                                        

                                        <PButton onPress={() => props.selectClassifiedById()} title={props.title} name={props.name} type='material-community' size={hp('2.3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' marginLeft={hp('1%')} width={wp('25%')} />
                                    </View>
                                </View>
                            </View><Text style={cardClassifieds.fontFooter}>
                                {props.item.city} - {props.item.district}
                            </Text></>
                    }
                </VStack>
            </HStack>
        </Center>
    )
}

export default memo(CardClassifieds)