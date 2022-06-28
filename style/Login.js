import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    preContainer:{
        flex:1
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width:wp('100%')
      },
      keyboardAvoiding:{
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    containerLogo:{
        height:hp('20%'),
        marginTop:hp('10%'),
        marginBottom:hp('0%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: wp('25%'),
        height: hp('15%'),
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
    errorMessage:{
        fontSize:hp('1.5%'),
        color:"red",
        width:wp('100%'),
        paddingLeft:hp('10%'),
        fontFamily:'Raleway-Medium'
    },
    mLoad:{
        marginTop:hp('50%')
    }
})
export default styles