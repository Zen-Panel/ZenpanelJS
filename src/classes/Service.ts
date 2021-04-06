import axios from 'axios';
import _service from '../interfaces/Service';

function control(url:string, auth_code: string, serviceId: string, control: string) {
    return new Promise(async (resolve, reject) => {
        try {
            var res = await axios.post(`${url}/service/${serviceId}/control`, {
                control: `${control}`
            }, {
                headers: {
                    Authorization: auth_code
                }
            });
            if (!res.data || res.data == {}) return reject({
                error: {
                    message: 'Something went wrong.'
                }
            });
            if (res.data.status == 417 || res.data.status == 401) return reject({
                error: {
                    message: res.data.error.message
                }
            });
            if(res.data.status == 204) return reject({
                error: {
                    message: res.data.message
                }
            });
            console.log(res.data);
            return resolve({
                message: res.data.message
            });
        } catch(err) {
            console.log(err);
            if (err && !err.response) {
                return reject({
                    error: {
                        message: 'Couldn\'t connect to the specified API server.'
                    }
                });
            }
        }
    });
}

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
                if (err && !err.response) {
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
                if (err && !err.response) {
                    return reject({
                        error: {
                            message: 'Couldn\'t connect to the specified API server.'
                        }
                    });
                }
            }
        });
    }

    start() {
        return new Promise(async (resolve, reject) => {
            control(this.url, this.auth_code, this.serviceId, 'start').then(data => {
                if (data) {
                    return resolve(data);
                }
            }).catch(err => {
                if (err) {
                    return reject(err);
                }
            });
        });
    }

    stop() {
        return new Promise(async (resolve, reject) => {
            control(this.url, this.auth_code, this.serviceId, 'stop').then(data => {
                if (data) {
                    return resolve(data);
                }
            }).catch(err => {
                if (err) {
                    return reject(err);
                }
            });
        });
    }

    kill() {
        return new Promise(async (resolve, reject) => {
            control(this.url, this.auth_code, this.serviceId, 'kill').then(data => {
                if (data) {
                    return resolve(data);
                }
            }).catch(err => {
                if (err) {
                    return reject(err);
                }
            });
        });
    }

    sendCommand(command: string) {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios.post(`${this.url}/service/${this.serviceId}/command`, {
                    command: `${command}`
                }, {
                    headers: {
                        Authorization: this.auth_code
                    }
                });
                if (!res.data || res.data == {}) return reject({
                    error: {
                        message: 'Something went wrong.'
                    }
                });
                if (res.data.status == 401) return reject({
                    error: {
                        message: res.data.error.message
                    }
                });
                if(res.data.status == 204) return reject({
                    error: {
                        message: res.data.message
                    }
                });
                return resolve({
                    message: res.data.message
                });
            } catch(err) {
                if (err && !err.response) {
                    console.log(err);
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