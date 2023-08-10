import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "../util/Config";

class Interceptor {
    constructor() {
        this.initInterceptor();
    }

    async refreshToken() {
        try {
            const token = await AsyncStorage.getItem("TOKEN");
            const response = await axios.put(`${Config.API_URL}token/refresh`, { oldToken: token });
            if (response.data && response.data.access_token) {
                await AsyncStorage.setItem("TOKEN", response.data.access_token);
            }
            return response.data.access_token;
        } catch (error) {
            await this.removeToken();
            throw error;
        }
    }

    async removeToken() {
        await AsyncStorage.removeItem("TOKEN");
    }

    async initInterceptor() {
        axios.interceptors.response.use(
            response => response,
            async error => {
                const originalReq = error.config;
                if (error.response && error.response.status === 401 && originalReq && !originalReq._retry) {
                    originalReq._retry = true;
                    try {
                        const newToken = await this.refreshToken();
                        originalReq.headers["Authorization"] = `Bearer ${newToken}`;
                        return axios(originalReq);
                    } catch (error) {
                        throw error;
                    }
                } else {
                    throw error;
                }
            }
        );
    }
}

const interceptor = new Interceptor();
export default interceptor;
