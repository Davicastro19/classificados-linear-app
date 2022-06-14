import { View, Keyboard, KeyboardAvoidingView, RefreshControl, TouchableWithoutFeedback, StatusBar, Pressable, TouchableOpacity, Modal, Image } from 'react-native';
import { Text, FAB, Button, } from 'react-native-elements';
import React, { useState, useEffect, useRef } from 'react'
import tenantService from '../services/TenantSevice';
import housesService from '../services/HousesService';
import styles from '../style/MyHouses'
import DateAndHours from '../util/DateAndHours'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import cameras from '../style/camera'
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';
import { Card, Title, Paragraph } from 'react-native-paper';
import Notification from '../components/Notification';
import Confirmation from '../components/Confirmation';

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
export default function MyHouses() {
    const [take,setTake] = useState(5)
    const [skip,setSkip] = useState(10)
    const [refreshing, setRefreshing] = useState(false);
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
    const [publicPlace, setPublicPlace] = useState('Rua Dr. Manoel Novais')
    const [city, setCity] = useState('Ibotirama')
    const [district, setDistrict] = useState('Centro')
    const [description, setDescription] = useState(null)
    const [myHouses, setMyHouses] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(false)
    const [editShow, setEditShow] = useState(true)
    const [createShow, setCreateShow] = useState(false)
    const [specificHouses, setSpecificHouses] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [deletePhotoEdit, setDeletePhotoEdit] = useState(false)
    const [messageNotification, setMessageNotification] = useState(false)
    const [images, setImages] = useState('')
    const [visibleConfimation, setVisibleConfimation] = useState(false)
    const [visibleConfimationDeletion, setVisibleConfimationDeletion] = useState(false)
    const [visibleConfimationUpdate, setVisibleConfimationUpdate] = useState(false)


    const onRefresh = React.useCallback(() => {
        allMyHouses()
        setRefreshing(false);
    }, []);

    function resetHouse() {
        setEditShow(false)
        setCreateShow(false)
        setCapturatePhoto1(false)
        setCapturatePhoto2(false)
        setCapturatePhoto3(false)
        setCapturatePhoto4(false)
        setCapturatePhoto5(false)
        setCapturatePhoto6(false)
        setBed('1')
        setShower('1')
        setCar('1')
        setType('Alugar')
        setPet('SIM')
        setPrice('1.800,66')
        setIptu('100,66')
        setSquareMeter('100')
        setfurniture('SIM')
        setPublicPlace('Rua Dr. Manoel Novais')
        setCity('Ibotirama')
        setDistrict('Centro')
        setDescription(null)
        setIsLoading(false)
        setTitlePreCapturate("Adicionar a 1º")
        setTitleDelCapturate("Apagar a 1º")
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
            setCapturatePhoto1(false)
            setTitlePreCapturate("Adicionar a 1º")
            setAlt(new Object)
        }
        if (titleDelCapturate.includes('2')) {
            setButtonInsert(false)
            setCapturatePhoto2(false)
            setTitleDelCapturate("Apagar a 1º")
            setTitlePreCapturate("Adicionar a 2º")
        }
        if (titleDelCapturate.includes('3')) {
            setButtonInsert(false)
            setCapturatePhoto3(false)
            setTitleDelCapturate("Apagar a 2º")
            setTitlePreCapturate("Adicionar a 3º")
        }
        if (titleDelCapturate.includes('4')) {
            setButtonInsert(false)
            setCapturatePhoto4(false)
            setTitleDelCapturate("Apagar a 3º")
            setTitlePreCapturate("Adicionar a 4º")
        }
        if (titleDelCapturate.includes('5')) {
            setButtonInsert(false)
            setCapturatePhoto5(false)
            setTitleDelCapturate("Apagar a 4º")
            setTitlePreCapturate("Adicionar a 5º")

        }
        if (titleDelCapturate.includes('6')) {
            setButtonInsert(false)
            setCapturatePhoto6(false)
            setTitleDelCapturate("Apagar a 5º")
            setTitlePreCapturate("Adicionar a 6º")
        }

    }

    async function isValidateImage() {
        try {
            let newAlt = ''
            //console.log('ALT', alt)
            for (var num in alt) {
                //console.log(num)
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                //console.log('SIM', images.split(',')[parseInt(num - 1)])
                const imagesData = new FormData();
                imagesData.append('image', {
                    uri: alt[num].uri,
                    type: 'image/jpeg',
                    name: images.split(',')[parseInt(num - 1)]
                })
                xhr.open('POST', 'http://192.168.0.104:3000/houses/uploadImg')
                xhr.send(imagesData)

            }

            return true
        } catch (e) {
            return false
        }
    }

    async function insertHouse() {
        setIsLoading(true)
        setCreateShow(false)
        setVisibleConfimation(false)
        //console.log(isValidate())
        if (isValidate() && isValidateImage()) {
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
                images: images,
                creationDate: DateAndHours
            }
            housesService.insertHouse(dataCreateHouse)
                .then((response) => {
                    
                    if (response.data.status) {

                        setMessageNotification('Adicionada com sucesso!')
                        setCreateShow(false)
                        setVisibleNotification(true)

                    } else {
                        setMessageNotification('Ocorreu um erro, tente novamente')
                        setVisibleNotification(true)
                        setCreateShow(true)
                        //console.log('Ocorreu um erro 298 myhouse', response.data)
                    }

                })
                .catch((error) => {
                    setMessageNotification('Ocorreu um erro, tente novamente')
                    setVisibleNotification(true)
                    setCreateShow(true)
                    //console.log('Ocorreu um erro 297 myhouse', response.data)
                })
        }else{
        setCreateShow(true)
        setMessageNotification('Existem campos invalidos')
        setVisibleNotification(true)
        setCreateShow(true)
        //console.log('Ocorreu um erro 300 myhouse', response.data)
    }
    setIsLoading(false)
    }

    async function updateHouse(id) {
        setIsLoading(true)
        setEditShow(false)
        setVisibleConfimationUpdate(false)
        if (isValidate() && isValidateImage()) {
            const dataUpdateHouse = {
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
                images: images,
            }
            housesService.updateHouse(dataUpdateHouse, id)
                .then((response) => {
                    //console.log(response.data.status)
                    if (response.data.status) {
                        setVisibleNotification(true)
                        setMessageNotification('Alterado com sucesso!')
                        setCreateShow(false)
                        setSpecificHouses(false)
                        resetHouse()
                        setAlt(new Object)

                    } else {
                        setEditShow(true)
                        //console.log('whatt', response.data)
                        setMessageNotification('Não foi possivel alterar, tente novamente')
                        setVisibleNotification(true)
                    }

                })
                .catch((error) => {
                    setEditShow(true)
                    setMessageNotification('Não foi possivel alterar, tente novamente')
                        setVisibleNotification(true)
                    //console.log('ertert', error)
                })
        }else{
            setEditShow(true)
            setMessageNotification('Campos invalidos')
            setVisibleNotification(true)
        }
        
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

    async function takePictureGalery(data) {
        //console.log(editShow)
        if (!data.cancelled && data.uri) {
            if (!capturatePhoto1) {

                setButtonInsert(true)
                let upAlt = alt
                upAlt['1'] = { 'uri': data.uri }
                setAlt(upAlt)
                if (editShow == false) {
                    let img = Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('') + '1.jpg,'
                    setImages(img)
                }
                setCapturatePhoto1(data.uri)
                setTitlePreCapturate("Adicionar a 2º")
                setTitleDelCapturate("Apagar a 1º")

            } else if (!capturatePhoto2) {

                let upAlt = alt
                upAlt['2'] = { 'uri': data.uri }
                setAlt(upAlt)
                if (editShow == false) {
                    let img2 = images + Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('') + '2.jpg,'
                    setImages(img2)
                }
                setCapturatePhoto2(data.uri)
                setTitlePreCapturate("Adicionar a 3º")
                setTitleDelCapturate("Apagar a 2º")
            }
            else if (!capturatePhoto3) {
                let upAlt = alt
                upAlt['3'] = { 'uri': data.uri }
                setAlt(upAlt)
                if (editShow == false) {
                    let img3 = images + Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('') + '3.jpg,'
                    setImages(img3)
                }
                setCapturatePhoto3(data.uri)
                setTitlePreCapturate("Adicionar a 4º")
                setTitleDelCapturate("Apagar a 3º")
            }
            else if (!capturatePhoto4) {
                let upAlt = alt
                upAlt['4'] = { 'uri': data.uri }
                setAlt(upAlt)
                if (editShow == false) {
                    let img4 = images + Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('') + '4.jpg,'
                    setImages(img4)
                }
                setCapturatePhoto4(data.uri)
                setTitlePreCapturate("Adicionar a 5º")
                setTitleDelCapturate("Apagar a 4º")
            }
            else if (!capturatePhoto5) {
                let upAlt = alt
                upAlt['5'] = { 'uri': data.uri }
                setAlt(upAlt)
                if (editShow == false) {
                    let img5 = images + Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('') + '5.jpg,'
                    setImages(img5)
                }
                setCapturatePhoto5(data.uri)
                setTitlePreCapturate("Adicionar a 6º")
                setTitleDelCapturate("Apagar a 5º")
            }
            else if (!capturatePhoto6) {
                let upAlt = alt
                upAlt['6'] = { 'uri': data.uri }
                setAlt(upAlt)
                if (editShow == false) {
                    let img6 = images + Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('') + '6.jpg'
                    setImages(img6)
                }
                setCapturatePhoto6(data.uri)
                setTitleDelCapturate("Apagar a 6º")
                setButtonInsert(true)
            }

        }
    }

    function validateImage(image, value) {
        try {
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                return "http://192.168.0.104:3000/houses/" + image.split(',')[value]
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }

    function loadData(image, data) {
        setImages(image)
        setButtonInsert(true)
        setBed(data.houses_bed)
        setShower(data.houses_shower)
        setCar(data.houses_car)
        setType(data.houses_type)
        setPet(data.houses_pet)
        setPrice(data.houses_price)
        setIptu(data.houses_tax)
        setSquareMeter(data.houses_squareMeter)
        setfurniture(data.houses_furniture)
        setPublicPlace(data.houses_publicPlace)
        setCity(data.houses_city)
        setDistrict(data.houses_district)
        setDescription(data.houses_description)
        setShowFilter(false)
        setEditShow(true)
        setIsLoading(false)
        let i = 1
        for (var num in image.split(',')) {
            let upAlt = alt
            upAlt[i.toString()] = { 'uri': "http://192.168.0.104:3000/houses/" + image.split(',')[num] }
            setAlt(upAlt)
            i = i + 1
        }

        setDeletePhotoEdit(true)
        setCapturatePhoto1("http://192.168.0.104:3000/houses/" + image.split(',')[0])
        setCapturatePhoto2("http://192.168.0.104:3000/houses/" + image.split(',')[1])
        setCapturatePhoto3("http://192.168.0.104:3000/houses/" + image.split(',')[2])
        setCapturatePhoto4("http://192.168.0.104:3000/houses/" + image.split(',')[3])
        setCapturatePhoto5("http://192.168.0.104:3000/houses/" + image.split(',')[4])
        setCapturatePhoto6("http://192.168.0.104:3000/houses/" + image.split(',')[5])
        setTitleDelCapturate("Apagar a 6º")
    }

    async function selectHouseById(value) {
        setIsLoading(true)
        //console.log(value)
        housesService.selectHouseById(value)
            .then((response) => {
                setSpecificHouses(response.data)
                loadData(response.data.houses_images, response.data)
            })
            .catch((error) => {
                setSpecificHouses(false)
                setShowFilter(true)
                setEditShow(false)
                setButtonInsert(false)
                //console.log('aaa', error)
                setMessageNotification('Não foi possivel buscar, tente novamente')
                setVisibleNotification(true)
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })
            setIsLoading(false)
    }

    function deleteHouse(id) {
        setVisibleConfimationDeletion(false)
        setOpenCamera(false)
        setEditShow(false)
        setCreateShow(false)
        setOpenCamera(false)
        setIsLoading(true)
        housesService.deleteHouse(id)
            .then((response) => {
                setMessageNotification('Excluido com sucesso!')
                setMyHouses(false)
                setEditShow(false)
                setVisibleNotification(true)
                allMyHouses()

            })
            .catch((error) => {
                //console.log('oooo', error)
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })
            setIsLoading(false)

    }

    async function allMyHouses() {
        setOpenCamera(false)
        setEditShow(false)
        setCreateShow(false)
        setOpenCamera(false)
        setIsLoading(true)
        housesService.allMyHouses()
            .then((response) => {
                setMyHouses(response.data)
            })
            .catch((error) => {
                //console.log('oooo', error)
                setMessageNotification('Não foi possivel encontrar, tente novamente')
                setVisibleNotification(true)
                allMyHouses()
                //setCatalogData('Seu sinais estarão aqui. (clique em Filtro)')
            })
            setIsLoading(false)
    }




    useEffect(() => {
        if (myHouses == false) {
            allMyHouses()
        }
    }, [])
    return (
        <View style={styles.container} >
            <View style={styles.container} >

                {!editShow && !createShow && !isLoading && !visibleNotification &&
                    //<><View style={{ width: '100%', height: '6%' }}><Button title=" Filtro" onPress={() => setFilter(!filter)} icon={{ name: 'filter', type: 'font-awesome', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#fdf5e8' }} />
                   // </View>
                            <View style={{ width: '100%', height: '6%' }}><Button title=" Adicionar casa/aptoº" onPress={() => (setCreateShow(!createShow), setTitleDelCapturate("Adicionar a 1ª"))} icon={{ name: 'add-box', type: 'material-icons', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#152F30', borderWidth: 0.5 }} containerStyle={{ height: '100%' }} titleStyle={{ color: '#fdf5e8' }} />
                        </View>}

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

                    {!isLoading && editShow && !openCamera && !visibleConfimationUpdate && !visibleNotification && !visibleConfimationDeletion && !visibleNotification &&
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
                                        </>
                                    }
                                    {deletePhotoEdit && !isLoading &&
                                        <Button title={titleDelCapturate} onPress={() => removePicture()} icon={{ name: 'image-not-supported', type: 'material-icons', size: 14, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#602929', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: '30%' }} titleStyle={{ fontSize: 13, color: '#FFC77A' }} />
                                    }
                                </View>
                            </View>
                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Cidade'} placeholder={'2.888,66'} setValue={setCity} value={city} data={['Ibotirama']} />
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Bairro'} placeholder={'2.888,66'} setValue={setDistrict} value={district} data={['Alto do Cruzeiro', 'Alto do Fundão', 'Calumbi', 'Centro',  'Ibotiraminha', 'Morada Real', 'Bairro São Francisco', 'Barão 242', 'Bairro São João', 'Santa Rosa', 'Veredinha', 'Xixa']} />
                            </View>
                            <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <InputIconInText width={wp('70%')} height={hp('6%')} text={'Logradouro'} placeholder={'2.888,66'} setValue={setPublicPlace} value={publicPlace} />
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

                                <Button title="Voltar   " onPress={() => (setEditShow(!editShow), resetHouse(), setAlt(new Object))} icon={{ name: 'arrow-back-ios', type: 'material-icons', size: 13, color: '#1E4344' }} buttonStyle={{ backgroundColor: '#EDE17B', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('20%') }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />
                                {buttonInsert && <Button title="  Salvar" onPress={() => setVisibleConfimationUpdate(true)} icon={{ name: 'save', type: 'font-awesome', size: 14, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#122829', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('40%') }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />}

                                <Button title="  Excluir" onPress={() => setVisibleConfimationDeletion(true)} icon={{ name: 'close', type: 'font-awesome', size: 14, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#8F3E3E', borderColor: '#602929', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: wp('20%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                            </View>


                        </View>
                    }
                    {!isLoading && createShow && !openCamera && !visibleConfimationUpdate && !visibleNotification && !visibleConfimationDeletion && !visibleNotification &&

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
                                        </>
                                    }
                                    {capturatePhoto1 && !isLoading &&
                                        <Button title={titleDelCapturate} onPress={() => removePicture()} icon={{ name: 'image-not-supported', type: 'material-icons', size: 14, color: '#FFC77A' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#602929', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 2, width: '30%' }} titleStyle={{ fontSize: 13, color: '#FFC77A' }} />
                                    }
                                </View>
                            </View>
                            <View style={{ margin: 4, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Cidade'} placeholder={'2.888,66'} setValue={setCity} value={city} data={['Ibotirama']} />
                                <SelectDropdownTextLinear widthbt={wp('45%')} text={'Bairro'} placeholder={'2.888,66'} setValue={setDistrict} value={district} data={['Alto do Cruzeiro', 'Alto do Fundão', 'Calumbi', 'Centro',  'Ibotiraminha', 'Morada Real', 'Bairro São Francisco', 'Barão 242', 'Bairro São João', 'Santa Rosa', 'Veredinha', 'Xixa']} />
                            </View>
                            <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-evenly", }}>
                                <InputIconInText width={wp('70%')} height={hp('6%')} text={'Logradouro'} placeholder={'2.888,66'} setValue={setPublicPlace} value={publicPlace} />
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

                                {buttonInsert && <Button title="  Adicionar" onPress={() => setVisibleConfimation(true)} icon={{ name: 'plus', type: 'font-awesome', size: 14, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#FFF8EE', borderColor: '#122829', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 10, width: '55%' }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />}
                                <Button title="  Cancelar" onPress={() => (setCreateShow(!createShow), resetHouse(), setAlt(new Object))} icon={{ name: 'close', type: 'font-awesome', size: 14, color: '#122829' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#EDE17B', borderColor: '#122829', borderWidth: 1, borderRadius: 6, }} containerStyle={{ paddingTop: 10, width: '30%' }} titleStyle={{ fontSize: 13, color: '#122829' }} />
                            </View>


                        </View>
                    }

                    {!editShow && !isLoading && !visibleConfimationUpdate && !visibleNotification && !visibleConfimationDeletion && !visibleNotification &&
                        <View style={{ backgroundColor: '#1E4344', flex: 1, justifyContent: 'center', }}>
                            {myHouses &&
                                <FlatList refreshControl={<RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />} showsVerticalScrollIndicator={false} data={myHouses} renderItem={({ item }) =>
                                    <Card style={{ justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 5, borderColor: '#152F30', borderRadius: 6 }}>
                                        <Card.Cover style={{ height: hp('65%'), borderRadius: 6, borderWidth: 3, borderColor: '#fdf5e8' }} source={{ uri: validateImage(item.houses_images, 0) == false ? "https://daviastro.000webhostapp.com/house.png" : validateImage(item.houses_images, 0) }} />
                                        <Card.Content >
                                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.houses_publicPlace} - {item.houses_district}</Text>
                                            <Paragraph><FontAwesome name="bed" color='#000' size={15} /> {item.houses_bed}      <FontAwesome5 name="shower" color='#000' size={15} /> {item.houses_shower}      <FontAwesome5 name="car" color='#000' size={15} /> {item.houses_car}     <FontAwesome name="handshake-o" color='#000' size={15} /> {item.houses_type}      <Text style={{ fontWeight: 'bold' }}>R$</Text>{item.houses_price}</Paragraph>
                                        </Card.Content>
                                        <Card.Actions>
                                            <Button title=" Editar" onPress={() => selectHouseById(item.houses_id)} icon={{ name: 'edit', type: 'font-awesome', size: 19, color: '#fdf5e8' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#1E4344', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: wp('30%') }} titleStyle={{ fontSize: 13, color: '#fdf5e8' }} />
                                        </Card.Actions>
                                    </Card>} keyExtractor={value => value.houses_id} />
                            }
                        </View>
                    }
                    {isLoading &&
                        <View style={{ marginTop: wp('80%') }}>
                            <FAB loading visible={true} icon={{ name: 'add' }} color='#C89A5B' borderColor='rgba(42, 42, 42,1)' size="small" />
                        </View>}
                    {visibleNotification &&
                        <Notification message={messageNotification} tipo={'ss'} visible={true} onClose={() => (setVisibleNotification(false))}></Notification>
                    }
                    {visibleConfimation &&
                        <Confirmation message={'Tem certeza que deseja adicionar?'} tipo={'ss'} visible={true} cancel={() => (setCreateShow(!createShow), resetHouse(), setAlt(new Object), setVisibleConfimation(false))} confirmation={() => insertHouse()}></Confirmation>
                    }
                    {visibleConfimationDeletion &&
                        <Confirmation message={'Tem certeza que deseja deletar?'} tipo={'ss'} visible={true} cancel={() => (setEditShow(!editShow), resetHouse(), setAlt(new Object), setVisibleConfimationDeletion(false))} confirmation={() => deleteHouse(specificHouses.houses_id)}></Confirmation>
                    }
                    {visibleConfimationUpdate &&
                        <Confirmation message={'Tem certeza que deseja alterar?'} tipo={'ss'} visible={true} cancel={() => (setEditShow(!editShow), resetHouse(), setAlt(new Object), setVisibleConfimationUpdate(false))} confirmation={() => updateHouse(specificHouses.houses_id)}></Confirmation>
                    }


                </NativeBaseProvider>


            </View>

        </View>
    );
}