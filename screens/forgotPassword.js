import {  View, Image, Pressable,Keyboard,Vibration,KeyboardAvoidingView } from 'react-native';
import { FAB,Text, Input, Button, CheckBox } from 'react-native-elements';
import React, {useState} from 'react'
import tenantService from '../services/TenantSevice';
import styles from '../style/SignUp'
import input from '../components/Input'
import CustomDialog from '../components/CustomDialog';
import CustomDialogCode from '../components/CustomDialogCode';
import * as Device from 'expo-device';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ForgotPassword({navigation}) {
  const  [email,setEmail] = useState(null)
  const  [erroMessageEmail,setErroMessageEmail] = useState(null)
  const  [isLoadings, setLoading] = useState(false)
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [titulo, setTitulo] = useState(null)
  const [message, setMessage] = useState(null)
  const [tipo, setTipo] = useState(null)
  


function showDialog (titulo, message, tipo) {
    setVisibleDialog(true)
    setTitulo(titulo)
    setMessage(message)
    setTipo(tipo)
  }
  
function hideDialog(status) {
    setVisibleDialog(status)
    if (titulo === "Sucesso"){
    navigation.navigate("Login")
    }
  }

function IsEmail() {
  const usuario = email.substring(0, email.indexOf("@"));
  const dominio = email.substring(email.indexOf("@")+ 1, email.length);
  if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) &&(dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true
  }
  return false
  }


function sendCode(){
  setLoading(true)
  if (IsEmail()){

    setLoading(true)
      let data = {
        email: email,
        type:"forgot"
      }
    tenantService.updatePassword(data)
      .then((response) => {
       if (response.data.status){
        setLoading(false)
        const titulo = (response.data.status) ? "Sucesso" : "Erro"
        showDialog(titulo, response.data.message, "SUCESSO") 
        
       }else{
        setLoading(false)
		    const titulo = (response.data.status) ? "Sucesso" : "Erro"
        showDialog(titulo, response.data.message, "SUCESSO")         
      }})
      .catch((response) => {
        setLoading(false)
    //    showDialog(titulo, response, "SUCESSO")
      })
}else{
  setLoading(false)
}
}
  
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS == "ios" ? "padding" : "height"} KeyboardVerticalOffset={50}>
      {!isLoadings && 
      <><View style={{
                      height: hp('20%'),
                      marginTop: '0%',
                      marginBottom: '5%',
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                      <Image style={styles.imageSignUp} source={require("../assets/icon.png")} />
                      <Text style={styles.nameApp}>Linear   Imóveis</Text>
                      <Text style={styles.title}>Uma nova senha será enviada para seu e-mail.</Text>
                  </View><View style={{ width: wp('80%'), marginBottom: wp('40%') }}>
                          <Text style={styles.errorMessage}>{erroMessageEmail}</Text>
                          <Input autoComplete={true} inputContainerStyle={input.inputIcon} placeholderTextColor='#C89A5B' style={input.input} onChangeText={value => { setEmail(value), setErroMessageEmail(null); } } placeholder=" E-mail" keyboardType="email-address" returnKeyType="done" leftIcon={{ size: 16, type: 'font-awesome', name: 'envelope', color: '#C89A5B' }} />
                          <Button onPress={() => sendCode()} title="Nova Senha" iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#C89A5B', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '80%', marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#1E4344' }} />
                      </View></>
      }
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
   
  { visibleDialog && !isLoadings &&
    <CustomDialog titulo={titulo} message={message} tipo={tipo} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
  }
    </KeyboardAvoidingView>
    </Pressable>
  );
}

