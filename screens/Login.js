
import { Text, View, Image, Pressable, Keyboard, KeyboardAvoidingView, StatusBar, BackHandler, SafeAreaView, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react'
import {NativeBaseProvider} from 'native-base'
import styles from '../style/Login'
import AsyncStorage from '@react-native-async-storage/async-storage';
import tenantService from '../services/UserSevice';
import { useFonts } from 'expo-font';
import stylesColor from '../style/colorApp';
import PInput from '../components/input/input'
import PButton from '../components/button/button'
import MLoad from '../components/loading/miniLoad'
import Notification from '../components/notification/notification'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erroMessageEmail, setErroMessageEmail] = useState('')
  const [erroMessagePass, setErroMessagePass] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [visibleNotification, setVisibleNotification] = useState(false);
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)
  const [loaded] = useFonts({
    'MPLUS1p-Medium': require("../assets/fonts/MPLUS1p-Medium.ttf"),
    'MPLUS1p-Bold': require("../assets/fonts/MPLUS1p-Bold.ttf"),
    'MPLUS1p-Light': require("../assets/fonts/MPLUS1p-Light.ttf"),
    'MPLUS1p-Regular': require("../assets/fonts/MPLUS1p-Regular.ttf"),
    'MPLUS1p-Medium': require("../assets/fonts/MPLUS1p-Medium.ttf"),
    'Raleway-Bold': require("../assets/fonts/Raleway-Bold.ttf"),
    'MPLUS1p-ExtraBold': require("../assets/fonts/MPLUS1p-ExtraBold.ttf"),
     'Raleway-SemiBold': require("../assets/fonts/Raleway-SemiBold.ttf"),
    'Raleway-Light': require("../assets/fonts/Raleway-Light.ttf"),
    'Raleway-Regular': require("../assets/fonts/Raleway-Regular.ttf"),
    'Raleway-Medium': require("../assets/fonts/Raleway-Medium.ttf"),
    'Raleway-LightItalic': require("../assets/fonts/Raleway-LightItalic.ttf")
  
  });

  function showNotification(title, message) {
    setVisibleNotification(true)
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
            if (true) {
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
            showNotification("Ops!", "Erro interno - Contate o suporte: " + error.toString())
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
 if (!response.data.status) {
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

  function IsEmail(value) {
    if (!value) {
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

  function isPAss(value) {
    if (value === null || value === '') {
      return false
    }
    if (value.length < 6) {
      return false
    }
    return true
  }

  function Validate() {

    if (!IsEmail(email)) {
      setErroMessageEmail("Email inválido*")
      return false
    } else {
      setErroMessageEmail(null)
    }
    if (!isPAss(password)) {
      setErroMessagePass("Sua senha tem 6 ou mais caractere*")
      return false
    } else {
      setErroMessagePass(null)
    }
    return true

  }

  function closeNotification() {
    setVisibleNotification(false)
  }

  function SignUp() {
    navigation.navigate("SignUp")
  }

  function ForgotPassword() {
    navigation.navigate("ForgotPassword")
  }

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', () => { return true })
    AsyncStorage.getItem("TOKEN")
      .then((token => {
        if (token) {
          autoLogin(token)
        }
      }
      )).catch((setLoading(false)))
  }, [])

  if (!loaded) {
    return null
  }
  return (
    <NativeBaseProvider>
    <ImageBackground source={require("../assets/back.png")} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container} >
      <StatusBar  barStyle="light-content" backgroundColor={stylesColor.primaryColor} />
        <KeyboardAvoidingView style={styles.keyboardAvoiding} KeyboardVerticalOffset={50}>
          <Pressable style={styles.precontainer} onPress={() => Keyboard.dismiss()}>
            {!isLoading &&
              <><View style={styles.containerLogo}>
                <Image style={styles.logo} source={require("../assets/icon.png")} />
              </View>
                <View style={styles.form}>
                  <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
                  <PInput onChangeText={value => { setEmail(value), setErroMessageEmail(null); }} placeholder=" E-mail" keyboardType="email-address" size={hp('2.2%')} type='material-icons' name='alternate-email' />
                  <Text style={styles.errorMessage}>{erroMessagePass}</Text>
                  <PInput onChangeText={value => { setPassword(value), setErroMessagePass(null); }} placeholder="Senha" secureTextEntry={true} size={hp('2.2%')} type='material-community' name='form-textbox-password' />
                  <View style={styles.rowButtons}>
                    <PButton onPress={Login} title="Entrar" type='material-community' name='location-enter' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='Raleway-SemiBold' />
                    <PButton onPress={SignUp} title="Cadastre-se" type='ant-design' name='form' size={hp('1.9%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.secondaryColor} fontFamily='Raleway-SemiBold' />
                  </View>
                  <PButton onPress={() => ForgotPassword()} title="Esqueci minha senha" type='material-community' name='lock-question' size={hp('2.2%')} color={stylesColor.secondaryColor} colorTitle={stylesColor.secondaryColor} backgroundColor={stylesColor.tertiaryColor} fontFamily='Raleway-SemiBold' />
                </View></>
            }
            {isLoading && !visibleNotification &&
              <View style={styles.mLoad}>
                <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
              </View>
            }
          </Pressable>
          {visibleNotification && !isLoading &&
            <Notification status='error' visibles={visibleNotification} title={title} message={message} onPress={() => setVisibleNotification(false)} close={closeNotification} />
          }
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
    </NativeBaseProvider>
  );
}
