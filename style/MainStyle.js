import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    keyboardAvoiding:{
        width:'80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form:{
        width:'100%'

    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{ color: 'white', fontFamily: "MPLUS1p-Medium" },
    description:{ color: 'white',fontFamily: "MPLUS1p-Light" },
    viewMultiButton:{
        width:"80%",
        flexDirection:"row",
        paddingVertical:15,
        justifyContent:"space-evenly"
    },
    imageLogin:{
        width: 200,
        height: 200,
        borderRadius:100
    
    },
    image:{
        width: 100,
        height: 100,
        borderRadius:100
    
    },
    inputList:{
        borderColor:'rgba(106,235, 16, 1)',
        borderWidth:0.2,
        borderRadius:20,
        fontSize:15,
        paddingLeft: 15,
        paddingBottom:5,
        width:"80%",
        color:"rgb(150, 150, 150 )",
        
    },
    input:{
        fontSize:15,
        color:"rgb(150, 150, 150 )",
        
    },
    containerInput:{
        fontSize:15,
        color:"rgb(80, 80, 80 )",
        borderWidth:1,
        borderColor:"green",
        borderRadius:30,
        paddingLeft: 20,
        
    },
    errorMessage:{
        fontSize:9,
        color:"red",
        fontWeight:"bold",
        paddingLeft:30,
    },
    errorMessageTerm:{
        fontSize:9,
        color:"red",
        fontWeight:"bold",
        paddingLeft:50,
    },
    termsUse:{
        backgroundColor: 'transparent', 
        borderColor:'transparent', 
        borderRadius:20,
        borderWidth:0.2
    },
  textPrimaryOl: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondaryOl: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  dialog:{
    justifyContent:"space-evenly",
      alignItems: 'center',
	  backgroundColor:'#1E4344',
	  borderColor:'#C89A5B',
      height:wp('50%'),
      borderRadius:10
},
  dialogTitle:{
	  fontWeight:"bold",
      color:"#C89A5B",
      marginTop:"5%"
  },
  pagraph:{
	  fontWeight:"bold",
	  color:'white',
      fontSize:13
	 
  },
  dialogTitleE:{
	  fontWeight:"bold",
      color:"red"
  },
  paperButtonText:{
	  color:'rgba(168, 168, 166, 1)',
  },
  paperButton:{
	  color:'rgba(168, 168, 166, 1)',
	  borderColor:'black'
  }
})
export default styles