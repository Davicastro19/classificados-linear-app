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
            ////// console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }
    async updateHouse(data,id){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/update/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"PUT",
            data:data,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            ////// console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }
    
    async allHouses(skip,take){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/all/"+skip.toString()+"/"+take.toString(),
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            ////// console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }
    async getHouseFiltered(skip,take, district,city,orderAll){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/orderByCityAndDistrictAndOrderValue/"+skip.toString()+"/"+take.toString()+"/"+district+"/"+city+"/"+orderAll,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            ////// console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }

    async allMyHouses(){
        let token = await AsyncStorage.getItem("TOKEN")
        let id = await AsyncStorage.getItem("ID")
        return axios({
            url:Config.API_URL+"houses/allMy",
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:{token:token, id:parseInt(id)},
            headers:Config.HEADER_REQUEST
        }).then((response)=> {
            if (response && response.data && response.data.access_token) {
			    AsyncStorage.setItem("TOKEN", response.data.access_token)
            }
            return Promise.resolve(response)
        }).catch((error)=>{
            ////// console.log('aaa',error)
            return Promise.reject(error)
        })
    }

    async deleteHouse(id){
        //// console.log('aa',id)
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/delete/"+id,
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
            ////////// console.log('aaa',error)
            return Promise.reject(error)
        })
    }

    async deleteImageHouse(id){
        //// console.log('aa',id)
        return axios({
            url:Config.API_URL+"houses/deleteImageHouse/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Delete",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async selectHouseById(id){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"houses/one/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            ////// console.log('xssxx',response.data)
            return Promise.resolve(response)
        }).catch((error)=>{
            //// console.log('aaaaaaaaasasa',error)
            return Promise.reject(error)
        })
    }
    async  UploadImage(data) {
        return axios({
            url: 'https://api.imgur.com/3/image',
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            headers: { 
                'Authorization': 'Client-ID 1ecdb35596fd7b0'
              },
              data : data
        }).then((response)=> {
          console.log(JSON.stringify(response.data));
        }).catch((error)=>{
          console.log('164',error);
        })
        
    }

    
}
const housesService = new HousesService()
export default housesService