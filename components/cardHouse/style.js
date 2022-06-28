import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor  from '../../style/colorApp';

const cardHouse = StyleSheet.create({
    containerItem:{ flexDirection: "row", marginLeft:hp('1.3%'), paddingTop: wp('2%')},
    fontItem:{marginTop: hp('0%'),color:'black', marginLeft:hp('0.5%'), fontFamily: "Raleway-SemiBold" },
    fontNumber:{color:'black', marginLeft:hp('0.5%'), fontFamily: "MPLUS1p-Regular" },
    fontNumberPrice:{color:'black', marginLeft:hp('0.5%'), fontFamily: "MPLUS1p-ExtraBold" },
    fontPItem: {color:'black', marginLeft:hp('0.5%'), fontFamily: "Raleway-Bold",fontSize:hp('1.7%') },
    fontText:{color:'black', marginLeft:hp('0.5%'), fontFamily: "Raleway-Regular" },
    fontTitle:{color:'black', marginLeft:hp('0.5%'), fontFamily: "Raleway-Bold",fontSize:hp('2%') },
     fontFooter:{ fontFamily: "Raleway-LightItalic" },
    containerRow:{ flexDirection: "row" },
    bottomNavigationView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: stylesColor.secondaryColor,
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
      },
})
export default cardHouse