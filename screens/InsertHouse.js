import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import PInput from '../components/input/input';
import PInputLong from '../components/inputLong/inputLong'
import Select from '../components/select/select';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { VStack, HStack, Text, Center, NativeBaseProvider, Image } from "native-base";
import { View, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import Config from '../util/Config'
import styles from '../style/MyHouses'
import housesService from '../services/HousesService';
import Notification from '../components/notification/notification';
import PButton from '../components/button/button';
import MLoad from '../components/loading/miniLoad'
import DialogConfirmation from '../components/dialogConfirmation/dialogConfirmation'
import stylesColor from '../style/colorApp';
import DateAndHours from '../util/DateAndHours'
import styleInsertHouse from '../style/InsertHouse'

import * as ImagePicker from "expo-image-picker";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function InsertHouse({ navigation }) {
    const route = useRoute()
    const [titlePreCapturate, setTitlePreCapturate] = useState("Adicionar a 1º")
    const [titleDelCapturate, setTitleDelCapturate] = useState("Apagar a 1º")
    const [alt, setAlt] = useState(new Object)
    const [buttonInsert, setButtonInsert] = useState(false)
    const [capturatePhoto1, setCapturatePhoto1] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto2, setCapturatePhoto2] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto3, setCapturatePhoto3] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto6, setCapturatePhoto6] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto4, setCapturatePhoto4] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto5, setCapturatePhoto5] = useState(Config.AWS_URL + 'favicon.png')
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
    const [visableNotification, setVisableNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState(null)
    const [deletePhotoEdit, setDeletePhotoEdit] = useState(false)
    const [images, setImages] = useState('')
    const [visableConfirmationDeletion, setVisableConfirmationDeletion] = useState(false)
    const [visableConfirmationInsert, setVisableConfirmationInsert] = useState(false)
    const [oldImages, setOldImages] = useState('')
    const [visableNotifications, setVisableNotifications] = useState(false);
    


    function validateButton(image, value) {
        try {
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                let del = value + 1
                let add = value + 2
                setTitleDelCapturate("Apagar a " + del.toString() + "º")
                setTitlePreCapturate("Adicionar a " + add.toString() + "º")
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
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
        if (Config.AWS_URL + 'favicon.png' === capturatePhoto1) {
            return false
        } else {
            return true
        }
    }

    async function isValidateImage() {
        if (oldImages !== images) {
            try {
                for (var num in alt) {
                    if (!images.split(',')[num - 1]) {
                    } else {
                        const xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;
                        const imagesData = new FormData();
                        imagesData.append('image', {
                            uri: alt[num].uri,
                            type: 'image/jpeg',
                            name: images.split(',')[parseInt(num - 1)]
                        })
                        xhr.open('POST', Config.API_URL + 'houses/uploadImg')
                        xhr.send(imagesData)
                    }
                }
                return true
            } catch (e) {
                showNotification('error', 'Ops!', e.toString())
                return false
            }
        }
        return true
    }

    function insertHouse() {
        setIsLoading(true)
        setVisableConfirmationInsert(false)
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
                        showNotification('success', 'Sucesso!', 'Adicionado com sucesso.')

                    } else {
                        showNotification('info', 'Então...', 'Ocorreu um erro, tente novamente.')
                        //// console.log('Ocorreu um erro 298 myhouse', response.data)
                    }

                })
                .catch((error) => {
                    showNotification('error', 'Ops!', error.toString())
                    //// console.log('Ocorreu um erro 297 myhouse', response.data)
                })
        } else {
            showNotifications('info', 'Então...', 'Existem campos inválidos')
            //// console.log('Ocorreu um erro 300 myhouse', response.data)
        }
        setIsLoading(false)
    }

    async function preTakePictureGalery() {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status === "granted") {
            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Image
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
        console.log('1', capturatePhoto1)
        console.log('2', capturatePhoto2)
        console.log('3', capturatePhoto3)
        console.log('4', capturatePhoto4)
        console.log('5', capturatePhoto5)
        console.log('6', capturatePhoto6)
        if (!data.cancelled && data.uri) {
            if (Config.AWS_URL + 'favicon.png' === capturatePhoto1) {
                setButtonInsert(true)
                let upAlt = alt
                upAlt['1'] = { 'uri': data.uri }
                setAlt(upAlt)
                let img = Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('') + '1.jpg,'
                setImages(img)
                setCapturatePhoto1(data.uri)
                setTitlePreCapturate("Adicionar a 2º")
                setTitleDelCapturate("Apagar a 1º")
                setDeletePhotoEdit(true)

            } else if (Config.AWS_URL + 'favicon.png' === capturatePhoto2) {
                let upAlt = alt
                upAlt['2'] = { 'uri': data.uri }
                setAlt(upAlt)
                let img2 = images + Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('') + '2.jpg,'
                setImages(img2)
                setCapturatePhoto2(data.uri)
                setTitlePreCapturate("Adicionar a 3º")
                setTitleDelCapturate("Apagar a 2º")
            }
            else if (Config.AWS_URL + 'favicon.png' === capturatePhoto3) {
                let upAlt = alt
                upAlt['3'] = { 'uri': data.uri }
                setAlt(upAlt)
                let img3 = images + Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('') + '3.jpg,'
                setImages(img3)
                setCapturatePhoto3(data.uri)
                setTitlePreCapturate("Adicionar a 4º")
                setTitleDelCapturate("Apagar a 3º")
            }
            else if (Config.AWS_URL + 'favicon.png' === capturatePhoto4) {
                let upAlt = alt
                upAlt['4'] = { 'uri': data.uri }
                setAlt(upAlt)
                let img4 = images + Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('') + '4.jpg,'
                setImages(img4)
                setCapturatePhoto4(data.uri)
                setTitlePreCapturate("Adicionar a 5º")
                setTitleDelCapturate("Apagar a 4º")
            }
            else if (Config.AWS_URL + 'favicon.png' === capturatePhoto5) {
                let upAlt = alt
                upAlt['5'] = { 'uri': data.uri }
                setAlt(upAlt)
                let img5 = images + Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('') + '5.jpg,'
                setImages(img5)
                setCapturatePhoto5(data.uri)
                setTitlePreCapturate("Adicionar a 6º")
                setTitleDelCapturate("Apagar a 5º")
            }
            else if (Config.AWS_URL + 'favicon.png' === capturatePhoto6) {
                let upAlt = alt
                upAlt['6'] = { 'uri': data.uri }
                console.log('upalt', upAlt)
                console.log('upalt6', upAlt['6'])
                setAlt(upAlt)
                let img6 = images + Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('') + '6.jpg'
                setImages(img6)
                setCapturatePhoto6(data.uri)
                setTitleDelCapturate("Apagar a 6º")
                setButtonInsert(true)
            }


        }
    }
    function removePicture() {
        if (titleDelCapturate.includes('1')) {
            let imgAlt = images.split(',')[0]
            //removeImage(imgAlt)
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setDeletePhotoEdit(false)
            setButtonInsert(false)
            setCapturatePhoto1(Config.AWS_URL + 'favicon.png')
            setTitlePreCapturate("Adicionar a 1º")
            setAlt(new Object)
        }
        if (titleDelCapturate.includes('2')) {
            let imgAlt = images.split(',')[1]
            //removeImage(imgAlt)
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto2(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 1º")
            setTitlePreCapturate("Adicionar a 2º")
        }
        if (titleDelCapturate.includes('3')) {
            let imgAlt = images.split(',')[2]
            //removeImage(imgAlt)
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto3(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 2º")
            setTitlePreCapturate("Adicionar a 3º")
        }
        if (titleDelCapturate.includes('4')) {
            let imgAlt = images.split(',')[3]
            //removeImage(imgAlt)
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto4(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 3º")
            setTitlePreCapturate("Adicionar a 4º")
        }
        if (titleDelCapturate.includes('5')) {
            let imgAlt = images.split(',')[4]
            //removeImage(imgAlt)
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto5(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 4º")
            setTitlePreCapturate("Adicionar a 5º")

        }
        if (titleDelCapturate.includes('6')) {
            let imgAlt = images.split(',')[5]
            //removeImage(imgAlt)
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto6(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 5º")
            setTitlePreCapturate("Adicionar a 6º")
        }


    }

    function validateImages(image) {
        try {
            //console.log('homes',Config.AWS_URL + image.split(',')[value])
            if (image.includes('jpg') || image.includes('png')) {
                return Config.AWS_URL + image
            } else {
                return Config.AWS_URL + 'favicon.png'
            }
        } catch (e) {
            return Config.AWS_URL + 'favicon.png'
        }
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
    function showNotifications(status, title, message) {
        setVisableNotifications(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
    }

    function resetState() {
        setVisableNotification(false)
        setIsLoading(false)
        navigation.navigate("MyHouses")
    }
    function close() {
        setVisableNotifications(false)
        setIsLoading(false)
    }
    
    let selectDistrict = ''
    if (city === 'Ibotirama') {
        selectDistrict = ['Alto do Cruzeiro', 'Alto do Fundão', 'Calumbi', 'Centro', 'Ibotiraminha', 'Morada Real', 'Bairro São Francisco', 'Barão 242', 'Bairro São João', 'Santa Rosa', 'Veredinha', 'Xixa']
    }
    return (
        <NativeBaseProvider >
            
            <SafeAreaView style={styles.preContainer} >
            <StatusBar barStyle="light-content" backgroundColor={stylesColor.primaryColor} />
                {isLoading &&
                    <View style={styles.mLoad}>
                        <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
                    </View>
                }
                {!isLoading &&
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}>
                        <Center flex={1} px="0" my={0} >
                            <HStack w={wp('100%')} borderWidth={wp("0.1%")} space={8} rounded="md"
                                _light={{
                                    borderColor: stylesColor.tertiaryColor,
                                    backgroundColor: stylesColor.tertiaryColor
                                }} p="2"  >

                                <VStack flex="1" >

                                    <View >
                                        <ScrollView horizontal={true} >
                                            <Image alt={'.'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: capturatePhoto1 }} />
                                            <Image alt={'.'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: capturatePhoto2 }} />
                                            <Image alt={'.'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: capturatePhoto3 }} />
                                            <Image alt={'.'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: capturatePhoto4 }} />
                                            <Image alt={'.'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: capturatePhoto5 }} />
                                            <Image alt={'.'} h={hp('35%')} w={wp("93%")} borderColor={stylesColor.tertiaryColor10} borderWidth={hp('0.036%')} borderRadius={4} source={{ uri: capturatePhoto6 }} />

                                        </ScrollView>
                                        <View style={{ alignItems: 'center', justifyContent: "space-evenly", flexDirection: "row", }} >

                                            {!titleDelCapturate.includes('6') &&
                                                <PButton onPress={() => preTakePictureGalery()} title={titlePreCapturate} type='material-community' name='image-plus' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#24b95b' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                            }
                                            {deletePhotoEdit &&
                                                <PButton onPress={() => removePicture()} title={titleDelCapturate} type='material-community' name='image-remove' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#f23d3d' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                            }
                                        </View>
                                    </View>

                                </VStack>

                            </HStack>
                            <ScrollView>
                                <View style={{ backgroundColor: stylesColor.tertiaryColor }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>

                                        <View >
                                            <Text style={styleInsertHouse.description}>Cidade</Text>
                                            <Select value={'Ibotirama'} width={wp('48%')} setSelect={value => setCity(value)} dataSelect={['Ibotirama', 'Javi']} />
                                        </View>
                                        <View >
                                            <Text style={styleInsertHouse.description}>Bairro</Text>
                                            <Select value={'Centro'} width={wp('48%')} setSelect={value => setDistrict(value)} dataSelect={selectDistrict} />
                                        </View>

                                    </View>

                                    <View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>

                                        <View style={{ width: wp('71%'), marginRight: hp('1%') }} >
                                            <Text style={styleInsertHouse.descriptionInput}>Logradouro</Text>
                                            <PInput placeholder={'Avenida, Rua'} onChangeText={value => setPublicPlace(value)}  size={hp('2.2%')} type='material-icons' name='place' />
                                        </View>
                                        <View >
                                            <Text style={styleInsertHouse.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Tipo</Text>
                                            <Select value={'Selecione'} width={wp('26%')} setSelect={value => setType(value)} dataSelect={['Alugar', 'Vender']} />
                                        </View>

                                    </View>

                                    <View style={{ marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>

                                        <View style={{ width: wp('30%'), marginRight: hp('0%') }} >
                                            <Text style={styleInsertHouse.descriptionInput}> Valor</Text>
                                            <PInput onChangeText={value => setPrice(value)} placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                        </View>
                                        <View style={{ width: wp('25%'), marginRight: hp('0%') }} >
                                            <Text style={styleInsertHouse.descriptionInput}> IPTU</Text>
                                            <PInput onChangeText={value => setIptu(value)} placeholder={'10,00'} size={hp('2.2%')} type='material-community' name='currency-brl' />
                                        </View>
                                        <View style={{ width: wp('22%'), marginRight: hp('1%') }} >
                                            <Text style={styleInsertHouse.descriptionInput}> m²</Text>
                                            <PInput onChangeText={value => setSquareMeter(value)} placeholder={'10'} size={hp('2.2%')} type='material-community' name="ruler-square" />
                                        </View>
                                        <View >
                                            <Text style={styleInsertHouse.description}><Ionicons name="car-sport" color='#000' size={hp('2.0%')} /> Vagas</Text>
                                            <Select value={'Selecione'} width={wp('19%')} setSelect={value => setCar(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                        </View>

                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>

                                        <View >
                                            <Text style={styleInsertHouse.description}><FontAwesome5 name="couch" color='#000' size={hp('2.0%')} /> Mobilhado</Text>
                                            <Select value={'Selecione'} width={wp('22%')} setSelect={value => setfurniture(value)} dataSelect={['Sim', 'Não']} />
                                        </View>
                                        <View >
                                            <Text style={styleInsertHouse.description}><MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.0%')} /> Banheiro</Text>
                                            <Select value={'Selecione'} width={wp('21%')} setSelect={value => setShower(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                        </View>
                                        <View >
                                            <Text style={styleInsertHouse.description}><MaterialCommunityIcons name="dog" color='#000' size={hp('2.0%')} /> Pet</Text>
                                            <Select value={'Selecione'} width={wp('22%')} setSelect={value => setPet(value)} dataSelect={['Sim', 'Não']} />
                                        </View>
                                        <View >
                                            <Text style={styleInsertHouse.description}><MaterialCommunityIcons name="bed" color='#000' size={hp('2.0%')} /> Quartos</Text>
                                            <Select value={'Selecione'} width={wp('19%')} setSelect={value => setBed(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                        </View>

                                    </View>

                                    <View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                        <View style={{ width: wp('90%'), marginRight: hp('1%') }} >
                                            <Text style={styleInsertHouse.descriptionInput}>Descrição</Text>
                                            <PInputLong placeholder={'Próximo a panificadora e escola... /  Isto é um comércio ou casa e comécio...'} maxLength={316} multiline={true} onChangeText={value => setDescription(value)} value={description} size={hp('2.2%')} type='material-community' name='view-headline' />
                                        </View>
                                    </View>

                                    <View style={{ marginBottom: hp('2%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                        <PButton width={wp('25%')} onPress={() => resetState()} title='Cancelar' type='material-icons' name='close' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                        <PButton width={wp('30%')} onPress={() => setVisableConfirmationInsert(true)} title='Anunciar' type='material-community' name='home-plus-outline' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#24b95b' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                    </View>
                                </View>

                            </ScrollView>

                        </Center>
                    </KeyboardAvoidingView>
                }
               
                {visableConfirmationInsert &&
                    <DialogConfirmation message={'Tem certeza que deseja Anunciar?'} cancel={() => setVisableConfirmationInsert(false)} confirmation={() => insertHouse()} />
                }
                {visableNotification &&
                    <Notification status={status} visable={true} title={title} message={message} onPress={() => resetState()} close={() => resetState()} />
                }
                {visableNotifications &&
                    <Notification status={status} visable={visableNotifications} title={title} message={message} onPress={() => close()} close={() => close()} />
                }
            </SafeAreaView>

        </NativeBaseProvider>);
}