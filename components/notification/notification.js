import * as React from 'react';
import notification from './style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, Actionsheet , Alert, Box, IconButton, CloseIcon, HStack, VStack, Text, Center, NativeBaseProvider, Collapse } from "native-base";

const Notification = (props) => {
  return (
    <NativeBaseProvider>
            <Center>
      <Actionsheet   isOpen={props.visable}   onTouchMove={() => props.close()}  disableOverlay>
      <Actionsheet.Content background={props.status == 'error' ? 'red.200' : 'green.200'}>
      <Actionsheet.Item    background={props.status == 'error' ? 'red.200' : 'green.200'}>
      <View style={{height:hp('10%'), width:wp('90%')}}>
      <Alert maxW="500"  status={props.status == 'error' ? 'error' : 'success'}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" style={{fontFamily:'Raleway-SemiBold'}}  _dark={{
                  color: "coolGray.800"
                }}>
                  {props.title}
                </Text>
              </HStack>
              
            </HStack>
            <Text fontSize="sm" style={{fontFamily:'Raleway-Medium'}}  _dark={{
                  color: "coolGray.800"
                }}>
                  {props.message}
                </Text>
          </VStack>
        </Alert> 
      </View>

          </Actionsheet.Item>
          </Actionsheet.Content>
      </Actionsheet>
    </Center>
        </NativeBaseProvider>
   
  )
}

export default Notification