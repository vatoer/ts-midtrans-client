import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import SnapBiConfig from './snapBiConfig';
import https from 'https';

// Set up axios interceptors
axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (SnapBiConfig.enableLogging) {
            console.log(`Request URL: ${config.url}`);
            console.log(`Request Headers: \n${JSON.stringify(config.headers, null, 2)}`);
            if (config.data) {
                console.log(`Request Body: \n${JSON.stringify(config.data, null, 2)}`);
            }
        }
        return config;
    },
    (error: Error) => {
        if (SnapBiConfig.enableLogging) {
            console.error(`Request Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (SnapBiConfig.enableLogging) {
            console.log(`Response Status: ${response.status}`);
            console.log(`Response Body: \n${JSON.stringify(response.data, null, 2)}`);
        }
        return response;
    },
    (error: Error) => {
        if (SnapBiConfig.enableLogging) {
            console.error(`Response Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

class SnapBiApiRequestor {
    /**
     * Make a remote API call with the specified URL, headers, and request body.
     * @param {string} url - The API endpoint URL.
     * @param {object} header - The headers for the request.
     * @param {object} body - The JSON payload for the request.
     * @returns {Promise<object>} - The JSON response from the API.
     */
    static async remoteCall(
        url: string,
        header: Record<string, string>,
        body: Record<string, any>,
        timeout: number | null = 10000
    ): Promise<Record<string, any>> {
        const axiosHeaders = { ...header };
        try {
            const axiosOptions: AxiosRequestConfig = {
                headers: axiosHeaders,
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                timeout: timeout !== null ? timeout : 10000,
            };

            const response: AxiosResponse = await axios.post(url, body, axiosOptions);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                return { message: error.message, status: error.code || 500 };
            }
        }
    }
}

export default SnapBiApiRequestor;