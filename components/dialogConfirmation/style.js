import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../../style/colorApp';
const dialogConfirmation = StyleSheet.create({
    input:{
        fontSize:15,
        color:'black',
        borderColor:stylesColor.primaryColor,
        borderRadius:6,
        fontFamily:'Raleway-Medium',
        marginLeft:hp('1%'),
        
        
    },
    inputIcon:{
        height:hp('5%'),
        
        color:"#C89A58",
        borderWidth:1,
        borderColor:stylesColor.primaryColor,
        paddingLeft: 5,
        borderRadius:6,
       
        
    },
    //textInput:{
    //    fontSize:15,
    //    color:"red",
    //    
    //}
})
export default dialogConfirmation