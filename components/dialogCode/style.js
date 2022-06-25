import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../../style/colorApp';

const dialogCode = StyleSheet.create({
    containerItem:{ flexDirection: "row", marginLeft:hp('1.3%'), paddingTop: wp('2%')},
    fontItem:{ fontFamily: "Raleway-SemiBold" },
    fontFooter:{ fontFamily: "Raleway-LightItalic" },
    containerRow:{ flexDirection: "row" },
    input:{
        fontSize:15,
        color:'white',
        borderColor:stylesColor.primaryColor,
        borderRadius:6,
        fontFamily:'Raleway-Medium',
        marginLeft:hp('1%'),
        
        
    },
    inputIcon:{
        height:hp('5%'),
        
        color:"#C89A58",
        borderWidth:1,
        borderColor:stylesColor.tertiaryColor,
        paddingLeft: 5,
        borderRadius:6,
       
        
    },
    errorMessage:{
        fontSize:hp('1.5%'),
        color:stylesColor.primaryColor20,
        paddingRight:hp('33%'),
        fontFamily:'Raleway-SemiBold'
}
}
)
export default dialogCode