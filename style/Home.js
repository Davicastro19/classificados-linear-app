import {StyleSheet} from 'react-native'

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
    title:{
        alignItems: 'center',
        justifyContent: 'center'
    
    },
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