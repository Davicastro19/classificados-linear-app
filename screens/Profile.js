import {  View, Image, Pressable,Keyboard,Vibration,KeyboardAvoidingView } from 'react-native';
import { FAB,Text, Input, Button, CheckBox } from 'react-native-elements';
import React, {useState} from 'react'
import { Divider, NativeBaseProvider } from "native-base";
import tenantService from '../services/TenantSevice';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import styles from '../style/SignUp'
import input from '../components/Input'
import CustomDialog from '../components/CustomDialog';
import CustomDialogCode from '../components/CustomDialogCode';
import * as Device from 'expo-device';

export default function Profile(navigation)  {
  const  [code,setCode] = useState(null)
  const  [newCode,setNewCode] = useState(null)
  const  [email,setEmail] = useState(null)
  const  [name,setName] = useState(null)
  const  [phone,setPhone] = useState(null)
  const  [isSelected,setSelected] = useState(false)
  const  [password,setPassword] = useState(null)
  const  [erroMessagePass,setErroMessagePass] = useState(null)
  const  [erroMessageEmail,setErroMessageEmail] = useState(null)
  const  [erroMessageName,setErroMessageName] = useState(null)
  const  [erroMessagePhone, setErroMessagePhone] = useState(null)
  const  [erroMessageSelect,setErroMessageSelect] = useState(null)
  const  [isLoadings, setLoading] = useState(false)
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [visibleDialogCode, setVisibleDialogCode] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [message, setMessage] = useState(null)
  const [tipo, setTipo] = useState(null)
  
  function LogOut({navigation}){
    AsyncStorage.removeItem("TOKEN").then(()=> {
    navigation.reset({index:0,
    routes:[{name: "Login" }]
    })}).catch((erro)=> {
      console.log(erro)
    })
  }

  function showDialog (titulo, message, tipo) {
    setVisibleDialog(true)
    setVisibleDialogCode(false)
    setTitulo(titulo)
    setMessage(message)
    setTipo(tipo)
  }
  
function hideDialogCode() {
    setVisibleDialogCode(false)
    setLoading(false)
  }
function hideDialog(status) {
    setVisibleDialog(status)
    navigation.navigate("Login")
  }

function IsEmail() {
  
  const usuario = email.substring(0, email.indexOf("@"));
  const dominio = email.substring(email.indexOf("@")+ 1, email.length);
  if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) &&(dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true
  }
  else{
    return false
    }
  }

function isNumber(str) {
    return !isNaN(str)
}
 function  ValidateSignUp(){
    if (email != null && email != ''){
      if (!IsEmail()){
        Vibration.vibrate()
        setErroMessageEmail("Email invalido*")
        return false
      }
    }
    if (name === null || email === null || password === null || phone === null || name === '' || email === '' || password === '' || phone === ''  || !isNumber(phone)){
      Vibration.vibrate()
      if (email === null || email === ''){
        setErroMessageEmail("Campo obrigatório*")
      }else{
        setErroMessageEmail(null)
      }
      if (name === null || name === ''){
        setErroMessageName("Campo obrigatório*")
      }else{
        setErroMessageName(null)
      }
      if (phone === null || phone === ''){
        setErroMessagePhone("Campo obrigatório*")
      }else{
        setErroMessagePhone(null)
      }
      if (!isNumber(phone)){
        setErroMessagePhone("Digite um número valido com DDD*")
      }else{
        setErroMessagePhone(null)
      }
      if (password === null || password === ''){
        setErroMessagePass("Campo obrigatório*")
      }else{
        setErroMessagePass(null)
      }
      return false
    }else if (!isSelected){

        setErroMessagePass(null)
        setErroMessagePhone(null)
        setErroMessageName(null)
        setErroMessageSelect(null)
        setErroMessageEmail(null)
        Vibration.vibrate()
        setErroMessageSelect("Você precisa concordar com os termos*")
        return false
    }else{
        setErroMessagePass(null)
        setErroMessagePhone(null)
        setErroMessageName(null)
        setErroMessageSelect(null)
        setErroMessageEmail(null)
        return true
    }

  }
