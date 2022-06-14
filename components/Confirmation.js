import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Provider,  Paragraph, Dialog, Portal,IconButton,Colors  } from 'react-native-paper';
import styles from '../style/MainStyle'
const Notification = (props) => {
    return (
        <Provider>
        <Portal>
        <Dialog style={styles.dialog} visible={props.visible} onDismiss={() => props.onClose(false)}>
          <Paragraph style={styles.pagraph}>{props.message}</Paragraph>
         <Dialog.Actions>
         <View style={{justifyContent: "space-evenly", flexDirection: 'row', width:wp('40%')}}>
         <Button title="   " onPress={() => props.confirmation()} icon={{ name: 'check', type: 'font-awesome', size: 25, color: '#EDE17B' }} iconRight iconContainerStyle={{ marginLeft: 0 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#EDE17B', borderWidth:0.2 }} containerStyle={{ width: '60%', marginRight: 25, }}  />
         <Button title="   " onPress={() => props.cancel()} icon={{ name: 'close', type: 'font-awesome', size: 25, color: '#EDE17B' }} iconRight iconContainerStyle={{ marginLeft: 0 }} buttonStyle={{ backgroundColor: '#1E4344', borderColor: '#EDE17B', borderWidth:0.2 }} containerStyle={{ width: '60%',marginLeft: 25, }}  />
         </View>
         </Dialog.Actions>
        </Dialog>
        

       </Portal>
      </Provider>
    )
}

export default Notification