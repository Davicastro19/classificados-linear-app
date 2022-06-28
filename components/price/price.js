import React, { memo } from 'react';
import { Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View } from 'react-native';
import { VStack, HStack, Center, NativeBaseProvider, Image } from "native-base";
import price from './style'
import stylesColor from '../../style/colorApp';
import PButton from '../button/button';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
const CardHouses = (props) => {
    return (

        <View style={price.containerItem}>
            <Text style={{marginTop:props.marginTop,fontSize:hp(props.fontSizeTo), marginLeft:hp('1%'), fontFamily: "MPLUS1p-Bold" }} >
                R$</Text>
                <Text style={{fontSize:hp(props.fontSize), fontFamily: "MPLUS1p-Regular" }} >
                {props.price}</Text>
            
        </View>


    )
}

export default memo(CardHouses)