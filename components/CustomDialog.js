import * as React from 'react';
import { View, Text } from 'react-native';
import { Provider, Button as PaperButton, Paragraph, Dialog, Portal,IconButton,Colors  } from 'react-native-paper';
import styles from '../style/MainStyle'
const CustomDialog = (props) => {
    return (
        <Provider>
        <Portal>
        <Dialog style={styles.dialog} visible={props.visible} onDismiss={() => props.onClose(false)}>
          {props.titulo != "Sucesso" &&
          <Dialog.Title style={styles.dialogTitleE}>{props.titulo}</Dialog.Title>
		  }
		  {props.titulo == "Sucesso" &&
		  <Dialog.Title style={styles.dialogTitle}>{props.titulo}</Dialog.Title>
		  }
          <Dialog.Content>
            <Paragraph style={styles.pagraph}>{props.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
		  <IconButton
    icon="check"
    color={'#fdf5e8'}
    size={25}
    onPress={() => props.onClose(false)}
  />
         </Dialog.Actions>
        </Dialog>
        

       </Portal>
      </Provider>
    )
}

export default CustomDialog