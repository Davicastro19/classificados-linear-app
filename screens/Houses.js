
import { View,  Pressable, StatusBar, SafeAreaView, RefreshControl } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react'
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/Houses'
import {
    FlatList,
    NativeBaseProvider,
} from 'native-base';
import { Alert, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, } from "native-base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import housesService from '../services/HousesService';
import CardHouses from '../components/cardHouses/cardHouses'
import LoadHouse from '../components/loading/loadHouses'
import OneLoadHouse from '../components/loading/oneLoadHouse'
import PButton from '../components/button/button';
import DialogFilter from '../components/dialogFilter/dialogFilter';
import Notification from '../components/notification/notification';
import CardHouse from '../components/cardHouse/cardHouse'
import { render } from 'react-dom';

export default function Houses({navigation}) {
    
    const [loading, setLoading] = useState(false)
    const [orderCity, setOrderCity] = useState('Ibotirama')
    const [orderDistrict, setOrderDistrict] = useState('Todos Bairros')
    const [orderAll, setOrderAll] = useState('Mais Recentes')
    const [type, setType] = useState('city')
    const [nameIcon, setNameIcon] = useState('filter-plus-outline')
    const [question, setQuesetion] = useState('Qual cidade?')
    const [dataSelect, setDataSelect] = useState(['Ibotirama', 'Javi'])
    const [oldHouse, setOldHouses] = useState([])
    const [skip, setSkip] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [houses, setHouses] = useState([])
    const [oldLengh, setOldLengh] = useState(1)
    const [refreshing, setRefreshing] = useState(false);
    const [specificHouse, setSpecificHouse] = useState(false)
    const [visableDialogFilter, setVisableDialogFilter] = useState(true);
    const [visableNotification, setVisableNotification] = useState(false);
    //const memoizedValue = useMemo(() => renderItem, [houses]);
    const onRefresh = React.useCallback(() => {
        setHouses([])
        let nSkip = skip
        nSkip = nSkip - 30
        if (nSkip < 0)
            nSkip = 0
        if (orderDistrict === 'Todos Bairros') {
            allHouses(nSkip)
        }
        else {
            getHouseFiltered(nSkip)
        }
        setSkip(nSkip)
        setRefreshing(false)
    }, [skip]);
    const renderItem = React.useCallback(({ item }) => {
        return (
            <CardHouses item={item} selectHouseById={() => selectHouseById(item.id)} validateImage={() => validateImage(item.images, '1')} />
        )
    }, [houses]);


    function setFilter() {
        
        if (type == 'city') {
            setType('district')
            setDataSelect(['Todos Bairros', 'Alto do Cruzeiro', 'Alto do Fundão', 'Calumbi', 'Centro', 'Ibotiraminha', 'Morada Real', 'Bairro São Francisco', 'Barão 242', 'Bairro São João', 'Santa Rosa', 'Veredinha', 'Xixa'])
            setQuesetion('Qual bairro?')
        } else if (type == 'district') {
            setDataSelect(['Mais Recentes', 'Menor Valor', 'Maior Valor'])
            setType('order')
            setQuesetion('Qual ordem?')
            setNameIcon('filter-check-outline')
        } else {
            setHouses([])
            getHouseFiltered(0)
            setDataSelect(['Ibotirama', 'Javi'])
            setType('city')
            setQuesetion('Qual cidade?')

        }
        
    }
    function closeDialogFilter() {
        setVisableDialogFilter(false)
        
    }

    function closeNotificaion() {
        setVisableNotification(false)
    }

    function filtered(value) {
        return value.filter(function (a) { return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true); }, Object.create(null))
    }

    function setSpecificHouseFull(values){
        navigation.navigate("House",{specificHouse:values})
    }
    async function moreHouses() {
        if (oldLengh !== 0) {
            if (loading) return;
            setLoading(true);
            let nSkip = skip
            nSkip = nSkip + 30
            if (orderDistrict === 'Todos Bairros') {
                allHouses(nSkip)
            }
            else {
                getHouseFiltered(nSkip)
            }
            
        }

    }

    function validateImages(image) {
        try {
            //console.log('homes',Config.AWS_URL + image.split(',')[value])
            if (image.includes('jpg') || image.includes('png')) {
                return Config.AWS_URL + image
            } else {
                return 'https://daviastro.000webhostapp.com/favicon.png'
            }
        } catch (e) {
            return 'https://daviastro.000webhostapp.com/favicon.png'
        }
    }

    function validateImage(image, value) {
        try {
            //console.log('homes',Config.AWS_URL + image.split(',')[value])
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                return Config.AWS_URL + image.split(',')[value]
            } else {
                return 'https://daviastro.000webhostapp.com/favicon.png'
            }
        } catch (e) {
            return 'https://daviastro.000webhostapp.com/favicon.png'
        }
    }

   

    function setOrderMain(value) {
        //// // console.log(value)
        if (value === 'Maior Valor') {
            setOrderAll('bigger')
        } else if (value === 'Menor Valor') {
            setOrderAll('smaller')
        } else {
            setOrderAll('recent')
        }
        //// // console.log(orderAll)
    }

    function selectHouseById(value) {
        setIsLoading(true)
        housesService.selectHouseById(value)
            .then((response) => {
                setSpecificHouseFull(response.data)
            })
            .catch((error) => {
                console.log('61 - Homes', error)
                resetState()
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })
            setIsLoading(false)

    }

    function upHouse(objA, objB) {

        if (objA === objB) { } else {
            setHouses(objA)
        }
    }

    function getHouseFiltered(skips) {
        setVisableDialogFilter(false)
        setIsLoading(true)
        if (orderDistrict != 'Todos Bairros') {
            
            setSkip(skips)
            housesService.getHouseFiltered(skips, orderDistrict, orderCity, orderAll)
                .then((response) => {
                    setOldLengh(response.data.length)
                    if (skips !== 0) {
                        if (response.data.length !== 0) {
                            //let newList = filtered([...houses, ...response.data])
                            upHouse(response.data, oldHouse)
                        }
                    } else {
                        upHouse(response.data, oldHouse)
                    }
                })
                .catch((error) => {
                    console.log('75 - Homes', error)
                    //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
                })
            if (orderAll === 'bigger') {
                setOrderAll('Maior Valor')
            } else if (orderAll === 'smaller') {
                setOrderAll('Menor Valor')
            } else {
                setOrderAll('Mais Recentes')
            }
        } else {
            allHouses(skips)
        }
        setIsLoading(false)
        setLoading(false)
    }

    function allHouses(skips) {
        setIsLoading(true)
        setSkip(skips)
        housesService.allHouses(skips)
            .then((response) => {
                setOldLengh(response.data.length)
                if (skips !== 0) {
                    if (response.data.length !== 0) {
                        //let newList = filtered([...houses, ...response.data])
                        upHouse(response.data, oldHouse)
                    }
                } else {
                    upHouse(response.data, oldHouse)
                }
                setIsLoading(false)
                setLoading(false)

            })
            .catch((error) => {
                setIsLoading(false)
                setLoading(false)
            })
        if (orderAll === 'bigger') {
            setOrderAll('Maior Valor')
        } else if (orderAll === 'smaller') {
            setOrderAll('Menor Valor')
        } else {
            setOrderAll('Mais Recentes')
        }
    }

    useEffect(() => {
        allHouses(0)
    }, [])
    return (
        <NativeBaseProvider >
            <StatusBar barStyle="dark-content" backgroundColor={stylesColor.primaryColor} />
            <SafeAreaView style={styles.preContainer} >
                {!specificHouse && !isLoading &&
                    <View style={styles.viewFilter}>
                        <PButton onPress={() => setVisableDialogFilter(true)} title="Filtro" type='material-community' name='filter-menu-outline' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='MPLUS1p-Medium' />
                    </View>}
                {isLoading &&
                    <><LoadHouse /></>
                }
                {houses && !isLoading && !specificHouse &&
                    <FlatList refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        data={houses}
                        renderItem={renderItem}
                        onEndReached={moreHouses}
                        onEndReachedThreshold={0.03}
                        ListFooterComponent={<OneLoadHouse color={stylesColor.secondaryColor}
                            borderColor={stylesColor.primaryColor} />}
                        keyExtractor={value => value.id} />
                }
                {!isLoading && specificHouse &&
                    <CardHouse specificHouse={specificHouse} resetState={() => setSpecificHouse(false)}  validateImages={value => validateImages(value)} />
                } 
                {visableNotification && !isLoading && !specificHouse &&
                    <Notification status='error' dataSelect={dataSelect} visable={visableNotification} title={'adasd'} message={'message'} onPress={() => setVisableNotification(false)} close={closeNotificaion} />
                }
                {visableDialogFilter && !isLoading && 
                    <DialogFilter question={question} dataSelect={dataSelect} nameIcon={nameIcon} type={type} orderCity={orderCity} visable={visableDialogFilter} onPress={() => setFilter()} close={closeDialogFilter} setOrderCity={value => (setOrderCity(value), setFilter())} setOrderDistrict={value => (setOrderDistrict(value), setFilter())} setOrderMain={value => (setIsLoading(true),setOrderMain(value), setFilter())} />
                }
            </SafeAreaView>
            
        </NativeBaseProvider>
    );
}