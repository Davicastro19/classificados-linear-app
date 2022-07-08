import * as React from 'react';
import notification from './style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Actionsheet, Alert, Box, IconButton, CloseIcon, HStack, VStack, Text, Center, NativeBaseProvider, Collapse } from "native-base";
import PButton from '../button/button';
import stylesColor from '../../style/colorApp'

const DialogConfirmation = (props) => {
  return (
    <Center>
      <Actionsheet isOpen={true} onTouchMove={() => props.cancel()} disableOverlay>
        <Actionsheet.Content background="coolGray.800">
          <Actionsheet.Item background="coolGray.800">
            <View style={{ height: hp('15%'), width: wp('90%') }}>
              <Alert maxW="500" status={props.status} backgroundColor="coolGray.800">
                <VStack space={1} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={1} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="md" style={{ color: 'white', fontFamily: 'Raleway-SemiBold' }} >
                        {props.message}
                      </Text>
                    </HStack>
                  <View style={{ marginTop:hp('2%'), justifyContent: "space-evenly", flexDirection: "row"}}>
                  <PButton onPress={() => props.confirmation()} title="Sim" type='material-community' name='check' size={hp('2.5%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor='#24b95b' fontFamily='Raleway-SemiBold' />
                  <PButton onPress={() => props.cancel()} title="Não" type='material-community' name='close' size={hp('2.5%')} color={stylesColor.tertiaryColor} colorTitle={stylesColor.tertiaryColor} backgroundColor='#f23d3d' fontFamily='Raleway-SemiBold' />
                  </View>
                </VStack>
              </Alert>
            </View>

          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>

  )
}

export default DialogConfirmation