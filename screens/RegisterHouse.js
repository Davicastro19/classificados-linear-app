import { View, Keyboard, KeyboardAvoidingView, RefreshControl, TouchableWithoutFeedback, StatusBar, Pressable, TouchableOpacity, Modal, Image } from 'react-native';
import { Text, FAB, Button, } from 'react-native-elements';
import React, { useState, useEffect, useRef } from 'react'
import tenantService from '../services/TenantSevice';
import housesService from '../services/HousesService';
import styles from '../style/RegisterHouse'
import DateAndHours from '../util/DateAndHours'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import cameras from '../style/camera'
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';
import { Card, Title, Paragraph } from 'react-native-paper';
import Notification from '../components/Notification';

import axios from 'axios'
import {
    FlatList,
    NativeBaseProvider, ScrollView
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SelectDropdownIconLinear from '../components/SelectIcon'
import SelectDropdownTextLinear from '../components/SelectText'
import InputIconInText from '../components/InputIconInText'
import InputILongText from '../components/InputILongText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RegisterHouse() {
    const [refreshing, setRefreshing] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [types, setTypes] = useState(Camera.Constants.Type.back);
    const camRef = useRef(null)
    const [titlePreCapturate, setTitlePreCapturate] = useState("Adicionar a 1º")
    const [titleDelCapturate, setTitleDelCapturate] = useState("Apagar a 1º")
    const [openCamera, setOpenCamera] = useState(false)
    const [alt, setAlt] = useState(new Object)
    const [buttonInsert, setButtonInsert] = useState(false)
    const [capturatePhoto1, setCapturatePhoto1] = useState(false)
    const [capturatePhoto2, setCapturatePhoto2] = useState(false)
    const [capturatePhoto3, setCapturatePhoto3] = useState(false)
    const [capturatePhoto4, setCapturatePhoto4] = useState(false)
    const [capturatePhoto5, setCapturatePhoto5] = useState(false)
    const [capturatePhoto6, setCapturatePhoto6] = useState(false)
    const [visibleNotification, setVisibleNotification] = useState(false)
    const [bed, setBed] = useState('1')
    const [shower, setShower] = useState('1')
    const [car, setCar] = useState('1')
    const [type, setType] = useState('Alugar')
    const [pet, setPet] = useState('SIM')
    const [price, setPrice] = useState('1.800,66')
    const [iptu, setIptu] = useState('100,66')
    const [squareMeter, setSquareMeter] = useState('100')
    const [furniture, setfurniture] = useState('SIM')
    const [publicPlace, setpublicPlace] = useState('Rua Dr. Manoel Novais')
    const [city, setCity] = useState('Ibotirama')
    const [district, setDistrict] = useState('Centro')
    const [description, setDescription] = useState(null)
    const [myHouses, setMyHouses] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState(false)
    const [editShow, setEditShow] = useState(true)
    const [createShow, setCreateShow] = useState(false)
    const [houses, setHouses] = useState([])
    const [specificHouse, setSpecificHouse] = useState([])

    const fetchPairs = async () => {
        const pairs = await tenantService.pairs();
        return pairs;
    }

    const onRefresh = React.useCallback(() => {
        allMyHouses()
        setRefreshing(false);
    }, []);

    function cleanCreate(){
        setCapturatePhoto1(false)
        setCapturatePhoto2(false)
        setCapturatePhoto3(false)
        setCapturatePhoto4(false)
        setCapturatePhoto5(false)
        setCapturatePhoto6(false)
        setVisibleNotification(false)
        setBed('1')
        setShower('1')
        setCar('1')
        setType('Alugar')
        setPet('SIM')
        setPrice('1.800,66')
        setIptu('100,66')
        setSquareMeter('100')
        setfurniture('SIM')
        setpublicPlace('Rua Dr. Manoel Novais')
        setCity('Ibotirama')
        setDistrict('Centro')
        setDescription(null)
    }
    function isValidate() {



        if (bed == null || bed == '') {
            return false
        }
        if (shower == null || shower == '') {
            return false
        }
        if (car == null || car == '') {
            return false
        }
        if (type == null || type == '') {
            return false
        }
        if (pet == null || pet == '') {
            return false
        }
        if (price == null || price == '') {
            return false
        }
        if (iptu == null || iptu == '') {
            return false
        }
        if (squareMeter == null || squareMeter == '') {
            return false
        }
        if (furniture == null || furniture == '') {
            return fale
        }
        if (publicPlace == null | publicPlace == '') {
            return false
        }
        if (city == null || city == '') {
            return false
        }
        if (district == null || district == '') {
            return false
        }
        if (description == null || description == '') {
            return false
        }
        if (capturatePhoto1) {
            return true
        } else {
            return false
        }
    }

    function removePicture() {

        if (titleDelCapturate.includes('1')) {
            setButtonInsert(false)
            var data = new FormData();

            var config = {
                method: 'delete',
                url: 'https://api.imgur.com/3/image/' + alt['1'].deleteHash,
                headers: {
                    'Authorization': 'Client-ID 1ecdb35596fd7b0',
                    //...data.getHeaders()
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setCapturatePhoto1(false)
                    setTitlePreCapturate("Adicionar a 1º")
                    setAlt(false)
                })
                .catch(function (error) {
                    console.log('dellero', error);
                });
        }
        if (titleDelCapturate.includes('2')) {
            var data = new FormData();

            var config = {
                method: 'delete',
                url: 'https://api.imgur.com/3/image/' + alt['2'].deleteHash,
                headers: {
                    'Authorization': 'Client-ID 1ecdb35596fd7b0',
                    //...data.getHeaders()
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    //console.log('dell',JSON.stringify(response.data));
                    setCapturatePhoto2(false)
                    setTitleDelCapturate("Apagar a 1º")
                    setTitlePreCapturate("Adicionar a 2º")
                })
                .catch(function (error) {
                    console.log('dellero', error);
                });
        }
        if (titleDelCapturate.includes('3')) {
            var config = {
                method: 'delete',
                url: 'https://api.imgur.com/3/image/' + alt['3'].deleteHash,
                headers: {
                    'Authorization': 'Client-ID 1ecdb35596fd7b0',
                    //...data.getHeaders()
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    //console.log('dell',JSON.stringify(response.data));
                    setCapturatePhoto3(false)
                    setTitleDelCapturate("Apagar a 2º")
                    setTitlePreCapturate("Adicionar a 3º")
                })
                .catch(function (error) {
                    console.log('dellero', error);
                });
        }
        if (titleDelCapturate.includes('4')) {
            var config = {
                method: 'delete',
                url: 'https://api.imgur.com/3/image/' + alt['4'].deleteHash,
                headers: {
                    'Authorization': 'Client-ID 1ecdb35596fd7b0',
                    //...data.getHeaders()
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    //console.log('dell',JSON.stringify(response.data));
                    setCapturatePhoto4(false)
                    setTitleDelCapturate("Apagar a 3º")
                    setTitlePreCapturate("Adicionar a 4º")
                })
                .catch(function (error) {
                    console.log('dellero', error);
                });
        }
        if (titleDelCapturate.includes('5')) {
            var config = {
                method: 'delete',
                url: 'https://api.imgur.com/3/image/' + alt['5'].deleteHash,
                headers: {
                    'Authorization': 'Client-ID 1ecdb35596fd7b0',
                    //...data.getHeaders()
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    //console.log('dell',JSON.stringify(response.data));
                    setCapturatePhoto5(false)
                    setTitleDelCapturate("Apagar a 4º")
                    setTitlePreCapturate("Adicionar a 5º")
                })
                .catch(function (error) {
                    console.log('dellero', error);
                });
        }
        if (titleDelCapturate.includes('6')) {
            var config = {
                method: 'delete',
                url: 'https://api.imgur.com/3/image/' + alt['6'].deleteHash,
                headers: {
                    'Authorization': 'Client-ID 1ecdb35596fd7b0',
                    //...data.getHeaders()
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    //console.log('dell',JSON.stringify(response.data));
                    setCapturatePhoto6(false)
                    setTitleDelCapturate("Apagar a 5º")
                    setTitlePreCapturate("Adicionar a 6º")
                })
                .catch(function (error) {
                    console.log('dellero', error);
                });
        }

    }
    async function insertHouse() {
        setIsLoading(true)
        setCreateShow(false)
        if (isValidate()) {
            const dataCreateHouse = {
                bed: bed,
                shower: shower,
                car: car,
                type: type,
                pet: pet,
                price: price,
                tax: iptu,
                squareMeter: squareMeter,
                furniture: furniture,
                publicPlace: publicPlace,
                city: city,
                district: district,
                description: description,
                images: JSON.stringify(alt).toString(),
                creationDate: DateAndHours
            }
            housesService.insertHouse(dataCreateHouse)
                .then((response) => {
                    setIsLoading(false)
                    if (response.data.status) {
                        setCreateShow(false)
                        setVisibleNotification(true)
                        
                    } else {
                        setCreateShow(true)
                        setIsLoading(false)
                        console.log('whatt', response.data)
                    }

                })
                .catch((error) => {
                    setCreateShow(true)
                    console.log('ertert', error)
                })
        }
        setCreateShow(true)
        setIsLoading(false)
    }


    async function preTakePictureGalery() {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status === "granted") {
            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            });
            //const { status } = await Camera.requestCameraPermissionsAsync();
            //
            takePictureGalery(data)
        }
        //const { status } = await Camera.requestCameraPermissionsAsync();

        //if (hasPermission === null || hasPermission === true) {
        //    setOpenCamera(true)
        //  }
        //  if (hasPermission === false) {
        //    setOpenCamera(false)
        //  }

    }

    function takePictureGalery(data) {

        //if (camRef){
        //const data = await camRef.current.takePictureAsync();

        if (!data.cancelled && data.uri) {
            if (!capturatePhoto1) {
                setButtonInsert(true)
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['1'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto1(data.uri)
                setTitlePreCapturate("Adicionar a 2º")
                setTitleDelCapturate("Apagar a 1º")
            } else if (!capturatePhoto2) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['2'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto2(data.uri)
                setTitlePreCapturate("Adicionar a 3º")
                setTitleDelCapturate("Apagar a 2º")
            }
            else if (!capturatePhoto3) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['3'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });
                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto3(data.uri)
                setTitlePreCapturate("Adicionar a 4º")
                setTitleDelCapturate("Apagar a 3º")
            }
            else if (!capturatePhoto4) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['4'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto4(data.uri)
                setTitlePreCapturate("Adicionar a 5º")
                setTitleDelCapturate("Apagar a 4º")
            }
            else if (!capturatePhoto5) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['5'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto5(data.uri)
                setTitlePreCapturate("Adicionar a 6º")
                setTitleDelCapturate("Apagar a 5º")
            }
            else if (!capturatePhoto6) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['6'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });
                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto6(data.uri)
                setTitleDelCapturate("Apagar a 6º")
            }
            //setOpenCamera(false)
        }
        //}
    }
    async function preTakePicture() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        if (hasPermission === null || hasPermission === true) {
            setOpenCamera(true)
        }
        if (hasPermission === false) {
            setOpenCamera(false)
        }

    }
    function validateImage(image, value) {
        try {
            return JSON.parse(image)[value].uri.replace(/\//g, '').replace('i.img', '//i.img').replace('.com', '.com/')
        } catch (e) {
            return false
        }
    }

    async function takePicture() {

        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            if (!capturatePhoto1) {
                setButtonInsert(true)
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['1'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto1(data.uri)
                setTitlePreCapturate("Adicionar a 2º")
                setTitleDelCapturate("Apagar a 1º")
            } else if (!capturatePhoto2) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['2'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto2(data.uri)
                setTitlePreCapturate("Adicionar a 3º")
                setTitleDelCapturate("Apagar a 2º")
            }
            else if (!capturatePhoto3) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['3'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });
                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto3(data.uri)
                setTitlePreCapturate("Adicionar a 4º")
                setTitleDelCapturate("Apagar a 3º")
            }
            else if (!capturatePhoto4) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['4'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto4(data.uri)
                setTitlePreCapturate("Adicionar a 5º")
                setTitleDelCapturate("Apagar a 4º")
            }
            else if (!capturatePhoto5) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['5'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });

                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto5(data.uri)
                setTitlePreCapturate("Adicionar a 6º")
                setTitleDelCapturate("Apagar a 5º")
            }
            else if (!capturatePhoto6) {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                const xhrrepository = alt
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        const dts = JSON.parse(this.responseText)
                        xhrrepository['6'] = { "uri": dts.data.link, "deleteHash": dts.data.deletehash }
                        setAlt(xhrrepository)
                    }
                });
                const imagesData = new FormData();


                imagesData.append('image', {
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: 'name.jpg'
                })


                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID 1ecdb35596fd7b0')
                xhr.send(imagesData)
                setCapturatePhoto6(data.uri)
                setTitleDelCapturate("Apagar a 6º")
            }
            setOpenCamera(false)

        }
    }

    function alterHouse() {
        setEditShow(!editShow)
    }


    function houseInfor(value) {
        setEditShow(true)
        if (specificHouse) {
            setEditShow(true)
        }
    }

    async function allMyHouses() {
        setOpenCamera(false)
        setEditShow(false)
        setCreateShow(false)
        setOpenCamera(false)
        setIsLoading(true)
        housesService.allMyHouses()
            .then((response) => {
                setIsLoading(false)
                setMyHouses(response.data)

            })
            .catch((error) => {
                setIsLoading(false)
                console.log('oooo', error)
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })
    }




    useEffect(() => {
        allMyHouses()
    }, [])
    return (
        <View style={styles.container} >
            <View style={styles.container} >

                {!editShow && !createShow && !isLoading && !visibleNotification &&
                    <><View style={{ width: '100%', height: '6%' }}><Button title=" Filtro" onPress={() => setFilter(!filter)} icon={{ name: 'filter', type: 'font-awesome', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#fdf5e8' }} />
                    </View><View style={{ width: '100%', height: '6%' }}><Button title=" Adicionar casa/aptoº" onPress={() => setCreateShow(!createShow)} icon={{ name: 'add-box', type: 'material-icons', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#fdf5e8' }} />
                        </View></>}




                <NativeBaseProvider >
                    {openCamera && !isLoading &&
                        <Camera style={cameras.camera} type={types} ref={camRef}>
                            <View style={cameras.buttonContainer}>
                                <TouchableOpacity
                                    style={cameras.button}
                                    onPress={() => {
                                        setTypes(
                                            types === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <FontAwesome name='exchange' size={23} color="red"></FontAwesome>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={cameras.buttonCam}
                                    onPress={takePicture}>
                                    <FontAwesome name='camera' size={23} color="blue"></FontAwesome>
                                </TouchableOpacity>
                                <TouchableOpacity style={cameras.closeButton} onPress={() => { setOpenCamera(false) }}>
                                    <FontAwesome name='close' size={50} color="red"></FontAwesome>
                                </TouchableOpacity>

                            </View>
                        </Camera>}

                    {!isLoading && editShow && !openCamera &&
                        <View style={{ height: hp('93%'), justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', borderColor: '#152F30', borderRadius: 6 }}>
                            <Notification message={'message'} tipo={'ss'} visible={true} onClose={() => setVisibleNotification(false)}></Notification>



                            <View style={{ paddingLeft: 5, paddingRight: 5, justifyContent: "space-evenly" }}>
                                <View style={{ borderLeftWidth: 3, borderRightWidth: 3, borderRadius: 6, borderColor: '#1E4344', justifyContent: "space-evenly", flexDirection: 'row', backgroundColor: '#1E4344' }}>
                                    <ScrollView horizontal={true}>
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto1 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto1 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto2 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto2 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto3 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto3 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto4 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto4 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto5 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto5 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto6 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto6 }} />
                                    </ScrollView>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: "space-evenly", flexDirection: "row", }} >
                                    {!titleDelCapturate.includes('6') &&

                                        <Button title={titlePreCapturate} onPress={() => preTakePicture()} icon={{ name: 'image', type: 'material-icons', size: 15, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#295E60', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('50%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                                    }
                                    {capturatePhoto1 && !isLoading &&
                                        <Button title={titleDelCapturate} onPress={() => removePicture()} icon={{ name: 'image-not-supported', type: 'material-icons', size: 14, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#602929', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: '40%' }} titleStyle={{ fontSize: 13, color: '#FFC77A' }} />
                                    }
                                </View>
                            </View>

                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Cidade'} placeholder={'2.888,66'} setValue={setCity} value={city} data={['São josé dos campos']} />
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Bairro'} placeholder={'2.888,66'} setValue={setDistrict} value={district} data={['Veredinha', 'Alto do cruzeiro']} />
                            </View>
                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <InputIconInText width={wp('66%')} height={hp('6%')} text={'Logradouro'} placeholder={'2.888,66'} setValue={setpublicPlace} value={publicPlace} />
                                <SelectDropdownIconLinear width={wp('24%')} height={hp('6%')} widthbtn={wp('22%')} setValue={setType} value={type} text={'Tipo '} icon={<FontAwesome name="handshake-o" color='#122829' size={19} />} data={['Vender', 'Alugar']} />

                            </View>
                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <InputIconInText width={wp('25%')} height={hp('6%')} text={'Valor R$'} placeholder={'2.888,66'} setValue={setPrice} value={price} />
                                <InputIconInText width={wp('25%')} height={hp('6%')} text={'IPTU'} placeholder={'2.888,66'} setValue={setIptu} value={iptu} />
                                <InputIconInText width={wp('20%')} height={hp('6%')} text={'m²'} placeholder={'200'} setValue={setSquareMeter} value={squareMeter} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setCar} value={car} text={'Vagas '} icon={<FontAwesome5 name="car" color='#122829' size={20} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />

                            </View>
                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <SelectDropdownIconLinear width={wp('25%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setfurniture} value={furniture} text={'Mobilhada '} icon={<FontAwesome5 name="couch" color='#122829' size={17} />} data={['SIM', 'NÃO']} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setShower} value={shower} text={'Banheiro '} icon={<FontAwesome5 name="shower" color='#122829' size={19} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                <SelectDropdownIconLinear width={wp('19%')} height={hp('6%')} widthbtn={wp('17%')} setValue={setPet} value={pet} text={'Pet '} icon={<MaterialIcons name="pets" color='#122829' size={20} />} data={['SIM', 'NÃO']} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setBed} value={bed} text={'Quartos '} icon={<FontAwesome name="bed" color='#122829' size={20} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />

                            </View>
                            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <InputILongText width={wp('90%')} height={hp('18%')} text={'Descrição'} placeholder={'Casa arejada, próximo ao mercado e a um panificadora...'} setValue={setDescription} value={description} />
                                </View>
                            </KeyboardAvoidingView>


                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                <Button title="Voltar   " onPress={() => setEditShow(!editShow)} icon={{ name: 'arrow-back-ios', type: 'material-icons', size: 13, color: '#1E4344' }} buttonStyle={{ backgroundColor: '#EDE17B', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('20%') }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />
                                <Button title="  Salvar" onPress={() => alterHouse()} icon={{ name: 'save', type: 'font-awesome', size: 14, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#122829', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('40%') }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />
                                <Button title="  Excluir" onPress={() => alterHouse()} icon={{ name: 'close', type: 'font-awesome', size: 14, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#8F3E3E', borderColor: '#602929', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('20%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                            </View>


                        </View>


                    }
                    {!isLoading && createShow && !openCamera &&

                        <View style={{ height: hp('93%'), justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', borderColor: '#152F30', borderRadius: 6 }}>
                            <View style={{ paddingLeft: 5, paddingRight: 5, justifyContent: "space-evenly" }}>

                                <View style={{ borderLeftWidth: 3, borderRightWidth: 3, borderRadius: 6, borderColor: '#1E4344', justifyContent: "space-evenly", flexDirection: 'row', backgroundColor: '#1E4344' }}>
                                    <ScrollView horizontal={true}>
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto1 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto1 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto2 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto2 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto3 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto3 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto4 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto4 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto5 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto5 }} />
                                        <Card.Cover style={{ width: wp('30%'), borderRadius: 10, borderWidth: 1, borderColor: '#1E4344', }} source={{ uri: capturatePhoto6 == false ? "https://daviastro.000webhostapp.com/house.png" : capturatePhoto6 }} />
                                    </ScrollView>
                                </View>

                                <View style={{ alignItems: 'center', justifyContent: "space-evenly", flexDirection: "row", }} >
                                    {!titleDelCapturate.includes('6') &&
                                        <><Button title={titlePreCapturate} onPress={() => preTakePictureGalery()} icon={{ name: 'photo-library', type: 'material-icons', size: 15, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#295E60', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('30%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                                            <Button title={titlePreCapturate} onPress={() => preTakePicture()} icon={{ name: 'camera', type: 'material-icons', size: 15, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#295E60', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('30%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} /></>
                                    }
                                    {capturatePhoto1 && !isLoading &&
                                        <Button title={titleDelCapturate} onPress={() => removePicture()} icon={{ name: 'image-not-supported', type: 'material-icons', size: 14, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#602929', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: '30%' }} titleStyle={{ fontSize: 13, color: '#FFC77A' }} />
                                    }
                                </View>
                            </View>
                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Cidade'} placeholder={'2.888,66'} setValue={setCity} value={city} data={['São josé dos campos']} />
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Bairro'} placeholder={'2.888,66'} setValue={setDistrict} value={district} data={['Veredinha', 'Alto do cruzeiro']} />
                            </View>
                            <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <InputIconInText width={wp('70%')} height={hp('6%')} text={'Logradouro'} placeholder={'2.888,66'} setValue={setpublicPlace} value={publicPlace} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setType} value={type} text={'Tipo '} icon={<FontAwesome name="handshake-o" color='#122829' size={19} />} data={['Vender', 'Alugar']} />

                            </View>
                            <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <InputIconInText width={wp('25%')} height={hp('6%')} text={'Valor R$'} placeholder={'2.888,66'} setValue={setPrice} value={price} />
                                <InputIconInText width={wp('25%')} height={hp('6%')} text={'IPTU'} placeholder={'2.888,66'} setValue={setIptu} value={iptu} />
                                <InputIconInText width={wp('20%')} height={hp('6%')} text={'m²'} placeholder={'200'} setValue={setSquareMeter} value={squareMeter} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setCar} value={car} text={'Vagas '} icon={<FontAwesome5 name="car" color='#122829' size={20} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />

                            </View>
                            <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <SelectDropdownIconLinear width={wp('25%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setfurniture} value={furniture} text={'Mobilhada '} icon={<FontAwesome5 name="couch" color='#122829' size={17} />} data={['SIM', 'NÃO']} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setShower} value={shower} text={'Banheiro '} icon={<FontAwesome5 name="shower" color='#122829' size={19} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                <SelectDropdownIconLinear width={wp('19%')} height={hp('6%')} widthbtn={wp('17%')} setValue={setPet} value={pet} text={'Pet '} icon={<MaterialIcons name="pets" color='#122829' size={20} />} data={['SIM', 'NÃO']} />
                                <SelectDropdownIconLinear width={wp('22%')} height={hp('6%')} widthbtn={wp('20%')} setValue={setBed} value={bed} text={'Quartos '} icon={<FontAwesome name="bed" color='#122829' size={20} />} data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />

                            </View>

                            <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-evenly", }}>
                            </View>
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

                                    <InputILongText width={wp('90%')} height={hp('18%')} text={'Descrição'} placeholder={'200'} setValue={setDescription} value={description} />

                                </View>
                            </KeyboardAvoidingView >


                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>

                                {buttonInsert && <Button title="  Adicionar" onPress={() => insertHouse()} icon={{ name: 'plus', type: 'font-awesome', size: 14, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#122829', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 10, width: '55%' }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />}
                                <Button title="  Cancelar" onPress={() => setCreateShow(!createShow)} icon={{ name: 'close', type: 'font-awesome', size: 14, color: '#122829' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#EDE17B', borderColor: '#122829', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 10, width: '30%' }} titleStyle={{ fontSize: 13, color: '#122829' }} />
                            </View>


                        </View>



                    }


                    {!editShow && !isLoading && !visibleNotification &&
                        <View style={{ backgroundColor: '#1E4344', flex: 1, justifyContent: 'center', }}>
                            {!myHouses &&
                                <FAB loading visible={true} icon={{ name: 'add' }} color='#C89A5B' borderColor='rgba(42, 42, 42,1)' size="small" />}
                            {myHouses &&
                                <FlatList refreshControl={<RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />} showsVerticalScrollIndicator={false} data={myHouses} renderItem={({ item }) =>
                                    <Card style={{ justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 5, borderColor: '#152F30', borderRadius: 6 }}>
                                        <Card.Cover style={{ height: hp('65%'), borderRadius: 6, borderWidth: 3, borderColor: '#fdf5e8' }} source={{ uri: validateImage(item.houses_images, '1') == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(item.houses_images, '1') }} />
                                        <Card.Content >
                                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.houses_publicPlace} - {item.houses_district}</Text>
                                            <Paragraph><FontAwesome name="bed" color='#000' size={15} /> {item.houses_bed}      <FontAwesome5 name="shower" color='#000' size={15} /> {item.houses_shower}      <FontAwesome5 name="car" color='#000' size={15} /> {item.houses_car}     <FontAwesome name="handshake-o" color='#000' size={15} /> {item.houses_type}      <Text style={{ fontWeight: 'bold' }}>R$</Text>{item.houses_price}</Paragraph>
                                        </Card.Content>
                                        <Card.Actions>
                                            <Button title=" Editar" onPress={() => houseInfor(item.houses_id)} icon={{ name: 'edit', type: 'font-awesome', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: wp('30%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                                        </Card.Actions>
                                    </Card>} keyExtractor={value => value.houses_id} />
                            }
                        </View>
                    }
                    {isLoading &&
                    <View style={{marginTop:wp('80%')}}>
                        <FAB loading visible={true} icon={{ name: 'add' }} color='#C89A5B' borderColor='rgba(42, 42, 42,1)' size="small" />
                        </View>}
                    {visibleNotification &&
                        <Notification message={'Casa Adcionada'} tipo={'ss'} visible={true} onClose={() => (setVisibleNotification(false), cleanCreate())}></Notification>
                    }
                </NativeBaseProvider>


            </View>

        </View>
    );
}