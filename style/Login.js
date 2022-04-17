import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E4344',
        alignItems: 'center'
    },
    Logo:{
        height:'24%',
        marginTop:'15%',
        marginBottom:'5%',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    imageLogin:{
        width: 150,
        height: 150,
    
    },
    keyboardAvoiding:{
        width:'80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form:{
        width:'100%',

    },
    
    title:{
        
        fontSize:15,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#C89A5B'
    
    },
    nameApp:{
        marginBottom:'5%',
        letterSpacing:3,
        fontSize:10,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#C89A5B'
    
    },
    viewMultiButton:{
        width:"80%",
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
	  fontWeight:"bold",
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