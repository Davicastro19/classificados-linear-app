
import { View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, StatusBar, BackHandler, SafeAreaView, ImageBackground, RefreshControl } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react'
import tenantService from '../services/TenantSevice';
import SelectDropdown from 'react-native-select-dropdown'
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/Houses'
import {
    ScrollView,
    FlatList,
    NativeBaseProvider,
    Divider
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import housesService from '../services/HousesService';
import CardHouse from '../components/cardHouses/cardHouses'
import LoadHouse from '../components/loading/loadHouses'
import OneLoadHouse from '../components/loading/oneLoadHouse'
import MLoad from '../components/loading/miniLoad'


export default function Houses() {
    const [loading, setLoading] = useState(false)
    const [orderCity, setOrderCity] = useState('Ibotirama')
    const [orderDistrict, setOrderDistrict] = useState('Todos Bairros')
    const [orderAll, setOrderAll] = useState('Mais Recentes')
    const [skip, setSkip] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [houses, setHouses] = useState([])
    const [oldLengh, setOldLengh] = useState(1)
    const [refreshing, setRefreshing] = useState(false);
    const [specificHouse, setSpecificHouse] = useState(false)
    //const memoizedValue = useMemo(() => renderItem, [houses]);
    const onRefresh = React.useCallback(() => {
        //console.log('manoo slc ',skip)
        setSkip(0)
        if (orderDistrict === 'Todos Bairros') {
            allHouses(0)
        }
        else {
            setSkip(0)
            getHouseFiltered(0)
        }

        setRefreshing(false);
    }, []);
    function filtered(value) {
        return value.filter(function (a) { return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true); }, Object.create(null))
    }
    async function moreHouses() {
        if (oldLengh !== 0) {
            if (loading) return;
            setLoading(true);
            let nSkip = skip
            nSkip = nSkip + 20
            setSkip(nSkip)
            if (orderDistrict === 'Todos Bairros') {
                allHouses(nSkip)
            }
            else {
                setSkip(nSkip)
                getHouseFiltered(nSkip)
            }
        }

    }
    function validateImage(image, value) {
        try {
            //console.log('homes',Config.AWS_URL + image.split(',')[value])
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                return Config.AWS_URL + image.split(',')[value]
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
    function resetState() {
        setShowFilter(false)
        setSpecificHouse(false)
        setIsLoading(false)

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
                setIsLoading(false)
                setSpecificHouse(response.data)
            })
            .catch((error) => {
                //// // console.log('61 - Homes', error)
                resetState()
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })

    }
    function upHouse(objA, objB) {

        if (objA === objB) { } else {
            setHouses(objA)
        }
    }
    async function getHouseFiltered(skips) {
        if (orderDistrict != 'Todos Bairros') {
            setIsLoading(true)
            setShowFilter(false)
            let oldHouse = houses
            housesService.getHouseFiltered(skips, orderDistrict, orderCity, orderAll)
                .then((response) => {
                    setOldLengh(response.data.length)
                    if (skips !== 0) {
                        if (response.data.length !== 0) {
                            let newList = filtered([...houses, ...response.data])
                            upHouse(newList, oldHouse)
                        }
                    } else {
                        upHouse(response.data, oldHouse)
                    }
                    setLoading(false)

                })
                .catch((error) => {
                    setIsLoading(false)
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
    }
    const renderItem = React.useCallback(({ item }) => {
        return (
            <CardHouse item={item} selectHouseById={() => selectHouseById(item.id)} validateImage={() => validateImage(item.images, '1') == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(item.images, '1')} />
        )
    }, [houses]);
    async function allHouses(skips) {
        setIsLoading(true)
        setShowFilter(false)
        let oldHouse = houses
        housesService.allHouses(skips)
            .then((response) => {
                setOldLengh(response.data.length)
                if (skips !== 0) {
                    if (response.data.length !== 0) {
                        let newList = filtered([...houses, ...response.data])
                        upHouse(newList, oldHouse)
                    }
                } else {
                    upHouse(response.data, oldHouse)
                }
                setLoading(false)

            })
            .catch((error) => {
                setIsLoading(false)
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
    }

    useEffect(() => {
        allHouses(0)
    }, [])
    return (
        <NativeBaseProvider >
            <SafeAreaView style={styles.preContainer} >
                <StatusBar backgroundColor={stylesColor.primaryColor} />
                
                    {!houses &&
                    <><LoadHouse /></>
                    }
                    {houses &&
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

            </SafeAreaView>
        </NativeBaseProvider>

    );
}