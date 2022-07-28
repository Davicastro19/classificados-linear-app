
import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    viewFilter:{ marginLeft: hp('0%'), width: wp('93%'), height: '6%'},
    preContainer:{
        flex:1,
        backgroundColor:'#f3f3f3',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
      keyboardAvoiding:{
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    containerLogo:{
        height:hp('24%'),
        marginTop:hp('10%'),
        marginBottom:hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: wp('30%'),
        height: hp('20%'),
    },
    form:{
        width:wp('70%'),
        alignItems:"center"
        
    },
    rowButtons:{
        width:wp("85%"),
        flexDirection:"row",
        paddingBottom:hp('2%'),
        justifyContent:"space-evenly"
    
    },
    input:{
        fontSize:15,
        color:"rgb(90, 90, 90 )",
        
    },
    errorMessage:{
        fontSize:hp('1.5%'),
        color:"red",
        paddingLeft:15,
        fontFamily:'MPLUS1p-Medium'
    },
    mLoad:{
        marginTop:hp('50%')
    },
    scroll:{
        width:wp('100%'),
        flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    }
})
export default styles