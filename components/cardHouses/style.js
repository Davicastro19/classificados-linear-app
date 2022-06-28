import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor  from '../../style/colorApp';

const cardHouses = StyleSheet.create({
    containerItem:{ flexDirection: "row", marginLeft:hp('1.3%'), paddingTop: wp('2%')},
    fontItem:{ marginLeft:hp('1%'), fontFamily: "Raleway-SemiBold" },
    fontNumber:{color:'black', marginLeft:hp('0.5%'), fontFamily: "MPLUS1p-Medium" },
    fontFooter:{ fontFamily: "Raleway-LightItalic" },
    containerRow:{ flexDirection: "row" }
})
export default cardHouses