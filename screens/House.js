
import {  StatusBar, SafeAreaView } from 'react-native';
import React, { useState} from 'react'
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/Houses'
import {
    NativeBaseProvider,
} from 'native-base';
import CardHouse from '../components/cardHouse/cardHouse'
import { useRoute } from '@react-navigation/native';

export default function Houses({navigation}) {
    
  
    const [visableNotification, setVisableNotification] = useState(false);
    const route = useRoute()
    function showNotificaion() {
        setVisableNotification(true)
    }

    function closeNotificaion() {
        setVisableNotification(false)
    }


    function validateImages(image) {
        try {
            //console.log('homes',Config.AWS_URL + image.split(',')[value])
            if (image.includes('jpg') || image.includes('png')) {
                return Config.AWS_URL + image
            } else {
                return Config.AWS_URL +'favicon.png'
            }
        } catch (e) {
            return Config.AWS_URL +'favicon.png'
        }
    }


    function resetState() {
        navigation.navigate("Home")

    }
    return (
        <NativeBaseProvider >
            <StatusBar translucent barStyle="dark-content" backgroundColor={stylesColor.secondaryColor} />
            <SafeAreaView style={styles.preContainer} >
               <CardHouse specificHouse={route.params.specificHouse}   validateImages={value => validateImages(value)} />
               
                {visableNotification && !isLoading && !specificHouse &&
                    <Notification status='error' dataSelect={dataSelect} visable={visableNotification} title={'adasd'} message={'message'} onPress={() => setVisableNotification(false)} close={closeNotificaion} />
                }
            </SafeAreaView>
        </NativeBaseProvider>
    );
}