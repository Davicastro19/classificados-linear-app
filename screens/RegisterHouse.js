import { View, Keyboard, TextInput, Linking,Pressable,KeyboardAvoidingView} from 'react-native';
import { Text, FAB, Button, Input } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import tenantService from '../services/TenantSevice';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../style/RegisterHouse'
import {
    FlatList,
    NativeBaseProvider,ScrollView
} from 'native-base';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SelectDropdownIconLinear from '../components/SelectIcon'
import SelectDropdownTextLinear from '../components/SelectText'
import InputIconInText from '../components/InputIconInText'
import InputILongText from '../components/InputILongText'


export default function RegisterHouse() {
    const [bed, setBed] = useState('1')
    const [shower, setShower] = useState('1')
    const [car, setCar] = useState('1')
    const [type, setType] = useState('Alugar')
    const [pet, setPet] = useState('SIM')
    const [price, setPrice] = useState('150.888,66')
    const [iptu, setIptu] = useState('100,66')
    const [squareMeter, setSquareMeter] = useState('100')
    const [forniture, setForniture] = useState('SIM')
    const [publicplace, setPublicplace] = useState('Rua Dr. Manoel Novais')
    const [city, setCity] = useState('Ibotirama')
    const [district, setDistrict] = useState('Centro')
    const [description, setDescription] = useState('Casa arejada, próximo ao mercado e a um panificadora...')



    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(false)
    const [editShow, setEditShow] = useState(false)
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
        district: "vila caasrboane",
        bedrooms: "2",
        bathrooms: "1",
        garage: "0",
        value: "700,00",
        images: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png",
        type: "Alugar",

    }, {
        id: "bd7acbea-c1b1-46c2-aed5-3ryad53abb28ba",
        publicplace: "Rua dos asdasd",
        district: "vila carbone",
        bedrooms: "2",
        bathrooms: "2",
        garage: "3",
        value: "700,00",
        images: "http://s2.glbimg.com/ef0s2WBnEdF7w4r48fwP08q1L-s=/smart/e.glbimg.com/og/ed/f/original/2016/02/22/apartamento-kg-kebabie-arquitectos-01.jpg",
        type: "Vender",

    }, {
        id: "bd7acbea-c1b1-46c2-aed5-3adrt53abb28ba",
        publicplace: "Rua dos dfgdfgdfgdfg",
        district: "vila carbone",
        bedrooms: "3",
        bathrooms: "2",
        garage: "0",
        value: "700,00",
        images: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png",
        type: "Alugar",

    }, {
        id: "bd7acbea-c1b1-46c2-oaed5-3ad53abb28ba",
        publicplace: "Rua dos dfg",
        district: "vila carbone",
        bedrooms: "3",
        bathrooms: "3",
        garage: "1",
        value: "700,00",
        images: "http://s2.glbimg.com/ef0s2WBnEdF7w4r48fwP08q1L-s=/smart/e.glbimg.com/og/ed/f/original/2016/02/22/apartamento-kg-kebabie-arquitectos-01.jpg",
        type: "Vender",

    }, {
        id: "bd7acbea-c1b1-46cr2-aed5-3ad53abb28ba",
        publicplace: "Rua dos dfgdf",
        district: "vila carbone",
        bedrooms: "2",
        bathrooms: "1",
        garage: "0",
        value: "700,00",
        images: "https://swellconstrucoes.com.br/wp-content/uploads/2021/04/apartamento-de-luxo-1.png",
        type: "Alugar",

    }, {
        id: "bd7awcbea-c1b1-46c2-aed5-3ad53abb28ba",
        publicplace: "Rua dos klolo",
        district: "vila carbone",
        bedrooms: "6",
        bathrooms: "3",
        garage: "2",
        value: "700,00",
        images: "http://s2.glbimg.com/ef0s2WBnEdF7w4r48fwP08q1L-s=/smart/e.glbimg.com/og/ed/f/original/2016/02/22/apartamento-kg-kebabie-arquitectos-01.jpg",
        type: "Vender",

    }];

    
    function alterHouse() {
        setEditShow(!editShow)
    }

    function listValue(parameter) {
        let fixedValue = ["75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]
        if (parameter == 'day') {
            fixedValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "20", "21"]
        }
        return fixedValue
    }

    function orderFilter(parameter) {
        let fixedValue = ["75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]
        if (parameter == 'day') {
            fixedValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "20", "21"]
        }
        return fixedValue
    }

    function houseInfor(value) {
        setEditShow(true)
        if (specificHouse) {
            setEditShow(true)
        }
    }

    function getHouses() {
        setShowFilter(false)
        setIsLoading(false)
        setEditShow(false)
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
        <KeyboardAvoidingView style={{width:'100%', height:'100%'}} behavior={Platform.OS == "ios" ? "padding" : "height"} KeyboardVerticalOffset={50}>
      
        
        
        <View style={styles.container} onPress={Keyboard.dismiss}>
            {!editShow &&
                <><View style={{ width: '100%', height: '6%' }}><Button title=" Filtro" onPress={() => setFilter(!filter)} icon={{ name: 'filter', type: 'font-awesome', size: 19, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#FFC77A' }} />
                </View><View style={{ width: '100%', height: '6%' }}><Button title=" Adicionar casa" onPress={() => setFilter(!filter)} icon={{ name: 'add-box', type: 'material-icons', size: 19, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#FFC77A' }} />
                    </View></>}



            <NativeBaseProvider >
            {!isLoading && editShow &&
                <Button title="  Salvar" onPress={() => alterHouse()} icon={{ name: 'save', type: 'font-awesome', size: 15, color:'#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{  backgroundColor: '#FFF8EE', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{paddingTop:10, width: '100%' }} titleStyle={{ color: '#1E4344' }} />
              
                }
                {!isLoading && editShow &&
                    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                        <View style={{ borderWidth: 1.5, backgroundColor: '#fdf5e8', height: '98%', margin: 10, borderColor: '#152F30', borderRadius: 6 }}>
                            <View style={{ height: 2 }}>
                            </View>
                            <Card.Cover style={{ paddingLeft:2,paddingRight:2, borderRadius:8, borderWidth:0, borderColor:'#fdf5e8' }} source={{ uri: "https://imgbr.imovelwebcdn.com/avisos/2/29/63/14/95/07/720x532/2593989414.jpg" }} />
                            
                            <View style={{ paddingBottom: 5 }}></View>

                            <View style={{ marginLeft: 10, marginBottom: 5, width: '100%', height: '7%', flexDirection: "row", alignItems: 'center', }}>
                                <SelectDropdownTextLinear width={'40%'} text={'Cidade'} placeholder={'2.888,66'} setValue={setCity} value={city} data={['São josé dos campos']} />
                            </View>
                            <View style={{ marginLeft: 10, marginBottom: 5, width: '100%', height: '7%', flexDirection: "row", alignItems: 'center', }}>
                                <SelectDropdownTextLinear width={'40%'} text={'Bairro'} placeholder={'2.888,66'} setValue={setDistrict} value={district} data={['Veredinha', 'Alto do cruzeiro']} />
                            </View>
                            <View style={{ marginLeft: 10, marginBottom: 5, height: '6%', flexDirection: "row", alignItems: 'center', }}>
                                <InputIconInText width={'80%'} text={'Logradouro'} placeholder={'2.888,66'} setValue={setPublicplace} value={publicplace} />
                            </View>

                            <View style={{ height: "50%" }} >
                                <View style={{ marginBottom: 5, height: '12%', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly" }}>
                                    <View style={{ width: '35%' }}>
                                        <InputIconInText width={'100%'} text={'R$'} placeholder={'2.888,66'} setValue={setPrice} value={price} />
                                    </View>
                                    <View style={{ width: '25%' }}>
                                        <SelectDropdownIconLinear width={'100%'} setValue={setForniture} value={forniture} icon={<FontAwesome5 name="couch" color='#FFC77A' size={17} />} data={['SIM', 'NÃO']} />
                                    </View>
                                    <View style={{ width: '30%' }}>
                                        <SelectDropdownIconLinear width={'100%'} setValue={setShower} value={shower} icon={<FontAwesome5 name="shower" color='#FFC77A' size={19} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                    </View>

                                </View>



                                <View style={{ marginBottom: 5, height: '14%', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly" }}>
                                    <View style={{ width: '35%' }}>
                                        <InputIconInText width={'80%'} text={'IPTU'} placeholder={'2.888,66'} setValue={setIptu} value={iptu} />
                                    </View>
                                    <View style={{ width: '25%' }}>
                                        <SelectDropdownIconLinear width={'90%'} setValue={setBed} value={bed} icon={<FontAwesome name="bed" color='#FFC77A' size={20} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                    </View>
                                    <View style={{ width: '30%' }}>
                                        <SelectDropdownIconLinear width={'100%'} setValue={setPet} value={pet} icon={<MaterialIcons name="pets" color='#FFC77A' size={20} />} data={['SIM', 'NÃO']} />
                                    </View>

                                </View>

                                <View style={{ height: '14%', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly" }}>
                                    <View style={{ width: '30%' }}>
                                        <InputIconInText width={'100%'} text={'m²'} placeholder={'200'} setValue={setSquareMeter} value={squareMeter} />
                                    </View>
                                    <View style={{ width: '25%' }}>
                                        <SelectDropdownIconLinear width={'90%'} setValue={setCar} value={car} icon={<FontAwesome5 name="car" color='#FFC77A' size={20} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                    </View>
                                    <View style={{ width: '35%' }}>
                                        <SelectDropdownIconLinear width={'100%'} setValue={setType} value={type} icon={<FontAwesome name="handshake-o" color='#FFC77A' size={19} />} data={['Vender', 'Alugar']} />
                                    </View>
                                </View>
                                <View style={{ height: '53%', flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly" }}>

                                    <View style={{  width: '95%' }}>
                                        <InputILongText width={'100%'} text={'Descrição'} placeholder={'200'} setValue={setDescription} value={description} />
                                        
                                    </View>
                                </View>

                            </View>
                        </View>
                        </Pressable>
                        
                }
                


                {!editShow &&
                    <View style={{ backgroundColor: '#1E4344', flex: 1, justifyContent: 'center', }}>
                        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item }) =>
                            <Card style={{ borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 10, borderColor: '#152F30', borderRadius: 6 }}>
                                <Title style={{ color: '#152F30' }}>   Detalhes</Title>
                                <Card.Cover source={{ uri: "https://imgbr.imovelwebcdn.com/avisos/2/29/63/14/95/07/720x532/2593989414.jpg" }} />
                                <Card.Content>
                                    <Title>Rua dos rodrigues - Perdizes</Title>
                                    <Paragraph><FontAwesome name="bed" color='#000' size={15} /> 4      <FontAwesome5 name="shower" color='#000' size={15} /> 2      <FontAwesome5 name="car" color='#000' size={15} /> 1     <FontAwesome name="handshake-o" color='#000' size={15} /> Vender      <Text style={{ fontWeight: 'bold' }}>R$</Text>250,00</Paragraph>
                                    <Paragraph><Text style={{ fontWeight: 'bold' }}>m²</Text> 4      <Text style={{ fontWeight: 'bold' }}>IPTU-R$</Text>20,00      <MaterialIcons name="pets" color='#000' size={15} /> SIM     <FontAwesome5 name="couch" color='#000' size={15} /> SIM      <Text style={{ fontWeight: 'bold' }}>R$</Text>250,00</Paragraph>
                                    <Paragraph></Paragraph>
                                    <Text style={{ fontWeight: 'bold' }}>Descrição</Text>
                                    <Paragraph>adjaba sdfsdfs fsd fsdf sdfsdfgdfghkdfg;.sdfsdfuhslidfb sdfbjsdfbsajd fsjdbfhjhb
                                    adjaba sdfsdfs fsd fsdf sdfsdfgdfghkdfg;.sdfsdfuhslidfb sdfbjsdfbsajd fsjdbfhjhb
                                    adjaba sdfsdfs fsd fsdf sdfsdfgdfghkdfg;.sdfsdfuhslidfb sdfbjsdfbsajd fsjdbfhjhb
                                    adjaba sdfsdfs fsd fsdf sdfsdfgdfghkdfg;.sdfsdfuhslidfb sdfbjsdfbsajd fsjdbfhjhb
                                    adjaba sdfsdfs fsd fsdf sdfsdfgdfghkdfg;.sdfsdfuhslidfb sdfbjsdfbsajd fsjdbfhjhb</Paragraph>


                                </Card.Content>
                                <Card.Actions>
                                    <Button title=" Editar" onPress={() => houseInfor(item.id)} icon={{ name: 'edit', type: 'font-awesome', size: 19, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '30%' }} titleStyle={{ color: '#1E4344' }} />
                                </Card.Actions>
                            </Card>} keyExtractor={value => value.id} />
                    </View>}
            </NativeBaseProvider>
        </View>
        
</KeyboardAvoidingView>
    );
}