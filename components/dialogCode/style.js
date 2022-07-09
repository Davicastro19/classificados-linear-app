import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../../style/colorApp';

const dialogCode = StyleSheet.create({
    title:{ color: 'white', fontFamily: "MPLUS1p-Medium" },
    description:{ color: 'white',fontFamily: "MPLUS1p-Light" },
    errorMessage:{
        width:wp('120%'),
        paddingLeft:hp('10%'),
        fontFamily:'MPLUS1p-Medium',
        fontSize:hp('1.5%'),
        color:stylesColor.primaryColor20,
        paddingRight:hp('33%'),
},
input:{ color:'white'}

}
)
export default dialogCode