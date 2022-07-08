import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../../style/colorApp';

const select = StyleSheet.create({
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
export default select