import { View, Pressable, Keyboard, TextInput, Linking } from 'react-native';
import { Text, FAB, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import tenantService from '../services/TenantSevice';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/Homes'
import {
    FlatList,
    NativeBaseProvider,
} from 'native-base';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




export default function Homes() {
    const [isLoading, setIsLoading] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [houses, setHouses] = useState([])
    const [specificHouse, setSpecificHouse] = useState([])
    const [gale, setGale] = useState('0')
    const [day, setDay] = useState('7')
    const [listPair, setListPair] = useState(['EURUSD', 'EURUSD-OTC'])
    const [percentage, setPercentage] = useState('70')
    const [time, setTime] = useState('1')
    const [pair, setPair] = useState('EURUSD')
    const [news, setNews] = useState('NAO')

    const fetchPairs = async () => {
        const pairs = await tenantService.pairs();
        return pairs;
    }

    const data = [{
        id: "bd7acbea-c1b1-46345c2-aed5-3ad53abb28ba",
        publicplace: "Rua dos rodrigues",
        district:"vila caasrboane",
        bedrooms: "2",
        bathrooms: "1",
        garage:"0",
        value:"700,00",
        images: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png",
        type:"Alugar",
        
    }, {
        id: "bd7acbea-c1b1-46c2-aed5-3ryad53abb28ba",
        publicplace: "Rua dos asdasd",
        district:"vila carbone",
        bedrooms: "2",
        bathrooms: "2",
        garage:"3",
        value:"700,00",
        images: "http://s2.glbimg.com/ef0s2WBnEdF7w4r48fwP08q1L-s=/smart/e.glbimg.com/og/ed/f/original/2016/02/22/apartamento-kg-kebabie-arquitectos-01.jpg",
        type:"Vender",

    }, {
        id: "bd7acbea-c1b1-46c2-aed5-3adrt53abb28ba",
        publicplace: "Rua dos dfgdfgdfgdfg",
        district:"vila carbone",
        bedrooms: "3",
        bathrooms: "2",
        garage:"0",
        value:"700,00",
        images: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png",
        type:"Alugar",
        
    }, {
        id: "bd7acbea-c1b1-46c2-oaed5-3ad53abb28ba",
        publicplace: "Rua dos dfg",
        district:"vila carbone",
        bedrooms: "3",
        bathrooms: "3",
        garage:"1",
        value:"700,00",
        images: "http://s2.glbimg.com/ef0s2WBnEdF7w4r48fwP08q1L-s=/smart/e.glbimg.com/og/ed/f/original/2016/02/22/apartamento-kg-kebabie-arquitectos-01.jpg",
        type:"Vender",

    }, {
        id: "bd7acbea-c1b1-46cr2-aed5-3ad53abb28ba",
        publicplace: "Rua dos dfgdf",
        district:"vila carbone",
        bedrooms: "2",
        bathrooms: "1",
        garage:"0",
        value:"700,00",
        images: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png",
        type:"Alugar",
        
    }, {
        id: "bd7awcbea-c1b1-46c2-aed5-3ad53abb28ba",
        publicplace: "Rua dos klolo",
        district:"vila carbone",
        bedrooms: "6",
        bathrooms: "3",
        garage:"2",
        value:"700,00",
        images: "http://s2.glbimg.com/ef0s2WBnEdF7w4r48fwP08q1L-s=/smart/e.glbimg.com/og/ed/f/original/2016/02/22/apartamento-kg-kebabie-arquitectos-01.jpg",
        type:"Vender",

    }];
    

    function houseInfor(value) {
        setShowInfo(true)
        if (specificHouse){
            setShowInfo(true)
    }
    }

    function getHouses() {
        setShowFilter(false)
        setIsLoading(false)
        setShowInfo(false)
        //let data = {
        //    pair: pair,
        //    time: time,
        //    gale: gale,
        //    day: day,
        //    percentage: percentage,
        //    news: news,
        //}
        //tenantService.getCataloguing(data)
        //    .then((response) => {
        //        setIsLoading(false)
        //        if (response.data.status) {
        //            setCatalogData(response.data.message)
        //        } else {
        //            setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
        //        }
//
        //    })
        //    .catch((error) => {
        //        setIsLoading(false)
        //        //console.log('adsdw', error)
        //        setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
        //    })
    }

    function setPairOptionFunction(value) {
        setPair(value)
    }


    //useEffect(() => {
    //  fetchPairs()
    //    .then((response) => {
    //      setListPair(response.data.pairs)
    //    })
    //    .catch((
    //      setListPair(['EURUSD', 'EURUSD-OTC'])))
    //}, [])
    return (
        <View style={styles.container} onPress={Keyboard.dismiss}>
            {!showFilter && !showInfo &&
                <View style={{ width: '100%', height: '6%' }}><Button title=" Filtro" onPress={() => setShowFilter(!showFilter)} icon={{ name: 'filter', type: 'font-awesome', size: 19, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#FFC77A' }} />
                </View>}
            {showFilter && !showInfo &&
                <View style={{ width: '100%', height: '6%' }}><Button title=" Filtrar" onPress={() => getHouses()} icon={{ name: 'search', type: 'font-awesome', size: 19, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#FFC77A' }} />
                </View>}


            <NativeBaseProvider >
            {!isLoading && !showFilter && showInfo && specificHouse &&
                    <Card style={{ borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 10, borderColor: '#152F30', borderRadius: 6 }}>
                    <Title  style={{  color: '#152F30'}}>   Detalhes</Title>
                        <Card.Cover source={{ uri: "https://imgbr.imovelwebcdn.com/avisos/2/29/63/14/95/07/720x532/2593989414.jpg" }} />
                        <Card.Content>
                            <Title>Rua dos rodrigues - Perdizes</Title>
                            <Paragraph><FontAwesome name="bed" color='#000' size={15} /> 4      <FontAwesome5 name="shower" color='#000' size={15} /> 2      <FontAwesome5 name="car" color='#000' size={15} /> 1     <FontAwesome name="handshake-o" color='#000' size={15} /> Vender      <Text style={{ fontWeight: 'bold' }}>R$</Text>250,00</Paragraph>
                            <Paragraph><Text style={{ fontWeight: 'bold' }}>m²</Text> 4      <Text style={{ fontWeight: 'bold' }}>IPTU-R$</Text>20,00      <MaterialIcons name="pets" color='#000' size={15} /> SIM     <FontAwesome5 name="couch" color='#000' size={15} /> SIM      <Text style={{ fontWeight: 'bold' }}>R$</Text>250,00</Paragraph>
                            <Paragraph></Paragraph>
                            <Text style={{ fontWeight: 'bold' }}>Descrição</Text>
                            <Paragraph>adjaba sdfsdfs fsd fsdf sdfsdfgdfghkdfg;.sdfsdfuhslidfb sdfbjsdfbsajd fsjdbfhjhb</Paragraph>
                       

                        </Card.Content>
                        <Card.Actions>
                            <Button title=" Sair" onPress={() => setShowInfo(!showInfo)} icon={{ name: 'info', type: 'font-awesome', size: 19, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '30%' }} titleStyle={{ color: '#1E4344' }} />
                            <View style={{marginLeft:'5%',width:'14%', height:'100%', padding:'1%', backgroundColor:'#152F30', color:'#91FFA36D', borderRadius:6,borderWidth:1}}><Text style={{color:'#91FFA36D'}}  onPress={() => { Linking.openURL(`https://api.whatsapp.com/send?phone=55$numero&text=Gostaria de saber mais sobre a casa que vi no app Linear ímoveis.`);}}    >  <MaterialCommunityIcons name="whatsapp" color='#91FFA36D' size={30} /></Text></View>
                            </Card.Actions>
                    </Card>
                }
            
                {!isLoading && showFilter &&
                    <>
                        <View style={{ backgroundColor: '#1E4344', borderRadius: 6, height:'90%' ,width: '90%', margin: '5%', marginLeft: '5%', marginRight: '10%' }}>
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

                                        defaultButtonText={'Cidade'}
                                        buttonStyle={{ width: '70%', backgroundColor: '#122829', borderRadius: 8, borderWidth: 4, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center", marginBottom: 5 }}
                                        data={['Ibotirama']}
                                        onSelect={(selectedItem, index) => {
                                            setPairOptionFunction(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
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

                                        defaultButtonText={'Bairro'}
                                        buttonStyle={{ width: '70%', backgroundColor: '#122829', borderRadius: 8, borderWidth: 4, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center", marginBottom: 5 }}
                                        data={['Menor Valor', 'Maior Valor']}
                                        onSelect={(selectedItem, index) => {
                                            setDay(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
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

                                        defaultButtonText={'Menor valor'}
                                        buttonStyle={{ width: '70%', backgroundColor: '#122829', borderRadius: 8, borderWidth: 4, borderBottomWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#FFC77A', alignItems: 'center', justifyContent: "center" }}
                                        data={['Menor Valor', 'Maior Valor']}
                                        onSelect={(selectedItem, index) => {
                                            setPercentage(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                    />

                                </View>
                                


                            </View>
                        </View></>
                }
                {!showInfo &&  !showFilter &&
                <View style={{ backgroundColor: '#1E4344', flex: 1, justifyContent: 'center', }}>
                    <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item }) =>
                        <Card style={{ borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 10, borderColor: '#152F30', borderRadius: 6 }}>
                            <Card.Cover source={{ uri: item.images }} />
                            <Card.Content>
                                <Title>{ item.publicplace} - {item.district}</Title>
                                <Paragraph><FontAwesome name="bed" color='#000' size={15} /> {item.bedrooms}      <FontAwesome5 name="shower" color='#000' size={15} /> {item.bathrooms}      <FontAwesome5 name="car" color='#000' size={15} /> {item.garage}     <FontAwesome name="handshake-o" color='#000' size={15} /> {item.type}      <Text style={{ fontWeight: 'bold' }}>R$</Text>{item.value}</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button title=" Ver mais" onPress={() => houseInfor(item.id)} icon={{ name: 'info', type: 'font-awesome', size: 19, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '30%' }} titleStyle={{ color: '#1E4344' }} />

                            </Card.Actions>
                        </Card>} keyExtractor={value => value.id} />
                </View>}
            </NativeBaseProvider>
        </View>

    );
}