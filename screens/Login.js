
import { Text, Input, FAB } from 'react-native-elements';
import { View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, StatusBar, BackHandler, SafeAreaView,ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react'
import styles from '../style/Login'
//import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Device from 'expo-device';
import tenantService from '../services/TenantSevice';
//import CustomDialog from '../components/CustomDialog';
import { useFonts } from 'expo-font';
import stylesColor from '../style/colorApp';
import PInput from '../components/input/input'
import PButton from '../components/button/button'
import MLoad from '../components/loading/miniLoad'
import Notification from '../components/notification/notification'
import DialogCode from '../components/dialogCode/dialogCode';
import { useDisclose } from "native-base";
// import LInputButton from '../components/loadInputButton'

export default function Login({ navigation }) {
  const [loaded] = useFonts({
    'Raleway-SemiBold': require("../assets/fonts/Raleway-SemiBold.ttf"),
    'Raleway-Light': require("../assets/fonts/Raleway-Light.ttf"),
    'Raleway-Regular': require("../assets/fonts/Raleway-Regular.ttf"),
    'Raleway-Medium': require("../assets/fonts/Raleway-Medium.ttf"),
    'Raleway-LightItalic': require("../assets/fonts/Raleway-LightItalic.ttf")
  });
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erroMessageEmail, setErroMessageEmail] = useState('')
  const [erroMessagePass, setErroMessagePass] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [visableNotification, setVisableNotification] = useState(false);
  const [visable, setVisable] = useState(true);
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  function showNotification(title, message) {
    setVisableNotification(true)

    setTitle(title)
    setMessage(message)
  }


  function Login() {
    if (Validate()) {
      setLoading(true)
      let data = {
        email: email,
        password: password
      }
      tenantService.login(data)
        .then((response) => {
          if (response.data.status) {
            if (true){//(response.data.device === Device.modelName + '/' + Device.osName + '/' + Device.deviceName) {
              setLoading(false)
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }]
              })
            }
          } else {
            setLoading(false)
            showNotification("Dados inválidos", response.data.message)
          }
        })
        .catch((error) => {
          if (error.toString().includes('ined is not an object')) {
            setLoading(false)
            showNotification("Ops!", "Erro interno, contate o suporte se precisa. Tente novamte")

          } else {
            setLoading(false)
            showNotification("Ops!", "Erro interno - Contate o suporte: "+error.toString())
          }
          

        })
    }
  }

  function autoLogin(token) {
    setLoading(true)
    let data = {
      token: token
    }
    tenantService.autoLogin(data)
      .then((response) => {
        //// console.log(response.data)
        if (!response.data.status){//(response.data.device === Device.modelName + '/' + Device.osName + '/' + Device.deviceName) {
          setLoading(false)
        }
        else {
          setLoading(false)
          setErroMessageEmail('')
          setErroMessagePass('')
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
          })
          

        }
      })
      .catch((error) => {
        setLoading(false)
      })

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

  function Validate() {
    if (email != null && email != '') {
      if (!IsEmail()) {
        Vibration.vibrate()
        setErroMessageEmail("Email invalido*")
        setLoading(false)
        return false
      }
    }
    if (email === null || password === null || email === '' || password === '') {
      Vibration.vibrate()
      if (email === null || email === '') {
        setErroMessageEmail("Campo obrigatório*")
      } else {
        setErroMessageEmail(null)
      }
      if (password === null || password === '') {
        setErroMessagePass("Campo obrigatório*")
      } else {
        setErroMessagePass(null)
      }
      setLoading(false)
      return false
    } else {
      setLoading(false)
      return true
    }

  }
  function clossse(){
    setVisableNotification(false)
  }
  function SignUp() {
    navigation.navigate("SignUp")
  }

  function ForgotPassword() {
    navigation.navigate("ForgotPassword")
  }
  useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', () =>  {return true})
    AsyncStorage.getItem("TOKEN")
      .then((token => {
        if (token) {
          autoLogin(token)
        }
      }
      )).catch((setLoading(false)))
  }, [])
  //

  if (!loaded ){
    return null
  }
  return (
    <ImageBackground source={require("../assets/back.png")} resizeMode="cover" style={styles.image}>
   <StatusBar  translucent={true}  barStyle="light-content" backgroundColor={stylesColor.primaryColor} />
    
  <SafeAreaView style={styles.preContainer} >
  
     <KeyboardAvoidingView style={styles.keyboardAvoiding}  KeyboardVerticalOffset={50}>
      <Pressable style={styles.container} onPress={() => {Keyboard.dismiss(), setVisableNotification(false)}}>
      
      {!isLoading && 
      
        <><View style={styles.containerLogo}>
        
              <Image style={styles.logo} source={require("../assets/icon.png")} />
              
            </View>
            <View style={styles.form}>
            


                <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
                <PInput    onChangeText={value => { setEmail(value), setErroMessageEmail(null); } } placeholder=" E-mail" keyboardType="email-address" size={hp('2.2%')} type='material-icons' name='alternate-email' />
                <Text style={styles.errorMessage}>{erroMessagePass}</Text>
                <PInput onChangeText={value => { setPassword(value), setErroMessagePass(null); } } placeholder="Senha" secureTextEntry={true} size={hp('2.2%')} type='material-community' name='form-textbox-password' />


                <View style={styles.rowButtons}>


                  <PButton onPress={Login} title="Entrar" type='material-community' name='location-enter' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                  <PButton onPress={SignUp} title="Catastre-se" type='ant-design' name='form' size={hp('1.9%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-SemiBold' />

                </View>

                <PButton onPress={() => ForgotPassword()} title="Esqueci minha senha" type='material-community' name='lock-question' size={hp('2.2%')} color={stylesColor.secondaryColor} colorTitle={stylesColor.secondaryColor} backgroundColor={stylesColor.tertiaryColor} fontFamily='Raleway-SemiBold'/>


              </View></>
      }
      {isLoading && !visableNotification &&
      <View style={styles.mLoad}>
            <MLoad  color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
            </View>
      }
      
      
      
      
    </Pressable>
    {visableNotification && !isLoading &&
      <Notification status='error'  visable={visableNotification} title={title} message={message} onPress={() => setVisableNotification(false)} close={clossse} />
       
     }
    
    </KeyboardAvoidingView>
    
   </SafeAreaView>
   </ImageBackground>
  );
}
