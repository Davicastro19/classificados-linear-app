import React, { useState, useEffect } from 'react'
import { Text, NativeBaseProvider, FlatList, ScrollView } from "native-base";
import { View, StatusBar, SafeAreaView, RefreshControl } from 'react-native';
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/MyClassifieds'
import ClassifiedsService from '../services/ClassifiedsService';
import Notification from '../components/notification/notification';
import CardMyClassifieds from '../components/cardMyClassifieds/cardMyClassifieds'
import PButton from '../components/button/button';
import MLoad from '../components/loading/miniLoad'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function MyClassifieds({ navigation }) {
    const [dataSelect, setDataSelect] = useState(false)
    const [citysOptions, setCitysOptions] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [myClassifieds, setMyClassifieds] = useState(false)
    const [variable, setVariable] = useState(false)
    const [visableNotification, setVisableNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState(null)
    const renderItem = React.useCallback(({ item }) => {
        return (
            <CardMyClassifieds item={item} selectClassifiedById={() => selectClassifiedById(item.classified_id)} validateImage={() => validateImage(item.classified_images, '1')}
                title="Editar" name='home-edit'
            />
        )
    }, [myClassifieds]);

    const onRefresh = React.useCallback(() => {
        allMyClassifieds()
        setRefreshing(false);
    }, []);

    function showNotification(status, title, message) {
        setVisableNotification(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
    }

    function insertClassifiedFull(value) {
        setVariable(false)
        navigation.navigate("InsertClassified", {dataSelect : dataSelect, type :value})
    }

    function EditClassifiedFull(values) {
        navigation.navigate("EditClassified", { specificClassified: values, dataSelect: citysOptions })
    }

    function selectClassifiedById(value) {
        setIsLoading(true)
        ClassifiedsService.selectClassifiedById(value)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                EditClassifiedFull(response.data)}
            })
            .catch((error) => {
                setSpecificClassified(false)
                showNotification('error', 'Ops!', error.toString())
            })
        setIsLoading(false)
    }

    function validateImage(image, value) {
        try {
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                return Config.AWS_URL + image.split(',')[value]
            } else {
                return Config.AWS_URL + 'favicon.png'
            }
        } catch (e) {
            return Config.AWS_URL + 'favicon.png'
        }
    }
    function getCitys() {  
        setIsLoading(true)
        ClassifiedsService.city()
            .then((response) => {
                setDataSelect(response.data.message)
                setCitysOptions(response.data.message)
            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
            setIsLoading(false)      
    }


    
    function showNotification(status, title, message) {
        setVisableNotification(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
    }

    function allMyClassifieds() {
        ClassifiedsService.allMyClassifieds()
            .then((response) => {
                if (response.data.length !== 0) {
                    setMyClassifieds(response.data)
                } else {
                    showNotification('info', 'Então...', 'paraece que você não anunciou nada ainda.')
                }

            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
        setIsLoading(false)
    }

    function resetState() {
        setMyClassifieds(false)
        setVisableNotification(false)

    }

    useEffect(() => {
        allMyClassifieds()
    }, [])
    useEffect(() => {
        getCitys()
    }, [])
    return (
        <NativeBaseProvider >
            <SafeAreaView style={styles.preContainer} >
            <StatusBar  barStyle="light-content" backgroundColor={stylesColor.primaryColor}  />
            {!isLoading && dataSelect && !variable &&
                <View style={styles.viewFilter}>
                    <PButton onPress={() => setVariable(true)} title="Anunciar" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                </View>
                        }
            {!isLoading && dataSelect && variable &&
            <View style={styles.viewFilter}>
                    <PButton onPress={() => insertClassifiedFull("Immobile")} title="Imóvel" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                    <PButton onPress={() => insertClassifiedFull("Car")} title="Automovél" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                    <PButton onPress={() => insertClassifiedFull("Electronic")} title="Eletrônico" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                    <PButton onPress={() => insertClassifiedFull("Baskets")} title="Cestas básicas" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                    <PButton onPress={() => insertClassifiedFull("Fashion")} title="Moda e beleza" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                    <PButton onPress={() => insertClassifiedFull("Job")} title="Vagas de Trabalho" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                </View>
}
                {isLoading &&
                    <View style={styles.mLoad}>
                        <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
                    </View>
                }
                {myClassifieds && !isLoading && !variable &&
                        <FlatList refreshControl={<RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />}
                            showsVerticalScrollIndicator={false}
                            data={myClassifieds}
                            renderItem={renderItem}
                            keyExtractor={value => value.classified_id} />
                   
                }
                {!myClassifieds && !isLoading && !variable &&
                    <ScrollView
                        contentContainerStyle={styles.scroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>
                        <Text>Puxe para baixo para atualizar...</Text>
                    </ScrollView>}
                {visableNotification && !variable &&
                    <Notification status={status} visable={visableNotification} title={title} message={message} onPress={() => resetState()} close={() => resetState()} />
                }

            </SafeAreaView>

        </NativeBaseProvider>);
}