import React, { memo } from 'react';
import { Text, FAB, Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Skeleton, VStack, HStack, Center, NativeBaseProvider, Image } from "native-base";
import styles from '../style/MainStyle'
const CustomCard = (props) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3" my={2}>
                <Center w="100%">
                    <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <VStack flex="10" space="0">
                            <Skeleton h="0" isLoaded={true}>
                                <Image alt={'s'} h="40" source={{
                                    uri: props.validateImage()
                                }} />
                            </Skeleton>
                        </VStack>
                        <VStack flex="3" space="4">
                            <Skeleton.Text lines={1} px="1" isLoaded={true}>
                            <FontAwesome name="bed" color='#000' size={15} /><Text px="4" fontSize={"md"} lineHeight={"20px"}>
                                    {props.item.bed}
                                </Text>
                            </Skeleton.Text>

                        </VStack>
                    </HStack>
                </Center>
            </Center>
        </NativeBaseProvider>
        //<Card style={{ justifyContent: "space-evenly", borderWidth: 1.5, backgroundColor: '#fdf5e8', margin: 5, borderColor: '#152F30', borderRadius: 6 }}>
        //     <Card.Cover style={{ width:wp('60%'),height: hp('30%'), borderRadius: 6, borderWidth: 3, borderColor: '#fdf5e8' }} source={{ uri: props.validateImage()}} />
        //    <Card.Content >
        //        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{props.item.publicPlace} - {props.item.district}</Text>
        //        <View>
        //        <FontAwesome name="bed" color='#000' size={15} /> <Text>{props.item.bed}  </Text>    
        //        <FontAwesome5 name="shower" color='#000' size={15} />       <Text>{props.item.shower}</Text>      
        //        <FontAwesome5 name="car" color='#000' size={15} />          <Text>{props.item.car}   </Text>  
        //        <FontAwesome name="handshake-o" color='#000' size={15} />   <Text>{props.item.type}  </Text>    
        //        <Text style={{ fontWeight: 'bold' }}>R${props.item.price}</Text></View>
        //    </Card.Content>
        //    <Card.Actions>
        //        <Button title=" Ver mais" onPress={() => props.selectHouseById()} icon={{ name: 'info', type: 'font-awesome', size: 15, color: '#1E4344' }} iconRight iconContainerStyle={{ marginLeft: 10 }} buttonStyle={{ height: hp('5%'), backgroundColor: '#FFF8EE', borderColor: '#295E60', borderWidth: 1, borderRadius: 6, }} containerStyle={{ width: '30%' }} titleStyle={{ fontSize: 13, color: '#1E4344' }} />
        //        <Text style={{ fontSize: 10, marginLeft: wp('50%'), marginTop:hp('3%') }}>   {props.item.creationDate.split(' ')[0]}  </Text>
        //        </Card.Actions>
        //</Card>
    )//
}

export default memo(CustomCard)