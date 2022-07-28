
import {  StatusBar, SafeAreaView } from 'react-native';
import React, { useState} from 'react'
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/Classifieds'
import {
    NativeBaseProvider,
} from 'native-base';
import CardClassified from '../components/cardClassified/cardClassified'
import { useRoute } from '@react-navigation/native';

export default function Classifieds({navigation}) {
    
  
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
            <SafeAreaView style={styles.preContainer} >
            <StatusBar barStyle="light-content" backgroundColor={stylesColor.primaryColor} />
               <CardClassified specificClassified={route.params.specificClassified}   validateImages={value => validateImages(value)} />
               
                {visableNotification && !isLoading && !specificClassified &&
                    <Notification status='error' dataSelect={dataSelect} visable={visableNotification} title={'adasd'} message={'message'} onPress={() => setVisableNotification(false)} close={closeNotificaion} />
                }
            </SafeAreaView>
        </NativeBaseProvider>
    );
}