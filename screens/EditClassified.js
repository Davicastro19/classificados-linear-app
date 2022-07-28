import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import styleEditClassified from '../style/EditClassified.js'
import PInput from '../components/input/input';
import PInputLong from '../components/inputLong/inputLong'
import Select from '../components/select/select';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { VStack, HStack, Text, Center, NativeBaseProvider, Image } from "native-base";
import { View, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import Config from '../util/Config'
import styles from '../style/MyClassifieds'
import classifiedsService from '../services/ClassifiedsService';
import Notification from '../components/notification/notification';
import PButton from '../components/button/button';
import MLoad from '../components/loading/miniLoad'
import DialogConfirmation from '../components/dialogConfirmation/dialogConfirmation'
import stylesColor from '../style/colorApp';
import * as ImagePicker from "expo-image-picker";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function EditClassified({ navigation }) {
    const route = useRoute()
    const [titlePreCapturate, setTitlePreCapturate] = useState("Adicionar a 1º")
    const [titleDelCapturate, setTitleDelCapturate] = useState("Apagar a 1º")
    const [alt, setAlt] = useState(new Object)
    const [errorInput, setErrorInput] = useState(false)
    const [buttonInsert, setButtonInsert] = useState(false)
    const [errorText, setErrorText] = useState('Campo invalido')
    const [capturatePhoto1, setCapturatePhoto1] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto2, setCapturatePhoto2] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto3, setCapturatePhoto3] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto6, setCapturatePhoto6] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto4, setCapturatePhoto4] = useState(Config.AWS_URL + 'favicon.png')
    const [capturatePhoto5, setCapturatePhoto5] = useState(Config.AWS_URL + 'favicon.png')
    const [id, setId] = useState('1')
    
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [description, setDescription] = useState('')
    const [cep, setCep] = useState('')
    const [price, setPrice] = useState('')
    const [tax, setTax] = useState('')
    const [type, setType] = useState('')
    const [visible, setVisible] = useState(null)
    const [category, setCategory] = useState(null)
    const [subcategory, setSubcategory] = useState(null)
    const [col1, setCol1] = useState(null)
    const [col2, setCol2] = useState(null)
    const [col3, setCol3] = useState('')
    const [col4, setCol4] = useState('')
    const [col5, setCol5] = useState('')
    const [col6, setCol6] = useState('')
    const [col7, setCol7] =  useState('')
    const [col8, setCol8] = useState('')
    const [col9, setCol9] = useState('')
    const [col10, setCol10] = useState('')
    const [col11, setCol11] = useState('')
    const [col12, setCol12] = useState('')
    const [col13, setCol13] = useState('')
    const [col14, setCol14] = useState('')
    const [col15, setCol15] = useState('')
    const [col16, setCol16] = useState('')
    const [col17, setCol17] = useState('')
    
    const [visableNotification, setVisableNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState(null)
    const [deletePhotoEdit, setDeletePhotoEdit] = useState(false)
    const [images, setImages] = useState('')
    const [visableConfirmationDeletion, setVisableConfirmationDeletion] = useState(false)
    const [visableConfirmationUpdate, setVisableConfirmationUpdate] = useState(false)
    const [oldImages, setOldImages] = useState('')
    const [selectDistrict, setSelectDistrict] = useState(false);

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
        if (tax == null || tax == '') {
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

    async function isValidateImage(value) {
        if (oldImages !== images) {
            try {
                for (var nums in oldImages.split(',')) {
                        if (!oldImages.split(',')[nums]) {
                        } else {
                            classifiedsService.deleteImageClassified(oldImages.split(',')[nums])
                                .then((response) => {

                                })
                                .catch((error) => {
                                    showNotification('error', 'Aviso!', error.toString())
                                })
                        }
                }
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
                        xhr.open('POST', Config.API_URL + 'classifieds/uploadImg')
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

    function deleteClassified(id) {
        setIsLoading(true)
        classifiedsService.deleteClassified(id)
            .then((response) => {
                showNotification('success', 'Sucesso!', 'Apagado com sucesso!')
            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
        setVisableConfirmationDeletion(false)
    }

    function updateClassified(id) {
        setIsLoading(true)
        if (isValidate() && isValidateImage()) {
            const dataUpdateClassified = {
               
                visible: '1',
                col3: col3,
                type: type,
                col4: col4,
                price: price,
                tax: tax,
                col5: col5,
                col6: col6,
                col7: col7,
                city: city,
                district: district,
                description: description,
                images: images,
                cep: cep,
                category: route.params.type,
                subcategory: subcategory,
                col1: col1,
                col2: col2,
                col3: col3,
                col4: col4,
                col5: col5,
                col6: col6,
                col7: col7,
                col8: col8,
                col9: col9,
                col10: col10,
                col11: col11,
                col12: col12,
                col13: col13,
                col14: col14,
                col15: col15,
                col16: col16,
                col17: col17
            }
            setOldImages(images)
             classifiedsService.updateClassified(dataUpdateClassified, id)
                 .then((response) => {
                     if (response.data.status) {
                         showNotification('success', 'Sucesso!', 'Alterado com sucesso!')
            
            
                     } else {
                         showNotification('info', 'Ops!', 'Não foi possivel, tente novamente.')
                     }
            
                 })
                 .catch((error) => {
                     showNotification('error', 'Ops!', error.toString())
                 })
        } else {
            showNotification('info', 'Ops!', 'Campos invalidos')
        }
        setVisableConfirmationUpdate(false)

    }

    async function preTakePictureGalery() {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status === "granted") {
            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Image
            });
            takePictureGalery(data)

        }
      

    }

    function takePictureGalery(data) {
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
            
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto2(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 1º")
            setTitlePreCapturate("Adicionar a 2º")
        }
        if (titleDelCapturate.includes('3')) {
            let imgAlt = images.split(',')[2]
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto3(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 2º")
            setTitlePreCapturate("Adicionar a 3º")
        }
        if (titleDelCapturate.includes('4')) {
            let imgAlt = images.split(',')[3]
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto4(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 3º")
            setTitlePreCapturate("Adicionar a 4º")
        }
        if (titleDelCapturate.includes('5')) {
            let imgAlt = images.split(',')[4]
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto5(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 4º")
            setTitlePreCapturate("Adicionar a 5º")

        }
        if (titleDelCapturate.includes('6')) {
            let imgAlt = images.split(',')[5]
            imgAlt = images.replace(imgAlt)
            setImages(imgAlt)
            setCapturatePhoto6(Config.AWS_URL + 'favicon.png')
            setTitleDelCapturate("Apagar a 5º")
            setTitlePreCapturate("Adicionar a 6º")
        }


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

    function showNotification(status, title, message) {
        setVisableNotification(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
    }

    function loadData(data) {
        setImages(data.classified_images)
        setOldImages(data.classified_images)
        setCapturatePhoto1(validateImage(data.classified_images, 0))
        setCapturatePhoto2(validateImage(data.classified_images, 1))
        setCapturatePhoto3(validateImage(data.classified_images, 2))
        setCapturatePhoto4(validateImage(data.classified_images, 3))
        setCapturatePhoto5(validateImage(data.classified_images, 4))
        setCapturatePhoto6(validateImage(data.classified_images, 5))
        validateButton(data.classified_images, 0)
        validateButton(data.classified_images, 1)
        validateButton(data.classified_images, 2)
        validateButton(data.classified_images, 3)
        validateButton(data.classified_images, 4)
        validateButton(data.classified_images, 5)
        setButtonInsert(true)
        setVisible('1')
        setCol3(data.classified_col3)
        setType(data.classified_type)
        setCol4(data.classified_col4)
        setPrice(data.classified_price)
        setTax(data.classified_tax)
        setCol5(data.classified_col5)
        setCol6(data.classified_col6)
        setCol7(data.classified_col7)
        setCity(data.classified_city)
        setDistrict(data.classified_district)
        setDescription(data.classified_description)
        setImages(data.classified_images)
        setCep(data.classified_cep)
        setCategory(data.classified_category)
        setSubcategory(data.classified_subcategory)
        setCol1(data.classified_col1)
        setCol2(data.classified_col2)
        setCol3(data.classified_col3)
        setCol4(data.classified_col4)
        setCol5(data.classified_col5)
        setCol6(data.classified_col6)
        setCol7(data.classified_col7)
        setCol8(data.classified_col8)
        setCol9(data.classified_col9)
        setCol10(data.classified_col10)
        setCol11(data.classified_col11)
        setCol12(data.classified_col12)
        setCol13(data.classified_col13)
        setCol14(data.classified_col14)
        setCol15(data.classified_col15)
        setCol16(data.classified_col16)
        setCol17(data.classified_col17)
        console.log('YTTY',data)
         let i = 1
        for (var num in data.classified_images.split(',')) {
            let upAlt = alt
            upAlt[i.toString()] = { 'uri': Config.AWS_URL + data.classified_images.split(',')[num] }
            setAlt(upAlt)
            i = i + 1
        }
        setDeletePhotoEdit(true)
        setIsLoading(false)

    }

    function resetState() {
        setVisableNotification(false)
        setIsLoading(false)
        navigation.navigate("MyClassifieds")
    }

    function setValueCity(value) {
        districyBycity(value)
        setCity(value)  
    }

    function districyBycity(cits) {
        setIsLoading(true)
        classifiedsService.districtsByCity(cits,'1')
            .then((response) => {
                setSelectDistrict(response.data.message)
            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
            setIsLoading(false)
    }
    console.log("slc tiw", route.params.specificClassified)
    useEffect(() => {
        loadData(route.params.specificClassified)
    }, [])
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
                                        {errorInput &&
                                        <View style={{backgroundColor:stylesColor.secondaryColor,justifyContent:"space-evenly",alignItems: 'center',justifyContent: 'center', width: wp('97%'), borderRadius: 16}} >
                                            <Text style={styleEditClassified.descriptionErro}>{errorText}</Text>
                                        </View>}
    
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
                                            <View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
    
                                            <View style={{ width: wp('71%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Logradouro</Text>
                                                    <PInput placeholder={'Avenida, Rua'} onChangeText={value => setCol7(value)} value={col7} size={hp('2.2%')} type='material-icons' name='place' />
                                                </View>
    
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
    
                                                <View >
                                                    <Text style={styleEditClassified.description}>Cidade</Text>
                                                    <Select  width={wp('45%')} setSelect={value => setValueCity(value)} value={city} dataSelect={route.params.dataSelect} />
                                                </View>
                                                <View >
                                                    <Text style={styleEditClassified.description}>Bairro</Text>
                                                    <Select  width={wp('45%')} setSelect={value => setDistrict(value)} value={district} dataSelect={selectDistrict} />
                                                </View>
    
                                            </View>
                                            {category === "Immobile" &&
                                            <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                    <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                    <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} size={hp('2.2%')} type='material-icons' name='place' />
                                                </View>
                                               
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Tipo</Text>
                                                    <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Alugar', 'Vender']} />
                                                </View>
                                                <View style={{ width: wp('25%'), marginRight: hp('1%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}> m²</Text>
                                                        <PInput onChangeText={value => setFullNumber(value)} value={col5}  placeholder={'10'} size={hp('2.2%')} type='material-community' name="ruler-square" />
                                                    </View>
                                               
    
                                            </View>
                                            <View style={{ marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            
                                                    <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                        <PInput onChangeText={value => setFullBrl(value,'price')} value={price} placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                                    </View>
                                                    <View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}> IPTU</Text>
                                                        <PInput onChangeText={value => setFullBrl(value,'tax')} value={tax} placeholder={'10,00'} size={hp('2.2%')} type='material-community' name='currency-brl' />
                                                    </View>
                                                    
                                                    <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Categoria</Text>
                                                    <Select value={subcategory} width={wp('35%')} setSelect={value => setSubcategory(value)} dataSelect={['Casa', 'Comercio', 'Apartamento','Terreno']} />
                                                </View>
                                                    
    
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                                    
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="shower-head" color='#000' size={hp('2.0%')} /> Banheiro</Text>
                                                        <Select value={col2} width={wp('25%')} setSelect={value => setCol2(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                                    </View>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="dog" color='#000' size={hp('2.0%')} /> Pet</Text>
                                                        <Select value={col4} width={wp('25%')} setSelect={value => setCol4(value)} dataSelect={['Sim', 'Não']} />
                                                    </View>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="bed" color='#000' size={hp('2.0%')} /> Quartos</Text>
                                                        <Select value={col1} width={wp('25%')} setSelect={value => setCol1(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                                    </View>
    
    
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><Ionicons name="car-sport" color='#000' size={hp('2.0%')} /> Vagas</Text>
                                                        <Select value={col3} width={wp('30%')} setSelect={value => setCol3(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                                    </View>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><FontAwesome5 name="couch" color='#000' size={hp('2.0%')} /> Mobilhado</Text>
                                                        <Select value={col6} width={wp('30%')} setSelect={value => setCol6(value)} dataSelect={['Sim', 'Não']} />
                                                    </View>
                                                    
    
                                                </View>
                                                </>
                                            }
                                            {route.params.type === "Car" &&
                                            <></>
                                            }
    
                                            {route.params.type === "Electronic" &&
                                            <></>
                                            }
                                            
                                            {route.params.type === "Baskets" &&
                                            <></>
                                            }
                                            
                                             
                                            {route.params.type === "Fashion" &&
                                           
                                            <></>
                                            }
                                            {route.params.type === "Job" &&
                                            <></>
                                            }
                                            <View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View style={{ width: wp('90%'), marginRight: hp('1%') }} >
                                                    <Text style={styleEditClassified.descriptionInput}>Descrição</Text>
                                                    <PInputLong value={district} placeholder={'Próximo a panificadora e escola... /  Isto é um comércio ou casa e comécio...'} maxLength={316} multiline={true} onChangeText={value => setDescription(value)} value={description} size={hp('2.2%')} type='material-community' name='view-headline' />
                                                </View>
                                            </View>
    
                                            <View style={{ marginBottom: hp('2%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                        <PButton width={wp('25%')} onPress={() => resetState()} title='Voltar' type='material-icons' name='arrow-back-ios' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                        <PButton width={wp('30%')} onPress={() => setVisableConfirmationUpdate(true)} title='Salvar' type='material-community' name='content-save-check-outline' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#24b95b' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                        <PButton width={wp('30%')} onPress={() => setVisableConfirmationDeletion(true)} title='Apagar' type='material-community' name='delete-outline' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor='#f23d3d' fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
                                    </View>
                                        </View>
    
                                    </ScrollView>
                                
                                
                                 
    
    
                            </Center>
                        </KeyboardAvoidingView>
                    }
    
                    {visableConfirmationDeletion &&
                    <DialogConfirmation message={'Tem certeza que deseja apagar?'} cancel={() => setVisableConfirmationDeletion(false)} confirmation={() => deleteClassified(id)} />
                }
                {visableConfirmationUpdate &&
                    <DialogConfirmation message={'Tem certeza que deseja alterar?'} cancel={() => setVisableConfirmationUpdate(false)} confirmation={() => updateClassified(id)} />
                }
                {visableNotification &&
                    <Notification status={status} visibles={visableNotification} title={title} message={message} onPress={() => resetState()} close={() => resetState()} />
                }   
                </SafeAreaView>
    
            </NativeBaseProvider>
            );
}