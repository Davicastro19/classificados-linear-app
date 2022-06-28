import { Text, View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import tenantService from '../services/TenantSevice';
import styles from '../style/ForgotPassword'
import stylesColor from '../style/colorApp';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PInput from '../components/input/input'
import PButton from '../components/button/button';
import Notification from '../components/notification/notification';
import MLoad from '../components/loading/miniLoad'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [erroMessageEmail, setErroMessageEmail] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState(null)
  const [message, setMessage] = useState(null)
  const [visableNotification, setVisableNotification] = useState(false);


  function closeNotification() {
    setVisableNotification(false)
  }

  function showNotification(title, message) {
    setVisableNotification(true)
    setTitle(title)
    setMessage(message)
  }

  function IsEmail() {
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);
    if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) && (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return true
    }
    return false
  }

  function sendCode() {
    setLoading(true)
    if (IsEmail()) {
      setLoading(true)
      let data = {
        email: email,
        type: "forgot"
      }
      tenantService.updatePassword(data)
        .then((response) => {
          if (response.data.status) {
            setLoading(false)
            setError('success')
            showNotification('Sucesso', response.data.message)

          } else {
            setError('error')
            setLoading(false)
            showNotification('Ops!', response.data.message)
          }
        })
        .catch((response) => {
          setLoading(false)
          //    showDialog(title, response, "SUCESSO")
        })
    } else {
      Vibration.vibrate()
      setErroMessageEmail("Email inválido*")
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.preContainer} >
      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={stylesColor.secondaryColor} />
      <ImageBackground source={require("../assets/backForgot.png")} resizeMode="cover" style={styles.image}>
        <Pressable style={styles.container} onPress={() => { Keyboard.dismiss(), setVisableNotification(false) }}>
          {!isLoading &&
            <><View style={styles.containerLogo}>
              <Image style={styles.logo} source={require("../assets/icon.png")} />
            </View>
              <View style={styles.form}>
                <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
                <PInput onChangeText={value => { setEmail(value), setErroMessageEmail(null); }} placeholder=" E-mail" keyboardType="email-address" size={hp('2.2%')} type='material-icons' name='alternate-email' />
                <View style={styles.rowButtons}>
                  <PButton onPress={sendCode} title="Enviar senha" type='material-community' name='lock-reset' size={hp('2.1%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor={stylesColor.primaryColor} fontFamily='MPLUS1p-Medium' />
                </View>
              </View></>
          }
          {isLoading && !visableNotification &&
            <View style={styles.mLoad}>
              <MLoad color={stylesColor.secondaryColor} borderColor={stylesColor.primaryColor} />
            </View>
          }
        </Pressable>
        {visableNotification && !isLoading &&
          <Notification visable={visableNotification} status={error} title={title} message={message} onPress={() => setVisableNotification(false)} close={closeNotification} />
        }
      </ImageBackground>
    </SafeAreaView>
  );
}
