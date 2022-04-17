import * as React from 'react';
import { View, Text } from 'react-native';
import { Provider, Paragraph, Dialog, Portal,Colors  } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import styles from '../style/MainStyle'
import input from '../components/Input'
const CustomDialogCode = (props) => {
    return (
        <Provider>
        <Portal>
        <Dialog style={styles.dialog} visible={props.visible} onDismiss={() => props.onClose(false)}>
        <Dialog.Title style={styles.dialogTitle}>Verificação de usuario</Dialog.Title>
		  
          <Dialog.Content>
            <Paragraph style={styles.pagraph}>Insira o código enviado no seu email.</Paragraph>
            <Input autoComplete={true} onChangeText={value => { props.onChangeText(value)} } inputContainerStyle={input.inputIcon} placeholderTextColor='#C89A5B' style={input.input} placeholder="Código" keyboardType="email-address" returnKeyType="done" leftIcon={{ size: 16, type: 'font-awesome', name: 'unlock-alt', color: '#C89A5B' }} />
              
          </Dialog.Content>
          <Dialog.Actions>
          <Button  onPress={() => props.onClose()}  title=" " icon={{ name: 'close', type: 'font-awesome', size: 19, color: '#1E4344' }} iconLeft iconContainerStyle={{ marginLeft: 10 }}  buttonStyle={{ backgroundColor: '#C89A5B', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '22%',   }} titleStyle={{ color: '#1E4344' }} />
        
          <Button  onPress={() => props.FullSignUp()} title=" " icon={{ name: 'check', type: 'font-awesome', size: 19, color: '#1E4344' }} iconLeft iconContainerStyle={{ marginLeft: 10 }}  buttonStyle={{ backgroundColor: '#C89A5B', borderColor: '#FFC77A', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '22%',  marginHorizontal: 50, marginVertical: 10, }} titleStyle={{ color: '#1E4344' }} />
          
          </Dialog.Actions>
        </Dialog>
        

       </Portal>
      </Provider>
    )
}

export default CustomDialogCode