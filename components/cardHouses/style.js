import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const cardHouse = StyleSheet.create({
    containerItem:{ flexDirection: "row", marginLeft:hp('1.3%'), paddingTop: wp('2%')},
    fontItem:{ fontFamily: "Raleway-SemiBold" },
    fontFooter:{ fontFamily: "Raleway-LightItalic" },
    containerRow:{ flexDirection: "row" }
})
export default cardHouse