import axios from "axios"
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import  Config  from '../util/Config'

class ClassifiedsService{
    
    async insertClassified(data){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"classifieds/register",
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
            return Promise.reject(error)
        })
    }

    async updateClassified(data,id){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"classifieds/update/"+id,
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
            return Promise.reject(error)
        })
    }
    
    async allClassifieds(skip){
        let token = await AsyncStorage.getItem("TOKEN")
        return await axios({
            url:Config.API_URL+"classifieds/all/"+skip.toString()+"/30",
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async city(){
        return await axios({
            url:Config.API_URL_TO+"city",
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async districtsByCity(city,type){
        return await axios({
            url:Config.API_URL_TO+"districtsByCity/"+city.toString()+"/"+type.toString(),
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async automobileByCategory(category){
        return await axios({
            url:Config.API_URL_TO+"automobileByCategory/"+category.toString(),
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }
    async modelByAutomobile(automobile,brand){
        return await axios({
            url:Config.API_URL_TO+"modelByAutomobile/"+automobile.toString()+"/"+brand.toString(),
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }
    async getClassifiedFiltered(skip, district,city,orderAll){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"classifieds/orderByCityAndDistrictAndOrderValue/"+skip.toString()+"/30/"+district+"/"+city+"/"+orderAll,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async allMyClassifieds(){
        let token = await AsyncStorage.getItem("TOKEN")
        let id = await AsyncStorage.getItem("ID")
        return axios({
            url:Config.API_URL+"classifieds/allMy",
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
            return Promise.reject(error)
        })
    }

    async deleteClassified(id){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"classifieds/delete/"+id,
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
            return Promise.reject(error)
        })
    }

    async deleteImageClassified(id){
        
        return axios({
            url:Config.API_URL+"classifieds/deleteImageClassified/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Delete",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async selectClassifiedById(id){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"classifieds/one/"+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }
    async getCep(id){
        return axios({
            url:Config.API_URL_CEP+id,
            timeout: Config.TIMEOUT_REQUEST,
            method:"Get",
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
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
        }).catch((error)=>{
        })
        
    }

    
}
const classifiedsService = new ClassifiedsService()
export default classifiedsService