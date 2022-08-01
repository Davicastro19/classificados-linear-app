import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import styleEditClassified from '../style/EditClassified.js'
import PInput from '../components/input/input';
import PInputLong from '../components/inputLong/inputLong'
import Select from '../components/select/select';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, FontAwesome, Octicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
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
    const [col1l, setCol1l] = useState([])
    const [col2l, setCol2l] = useState([])
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
    }function setFullSubcategory(value) {
        if (category === "Car") {
            classifiedsService.automobileByCategory(value)
                .then((response) => {
                    if (response.data.status) {
                        setSubcategory(value)
                        setCol2l(response.data.message)

                    } else {
                        showNotification('info', 'Então...', response.data.message)
                    }

                })
                .catch((error) => {
                    showNotification('error', 'Ops!', error.toString())
                })

        } else if (category === 'Fashion') {
            setSubcategory(value)
            if (value === 'Roupas') {
                setCol2l(['Vestidos e Saias', 'Casacos e Jaquetas', 'Camisas e Camisetas', 'Shorts e Bermudas', 'Outros'])
            } else if (value === 'Calçados') {
                setCol2l(['Alpargata', 'Bota', 'Chinelo', 'Chuteira', 'Coturno', 'Galocha', 'Mocassim', 'Sandália', 'Sapato', 'Sapatilha', 'Salto|Tamanco', 'Tênis'])
            } else if (value === 'Acessórios') {
                setCol2l(['Lenços e Cachecóis', 'Óculos', 'Anél', 'Aliança', 'Colar', 'Gargantilha', 'Bracelete', 'Presilha', 'Cinto', 'Chapéu', 'Boina, Gorro e Boné', 'Relógio', 'Pulseira', 'Bolsas', 'Mala', 'Mochila'])
            }

        }


    }
    function setFullBrlApparence(value) {
        if (value === '') {
            return value
        } else {
            value = value.replace(/\D/gim, '');
            value = value + '';
            value = parseInt(value.replace(/[\D]+/g, ''));
            value = value + '';
            value = value.replace(/([0-9]{2})$/g, ",$1");
    
            if (value.length > 6) {
                value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            return value
        }
    
    }
    function setFullBrl(value, type) {
        if (value === '') {
            setTax('')
            setPrice('')
        } else {
            value = value.replace(/\D/gim, '');
            value = value + '';
            value = parseInt(value.replace(/[\D]+/g, ''));
            value = value + '';
            value = value.replace(/([0-9]{2})$/g, ",$1");

            if (value.length > 6) {
                value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if (value == '') {
                setTax(value)
                setPrice(value)
            } else {

            }
            if (type === 'tax') {
                setTax(value)
            } else {
                setPrice(value)
            }
        }

    }
    function setFullNumber(value){
        if (isNaN(value)){
            value = '0'
        }
        setCol5(value)
        
    }
    function setFullCep(value){
        classifiedsService.getCep(value)
        .then((response) => {
            if (response.data.length >0){
                return true
            }else{
                return false
            }
        })
        .catch((error) => {
            return false
            
        })
    }

    function setFullModel(value) {
        if (category === "Car") {
            classifiedsService.modelByAutomobile(subcategory, value)
                .then((response) => {
                    if (response.data.status) {
                        setCol1l(response.data.message)

                    } else {
                        showNotification('info', 'Então...', response.data.message)
                    }

                })
                .catch((error) => {
                    showNotification('error', 'Ops!', error.toString())
                })

        }
        setCol2(value)
    }

    function isValidate() {
        if (subcategory === "Carro" || subcategory === "Van") {
            if (tax === '') {
                setErrorText("O campo IPVA é obrigatório")
                return false
            }
            else if (type === '') {
                setErrorText("O campo Negócio é obrigatório")
                return false
            }

            else if (col2 === '') {
                setErrorText("O campo Marca é obrigatório")
                return false
            }
            else if (col1 === '') {
                setErrorText("O campo Modelo é obrigatório")
                return false
            }

            else if (col3 === '' && subcategory !== 'Van') {
                setErrorText("O campo Tipo de Veículo é obrigatório")
                return false
            }
            else if (col4 === '') {
                setErrorText("O campo Ano é obrigatório")
                return false
            }
            else if (col5 === '') {
                setErrorText("O campo Quilometragem é obrigatório")
                return false
            }
            else if (col6 === '') {
                setErrorText("O campo Potência é obrigatório")
                return false
            }
            else if (col8 === '') {
                setErrorText("O campo Direção é obrigatório")
                return false
            }
            else if (col9 === '') {
                setErrorText("O campo Portas é obrigatório")
                return false
            }
            else if (col10 === '') {
                setErrorText("O campo F. Placa  é obrigatório")
                return false
            }
            else if (col11 === '') {
                setErrorText("O campo Vidro Elé. é obrigatório")
                return false
            }
            else if (col12 === '') {
                setErrorText("O campo Air bag é obrigatório")
                return false
            }
            else if (col13 === '') {
                setErrorText("O campo Trava Elé. é obrigatório")
                return false
            }
            else if (col14 === '') {
                setErrorText("O campo Ar Condici. é obrigatório")
                return false
            }
            else if (col15 === '') {
                setErrorText("O campo Som é obrigatório")
                return false
            }
            else if (col16 === '') {
                setErrorText("O campo Kit GNV é obrigatório")
                return false
            }
            else if (col17 === '') {
                setErrorText("O campo Cor é obrigatório")
                return false
            }
        }
        else if (subcategory === "Moto") {
            if (tax === '') {
                setErrorText("O campo IPVA é obrigatório")
                return false
            }
            else if (type === '') {
                setErrorText("O campo Negócio é obrigatório")
                return false
            }

            else if (col2 === '') {
                setErrorText("O campo Marca é obrigatório")
                return false
            }
            else if (col1 === '') {
                setErrorText("O campo Modelo é obrigatório")
                return false
            }

            else if (col3 === '') {
                setErrorText("O campo Tipo de Veículo é obrigatório")
                return false
            }
            else if (col4 === '') {
                setErrorText("O campo Ano é obrigatório")
                return false
            }
            else if (col5 === '') {
                setErrorText("O campo Quilometragem é obrigatório")
                return false
            }
            else if (col6 === '') {
                setErrorText("O campo Potência é obrigatório")
                return false
            }
            else if (col10 === '') {
                setErrorText("O campo F. Placa  é obrigatório")
                return false
            }
            else if (col17 === '') {
                setErrorText("O campo Cor é obrigatório")
                return false
            }
        }
        else if (subcategory === "Embarcação") {
            if (type === '') {
                setErrorText("O campo Negócio é obrigatório")
                return false
            }

            else if (col1 === '') {
                setErrorText("O campo Marca - Modelo é obrigatório")
                return false
            }

            else if (col2 === '') {
                setErrorText("O campo Tipo é obrigatório")
                return false
            }
            else if (col4 === '') {
                setErrorText("O campo Ano é obrigatório")
                return false
            }
            else if (col5 === '') {
                setErrorText("O campo Quilometragem é obrigatório")
                return false
            }
            else if (col17 === '') {
                setErrorText("O campo Cor é obrigatório")
                return false
            }
        }
        else if (category === "Electronic") {

            if (subcategory === '') {
                setErrorText("O campo Categoria é obrigatório")
                return false
            }
            else if (col2 === '') {
                setErrorText("O campo Marca é obrigatório")
                return false
            }
            else if (col1 === '') {
                setErrorText("O campo Modelo é obrigatório")
                return false
            }

            else if (col3 === '' && subcategory !== "Tv") {
                setErrorText("O campo RAM-GB é obrigatório")
                return false
            }
            else if (col4 === '' && subcategory !== "Tv") {
                setErrorText("O campo Mémória-GB obrigatório")
                return false
            }
            else if (col17 === '') {
                setErrorText("O campo Cor é obrigatório")
                return false
            }
            else if (col16 === '' && subcategory === "Tv") {
                setErrorText("O campo Plegadas é obrigatório")
                return false
            }
        }
        else if (category === "Baskets") {
            if (col1 === '') {
                setErrorText("O campo Palavra-chave é obrigatório")
                return false
            }
            else if (col2 === '') {
                setErrorText("O campo Qtd. Itens é obrigatório.")
                return false
            }
            else if (type === '') {
                setErrorText("O campo Negócio é obrigatório")
                return false
            }

        }
        else if (category === 'Fashion') {

            if (col1 === '') {
                if (subcategory === 'Beleza e Saúde') {
                    setErrorText("O campo Palavra-chave é obrigatório")
                } else {
                    setErrorText("O campo Tipo é obrigatório")
                }
                return false
            }
            else if (col7 === '') {
                setErrorText("O campo Qtd. Itens é obrigatório.")
                return false
            }
            else if (col4 === '') {
                setErrorText("O campo Gênero é obrigatório.")
                return false
            }
            else if (col3 === '' && subcategory !== 'Beleza e Saúde') {
                setErrorText("O campo Tamanho é obrigatório.")
                return false
            }
            else if (type === '') {
                setErrorText("O campo Negócio é obrigatório")
                return false
            }

        }
        else if (category === 'Job' || category === 'Services') {

            if (col1 === '') {
                setErrorText("O campo Cargo é obrigatório")
                return false
            }
            else if (col4 === '') {
                setErrorText("O campo Gênero é obrigatório.")
                return false
            }
            else if (col5 === '' && category !== 'Services') {
                setErrorText("O campo Empresa é obrigatório.")
                return false
            }
            else if (type === '') {
                setErrorText("O campo Contratação é obrigatório")
                return false
            }

        } 
        else if (category === 'Animal') {
            if (subcategory == ''){
                setErrorText("O campo Animal é obrigatório")
                return false
            }
            if (col1 === '') {
                setErrorText("O campo Raça é obrigatório")
                return false
            }
            else if (col4 === '') {
                setErrorText("O campo Sexo é obrigatório.")
                return false
            }
            else if (col3 === '') {
                setErrorText("O campo Mêses é obrigatório.")
                return false
            }
            else if (col7 === '') {
                setErrorText("O campo Quantidade é obrigatório.")
                return false
            }
            else if (type === '') {
                setErrorText("O campo Negócio é obrigatório")
                return false
            }

        }
        else if (price === '') {
            if (category === "Job" || category === "Services") {
                setErrorText("O campo Salário é obrigatório")
            } else {
                setErrorText("O campo Valor é obrigatório")
            }
            return false
        }
        else if (city === '') {
            setErrorText("O campo Cidade é obrigatório")
            return false
        }
        else if (district === '') {
            setErrorText("O campo Bairro é obrigatório")
            return false
        }
        else if (cep === '') {
            setErrorText("O campo Cep é inválido")
            return false
        }
        else if (setFullCep(cep) === false) {
            setErrorText("O campo Cep é inválido")
            return false
        }
        else if (description == null || description === '') {
            setErrorText("O campo Descrição é obrigatório")
            return false
        }
        else if (category === "Immobile" || category === "Baskets") {
            if (col7 == null || col7 === '') {
                setErrorText("O campo Logradouro é obrigatório")
                return false
            }
        }
        else {
            setErrorText("O campo é obrigatório")
            return false
        }
        return true
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
                category: category,
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
            setErrorInput(true)
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
        const pricess = setFullBrlApparence(data.classified_price)
        setId(data.classified_id)
        
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
        setPrice(pricess)
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

    function resetState(value) {
        setVisableNotification(false)
        setIsLoading(false)
        if (status === 'success'){
            navigation.navigate("MyClassifieds")
        }
        if (value === '1'){
            navigation.navigate("MyClassifieds")
        }
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
                                
                                    <ScrollView style={{width: wp('100%')}}>
                                    <View style={{ backgroundColor: stylesColor.tertiaryColor }}>
                                    <View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                        {(category === "Immobile" || category === "Baskets") &&
                                            <View style={{ width: wp('71%'), marginRight: hp('1%') }}>
                                                <Text style={styleEditClassified.descriptionInput}>Logradouro</Text>
                                                <PInput placeholder={'Avenida, Rua'} onChangeText={value => setCol7(value)} value={col7} size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>}

                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>

                                        <View >
                                            <Text style={styleEditClassified.description}>Cidade</Text>
                                            <Select value={city} width={wp('45%')} setSelect={value => setValueCity(value)} dataSelect={route.params.dataSelect} />
                                        </View>
                                        <View >
                                            <Text style={styleEditClassified.description}>Bairro</Text>
                                            <Select value={district} width={wp('45%')} setSelect={value => setDistrict(value)} dataSelect={selectDistrict} />
                                        </View>

                                    </View>
                                    {category === "Immobile" &&
                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>

                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Negócio</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Alugar', 'Vender']} />
                                            </View>
                                            <View style={{ width: wp('25%'), marginRight: hp('1%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> m²</Text>
                                                <PInput onChangeText={value => setFullNumber(value)} value={col5} placeholder={'10'} size={hp('2.2%')} type='material-community' name="ruler-square" />
                                            </View>


                                        </View>
                                            <View style={{ marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>

                                                <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                    <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                                </View>
                                                <View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}> IPTU</Text>
                                                    <PInput onChangeText={value => setFullBrl(value, 'tax')} value={tax} placeholder={'10,00'} size={hp('2.2%')} type='material-community' name='currency-brl' />
                                                </View>

                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Categoria</Text>
                                                    <Select value={subcategory} width={wp('35%')} setSelect={value => setSubcategory(value)} dataSelect={['Casa', 'Comercio', 'Apartamento', 'Terreno']} />
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
                                                    <Select value={col6}  width={wp('30%')} setSelect={value => setCol6(value)} dataSelect={['Sim', 'Não']} />
                                                </View>


                                            </View>

                                        </>
                                    }
                                    {category === "Car" &&
                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Negócio</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Alugar', 'Vender']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View style={{ width: wp('30%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Quilometragem</Text>
                                                    <PInput onChangeText={value => setFullNumber(value)} value={col5} placeholder={'10'} size={hp('2.2%')} type='material-community' name="speedometer" />
                                                </View>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="calendar" color='#000' size={hp('2.0%')} /> Ano</Text>
                                                    <Select value={col4} width={wp('22%')} setSelect={value => setCol4(value)} dataSelect={["1990", "1991", "1992", " 1993", "1994", " 1995", " 1996", " 1997", " 1998", " 1999", " 2000", " 2001", " 2002", " 2003", " 2004", " 2005", " 2006", " 2007", " 2008", " 2009", " 2010", " 2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]} />
                                                </View>
                                                {subcategory !== 'Embarcação' &&
                                                <View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}> IPVA</Text>
                                                    <PInput onChangeText={value => setFullBrl(value, 'tax')} value={tax} placeholder={'10,00'} size={hp('2.2%')} type='material-community' name='currency-brl' />
                                                </View>}
                                                {subcategory === 'Moto' &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><Octicons name="number" color='#000' size={hp('2.0%')} /> F. Placa</Text>
                                                        <Select value={col10} width={wp('17%')} setSelect={value => setCol10(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9']} />
                                                    </View>}


                                            </View>

                                            <View style={{ marginLeft: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Categoria</Text>
                                                    <Select value={subcategory} width={wp('30%')} setSelect={value => setFullSubcategory(value)} dataSelect={['Moto', 'Carro', 'Embarcação', 'Van']} />
                                                </View>
                                                <View>
                                                    <Text style={styleEditClassified.description}><FontAwesome5 name="cube" color='#000' size={hp('2.0%')} /> {subcategory === 'Embarcação' ? "Tipo" : 'Marca'}</Text>
                                                    <Select value={col2} width={wp('30%')} setSelect={value => setFullModel(value)} dataSelect={col2l} />
                                                </View>
                                                {(subcategory !== 'Embarcação' && subcategory !== 'Van') &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><FontAwesome5 name="cubes" color='#000' size={hp('2.0%')} /> Modelo</Text>
                                                        <Select value={col1} width={wp('30%')} setSelect={value => setCol1(value)} dataSelect={col1l} />
                                                    </View>
                                                }
                                                 {(subcategory === 'Embarcação' || subcategory === 'Van') &&
                                                    <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}>Marca | Modelo</Text>
                                                        <PInput placeholder={'Marca | Modelo'} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                    </View>
                                                }
                                            </View>
                                            <View style={{ marginLeft: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                {(subcategory === 'Carro' || subcategory === 'Moto') &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><SimpleLineIcons name="options" color='#000' size={hp('2.0%')} /> Tipo</Text>
                                                        <Select value={col3} width={wp('25%')} setSelect={value => setCol3(value)} dataSelect={subcategory === 'Moto' ? ["Street", "Esportiva", "Custom", "Trail", "Naked", "Scooter", "Offroad", "Touring", "Utilitária", "Supermotard", "Triciclo", "Quadriciclo", "Trial", "Mini Cross"] : ["Passeio", "Conversível", "Pick-up", "Antigo", "SUV", "Sedã", "Hatch"]} />
                                                    </View>
                                                }
                                               
                                                {subcategory !== 'Embarcação' &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><FontAwesome name="superpowers" color='#000' size={hp('2.0%')} />Potência</Text>
                                                        <Select value={col6}  width={wp('20%')} setSelect={value => setCol6(value)} dataSelect={subcategory === 'Moto' ? ["100cc", "150cc", "200cc", "250cc", "300cc", "350cc", "400cc", "450cc", "500cc", "550cc", "600cc", "650cc", "700cc", "750cc", "800cc", "850cc", "900cc", "950cc", "1000cc", "1050cc", "1100cc", "1150cc", "1200cc", "1250cc", "1300cc", "1350cc", "1400cc", "1450cc", "1500cc"] : ['1.0', '1.5', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9']} />
                                                    </View>
                                                }
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="fuel-cell" color='#000' size={hp('2.0%')} />Combustível</Text>
                                                    <Select value={col7}  width={wp('25%')} setSelect={value => setCol7(value)} dataSelect={['Gasolina', 'Álcool', 'Diesel', 'Flex', 'GNV', 'Etanol']} />
                                                </View>
                                                <View style={{ width: wp('22%'), marginRight: hp('0%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Cor</Text>
                                                    <PInput placeholder={'Cor'} onChangeText={value => setCol17(value)} value={col17} size={hp('2.2%')} type='material-icons' name='color-lens' />
                                                </View>

                                            </View>
                                            {(subcategory === 'Carro' || subcategory === 'Van') &&
                                                <><View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="steering" color='#000' size={hp('2.0%')} /> Direção</Text>
                                                        <Select value={col8}  width={wp('25%')} setSelect={value => setCol8(value)} dataSelect={['Mecânica', 'Hidráulica', 'Elétrica', 'Eletro-hidráulica']} />
                                                    </View>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="car-door" color='#000' size={hp('2.0%')} /> Portas</Text>
                                                        <Select value={col9} width={wp('20%')} setSelect={value => setCol9(value)} dataSelect={['2', '3','4']} />
                                                    </View>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><Octicons name="number" color='#000' size={hp('2.0%')} /> F. Placa</Text>
                                                        <Select value={col10} width={wp('17%')} setSelect={value => setCol10(value)} dataSelect={['1', '2', '3', '4', '5', '6', '7', '8', '9']} />
                                                    </View>
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="electric-switch" color='#000' size={hp('2.0%')} /> Vidro Elé.</Text>
                                                        <Select value={col11} width={wp('20%')} setSelect={value => setCol11(value)} dataSelect={['Sim', 'Não']} />
                                                    </View>

                                                </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>

                                                        <View>
                                                            <Text style={styleEditClassified.description}><MaterialCommunityIcons name="airbag" color='#000' size={hp('2.0%')} /> A. Bag</Text>
                                                            <Select value={col12} width={wp('20%')} setSelect={value => setCol12(value)} dataSelect={['Sim', 'Não']} />
                                                        </View>
                                                        <View>
                                                            <Text style={styleEditClassified.description}><MaterialCommunityIcons name="electric-switch-closed" color='#000' size={hp('2.0%')} /> Trava Elé.</Text>
                                                            <Select value={col13} width={wp('20%')} setSelect={value => setCol13(value)} dataSelect={['Sim', 'Não']} />
                                                        </View>
                                                        <View>
                                                            <Text style={styleEditClassified.description}><Entypo name="air" color='#000' size={hp('2.0%')} /> Ar Condic.</Text>
                                                            <Select value={col14} width={wp('20%')} setSelect={value => setCol14(value)} dataSelect={['Sim', 'Não']} />
                                                        </View>
                                                        <View>
                                                            <Text style={styleEditClassified.description}><MaterialCommunityIcons name="surround-sound" color='#000' size={hp('2.0%')} /> Som</Text>
                                                            <Select value={col15} width={wp('20%')} setSelect={value => setCol15(value)} dataSelect={['Sim', 'Não']} />
                                                        </View>

                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>

                                                        <View>
                                                            <Text style={styleEditClassified.description}><Octicons name="number" color='#000' size={hp('2.0%')} /> Kit GNV</Text>
                                                            <Select value={col16} width={wp('25%')} setSelect={value => setCol16(value)} dataSelect={['Sim', 'Não']} />
                                                        </View>

                                                    </View></>}
                                        </>
                                    }

                                    {category === "Electronic" &&
                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep}  keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Negócio</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Alugar', 'Vender']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginLeft: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Categoria</Text>
                                                    <Select value={subcategory} width={wp('30%')} setSelect={value => setSubcategory(value)} dataSelect={['Smartphone', 'Tv', 'NotBook', 'Computador', 'Console']} />
                                                </View>
                                                <View>
                                                    <Text style={styleEditClassified.description}><FontAwesome5 name="cube" color='#000' size={hp('2.0%')} /> {'Marca'}</Text>
                                                    <Select value={col2} width={wp('30%')} setSelect={value => setCol2(value)} dataSelect={["Apple", "Asus", "Blackberry", "HTC", "Lenovo", "LG", "Meizu", "Microsoft", "Motorola", "Nokia", "Samsung", "Sony", "Huawei", "Xiaomi", "ZTE", "TCL", "Philips", "Panasonic", "Philco", "AOC", "Multilaser"]} />
                                                </View>
                                                <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Modelo</Text>
                                                    <PInput placeholder={''} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                </View>

                                            </View>
                                            <View style={{ marginLeft: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                {subcategory !== "Tv" &&
                                                    <><View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}>RAM-GB</Text>
                                                        <PInput placeholder={'8'} onChangeText={value => setCol3(value)} value={col3} size={hp('2.2%')} type='material-icons' name='memory' />
                                                    </View><View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                            <Text style={styleEditClassified.descriptionInput}>Mémória-GB</Text>
                                                            <PInput placeholder={'256'} onChangeText={value => setCol4(value)} value={col4} size={hp('2.2%')} type='font-awesome' name='hdd-o' />
                                                        </View></>}
                                                <View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Cor</Text>
                                                    <PInput placeholder={'Cor'} onChangeText={value => setCol17(value)} value={col17}  size={hp('2.2%')} type='material-icons' name='color-lens' />
                                                </View>
                                                {subcategory === "Tv" &&
                                                    <View style={{ width: wp('25%'), marginRight: hp('0%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}>Polegadas</Text>
                                                        <PInput placeholder={'25'} onChangeText={value => setCol16(value)} value={col16} size={hp('2.2%')} type='material-community' name='ruler-square' />
                                                    </View>
                                                }

                                            </View>


                                        </>
                                    }

                                    {category === "Baskets" &&
                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Negócio</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Doar', 'Vender']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Categoria</Text>
                                                    <Select value={subcategory} width={wp('30%')} setSelect={value => setSubcategory(value)} dataSelect={['Alimentos', 'Limpeza', 'Higiene Pess.', 'Bebidas', 'Papelaria & Bzr.', 'Ult. Domésticas', 'Geral']} />
                                                </View>
                                                <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Palavra-chave</Text>
                                                    <PInput maxLength={12} placeholder={'Churrasco'} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                </View>
                                                <View>
                                                    <Text style={styleEditClassified.description}><Octicons name="number" color='#000' size={hp('2.0%')} /> Qtd. Itens</Text>
                                                    <Select value={col2} width={wp('22%')} setSelect={value => setCol2(value)} dataSelect={[ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348", "349", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", "387", "388", "389", "390", "391", "392", "393", "394", "395", "396", "397", "398", "399", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "432", "433", "434", "435", "436", "437", "438", "439", "440", "441", "442", "443", "444", "445", "446", "447", "448", "449", "450", "451", "452", "453", "454", "455", "456", "457", "458", "459", "460", "461", "462", "463", "464", "465", "466", "467", "468", "469", "470", "471", "472", "473", "474", "475", "476", "477", "478", "479", "480", "481", "482", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499", "500"]} />
                                                </View>


                                            </View>


                                        </>
                                    }


                                    {category === "Fashion" &&

                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Negócio</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Doar', 'Vender', 'Alugar']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Categoria</Text>
                                                    <Select value={subcategory} width={wp('30%')} setSelect={value => setFullSubcategory(value)} dataSelect={['Roupas', 'Calçados', 'Acessórios', 'Beleza e Saúde']} />
                                                </View>
                                                {subcategory !== 'Beleza e Saúde' &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><FontAwesome5 name="cubes" color='#000' size={hp('2.0%')} /> Tipo</Text>
                                                        <Select value={col1} width={wp('40%')} setSelect={value => setCol1(value)} dataSelect={col2l} />
                                                    </View>}
                                                {subcategory === 'Beleza e Saúde' &&
                                                    <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}>Palavra-Chave</Text>
                                                        <PInput placeholder={'Nome - Marca'} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                    </View>}



                                            </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.0%')} />Gênero</Text>
                                                    <Select value={col4} width={wp('18%')} setSelect={value => setCol4(value)} dataSelect={['Fem', 'Mas', 'Uni']} />
                                                </View>
                                                {subcategory !== 'Beleza e Saúde' &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="ruler-square" color='#000' size={hp('2.0%')} /> Tamanho</Text>
                                                        <Select value={col3} width={wp('30%')} setSelect={value => setCol3(value)} dataSelect={subcategory === 'Roupas' ? ['PP', 'P', 'M', 'G', 'GG'] : ["17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]} />
                                                    </View>
                                                }
                                                <View>
                                                    <Text style={styleEditClassified.description}><Octicons name="number" color='#000' size={hp('2.0%')} /> Qtd. Itens</Text>
                                                    <Select value={col7}  width={wp('22%')} setSelect={value => setCol7(value)} dataSelect={[ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348", "349", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", "387", "388", "389", "390", "391", "392", "393", "394", "395", "396", "397", "398", "399", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "432", "433", "434", "435", "436", "437", "438", "439", "440", "441", "442", "443", "444", "445", "446", "447", "448", "449", "450", "451", "452", "453", "454", "455", "456", "457", "458", "459", "460", "461", "462", "463", "464", "465", "466", "467", "468", "469", "470", "471", "472", "473", "474", "475", "476", "477", "478", "479", "480", "481", "482", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499", "500"]} />
                                                </View>


                                            </View>


                                        </>
                                    }
                                    {category === "Job" &&
                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Contratação</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['PJ', 'CLT', 'FreeLa']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Salário</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Área</Text>
                                                    <Select value={subcategory} width={wp('50%')} setSelect={value => setSubcategory(value)} dataSelect={["Administrativo", "Secretariado", "Finanças", "Comercial", "Vendas", "Telecomunicações", "Informática", "Multimídia", "Tecnogia da Informação", "Atendimento ao Cliente", "Call Center", "Banco", "Seguros", "Consultoria", "Jurídica", "Logística", "Distribuição", "Turismo", "Hotelaria", "Restaurante", "Educação", "Formação", "Marketing", "Comunicação", "Serviços Domésticos", "Limpezas", "Construção", "Industrial", "Saúde", "Medicina", "Enfermagem", "Agricultura", "Pecuária", "Veterinária", "Engenharia", "Arquitetura", "Design",]} />
                                                </View>
                                                <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Cargo</Text>
                                                    <PInput placeholder={'Desenvolvedor'} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                </View>

                                            </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.0%')} />Gênero</Text>
                                                    <Select value={col4} width={wp('21%')} setSelect={value => setCol4(value)} dataSelect={['Fem', 'Mas', 'Uni']} />
                                                </View>


                                                <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Empresa</Text>
                                                    <PInput placeholder={'Linear Dev'} onChangeText={value => setCol5(value)} value={col5} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                </View>


                                            </View>


                                        </>
                                    }
                                    {category === "Services" &&
                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Contratação</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['PJ', 'CLT', 'FreeLa']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Salário</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Área</Text>
                                                    <Select value={subcategory} width={wp('50%')} setSelect={value => setSubcategory(value)} dataSelect={["Administrativo", "Secretariado", "Finanças", "Comercial", "Vendas", "Telecomunicações", "Informática", "Multimídia", "Tecnogia da Informação", "Atendimento ao Cliente", "Call Center", "Banco", "Seguros", "Consultoria", "Jurídica", "Logística", "Distribuição", "Turismo", "Hotelaria", "Restaurante", "Educação", "Formação", "Marketing", "Comunicação", "Serviços Domésticos", "Limpezas", "Construção", "Industrial", "Saúde", "Medicina", "Enfermagem", "Agricultura", "Pecuária", "Veterinária", "Engenharia", "Arquitetura", "Design",]} />
                                                </View>
                                                <View style={{ width: wp('35%'), marginRight: hp('1%') }}>
                                                    <Text style={styleEditClassified.descriptionInput}>Cargo</Text>
                                                    <PInput placeholder={'Desenvolvedor'} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                </View>

                                            </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.0%')} />Gênero</Text>
                                                    <Select value={col4} width={wp('21%')} setSelect={value => setCol4(value)} dataSelect={['Fem', 'Mas', 'Uni']} />
                                                </View>


                                            </View>


                                        </>
                                    }
                                    {category === "Animal" &&

                                        <><View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                            <View style={{ width: wp('32%'), marginRight: hp('1%') }} >
                                                <Text style={styleEditClassified.descriptionInput}>CEP</Text>
                                                <PInput placeholder={'cep'} onChangeText={value => setCep(value)} value={cep} keyboardType='numeric' size={hp('2.2%')} type='material-icons' name='place' />
                                            </View>
                                            <View>
                                                <Text style={styleEditClassified.description}><MaterialCommunityIcons name="handshake" color='#000' size={hp('2.0%')} /> Negócio</Text>
                                                <Select value={type} width={wp('28%')} setSelect={value => setType(value)} dataSelect={['Doar', 'Vender', 'Alugar']} />
                                            </View>
                                            <View style={{ width: wp('30%'), marginRight: hp('0%') }}>
                                                <Text style={styleEditClassified.descriptionInput}> Valor</Text>
                                                <PInput onChangeText={value => setFullBrl(value, 'price')} value={price} keyboardType='numeric' placeholder={'1.100,00'} size={hp('2%')} type='material-community' name='currency-brl' />
                                            </View>
                                        </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="square" color='#000' size={hp('2.0%')} /> Animal</Text>
                                                    <Select value={subcategory} width={wp('30%')} setSelect={value => setSubcategory(value)} dataSelect={['Bode', 'Boi', 'Cachorro', 'Cavalo', 'Coelho', 'Galinha', 'Gato', 'Hamster', 'Ovelha', 'Passaro', 'Pato', 'Porco', 'Vaca']} />
                                                </View>
                                                    <View style={{ width: wp('40%'), marginRight: hp('0%') }}>
                                                        <Text style={styleEditClassified.descriptionInput}>Raça</Text>
                                                        <PInput placeholder={'Labrador'} onChangeText={value => setCol1(value)} value={col1} size={hp('2.2%')} type='material-icons' name='drive-file-rename-outline' />
                                                    </View>
                                                    <View>
                                                    <Text style={styleEditClassified.description}><MaterialCommunityIcons name="gender-male-female" color='#000' size={hp('2.0%')} /> Sexo</Text>
                                                    <Select value={col4} width={wp('18%')} setSelect={value => setCol4(value)} dataSelect={['Fem', 'Mac']} />
                                                </View>



                                            </View>
                                            <View style={{ marginLeft: hp('0%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                                
                                                {subcategory !== 'Beleza e Saúde' &&
                                                    <View>
                                                        <Text style={styleEditClassified.description}><MaterialCommunityIcons name="calendar" color='#000' size={hp('2.0%')} /> Qts. Mêses</Text>
                                                        <Select value={col3} width={wp('30%')} setSelect={value => setCol3(value)} dataSelect={[ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348"]} />
                                                    </View>
                                                }
                                                <View>
                                                    <Text style={styleEditClassified.description}><Octicons name="number" color='#000' size={hp('2.0%')} /> Quantidade</Text>
                                                    <Select value={col7}  width={wp('22%')} setSelect={value => setCol7(value)} dataSelect={[ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348", "349", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", "387", "388", "389", "390", "391", "392", "393", "394", "395", "396", "397", "398", "399", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "432", "433", "434", "435", "436", "437", "438", "439", "440", "441", "442", "443", "444", "445", "446", "447", "448", "449", "450", "451", "452", "453", "454", "455", "456", "457", "458", "459", "460", "461", "462", "463", "464", "465", "466", "467", "468", "469", "470", "471", "472", "473", "474", "475", "476", "477", "478", "479", "480", "481", "482", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499", "500"]} />
                                                </View>


                                            </View>


                                        </>
                                    }


                                    <View style={{ marginTop: hp('3%'), marginRight: hp('1%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                        <View style={{ width: wp('90%'), marginRight: hp('1%') }} >
                                            <Text style={styleEditClassified.descriptionInput}>Descrição</Text>
                                            <PInputLong  placeholder={'Descreva aqui  itens, detalhes do produto, tem limite mas não se preocupe você poderá passar mais detalhes quando for contatado pelo whatsapp'} maxLength={316} multiline={true} onChangeText={value => setDescription(value)} value={description} size={hp('2.2%')} type='material-community' name='view-headline' />
                                        </View>
                                    </View>
    
                                            <View style={{ marginBottom: hp('2%'), flexDirection: "row", justifyContent: "space-evenly", }}>
                                        <PButton width={wp('25%')} onPress={() => resetState('1')} title='Voltar' type='material-icons' name='arrow-back-ios' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle='#25d366' backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-Regular' marginLeft={hp('1%')} />
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
                    <Notification status={status} visibles={visableNotification} title={title} message={message} onPress={() => resetState('0')} close={() => resetState('0')} />
                }   
                </SafeAreaView>
    
            </NativeBaseProvider>
            );
}