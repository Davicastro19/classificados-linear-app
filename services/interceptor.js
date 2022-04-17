import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Config from "../util/Config"

class Interceptor{

    async refresh(){
        axios.interceptors.response.use(response => {
            return response
          }, err => {
            return new Promise((resolve, reject) => {
              const originalReq = err.config
              if (err.response.status){
                if (err.response.status == 401 && err.config && !err.config._retry){
                  originalReq._retry = true
                  AsyncStorage.getItem("TOKEN").then((token) => {
                    let res = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
                    .then((res) => {
                      if (res && res.data && res.data.access_token) {
                        AsyncStorage.setItem("TOKEN", res.data.access_token)
                      }
                      originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
                      return axios(originalReq)
                    })
                    resolve(res)
                  })
                }else{
                    reject(err)
                  }
              }else{
                reject(err)
              }
            })
          })
    }
}

const interceptor = new Interceptor()
export default interceptor