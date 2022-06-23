import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../style/MainStyle'
const Notification = (props) => {
    return (
      <Alert maxW="400" variant="top-accent" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                  Please try again later!
                </Text>
              </HStack>
              <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" />} _icon={{
              color: "coolGray.600"
            }} onPress={() => setShow(false)} />
            </HStack>
            <Box pl="6" _dark={{
            _text: {
              color: "coolGray.600"
            }
          }}>
              Your coupon could not be processed at this time.
            </Box>
          </VStack>
        </Alert>
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