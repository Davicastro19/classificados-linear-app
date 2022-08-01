
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
    const [orderCity, setOrderCity] = useState([])
    const [orderDistrict, setOrderDistrict] = useState('Todos os Bairros')
    const [orderCategory, setOrderCategory] = useState([])
    const [orderSubcategory, setOrderSubcategory] = useState([])
    const [orderAll, setOrderAll] = useState('Mais Recentes')
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
            <CardClassifieds item={item} selectClassifiedById={() => selectClassifiedById(item.id)} validateImage={() => validateImage(item.images, '0')}  title="Ver mais"  name='information-variant'/>
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
            setDataSelect(['Todas as Categorias','Imóvel','Animal','Automovél','Eletrônico','Cesta básica','Moda e beleza','Vagas de Trabalho','Encontrar Serviço'])
            setType('category')
            setQuesetion('Qual Categoria?')
        }else if (type == 'category') {
            if(value === 'Imóvel'){
                setOrderCategory('Immobile')
            }
            else if(value === 'Animal'){
                setOrderCategory('Animal')
            }
            else if(value === 'Automovél'){
                setOrderCategory('Car')
            }
            else if(value === 'Eletrônico'){
                setOrderCategory('Electronic')
            }
            else if(value === 'Cesta básica'){
                setOrderCategory('Baskets')
            }
            else if(value === 'Moda e beleza'){
                setOrderCategory('Fashion')
            }
            else if(value === 'Vagas de Trabalho'){
                setOrderCategory('Job')
            }
            else if(value === 'Encontrar Serviço'){
                setOrderCategory('Services')
            }else{
                setOrderCategory('Todas as Categorias')
            }
            if(value ==='Imóvel'){
                setDataSelect(['Todas as Subcategorias','Casa', 'Comercio', 'Apartamento', 'Terreno'])
            }else if (value === 'Animal'){
                setDataSelect(['Todas as Subcategorias','Bode', 'Boi', 'Cachorro', 'Cavalo', 'Coelho', 'Galinha', 'Gato', 'Hamster', 'Ovelha', 'Passaro', 'Pato', 'Porco', 'Vaca'])
            }else if (value === 'Automovél'){
                setDataSelect(['Todas as Subcategorias','Moto', 'Carro', 'Embarcação', 'Van'])
            }else if (value === 'Eletrônico'){
                setDataSelect(['Todas as Subcategorias','Smartphone', 'Tv', 'NotBook', 'Computador', 'Console'])
            }else if (value === 'Cesta básica'){
                setDataSelect(['Todas as Subcategorias','Alimentos', 'Limpeza', 'Higiene Pess.', 'Bebidas', 'Papelaria & Bzr.', 'Ult. Domésticas', 'Geral'])
            }else if (value === 'Moda e beleza'){
                setDataSelect(['Todas as Subcategorias', 'Imóvel','Animal','Automovél','Eletrônico','Cesta básica','Moda e beleza','Vagas de Trabalho','Encontrar Serviço'])
            }else if(value === 'Vagas de Trabalho' || value === 'Encontrar Serviço'){
                setDataSelect(['Todas as Subcategorias', "Administrativo", "Secretariado", "Finanças", "Comercial", "Vendas", "Telecomunicações", "Informática", "Multimídia", "Tecnogia da Informação", "Atendimento ao Cliente", "Call Center", "Banco", "Seguros", "Consultoria", "Jurídica", "Logística", "Distribuição", "Turismo", "Hotelaria", "Restaurante", "Educação", "Formação", "Marketing", "Comunicação", "Serviços Domésticos", "Limpezas", "Construção", "Industrial", "Saúde", "Medicina", "Enfermagem", "Agricultura", "Pecuária", "Veterinária", "Engenharia", "Arquitetura", "Design"])
            }else {
                setDataSelect(['Todas as Subcategorias'])
            }
            setType('subcategory')
            setQuesetion('Qual Subcategoria?')
        }else if(type === 'subcategory') {
            setOrderSubcategory(value)
            setDataSelect(['Mais Recentes', 'Menor Valor', 'Maior Valor'])
            setType('order')
            setQuesetion('Qual ordem?')
            setNameIcon('filter-check-outline')
        }else{
            setOrderAll(value)
        }
        
        

    }

    function getFilter() {
        setOrderAll()
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
        setSkip(skips)
        classifiedsService.getClassifiedFiltered(skips, orderDistrict, orderCity,orderCategory,orderSubcategory, orderAll)
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


