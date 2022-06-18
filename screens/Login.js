import {  View, Image, Pressable, Keyboard, Vibration, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Icon, FormControl, WarningOutlineIcon, Box, Center, NativeBaseProvider,Stack } from "native-base";
import { Text, Input, Button, FAB } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import styles from '../style/Login'
import input from '../components/Input'
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import tenantService from '../services/TenantSevice';
import CustomDialog from '../components/CustomDialog';

export default function Login({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [erroMessageEmail, setErroMessageEmail] = useState(null)
  const [erroMessagePass, setErroMessagePass] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isLoadingToken, setLoadingToken] = useState(false)

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [message, setMessage] = useState(null)
  const [tipo, setTipo] = useState(null)

  function showDialog(titulo, message, tipo) {
    setVisibleDialog(true)
    setTitulo(titulo)
    setMessage(message)
    setTipo(tipo)
  }
  function hideDialog(status) {
    setVisibleDialog(status)
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
              setErroMessageEmail('')
              setErroMessagePass('')
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }]
              })
            }
            else {
              setLoading(false)
              showDialog("Muitas conexões", "Só é possível cadastrar o L-Safe em um Smartphone", "SUCESSO")

            }
          } else {
            setLoading(false)
            showDialog("Dados inválidos", response.data.message, "SUCESSO")
          }
        })
        .catch((error) => {
          if (error.toString().includes('ined is not an object')) {
            setLoading(false)
            showDialog("Ops!", "Erro interno", "SUCESSO")

          } else {
            ////// console.log('ww',error)
            setLoading(false)
            showDialog("Dados inválidos", "Clique em cadastrar para ter acesso. Use token DEMO (garrateste) caso não tenha recebido um token VIP", "SUCESSO")
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
  function SignUp() {
    navigation.navigate("SignUp")
  }
  function ForgotPassword() {
    navigation.navigate("ForgotPassword")
  }
  useEffect(() => {
    AsyncStorage.getItem("TOKEN")
      .then((token => {
        if (token) {
          autoLogin(token)
        }
      }
      )).catch((setLoading(false)))
  }, [])
  return (
    
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
     <StatusBar translucent backgroundColor="#1E4344" />
        
          <View style={styles.Logo}>
        <Image style={styles.imageLogin} source={require("../assets/icon.png")} />
        <Text style={styles.nameApp}>Linear   Imóveis</Text>
        <Text style={styles.title}> LOGIN</Text>
      </View>
      
      <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS == "ios" ? "padding" : "height"} KeyboardVerticalOffset={50}>
        
        <View style={styles.form}>
          {!isLoading && !visibleDialog &&
            <>
              <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
              <Input autoComplete={true} inputContainerStyle={input.inputIcon}  placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setEmail(value), setErroMessageEmail(null) }} placeholder=" E-mail" keyboardType="email-address" returnKeyType="done" leftIcon={{ size: 16, type: 'font-awesome', name: 'envelope', color: '#C89A5B' }} />
              <Text style={styles.errorMessage}>{erroMessagePass}</Text>
              <Input autoComplete={true} inputContainerStyle={input.inputIcon}  placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setPassword(value), setErroMessagePass(null) }} placeholder="Senha" secureTextEntry={true} returnKeyType="done" leftIcon={{ size: 16, type: 'font-awesome', name: 'key', color: '#C89A5B' }} />
              
              
            </>
          }
        </View>
        <View style={styles.viewMultiButton}>
          {isLoading &&
            <FAB loading visible={true} icon={{ name: 'add' }} color='#C89A5B' borderColor='rgba(42, 42, 42,1)' size="small" />
          }
          {!isLoading && !visibleDialog &&
            <>
              
              <Button  onPress={() => Login()} title="   Entrar" icon={{ name: 'arrow-right', type: 'font-awesome', size: 19, color: '#1E4344', }} iconRight iconContainerStyle={{ marginLeft: 10 }}  buttonStyle={{ backgroundColor: '#C89A5B', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '50%',  marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#1E4344' }} />
              <Button  onPress={() => SignUp()} title=" Cadastre-se" icon={{ name: 'user', type: 'font-awesome', size: 19, color: '#C89A5B' }} iconRight iconContainerStyle={{ marginLeft: 10 }}  buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '55%', marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#C89A5B' }} />
            </>
            
          }

        </View>
        {!isLoading &&
          <Button  onPress={() => ForgotPassword()} title="Esqueci minha senha"   buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#FFC77A', borderWidth: 0, borderRadius: 6, }} containerStyle={{ marginTop:'0%', width: '55%',  marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#C89A5B',fontSize:12 }} />
          
          }
         
        
      </KeyboardAvoidingView>
      {visibleDialog &&
          <CustomDialog titulo={titulo} message={message} tipo={tipo} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
        }
    </Pressable>
  );
}

