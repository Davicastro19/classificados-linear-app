import * as React from 'react';
import notification from './style'
import { Alert, Box, IconButton, CloseIcon, HStack, VStack, Text, Center, NativeBaseProvider, Collapse } from "native-base";

const Notification = (props) => {
  return (
    <NativeBaseProvider>
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
              <IconButton variant="unstyled" _focus={{
                borderWidth: 0
              }} icon={<CloseIcon size="3" />} _icon={{
                color: "coolGray.600"
              }}
                {...props} />
            </HStack>
            <Text fontSize="sm" style={{fontFamily:'Raleway-Medium'}}  _dark={{
                  color: "coolGray.800"
                }}>
                  {props.message}
                </Text>
          </VStack>
        </Alert>
    </NativeBaseProvider>
    //<Alert maxW="400" variant="top-accent" status="error">
    //  <VStack space={1} flexShrink={1} w="100%">
    //    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
    //      <HStack flexShrink={1} space={2} alignItems="center">
    //        <Alert.Icon />
    //        <Text fontSize="md" fontWeight="medium" _dark={{
    //        color: "coolGray.800"
    //      }}>
    //          Please try again later!
    //        </Text>
    //      </HStack>
    //      <IconButton variant="unstyled" _focus={{
    //      borderWidth: 0
    //    }} icon={<CloseIcon size="3" />} _icon={{
    //      color: "coolGray.600"
    //    }} onPress={() => setShow(false)} />
    //    </HStack>
    //    <Box pl="6" _dark={{
    //    _text: {
    //      color: "coolGray.600"
    //    }
    //  }}>
    //      Your coupon could not be processed at this time.
    //    </Box>
    //  </VStack>
    //</Alert>
  )
}

export default Notification