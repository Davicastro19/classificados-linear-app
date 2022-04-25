import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Provider,  Paragraph, Dialog, Portal,IconButton,Colors  } from 'react-native-paper';
import styles from '../style/MainStyle'
const Notification = (props) => {
    return (
        <Provider>
        <Portal>
        <Dialog style={styles.dialog} visible={props.visible} onDismiss={() => props.onClose(false)}>
          <Paragraph style={styles.pagraph}>{props.message}.</Paragraph>
         <Dialog.Actions>
         <Button title="   " onPress={() => props.onClose(false)} icon={{ name: 'check', type: 'font-awesome', size: 25, color: '#EDE17B' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#122829' }} containerStyle={{ width: '100%' }}  />
          
         </Dialog.Actions>
        </Dialog>
        

       </Portal>
      </Provider>
    )
}

export default Notification