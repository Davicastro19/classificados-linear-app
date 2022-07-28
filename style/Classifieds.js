
import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesColor from './colorApp';

const styles = StyleSheet.create({
    viewFilter:{ marginLeft: hp('0%'), width: wp('93%'), height: '6%' },
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
        fontFamily:'MPLUS1p-Medium'
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
//import { StyleSheet } from 'react-native'
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//
//const styles = StyleSheet.create({
//
//    container: {
//        flex: 1,
//        width: wp(100),
//        backgroundColor: '#1E4344',
//        paddingBottom: 2
//    },
//    termsUse:{
//        backgroundColor: 'transparent', 
//        borderColor:'transparent', 
//        borderRadius:6,
//        borderWidth:0.1,
//        backgroundColor:'#C89A5B'
//    },
//    inputList:{
//        borderColor:'rgba(106,235, 16, 1)',
//	    width:'95%',
//        height:'90%',
//        borderWidth:1,
//        borderRadius:20,
//        fontSize:15,
//        paddingLeft: 15,
//        paddingRight: 25,
//        paddingBottom:5,
//        color:"rgb(90, 90, 90 )",
//        
//    },
//    viewFiMultiButton: {
//        width: '100%',
//        flexDirection: "row",
//        alignItems: 'center',
//        justifyContent: "space-evenly",
//        paddingBottom:'20%',
//    },
//    viewFiMultiButtonSelect: {
//        width: '100%',
//        alignItems: 'center',
//        justifyContent: "space-evenly",
//        paddingBottom:'20%',
//    },
//    viewMultiButton: {
//        width: '100%',
//        height: '100%',
//        alignItems: 'center',
//        justifyContent: "center",
//    },
//    viewFilterMultiButton: {
//        width: '100%',
//        height: '8%',
//        flexDirection: "row",
//        alignItems: 'center',
//        justifyContent: "space-evenly"
//    },
//    contentStrategy: {
//        borderColor: 'rgba(106,255, 16, 1)',
//        borderBottomWidth: 5,
//        borderTopWidth: 5,
//        borderLeftWidth: 0.5,
//        borderRightWidth: 0.5,
//        borderRightWidth: 0.5,
//        borderRadius: 20,
//        color: "rgb(90, 90, 90 )"
//        
//
//    },
//    viewOption: {
//        alignItems: 'center',
//        justifyContent: 'center',
//        flexDirection: "row",
//        justifyContent: "space-evenly"
//    },
//    dropdown1RowTxtStyle:{
//        color: '#FFC77A', 
//        textAlign: 'left'
//    },
//    dropdown1RowStyle: {
//        backgroundColor: '#122829', 
//        borderColor: '#FFC77A',
//        borderWidth:1,
//        borderRadius:10
//    },
//    dropdown1BtnTxtStyle: {
//        color: '#FFC77A', 
//        textAlign: 'left'},
//  dropdown1DropdownStyle: {
//      backgroundColor: '#122829'},
//      labelWhite:{
//        color:'#FFC77A'
//    }
//})
//export default styles