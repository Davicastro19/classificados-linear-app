import { Text, View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import React, { useState,useEffect } from 'react'
import tenantService from '../services/TenantSevice';
import stylesColor from '../style/colorApp';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../style/SignUp';
import PInput from '../components/input/input'
import PButton from '../components/button/button'
import MLoad from '../components/loading/miniLoad';
import DialogCode from '../components/dialogCode/dialogCode';
import Notification from '../components/notification/notification';
import { NativeBaseProvider } from 'native-base';

export default function Profile({navigation}) {
  const [erroMessagePass, setErroMessagePass] = useState(null)
  const [erroMessageEmail, setErroMessageEmail] = useState(null)
  const [erroMessageName, setErroMessageName] = useState(null)
  const [erroMessagePhone, setErroMessagePhone] = useState(null)
  const [erroMessageCode, setErroMessageCode] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visableNotification, setVisableNotification] = useState(false);
  const [code, setCode] = useState(null)
  const [newCode, setNewCode] = useState(null)
  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [dateRegister, setDateRegister] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [visableDialogCode, setVisableDialogCode] = useState(false);
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  function LogOut() {
    AsyncStorage.removeItem("TOKEN").then(() => {
      AsyncStorage.removeItem("ID")
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      })
    }).catch((erro) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      })
    })
  }
  async function getData(id) {
    let token = await AsyncStorage.getItem("TOKEN")
    setLoading(true)
    let data = {
      token: token,
      id: parseInt(id)
    }
    tenantService.getData(data)

      .then((response) => {
        setLoading(false)
        setEmail(response.data.email)
        setName(response.data.name)
        setPhone(response.data.phone)
        setDateRegister(response.data.creationDate)
      })
      .catch((error) => {
        setLoading(false)
      })
      setLoading(false)

  }
  function showNotification(status, title, message) {
    setVisableNotification(true)
    setTitle(title)
    setMessage(message)
    setStatus(status)
}

  
  function validateName(value){
    try{
      
      let vname =  value.split(' ')[0]
      let lastname =  value.split(' ')[1]
      if (!vname || !lastname){
        return false
      }else{
      var pattern = /[^a-zà-ú]/gi;
   
      var validate_name = vname.match(pattern);
      var validate_lastname = lastname.match(pattern);
   
      if( validate_name ){
        return false
      }else{
        if( validate_lastname){
          return false
        }else{
           return true
        }
      }
    }
    }catch (e){
      return false
    }
   
      
  }
  
  function IsEmail(value) {
    if (!value){
      return false
    }
    const usuario = value.substring(0, value.indexOf("@"));
    const dominio = value.substring(value.indexOf("@") + 1, value.length);
    if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) && (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return true
    }
    else {
      return false
    }
  }

  function isPAss(value){
    if(value === null || value === ''){
      return false
    }
    if (value.length < 6){
      return false
    }
    return true
  }

  function telefone_validation(telefone) {
    telefone = telefone.replace(/\D/g, '');

    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

     for (var n = 0; n < 10; n++) {
         if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
     var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
     if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

     if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    return true;
  }

  function closeNotification() {
    setVisableNotification(false)
  }
  function closeDialog() {
    setVisableDialogCode(false)
  }

  function ValidateSignUp() {
    if (!validateName(name)) {
      setErroMessageName("Nome ou sobrenome inválido*")
      return false
    } else {
      setErroMessageName(null)
    }
    if (!IsEmail(email)) {
      setErroMessageEmail("Email inválido*")
      return false
    } else {
      setErroMessageEmail(null)
    }
    if (!isPAss(password)) {
      setErroMessagePass("Sua senha deve ter 6 ou mais caractere*")
      return false
    } else {
      setErroMessagePass(null)
    }
    if (!telefone_validation(phone)) {
      setErroMessagePhone("Número inválido, use o DDD Ex: 7788226655*")
      return false
    } else {
      setErroMessagePhone(null)
    }
    return true
}

   async function FullSignUp() {
    setLoading(true)
    if (!code) {
      Vibration.vibrate()
      setErroMessageCode('Campo obrigatório*')
    } else {
      if (code === newCode) {
        let id = await AsyncStorage.getItem("ID")
        let token = await AsyncStorage.getItem("TOKEN")
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 2);
        let data = {
          email: email,
          password: password,
          name: name,
          device: Device.modelName + '/' + Device.osName + '/' + Device.deviceName,
          phone: phone,
          token: token,
          date: dateRegister

        }
        tenantService.updateAccount(data, id, token)
          .then((response) => {
            if (response.data.status){
              showNotification('success', 'Salvo!', response.data.message)
            }else{
              showNotification('info', 'Então...', response.data.message)
            }
          })
          .catch((response) => {
            showNotification('error', 'Ops!', response.toString())
          })
      }else{
        showNotification('info', 'Então...', 'Código inválido')
      }
    }
    setCode(null)
    setVisableDialogCode(false)
    setPassword(null)
    setLoading(false)
  }

  function setCodeFull(value) {
    setCode(value)
  }

  function sendCode() {
    setLoading(true)
    if (ValidateSignUp()) {
      let data = {
        email: email,
        type: "profile"
      }
      tenantService.sendCode(data)
        .then((response) => {
          if (response.data.status){
            setVisableDialogCode(true)
            setNewCode(response.data.message)
          }else{
            showNotification('info', 'Então...', response.data.message)
          }
        })
        .catch((response) => {
          showNotification('error', 'Ops!', response.toString())
        })
    } else {
      setLoading(false)
      setVisableDialogCode(false)
    }
    setLoading(false)
  }
  useEffect(() => {

    AsyncStorage.getItem("ID")
      .then((id => {
        if (id) {
          getData(id)
        }
      }
      )).catch((setLoading(false)))
  }, [])
  return (
    <NativeBaseProvider>
    <ImageBackground source={require("../assets/backSign.png")} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.preContainer} >
      <StatusBar  barStyle="light-content" backgroundColor={stylesColor.primaryColor}  />
        <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS == "ios" ? "padding" : "height"} KeyboardVerticalOffset={0}>
          <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            {!isLoading && name &&
              <><View style={styles.containerLogo}>
                <Image style={styles.logo} source={require("../assets/icon.png")} />
              </View>
                <View style={styles.form}>
                  <Text style={styles.errorMessage}>{erroMessageName}</Text>
                  <PInput onChangeText={value => { setName(value), setErroMessageName(null); }}   value={name}  placeholder=" Nome e sobrenome" keyboardType="email-address" size={hp('2.1%')} type='font-awesome' name='user-o' />
                  <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
                  <PInput onChangeText={value => { setEmail(value), setErroMessageEmail(null); }} value={email}  placeholder=" E-mail" keyboardType="email-address" size={hp('2.2%')} type='material-icons' name='alternate-email' />
                  <Text style={styles.errorMessage}>{erroMessagePass}</Text>
                  <PInput onChangeText={value => { setPassword(value), setErroMessagePass(null); }} secureTextEntry={true} placeholder=" Senha" size={hp('2.1%')} type='material-community' name='form-textbox-password' />
                  <Text style={styles.errorMessage}>{erroMessagePhone}</Text>
                  <PInput onChangeText={value => { setPhone(value), setErroMessagePhone(null); }}   value={phone} placeholder=" Numero" keyboardType="numeric" size={hp('2.4%')} type='material-community' name='whatsapp' />
                  <View style={styles.rowButtons}>
                    <PButton onPress={() => sendCode()} title="Salvar" type='material-community' name='content-save-edit-outline' size={hp('2.0%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={'#24b95b'} fontFamily='Raleway-SemiBold' />
                  </View>
                  <View style={styles.rowButtons}>
                    <PButton onPress={() => LogOut()} title="Sair" type='material-community' name='logout' size={hp('2.0%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-SemiBold' />
                  </View>
                </View></>
            }
            {isLoading && 
              <View style={styles.mLoad}>
                <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
              </View>
            }
          </Pressable>
          {visableNotification && !isLoading && !visableDialogCode &&
              <Notification visable={visableNotification} status={status} title={title} message={message} onPress={() => setVisableNotification(false)} close={closeNotification} />
            }
          {!visableNotification && !isLoading && visableDialogCode &&
            <DialogCode containerColor={stylesColor.primaryColor} erroMessageCode={erroMessageCode} onChangeText={setCodeFull} visable={visableDialogCode} FullSignUp={FullSignUp} close={closeDialog} />
          }
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
    </NativeBaseProvider>
  );
}

