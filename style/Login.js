import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from '../style/colorApp';

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
    input:{
        fontSize:15,
        color:"rgb(90, 90, 90 )",
        
    },
//    containerInput:{
//        fontSize:15,
//        color:"rgb(80, 80, 80 )",
//        borderWidth:1,
//        borderColor:"green",
//        borderRadius:30,
//        paddingLeft: 20,
//        
//    },
    errorMessage:{
        fontSize:hp('1.5%'),
        color:"red",
        paddingLeft:15,
        fontFamily:'Raleway-SemiBold'
    },
    mLoad:{
        marginTop:hp('50%')
    }
//    errorMessageTerm:{
//        fontSize:9,
//        color:"red",
//        fontWeight:"bold",
//        paddingLeft:50,
//    },
//    termsUse:{
//        backgroundColor: 'transparent', 
//        borderColor:'transparent', 
//        borderRadius:20,
//        borderWidth:0.2
//    },
//  textPrimaryOl: {
//    marginVertical: 20,
//    textAlign: 'center',
//    fontSize: 20,
//  },
//  textSecondaryOl: {
//    marginBottom: 10,
//    textAlign: 'center',
//    fontSize: 17,
//  },
//  dialog:{
//	  backgroundColor:'rgba(6,6, 6, 1)',
//	  borderColor:'rgba(168, 168, 166, 1)',
//	  borderWidth:0.3,
//	  borderRadius:30
//},
//  dialogTitle:{
//	  
//	  fontWeight:"bold",
//      color:"rgba(106,235, 16, 1)"
//  },
//  pagraph:{
//	  fontWeight:"bold",
//	  color:'white'
//	 
//  },
//  dialogTitleE:{
//	  fontWeight:"bold",
//      color:"red"
//  },
//  paperButtonText:{
//	  color:'rgba(168, 168, 166, 1)',
//	  backgroundColor:"black",
//  },
//  paperButton:{
//	  color:'rgba(168, 168, 166, 1)',
//	  borderColor:'black'
//  }
})
export default styles