import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1E4344',
        paddingBottom: 2
    },
    inputList:{
        borderColor:'rgba(106,235, 16, 1)',
	    width:'95%',
        height:'90%',
        borderWidth:1,
        borderRadius:20,
        fontSize:15,
        paddingLeft: 15,
        paddingRight: 25,
        paddingBottom:5,
        color:"rgb(90, 90, 90 )",
        
    },
    viewFiMultiButton: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
        paddingBottom:'20%',
    },
    viewFiMultiButtonSelect: {
        width: '100%',
        alignItems: 'center',
        justifyContent: "space-evenly",
        paddingBottom:'20%',
    },
    viewMultiButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: "center",
    },
    viewFilterMultiButton: {
        width: '100%',
        height: '8%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    contentStrategy: {
        borderColor: 'rgba(106,255, 16, 1)',
        borderBottomWidth: 5,
        borderTopWidth: 5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderRightWidth: 0.5,
        borderRadius: 20,
        color: "rgb(90, 90, 90 )"
        

    },
    viewOption: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    dropdown1RowTxtStyle:{
        color: '#FFC77A', 
        textAlign: 'left'
    },
    dropdown1RowStyle: {
        backgroundColor: '#122829', 
        borderColor: '#FFC77A',
        borderWidth:5,
        borderRadius:10
    },
    dropdown1BtnTxtStyle: {
        color: '#FFC77A', 
        textAlign: 'left'},
  dropdown1DropdownStyle: {
      backgroundColor: '#122829'},
      labelWhite:{
        color:'#FFC77A'
    }
})
export default styles