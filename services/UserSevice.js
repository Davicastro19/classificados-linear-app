import axios from "axios"
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import  Config  from '../util/Config'

class UserService{

    async sendCode(data){
        return axios({
            url:Config.API_URL+ "user/sendCode",
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

    async updatePassword(data){
        return axios({
            url:Config.API_URL+ "user/updatePassword",
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
            url:Config.API_URL+ "user/register",
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

    async updateAccount(data,id,token){
        return axios({
            url:Config.API_URL+ "user/updateAccount/"+id,
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
	
	async login(data){
        return axios({
            url:Config.API_URL+"user/login",
            timeout: Config.TIMEOUT_REQUEST,
            method:"POST",
            data:data,
            headers:Config.HEADER_REQUEST
        }).then((response)=> {
            if (response && response.data && response.data.access_token) {
                AsyncStorage.setItem("TOKEN", response.data.access_token)
                AsyncStorage.setItem("ID", response.data.id.toString())
            }
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }
	
	async autoLogin(data){
        return axios({
            url:Config.API_URL+"user/autoLogin",
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
            return Promise.reject(error)
        })
    }

    async getData(data){
        return axios({
            url:Config.API_URL+"user/getData",
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
            return Promise.reject(error)
        })
    }

}
const userService = new UserService()
export default userService