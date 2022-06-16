import {StyleSheet} from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E4344',
        alignItems: 'center',
        justifyContent:"space-evenly"
    },
    titleProfile:{
        
        fontSize:15,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#C89A5B'
    
    },
    Logo:{
        height:hp('20%'),
        marginTop:'5%',
        marginBottom:'5%',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    imageSignUp:{
        width: hp('10%'),
        height: wp('20%'),
    
    },
    keyboardAvoiding:{
        width:wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    form:{
        width:wp('80%'),

    },
    
    title:{
        
        fontSize:15,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#C89A5B'
    
    },
    nameApp:{
        marginBottom:'3%',
        letterSpacing:6,
        fontSize:9,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#C89A5B'
    
    },
    viewMultiButton:{
        width:wp("80%"),
        flexDirection:"row",
        paddingVertical:15,
        justifyContent:"space-evenly"
    
    },
    

    input:{
        fontSize:15,
        color:"rgb(90, 90, 90 )",
        
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
        paddingLeft:15,
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
        borderRadius:6,
        borderWidth:0.1,
        backgroundColor:'#C89A5B'
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
	  backgroundColor:'rgba(6,6, 6, 1)',
	  borderColor:'rgba(168, 168, 166, 1)',
	  borderWidth:0.3,
	  borderRadius:30
},
  dialogTitle:{
	  
	  fontWeight:"bold",
      color:"rgba(106,235, 16, 1)"
  },
  pagraph:{
	  color:'white'
	 
  },
  dialogTitleE:{
	  fontWeight:"bold",
      color:"red"
  },
  paperButtonText:{
	  color:'rgba(168, 168, 166, 1)',
	  backgroundColor:"black",
  },
  paperButton:{
	  color:'rgba(168, 168, 166, 1)',
	  borderColor:'black'
  }
})
export default styles