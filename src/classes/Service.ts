import axios from 'axios';
import _service from '../interfaces/Service';

export default class Service {
    url: string;
    auth_code: string;
    serviceId: string;
    constructor(url: string, auth_code: string, serviceId: string) {
        this.url = url;
        this.auth_code = auth_code;
        this.serviceId = serviceId;
    }

    authenticate() {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios.get(`${this.url}/service/${this.serviceId}/auth`, {
                    headers: {
                        Authorization: this.auth_code
                    }
                });
                if (!res.data || res.data == {}) return reject({
                    error: {
                        message: 'Something went wrong.'
                    }
                });
                if (res.data.status == 401 || res.data.status == 204) return reject({
                    error: {
                        message: res.data.error.message
                    }
                });
                return resolve({
                    message: res.data.message
                });
            } catch (err) {
                if (!err.response) {
                    return reject({
                        error: {
                            message: 'Couldn\'t connect to the specified API server.'
                        }
                    });
                }
            }
        });
    }

    getData(): Promise<_service> {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios.get(`${this.url}/service/${this.serviceId}`, {
                    headers: {
                        Authorization: this.auth_code
                    }
                });
                if (!res.data || res.data == {}) return reject({
                    error: {
                        message: 'Something went wrong.'
                    }
                });
                if (res.data.status == 401 || res.data.status == 204) return reject({
                    error: {
                        message: res.data.error.message
                    }
                });
                return resolve(res.data.service);
            } catch (err) {
                if (!err.response) {
                    return reject({
                        error: {
                            message: 'Couldn\'t connect to the specified API server.'
                        }
                    });
                }
            }
        });
    }
}