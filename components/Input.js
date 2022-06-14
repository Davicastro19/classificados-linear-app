import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const input = StyleSheet.create({
    input:{
        fontSize:15,
        color:"#C89A5B",
        borderColor:'#C89A5B',
        backgroundColor:'rgba(80, 80, 70 ,0.5)',
        borderRadius:6,
        paddingLeft: 20
        
        
    },
    inputIcon:{
        fontSize:5,
        color:"#C89A58",
        borderWidth:0.5,
        borderColor:'#C89A5B',
        borderRadius:6,
        paddingLeft: 5,
        
    },
    textInput:{
        fontSize:15,
        color:"#C89A5B",
        
    }
})
export default input