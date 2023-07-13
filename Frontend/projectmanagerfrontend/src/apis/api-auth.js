import { REFRESH_TOKEN_URL } from "../utilities/constant";
import axios from 'axios';
import { isTokenExpired } from "./jwt-decode";


const api = axios.create({ maxRedirects: 5 });

api.interceptors.request.use(
    async(config) => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken) {

            if (isTokenExpired())

            {
                console.log(isTokenExpired());
                try {
                    const response = await axios.post(REFRESH_TOKEN_URL, { refresh: refreshToken });

                    const newAccessToken = response.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    // Update the request headers with the new access token
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                } catch (error) {
                    // Handle the error if token refresh fails
                    console.error('Token refresh failed:', error);
                }
            } else {
                // Set the authorization header with the existing access token
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;