import { Text, View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import tenantService from '../services/TenantSevice';
import stylesColor from '../style/colorApp';
import * as Device from 'expo-device';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../style/SignUp';
import PInput from '../components/input/input'
import PButton from '../components/button/button'
import MLoad from '../components/loading/miniLoad';
import DialogCode from '../components/dialogCode/dialogCode';
import Notification from '../components/notification/notification';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function SignUp() {
  const [code, setCode] = useState(null)
  const [newCode, setNewCode] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [erroMessagePass, setErroMessagePass] = useState(null)
  const [erroMessageEmail, setErroMessageEmail] = useState(null)
  const [erroMessageName, setErroMessageName] = useState(null)
  const [erroMessagePhone, setErroMessagePhone] = useState(null)
  const [erroMessageCode, setErroMessageCode] = useState(null)
  const [isLoadings, setLoading] = useState(false)
  const [visableDialogCode, setVisableDialogCode] = useState(false);
  const [message, setMessage] = useState(null)
  const [visableNotification, setVisableNotification] = useState(false);
  const [title, setTitle] = useState(null)
  const  [error,setError] = useState(null)



  function showNotification(title, message,valid) {
    setError(valid)
    setTitle(title)
    setMessage(message)
    setVisableNotification(true)
    
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

  function FullSignUp() {
    if (!code) {
      Vibration.vibrate()
      setLoading(false)
      setCode(null)
      setErroMessageCode('Campo obrigatório*')
    } else {
      if (code === newCode) {
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 2);
        let day = String(dateNow.getDate()).padStart(2, '0');
        let month = String(dateNow.getMonth() + 1).padStart(2, '0');
        let year = dateNow.getFullYear();
        let data = {
          email: email,
          password: password,
          name: name,
          device: Device.modelName + '/' + Device.osName + '/' + Device.deviceName,
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
            setPassword(null)
            setLoading(false)
            setVisableDialogCode(false)
            if (response.data.status){
              showNotification('Sucesso!', response.data.message,'success')
            }else{
              showNotification('Ops!', response.data.message,'error ')
            }
          })
          .catch((response) => {
             setLoading(false)
            setVisableDialogCode(false)
            showNotification('Ops!', response.toString(),'error')
          })
      }else{
        setLoading(false)
        setVisableDialogCode(false)
        setCode(null)
        showNotification('Ops!', 'Código inválido','error')
      }
    }
  }

  function closeNotification() {
    setVisableNotification(false)
  }

  function closeDialog() {
    setVisableDialogCode(false)
  }
  
  function setCodeFull(value) {
    setCode(value)
  }

  function sendCode() {
    setLoading(true)
    if (ValidateSignUp()) {

      setLoading(true)
      let data = {
        email: email,
        type: "signUp"
      }
      tenantService.sendCode(data)
        .then((response) => {
          if (response.data.status) {
            setNewCode(response.data.message)
            setVisableDialogCode(true)
            setLoading(false)
          } else {
            setLoading(false)
            showNotification('Ops!', response.data.message,'error')
          }
        })
        .catch((response) => {
          setVisableDialogCode(false)
          setLoading(false)
          showNotification('Ops!', response.toString(),'error')
           })
    } else {
      Vibration.vibrate()
      setLoading(false)
      setVisableDialogCode(false)
    }
  }

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
    <ImageBackground source={require("../assets/backSign.png")} resizeMode="cover" style={styles.image}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={stylesColor.secondaryColor} />
      <SafeAreaView style={styles.preContainer} >
        <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS == "ios" ? "padding" : "height"} KeyboardVerticalOffset={0}>
          <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            {!isLoadings &&
              <><View style={styles.containerLogo}>
                <Image style={styles.logo} source={require("../assets/icon.png")} />
              </View>
                <View style={styles.form}>
                  <Text style={styles.errorMessage}>{erroMessageName}</Text>
                  <PInput onChangeText={value => { setName(value), setErroMessageName(null); }} placeholder=" Nome e sobrenome" keyboardType="email-address" size={hp('2.1%')} type='font-awesome' name='user-o' />
                  <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
                  <PInput onChangeText={value => { setEmail(value), setErroMessageEmail(null); }} placeholder=" E-mail" keyboardType="email-address" size={hp('2.2%')} type='material-icons' name='alternate-email' />
                  <Text style={styles.errorMessage}>{erroMessagePass}</Text>
                  <PInput onChangeText={value => { setPassword(value), setErroMessagePass(null); }} secureTextEntry={true} placeholder=" Senha" size={hp('2.1%')} type='material-community' name='form-textbox-password' />
                  <Text style={styles.errorMessage}>{erroMessagePhone}</Text>
                  <PInput onChangeText={value => { setPhone(value), setErroMessagePhone(null); }} placeholder=" Numero" keyboardType="numeric" size={hp('2.4%')} type='material-community' name='whatsapp' />
                  <View style={styles.rowButtons}>
                    <PButton onPress={() => sendCode()} title="Cadastrar" type='material-community' name='check-outline' size={hp('2.0%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                  </View>
                </View></>
            }
            {isLoadings && !visableNotification &&
              <View style={styles.mLoad}>
                <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
              </View>
            }
          </Pressable>
          {visableNotification && !isLoadings && !visableDialogCode &&
              <Notification visable={visableNotification} status={error} title={title} message={message} onPress={() => setVisableNotification(false)} close={closeNotification} />
            }
          {!visableNotification && !isLoadings && visableDialogCode &&
            <DialogCode containerColor={stylesColor.primaryColor} erroMessageCode={erroMessageCode} onChangeText={setCodeFull} visable={visableDialogCode} FullSignUp={FullSignUp} close={closeDialog} />
          }
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
    </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

