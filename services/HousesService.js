import axios from "axios"
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import  Config  from '../util/Config'

class HousesService{

    async insertHouse(data){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/register",
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            //console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }
    
    async allHouses(){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/allHouses",
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            //console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }

    async allMyHouses(){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/allMyHouses",
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:{token:token},
            headers:Config.HEADER_REQUEST
        }).then((response)=> {
            if (response && response.data && response.data.access_token) {
			    AsyncStorage.setItem("TOKEN", response.data.access_token)
            }
            return Promise.resolve(response)
        }).catch((error)=>{
            //console.log('aaa',error)
            return Promise.reject(error)
        })
    }

    async deleteHouse(id){
        console.log('aa',id)
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/deleteHouse/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Delete",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            if (response && response.data && response.data.access_token) {
			    AsyncStorage.setItem("TOKEN", response.data.access_token)
            }
            return Promise.resolve(response)
        }).catch((error)=>{
            //////console.log('aaa',error)
            return Promise.reject(error)
        })
    }


    async selectHouseById(id){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/oneHouse/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            //console.log('xssxx',response.data)
            return Promise.resolve(response)
        }).catch((error)=>{
            console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }

    
}
const housesService = new HousesService()
export default housesService