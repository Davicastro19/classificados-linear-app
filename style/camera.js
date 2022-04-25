import {StyleSheet} from 'react-native'

const cameras = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center"
      },
      camera:{
        width:"100%",
        height:"100%"
      },
      buttonContainer:{
        flex:1,
        backgroundColor:"transparent",
        flexDirection:"row",
      },
      button:{
        position:"absolute",
        bottom:10,
        right:5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        margin:20,
        height:50,
        width:50,
        borderRadius:50,
      },
      buttonCam:{
        position:"absolute",
        bottom:10,
        right:70,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        margin:20,
        height:50,
        width:50,
        borderRadius:50,
      },
      contentModal:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        margin:21,
    
      },
      closeButton:{
        position:"absolute",
        top:10,
        left:2,
        margin:20,
      },
      imgPhoto:{
        width:"100%",
        height:400,
      }
})
export default cameras