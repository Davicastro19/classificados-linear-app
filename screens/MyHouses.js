import React, { useState, useEffect } from 'react'
import { Text, NativeBaseProvider, FlatList, ScrollView } from "native-base";
import { View, StatusBar, SafeAreaView, RefreshControl } from 'react-native';
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/MyHouses'
import housesService from '../services/HousesService';
import Notification from '../components/notification/notification';
import CardMyHouses from '../components/cardMyHouses/cardMyHouses'
import PButton from '../components/button/button';
import MLoad from '../components/loading/miniLoad'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function MyHouses({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [myHouses, setMyHouses] = useState(false)
    const [visableNotification, setVisableNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState(null)
    const renderItem = React.useCallback(({ item }) => {
        return (
            <CardMyHouses item={item} selectHouseById={() => selectHouseById(item.houses_id)} validateImage={() => validateImage(item.houses_images, '1')}
                title="Editar" name='home-edit'
            />
        )
    }, [myHouses]);

    const onRefresh = React.useCallback(() => {
        allMyHouses()
        setRefreshing(false);
    }, []);

    function showNotification(status, title, message) {
        setVisableNotification(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
    }

    function insertHouseFull() {
        navigation.navigate("InsertHouse")
    }

    function EditHouseFull(values) {
        navigation.navigate("EditHouse", { specificHouse: values })
    }

    function selectHouseById(value) {
        setIsLoading(true)
        housesService.selectHouseById(value)
            .then((response) => {
                EditHouseFull(response.data)
            })
            .catch((error) => {
                setSpecificHouse(false)
                //// console.log('aaa', error)
                showNotification('error', 'Ops!', error.toString())
            })
        setIsLoading(false)
    }

    function validateImage(image, value) {
        try {
            //console.log('homes',Config.AWS_URL + image.split(',')[value])
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                return Config.AWS_URL + image.split(',')[value]
            } else {
                return Config.AWS_URL + 'favicon.png'
            }
        } catch (e) {
            return Config.AWS_URL + 'favicon.png'
        }
    }

    function showNotification(status, title, message) {
        setVisableNotification(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
    }

    function allMyHouses() {
        housesService.allMyHouses()
            .then((response) => {
                if (response.data.length !== 0) {
                    setMyHouses(response.data)
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
        setMyHouses(false)
        setVisableNotification(false)

    }

    useEffect(() => {
        allMyHouses()
    }, [])
    return (
        <NativeBaseProvider >
            <SafeAreaView style={styles.preContainer} >
            <StatusBar  barStyle="light-content" backgroundColor={stylesColor.primaryColor}  />
            {!isLoading &&
                <View style={styles.viewFilter}>
                    <PButton onPress={() => insertHouseFull()} title="Anunciar" type='material-community' name='plus' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                </View>
                        }
                {isLoading &&
                    <View style={styles.mLoad}>
                        <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
                    </View>
                }
                {myHouses && !isLoading &&
                        <FlatList refreshControl={<RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />}
                            showsVerticalScrollIndicator={false}
                            data={myHouses}
                            renderItem={renderItem}
                            keyExtractor={value => value.houses_id} />
                   
                }
                {!myHouses && !isLoading &&
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
                {visableNotification &&
                    <Notification status={status} visable={visableNotification} title={title} message={message} onPress={() => resetState()} close={() => resetState()} />
                }

            </SafeAreaView>

        </NativeBaseProvider>);
}