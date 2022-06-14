import { View, Pressable, Keyboard, TextInput, Linking, RefreshControl, StatusBar } from 'react-native';
import { Text, FAB, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import tenantService from '../services/TenantSevice';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import  Config  from '../util/Config'
import styles from '../style/Homes'
import {
    ScrollView,
    FlatList,
    NativeBaseProvider,
} from 'native-base';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import housesService from '../services/HousesService';



export default function Homes() {
    const [loading,setLoading] = useState(false)
    const [take,setTake] = useState(20)
    const [orderCity,setOrderCity] = useState('Ibotirama')
    const [orderDistrict,setOrderDistrict] = useState('Todos Bairros')
    const [orderAll,setOrderAll] = useState('Mais Recentes')
    const [skip,setSkip] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [houses, setHouses] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [specificHouse, setSpecificHouse] = useState(false)
    const onRefresh = React.useCallback(() => {
        setTake(20)
        setSkip(0)
        if (orderDistrict === 'Todos Bairros'){
            allHouses(0,20)
        }
        else{ 
            setTake(20)
            setSkip(0) 
            getHouseFiltered()
        }
        
        setRefreshing(false);
    }, []);

    async function moreHouses(){
        if (loading) return;
        setLoading(true);
        let nSkip = skip
        nSkip = nSkip+20
        let nTake = take
        nTake = nTake+20
        setSkip(nSkip)
        setTake(nTake)
        if (orderDistrict === 'Todos Bairros'){
            allHouses(nSkip, nTake)
        }
        else{ 
            setSkip(nSkip)
            setTake(nTake)  
            getHouseFiltered()
        }
            
    }
    function validateImage(image, value) {
        try {
            return Config.API_URL+'houses/'+image.split(',')[value-1]
        } catch (e) {
            return false
        }
    }
    function resetState(){
        setShowFilter(false)
        setSpecificHouse(false)
        setIsLoading(false)

    }
    function setOrderMain(value){
        //console.log(value)
        if (value === 'Maior Valor'){
            setOrderAll('bigger')
        }else if(value === 'Menor Valor'){
            setOrderAll('smaller')
        }else{
            setOrderAll('recent')
        }
        //console.log(orderAll)
    }

    function selectHouseById(value) {
        setIsLoading(true)
        housesService.selectHouseById(value)
            .then((response) => {
                setIsLoading(false)
                setSpecificHouse(response.data)
            })
            .catch((error) => {
                //console.log('61 - Homes', error)
                resetState()
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })

    }

    async function getHouseFiltered() {
        if (orderDistrict != 'Todos Bairros'){
            setIsLoading(true)
            setShowFilter(false)
            housesService.getHouseFiltered(skip,take, orderDistrict,orderCity,orderAll)

                .then((response) => {
                    if (skip !== 0){
                    if (response.data.length !== 0){
                        let newList = [...houses, ...response.data]
                        newList = newList.filter(function (a) {
                            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                        }, Object.create(null))
                        setHouses(newList)
                    }}else{
                        setHouses(response.data)
                    }
                    setLoading(false)

                })
                .catch((error) => {
                    setIsLoading(false)
                    //console.log('75 - Homes', error)
                    //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
                })
                if (orderAll === 'bigger'){
                    setOrderAll('Maior Valor')
                }else if(orderAll === 'smaller'){
                    setOrderAll('Menor Valor')
                }else{
                    setOrderAll('Mais Recentes')
                }
        }else{
            allHouses(skip,take)
        }
    }

    async function allHouses(skip,take) {
        setIsLoading(true)
        setShowFilter(false)
        housesService.allHouses(skip,take)
            .then((response) => {
                if (skip !== 0){
                if (response.data.length !== 0){
                    let newList = [...houses, ...response.data]
                    newList = newList.filter(function (a) {
                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                    }, Object.create(null))
                    setHouses(newList)
                }}else{
                    setHouses(response.data)
                }
                setLoading(false)

            })
            .catch((error) => {
                setIsLoading(false)
                //console.log('75 - Homes', error)
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })
    }

    useEffect(() => {
        allHouses(0,20)
    }, [])
    return (
        <View style={styles.container} onPress={() => setPairOptionFunction()}>
            <StatusBar hidden />
            {!showFilter && !specificHouse &&
                <View style={{ width: '100%', height: '6%' }}><Button title=" Filtro" onPress={() => (setIsLoading(false), setShowFilter(true))} icon={{ name: 'filter', type: 'font-awesome', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#fdf5e8' }} />
                </View>}
            {showFilter && !specificHouse &&
                <View style={{ width: '100%', height: '6%' }}><Button title=" Filtrar" onPress={() => getHouseFiltered()} icon={{ name: 'search', type: 'font-awesome', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#fdf5e8' }} />
                </View>}


            <NativeBaseProvider >
                {!isLoading && !showFilter && specificHouse &&
                    <View style={{  justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', borderColor: '#152F30', borderRadius: 6, margin:wp('1%') }}>
                        <View style={{ paddingLeft: 3, paddingRight: 3, paddingTop:3, justifyContent: "space-evenly" }}>
                        
                            <View style={{ borderLeftWidth: 3, borderRightWidth: 3, borderRadius: 6, borderColor: '#1E4344', justifyContent: "space-evenly", flexDirection: 'row', backgroundColor: '#1E4344' }}>
                                <ScrollView horizontal={true}>
                                    <Card.Cover style={{ width: wp('90%'), height: hp('50%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: validateImage(specificHouse.houses_images, 1) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(specificHouse.houses_images, 1) }} />
                                    <Card.Cover style={{ width: wp('90%'), height: hp('50%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: validateImage(specificHouse.houses_images, 2) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(specificHouse.houses_images, 2) }} />
                                    <Card.Cover style={{ width: wp('90%'), height: hp('50%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: validateImage(specificHouse.houses_images, 3) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(specificHouse.houses_images, 3) }} />
                                    <Card.Cover style={{ width: wp('90%'), height: hp('50%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: validateImage(specificHouse.houses_images, 4) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(specificHouse.houses_images, 4) }} />
                                    <Card.Cover style={{ width: wp('90%'), height: hp('50%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: validateImage(specificHouse.houses_images, 5) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(specificHouse.houses_images, 5) }} />
                                    <Card.Cover style={{ width: wp('90%'), height: hp('50%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: validateImage(specificHouse.houses_images, 6) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(specificHouse.houses_images, 6) }} />

                                </ScrollView>
                            </View>
                            <View style={{ paddingLeft: 10, justifyContent: "space-evenly", }} >
                                <Title>{specificHouse.houses_city} - {specificHouse.houses_publicPlace}</Title>
                                <Paragraph><FontAwesome name="bed" color='#000' size={15} /> 4      <FontAwesome5 name="shower" color='#000' size={15} /> 2      <FontAwesome5 name="car" color='#000' size={15} /> 1     <FontAwesome name="handshake-o" color='#000' size={15} /> {specificHouse.houses_type}      <Text style={{ fontWeight: 'bold' }}>R$</Text>{specificHouse.houses_price}</Paragraph>
                                <Paragraph><Text style={{ fontWeight: 'bold' }}>m²</Text> {specificHouse.houses_bed}      <Text style={{ fontWeight: 'bold' }}>IPTU-R$</Text>{specificHouse.houses_tax}       <MaterialIcons name="pets" color='#000' size={15} /> {specificHouse.houses_pet}      <FontAwesome5 name="couch" color='#000' size={15} /> {specificHouse.houses_furniture}</Paragraph>
                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 5 }}>Descrição</Text>
                                <Paragraph style={{  }}>{specificHouse.houses_description}</Paragraph>

                            </View>
                        </View>


                        <View style={{ marginBottom: 5,flexDirection: "row", justifyContent: "space-evenly"}} >
                        <View style={{  width:wp('35%'), flexDirection: "row", justifyContent: "space-evenly", marginRight:hp('18%')}}>
                            <Button title="Voltar   " onPress={() => resetState()} icon={{ name: 'arrow-back-ios', type: 'material-icons', size: 13, color: '#fdf5e8' }} buttonStyle={{ backgroundColor: '#295E60', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('20%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                            <View style={{ marginLeft: '5%', width: wp('15%'), justifyContent: "space-evenly", height: hp('5%'), paddingTop: '1%', backgroundColor: '#fdf5e8', color: '#91FFA36D' }}>
                                <Text style={{ color: '#91FFA36D' }} onPress={() => { Linking.openURL(`https://api.whatsapp.com/send?phone=55${specificHouse.tenant_phone}&text=Gostaria de saber mais sobre a casa que vi no app Linear ímoveis.`); }}>  <MaterialCommunityIcons name="whatsapp" color='#1E4344' size={35} />
                                </Text>
                                
                            </View>
                            </View>
                            <Text style={{ fontSize: 10, marginTop:hp('3%') }}> {specificHouse.houses_creationDate.split(' ')[0]}  </Text>

                        
                        </View>
                    </View>

                }

                {!isLoading && showFilter &&
                    <>
                        <View style={{ backgroundColor: '#1E4344', borderRadius: 6, height: '90%', width: '90%', margin: '5%', marginLeft: '5%', marginRight: '10%' }}>
                            <View style={styles.viewMultiButton}>

                                <View style={styles.viewFiMultiButtonSelect}>
                                    <SelectDropdown
                                        dropdownIconPosition={'right'}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                        renderDropdownIcon={isOpened => {
                                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#1E4344'} size={18} />;
                                        }}
                                        dropdownStyle={styles.dropdown1DropdownStyle}
                                        rowStyle={styles.dropdown1RowStyle}
                                        rowTextStyle={styles.dropdown1RowTxtStyle}

                                        defaultButtonText={orderCity}
                                        buttonStyle={{ width: '70%', backgroundColor: '#122829', borderRadius: 8, borderWidth: 2, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center", marginBottom: 5 }}
                                        data={['Ibotirama']}
                                        onSelect={(selectedItem, index) => {
                                            setOrderCity(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />

                                    <SelectDropdown
                                        dropdownIconPosition={'right'}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                        renderDropdownIcon={isOpened => {
                                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#1E4344'} size={18} />;
                                        }}
                                        dropdownStyle={styles.dropdown1DropdownStyle}
                                        rowStyle={styles.dropdown1RowStyle}
                                        rowTextStyle={styles.dropdown1RowTxtStyle}

                                        defaultButtonText={orderDistrict}
                                        buttonStyle={{ width: '70%', backgroundColor: '#122829', borderRadius: 8, borderWidth: 2, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center", marginBottom: 5 }}
                                        data={['Todos Bairros','Alto do Cruzeiro', 'Alto do Fundão', 'Calumbi', 'Centro',  'Ibotiraminha', 'Morada Real', 'Bairro São Francisco', 'Barão 242', 'Bairro São João', 'Santa Rosa', 'Veredinha', 'Xixa']}
                                        onSelect={(selectedItem, index) => {
                                            setOrderDistrict(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />
                                    <SelectDropdown
                                        dropdownIconPosition={'right'}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                        renderDropdownIcon={isOpened => {
                                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#1E4344'} size={18} />;
                                        }}
                                        dropdownStyle={styles.dropdown1DropdownStyle}
                                        rowStyle={styles.dropdown1RowStyle}
                                        rowTextStyle={styles.dropdown1RowTxtStyle}

                                        defaultButtonText={orderAll}
                                        buttonStyle={{ width: '70%', backgroundColor: '#122829', borderRadius: 8, borderWidth: 2, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center" }}
                                        data={['Mais Recentes','Menor Valor', 'Maior Valor']}
                                        onSelect={(selectedItem, index) => {
                                            setOrderMain(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />
                                    

                                </View>



                            </View>
                        </View></>
                }
                {!showFilter && !specificHouse &&
                    <View style={{ backgroundColor: '#1E4344', flex: 1, justifyContent: 'center', }}>
                        {!houses &&
                            <FAB loading visible={true} icon={{ name: 'add' }} color='#C89A5B' borderColor='rgba(42, 42, 42,1)' size="small" />}
                        {houses &&
                            <FlatList refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />} showsVerticalScrollIndicator={false} data={houses} renderItem={({ item }) =>
                                <Card style={{ justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 5, borderColor: '#152F30', borderRadius: 6 }}>
                                     <Card.Cover style={{ height: hp('65%'), borderRadius: 6, borderWidth: 3, borderColor: '#fdf5e8' }} source={{ uri: validateImage(item.images, '1') == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(item.images, '1') }} />
                                    <Card.Content >
                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.publicPlace} - {item.district}</Text>
                                        <Paragraph><FontAwesome name="bed" color='#000' size={15} /> {item.bed}      <FontAwesome5 name="shower" color='#000' size={15} /> {item.shower}      <FontAwesome5 name="car" color='#000' size={15} /> {item.car}     <FontAwesome name="handshake-o" color='#000' size={15} /> {item.type}      <Text style={{ fontWeight: 'bold' }}>R$</Text>{item.price}</Paragraph>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button title=" Ver mais" onPress={() => selectHouseById(item.id)} icon={{ name: 'info', type: 'font-awesome', size: 15, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ height: hp('5%'), backgroundColor: '#FFF8EE', borderColor: '#295E60', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '30%' }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />
                                        <Text style={{ fontSize: 10, marginLeft: wp('50%'), marginTop:hp('3%') }}>   {item.creationDate.split(' ')[0]}  </Text>
                                    </Card.Actions>
                                </Card>} onEndReached={moreHouses}  onEndReachedThreshold={1} ListFooterComponent={<FAB loading visible={loading} icon={{ name: 'add' }} color='#C89A5B' borderColor='rgba(42, 42, 42,1)' size="small" />} keyExtractor={value => value.id} />
                        }
                    </View>
                }

            </NativeBaseProvider>
        </View>

    );
}