
import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styleInsertClassified = StyleSheet.create({
    description:{
        fontFamily:'Raleway-Bold',
        marginLeft:hp('0.5%')
    },
    descriptionInput: {
        fontFamily:'Raleway-Bold',
        marginLeft:hp('1.5%')

    },
    descriptionErro: {
        fontFamily:'Raleway-Bold',
        color: '#fff'

    },
})
export default styleInsertClassified