import { View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { FAB, Text, Input, Button, CheckBox } from 'react-native-elements';
import React, { useState } from 'react'
import tenantService from '../services/TenantSevice';
import stylesColor from '../style/colorApp';
import CustomDialogCode from '../components/CustomDialogCode';
import * as Device from 'expo-device';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../style/SignUp';
import PInput from '../components/input/input'
import PButton from '../components/button/button'
import MLoad from '../components/loading/miniLoad';
import DialogCode from '../components/dialogCode/dialogCode';
import Notification from '../components/notification/notification';

export default function SignUp({ navigation }) {
  const [code, setCode] = useState(null)
  const [newCode, setNewCode] = useState(null)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [isSelected, setSelected] = useState(false)
  const [password, setPassword] = useState(null)
  const [erroMessagePass, setErroMessagePass] = useState(null)
  const [erroMessageEmail, setErroMessageEmail] = useState(null)
  const [erroMessageName, setErroMessageName] = useState(null)
  const [erroMessagePhone, setErroMessagePhone] = useState(null)
  const [erroMessageCode, setErroMessageCode] = useState(null)
  const [erroMessageSelect, setErroMessageSelect] = useState(null)
  const [isLoadings, setLoading] = useState(false)
  const [visableDialogCode, setVisableDialogCode] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [message, setMessage] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [visableNotification, setVisableNotification] = useState(false);
  const [title, setTitle] = useState(null)
  const  [error,setError] = useState(null)



  function showNotification(title, message,valid) {
    setError(valid)
    setTitle(title)
    setMessage(message)
    setVisableNotification(true)
    
  }

  function hideDialogCode() {
    setVisableDialogCode(false)
    setLoading(false)
  }
  function hideDialog(status) {
    setVisableDialog(status)
    if (titulo === "Sucesso") {
      navigation.navigate("Login")
    }
  }

  function IsEmail() {

    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);
    if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) && (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return true
    }
    else {
      return false
    }
  }

  function isNumber(str) {
    return !isNaN(str)
  }

  function ValidateSignUp() {
    if (email != null && email != '') {
      if (!IsEmail()) {
        Vibration.vibrate()
        setErroMessageEmail("Email invalido*")
        return false
      }
    }
    if (name === null || email === null || password === null || phone === null || name === '' || email === '' || password === '' || phone === '' || !isNumber(phone)) {
      Vibration.vibrate()
      if (email === null || email === '') {
        setErroMessageEmail("Campo obrigatório*")
      } else {
        setErroMessageEmail(null)
      }
      if (name === null || name === '') {
        setErroMessageName("Campo obrigatório*")
      } else {
        setErroMessageName(null)
      }
      if (phone === null || phone === '') {
        setErroMessagePhone("Campo obrigatório*")
      } else {
        setErroMessagePhone(null)
      }
      if (!isNumber(phone)) {
        setErroMessagePhone("Digite um número valido com DDD*")
      } else {
        setErroMessagePhone(null)
      }
      if (password === null || password === '') {
        setErroMessagePass("Campo obrigatório*")
      } else {
        setErroMessagePass(null)
      }
      return false
    } else {
      setErroMessagePass(null)
      setErroMessagePhone(null)
      setErroMessageName(null)
      setErroMessageSelect(null)
      setErroMessageEmail(null)
      return true
    }

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
            setSelected(false)
            setPassword(null)
            setLoading(false)
            setVisableDialogCode(false)
            showNotification('Sucesso!', response.data.message,'success')
          })
          .catch((response) => {
            //// // console.log('sssdsds',response.data)
            setLoading(false)
            setVisableDialogCode(false)
            showNotification('Ops!', response.toString(),'error')
          })
      }else{
        setLoading(false)
        setVisableDialogCode(false)
        setCode(null)
        showNotification('Ops!', 'Código invalido','error')
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
          //    showDialog(titulo, response, "SUCESSO")
        })
    } else {
      setLoading(false)
      setVisableDialogCode(false)
    }
  }
  return (
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
                  <PInput onChangeText={value => { setPhone(value), setErroMessageEmail(null); }} placeholder=" Numero" keyboardType="numeric" size={hp('2.4%')} type='material-community' name='whatsapp' />

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
            <DialogCode erroMessageCode={erroMessageCode} onChangeText={setCodeFull} visable={visableDialogCode} FullSignUp={FullSignUp} close={closeDialog} />
          }
        </KeyboardAvoidingView>

      </SafeAreaView>
    </ImageBackground>
  );
}

