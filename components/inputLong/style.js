import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../../style/colorApp';
const input = StyleSheet.create({
    input:{
        fontSize:15,
        color:'black',
        borderColor:stylesColor.primaryColor,
        borderRadius:6,
        fontFamily:'Raleway-Medium',
        marginLeft:hp('0.0%')
        
        
        
    },
    inputIcon:{
        color:"#C89A58",
        borderWidth:1,
        borderColor:stylesColor.primaryColor,
        paddingLeft: hp('0.5%'),
        borderRadius:6,
        height:hp('18%'),
        width: wp('90%')
        
    },
  
})
export default input