import axios from "axios"
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import  Config  from '../util/Config'

class TenantService{

    async sendCode(data){
        return axios({
            url:Config.API_URL+ "tenant/sendCode",
			timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers:Config.HEADER_REQUEST
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async register(data){
        return axios({
            url:Config.API_URL+ "tenant/register",
			timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers:Config.HEADER_REQUEST
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }
	
	async login(data){
        return axios({
            url:Config.API_URL+"tenant/login",
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers:Config.HEADER_REQUEST
        }).then((response)=> {
            if (response && response.data && response.data.access_token) {
                AsyncStorage.setItem("TOKEN", response.data.access_token)
            }
            return Promise.resolve(response)
        }).catch((error)=>{
            console.log('qwjq',error)
            return Promise.reject(error)
        })
    }
	
	async checkList(data){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"tenant/check",
            timeout: Config.LON_TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            //console.log('qfwq',error)
            return Promise.reject(error)
        })
    }

	

    async getStrategy(data){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"tenant/strategy",
            timeout: Config.LON_TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            //console.log('qwsq',error)
            return Promise.reject(error)
        })
    }
	async autoLogin(data){
        return axios({
            url:Config.API_URL+"tenant/autoLogin",
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:data,
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

    async  pairs(){
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url:Config.API_URL+"tenant/pairs",
            method:"POST",
            timeout: Config.LON_TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response)=> {
            return Promise.resolve(response)
        }).catch((error)=>{
            //console.log('qgwq',error)

            return Promise.reject(error)
        })

    }
}
const tenantService = new TenantService()
export default tenantService