function FullSignUp(){
    if (ValidateSignUp()){
      if (code === newCode){
        setLoading(true)
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 2);
        let day = String(dateNow.getDate()).padStart(2,'0');
        let month = String(dateNow.getMonth() + 1).padStart(2, '0');
        let year = dateNow.getFullYear();
        let data = {
          email: email,
          password: password,
          name: name,
          device: Device.modelName+'/'+Device.osName+'/'+Device.deviceName,
          phone: phone,
          date: day + '/' + month + '/' + year
        
        }
        tenantService.register(data)
        .then((response) => {
          setCode(null)
          setNewCode(null)
          setEmail(null)
          setName(null)
          setPhone(null)
          setSelected(false)
          setPassword(null)
          setLoading(false)
          setVisibleDialogCode(false)
		      const titulo = (response.data.status) ? "Sucesso" : "Erro"
          showDialog	(titulo, response.data.message, "SUCESSO")         
        })
        .catch((response) => {
          console.log('sssdsds',response.data)
          setLoading(false)
          setVisibleDialogCode(false)
          showDialog(titulo, response, "SUCESSO")
        })
      }else{
          setLoading(false)
          setVisibleDialogCode(false)
          setCode(null)
          showDialog('Código', 'Código invalido', "Erro")
        }
      }
    }




function setCodeFull(value){
  setCode(value)
}



function sendCode(){
  setLoading(true)
  if (ValidateSignUp()){
    setVisibleDialogCode(true)
    setLoading(true)
      let data = {
        email: email,
        name: name
      }
    tenantService.sendCode(data)
      .then((response) => {
       if (response.data.status){
        setLoading(false)
        setNewCode(response.data.message)
       }else{
        setLoading(false)
		    const titulo = (response.data.status) ? "Sucesso" : "Erro"
        showDialog(titulo, response.data.message, "SUCESSO")         
      }})
      .catch((response) => {
        console.log('sssdsds',response.data)
    //    setLoading(false)
    //    showDialog(titulo, response, "SUCESSO")
      })
}else{
  setLoading(false)
  setVisibleDialogCode(false)
}
}
  
  return (
    <NativeBaseProvider>
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS == "ios" ? "padding" : "height"} KeyboardVerticalOffset={50}>
       <Text style={styles.titleProfile}> ALTERAR PERFIL</Text>
          <View style={styles.form}>
              <Text style={styles.errorMessage}>{erroMessageName}</Text>
              <Input autoComplete={true} inputContainerStyle={input.inputIcon} placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setName(value), setErroMessageName(null); } } placeholder="Nome e sobrenome" leftIcon={{ size: 20, type: 'font-awesome', name: 'user', color: '#C89A5B' }} />
              <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
              <Input autoComplete={true} inputContainerStyle={input.inputIcon} placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setEmail(value), setErroMessageEmail(null); } } placeholder=" E-mail" keyboardType="email-address" returnKeyType="done" leftIcon={{ size: 16, type: 'font-awesome', name: 'envelope', color: '#C89A5B' }} />
              <Text style={styles.errorMessage}>{erroMessagePass}</Text>
              <Input autoComplete={true} inputContainerStyle={input.inputIcon} placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setPassword(value), setErroMessagePass(null); } } placeholder="Senha" secureTextEntry={true} returnKeyType="done" leftIcon={{ size: 16, type: 'font-awesome', name: 'key', color: '#C89A5B' }} />
              <Text style={styles.errorMessage}>{erroMessagePhone}</Text>
              <Input autoComplete={true} inputContainerStyle={input.inputIcon} placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setPhone(value), setErroMessagePhone(null); } } placeholder="Telefone" keyboardType="number-pad" returnKeyType="done" leftIcon={{ size: 20, type: 'font-awesome', name: 'phone', color: '#C89A5B' }} />
            </View>
      { isLoadings &&
      <FAB
      loading
      visible={true}
      icon={{ name: 'add' }}
      color='rgba(106,255, 16, 1)'
      borderColor= 'rgba(42, 42, 42,1)' 
      size="small"
    />
      } 
    { !isLoadings && 
       
       <><Button onPress={() => sendCode()} title=" Salvar"         icon={{ name: 'check', type: 'font-awesome', size: 19, color: '#1E4344' }}          iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#C89A5B', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '95%', marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#1E4344' }} />
       <Divider my="2" bg="#122829"  mx="2" />
         <Button onPress={() => LogOut(navigation)} title="   Sair" icon={{ name: 'exit-to-app', type: 'material-icons', size: 25, color: '#FFC77A', }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '95%', marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#FFC77A' }}/></>
      
    }
  { visibleDialog && 
    <CustomDialog titulo={titulo} message={message} tipo={tipo} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
  }
  { visibleDialogCode && 
    <CustomDialogCode onChangeText={setCodeFull} onClose={hideDialogCode} visible={visibleDialogCode} FullSignUp={FullSignUp}></CustomDialogCode>
  }
  
    
    </KeyboardAvoidingView>
    </Pressable>
    </NativeBaseProvider>
  );
}
