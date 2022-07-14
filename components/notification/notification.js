import * as React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, Actionsheet , Alert, HStack, VStack, Text, Center } from "native-base";

const Notification = (props) => {
  let color = ''
  if (props.status == 'error'){
    color = 'red.200'
  }else if (props.status == 'success'){
    color = 'green.200'
  }else{
    color = 'blue.300'
  }
  return (
            <Center>
      <Actionsheet   isOpen={props.visable}   onTouchMove={() => props.close()}  disableOverlay>
      <Actionsheet.Content background={color}>
      <Actionsheet.Item    background={color}>
      <View style={{height:hp('10%'), width:wp('90%')}}>
      <Alert maxW="500"  status={props.status} backgroundColor={color}>
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
   
  )
}

export default Notification