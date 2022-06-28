import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../../style/colorApp';
import styles from '../../style/Home';

const dialogCode = StyleSheet.create({
    buttonStyle:{ width: wp('70%'), height: hp('5%'), backgroundColor: stylesColor.primaryColor, borderRadius: 6, borderWidth: 1.5, borderColor: stylesColor.tertiaryColor, alignItems: 'center', justifyContent: "center" },
    bottomNavigationView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: stylesColor.secondaryColor,
        width: wp('100%'),
        height: hp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
      },
    title:{ marginBottom:hp('1%'), color: 'white', fontFamily: "Raleway-Medium", fontSize: hp('2%') },
    description:{ color: 'white',fontFamily: "Raleway-Light" },
    dropdown1RowTxtStyle:{
    color: stylesColor.tertiaryColor, 
    textAlign: 'center',
    fontSize:hp('2%'),
    fontFamily: "Raleway-Medium"
    
},
dropdown1RowStyle: {
    height:wp('9%'),
    backgroundColor: stylesColor.primaryColor, 
    borderColor: stylesColor.tertiaryColor,
    borderWidth:1,
    
    borderRadius:6
},
dropdown1BtnTxtStyle: {
    color: stylesColor.tertiaryColor, 
    textAlign: 'left',
    fontSize:hp('2%'),
    fontFamily: "Raleway-Medium"
},
    
dropdown1DropdownStyle: {
    borderRadius:6,
  backgroundColor: stylesColor.tertiaryColor},
  
}
)
export default dialogCode