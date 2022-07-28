
import { View,  StatusBar, SafeAreaView, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react'
import Config from '../util/Config'
import stylesColor from '../style/colorApp';
import styles from '../style/Classifieds'
import { NativeBaseProvider,FlatList} from "native-base";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import classifiedsService from '../services/ClassifiedsService';
import CardClassifieds from '../components/cardClassifieds/cardClassifieds'
import LoadClassified from '../components/loading/loadClassifieds'
import OneLoadClassified from '../components/loading/oneLoadClassified'
import PButton from '../components/button/button';
import DialogFilter from '../components/dialogFilter/dialogFilter';
import Notification from '../components/notification/notification';


export default function Classifieds({navigation}) {
    
    const [loading, setLoading] = useState(false)
    const [citys, setCitys] = useState(false)
    const [orderCity, setOrderCity] = useState(citys)
    const [orderDistrict, setOrderDistrict] = useState('Todos os Bairros')
    const [orderAll, setOrderAll] = useState('recent')
    const [type, setType] = useState('city')
    const [nameIcon, setNameIcon] = useState('filter-plus-outline')
    const [question, setQuesetion] = useState('Qual cidade?')
    const [dataSelect, setDataSelect] = useState(false)
    const [oldClassified, setOldClassifieds] = useState([])
    const [skip, setSkip] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [classifieds, setClassifieds] = useState([])
    const [title, setTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [status, setStatus] = useState(null)
    const [oldLengh, setOldLengh] = useState(1)
    const [refreshing, setRefreshing] = useState(false);
    const [visableDialogFilter, setVisableDialogFilter] = useState(true);
    const [visableNotification, setVisableNotification] = useState(false);
    
    const onRefresh = React.useCallback(() => {
        setClassifieds([])
        let nSkip = skip
        nSkip = nSkip - 30
        if (nSkip < 0)
            nSkip = 0
        if (orderDistrict === 'Todos os Bairros') {
            allClassifieds(nSkip)
        }
        else {
            getClassifiedFiltered(nSkip)
        }
        setSkip(nSkip)
        setRefreshing(false)
    }, []);

    const renderItem = React.useCallback(({ item }) => {
        return (
            <CardClassifieds item={item} selectClassifiedById={() => selectClassifiedById(item.id)} validateImage={() => validateImage(item.images, '1')}  title="Ver mais"  name='information-variant'/>
        )
    }, [classifieds]);


    function setFilter(value) {
        if (type == 'city') {
            setOrderCity(value)
            setType('district')
            districyBycity(value)
            setQuesetion('Qual bairro?')
        } else if (type == 'district') {
            setOrderDistrict(value)
            setDataSelect(['Mais Recentes', 'Menor Valor', 'Maior Valor'])
            setType('order')
            setQuesetion('Qual ordem?')
            setNameIcon('filter-check-outline')
        } else {
            if (value === 'Maior Valor') {
                setOrderAll('bigger')
            } else if (value === 'Menor Valor') {
                setOrderAll('smaller')
            } else {
                setOrderAll('recent')
            }

        }
        
        

    }

    function getFilter() {
        setClassifieds([])
        getClassifiedFiltered(0)
        getCitys()
        setType('city')
        setQuesetion('Qual cidade?')
    }  

    function showNotification(status, title, message) {
        setVisableNotification(true)
        setTitle(title)
        setMessage(message)
        setStatus(status)
      }
        
    function closeDialogFilter() {
        setVisableDialogFilter(false)
        getCitys()
        setType('city')
        setQuesetion('Qual cidade?')
        
    }

    function closeNotificaion() {
        setVisableNotification(false)
    }

    function setSpecificClassifiedFull(values){
        navigation.navigate("Classified",{specificClassified:values})
    }
     
    
    function getCitys() {  
        setIsLoading(true)
        classifiedsService.city()
            .then((response) => {
                setDataSelect(response.data.message)
            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
            setIsLoading(false)      
    }


    function districyBycity(cits) {
        setIsLoading(true)
        classifiedsService.districtsByCity(cits,'2')
            .then((response) => {
                setDataSelect(response.data.message)
            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
            setIsLoading(false)
    }

    function moreClassifieds() {
        if (classifiedsService.length > 3){
        setClassifieds([])
        if (oldLengh !== 0) {
            if (loading) return;
            setLoading(true);
            let nSkip = skip
            nSkip = nSkip + 30
            if (orderDistrict === 'Todos os Bairros') {
                allClassifieds(nSkip)
            }
            else {
                getClassifiedFiltered(nSkip)
            }
            
        }
    }
        setRefreshing(false)
        setLoading(false);

    }

    function validateImage(image, value) {

        try {
            if (image.split(',')[value].includes('jpg') || image.split(',')[value].includes('png')) {
                return Config.AWS_URL + image.split(',')[value]
            } else {
                return Config.AWS_URL +'favicon.png'
            }
        } catch (e) {
            return Config.AWS_URL +'favicon.png'
        }
    }

    function selectClassifiedById(value) {
        setIsLoading(true)
        classifiedsService.selectClassifiedById(value)
            .then((response) => {
                setSpecificClassifiedFull(response.data)
            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
            setIsLoading(false)
            setLoading(false)

    }

    function upClassified(objA, objB) {

        if (objA !== objB) { 
            setClassifieds(objA)
            setOldClassifieds(objA)
        }
    }

    function getClassifiedFiltered(skips) {
        setVisableDialogFilter(false)
        setIsLoading(true)
        if (orderDistrict != 'Todos os Bairros') {
            
            setSkip(skips)
            classifiedsService.getClassifiedFiltered(skips, orderDistrict, orderCity, orderAll)
                .then((response) => {
                    setOldLengh(response.data.length)
                    if (response.data.length !== 0) {
                           upClassified(response.data, oldClassified)
                    }else{
                        showNotification('info', 'Então...', 'Nada foi encontrado com esse filtro.')
                    }
                })
                .catch((error) => {
                    showNotification('error', 'Ops!', error.toString())
                })
            
        } else {
            allClassifieds(skips)
        }
        
        setIsLoading(false)
        setLoading(false)
    }

    function allClassifieds(skips) {
        setIsLoading(true)
        setSkip(skips)
        classifiedsService.allClassifieds(skips)
            .then((response) => {
                setOldLengh(response.data.length)
                if (response.data.length !== 0) {
                         upClassified(response.data, oldClassified)
                }
                else{
                    showNotification('info', 'Então...', 'Nada foi encontrado com esse filtro.')
                    }

            })
            .catch((error) => {
                showNotification('error', 'Ops!', error.toString())
            })
        setIsLoading(false)
        setLoading(false)
        if (orderAll === 'bigger') {
            setOrderAll('Maior Valor')
        } else if (orderAll === 'smaller') {
            setOrderAll('Menor Valor')
        } else {
            setOrderAll('Mais Recentes')
        }
    }




    useEffect(() => {
        allClassifieds(0)
    }, [])

    useEffect(() => {
        getCitys()
    }, [])
    
    return (
        <NativeBaseProvider >
            <SafeAreaView style={styles.preContainer} >
            <StatusBar barStyle="light-content" backgroundColor={stylesColor.primaryColor} />
                {!isLoading && dataSelect &&
                    <View style={styles.viewFilter}>
                        <PButton onPress={() => setVisableDialogFilter(true)} title="Filtro" type='material-community' name='filter-menu-outline' size={hp('3%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='MPLUS1p-Medium' />
                    </View>}
                {isLoading &&
                    <><LoadClassified /></>
                }
                {classifieds && !isLoading && 
                    <FlatList refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        data={classifieds}
                        renderItem={renderItem}
                        onEndReached={moreClassifieds}
                        onEndReachedThreshold={0.03}
                        ListFooterComponent={
                        <OneLoadClassified color={stylesColor.secondaryColor}
                            borderColor={stylesColor.primaryColor} />}
                        keyExtractor={value => value.id} />
                }
                {visableNotification && !isLoading &&
                    <Notification status={status} visable={visableNotification} title={title} message={message} close={closeNotificaion} />
                }
                {visableDialogFilter && !isLoading && dataSelect &&  
                    <DialogFilter question={question} dataSelect={dataSelect} nameIcon={nameIcon} type={type} orderCity={orderCity} visable={visableDialogFilter} onPress={() => getFilter()} setFilter={value => setFilter(value)} close={closeDialogFilter}  />
                }
            </SafeAreaView>
            
        </NativeBaseProvider>
    );
}


