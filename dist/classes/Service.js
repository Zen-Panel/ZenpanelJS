"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function control(url, auth_code, serviceId, control) {
    return new Promise(async (resolve, reject) => {
        try {
            var res = await axios_1.default.post(`${url}/service/${serviceId}/control`, {
                control: `${control}`
            }, {
                headers: {
                    Authorization: auth_code
                }
            });
            if (!res.data || res.data == {})
                return reject({
                    error: {
                        message: 'Something went wrong.'
                    }
                });
            if (res.data.status == 417 || res.data.status == 401)
                return reject({
                    error: {
                        message: res.data.error.message
                    }
                });
            if (res.data.status == 204)
                return reject({
                    error: {
                        message: res.data.message
                    }
                });
            console.log(res.data);
            return resolve({
                message: res.data.message
            });
        }
        catch (err) {
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
class Service {
    constructor(url, auth_code, serviceId) {
        this.url = url;
        this.auth_code = auth_code;
        this.serviceId = serviceId;
    }
    authenticate() {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios_1.default.get(`${this.url}/service/${this.serviceId}/auth`, {
                    headers: {
                        Authorization: this.auth_code
                    }
                });
                if (!res.data || res.data == {})
                    return reject({
                        error: {
                            message: 'Something went wrong.'
                        }
                    });
                if (res.data.status == 401 || res.data.status == 204)
                    return reject({
                        error: {
                            message: res.data.error.message
                        }
                    });
                return resolve({
                    message: res.data.message
                });
            }
            catch (err) {
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
    getData() {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios_1.default.get(`${this.url}/service/${this.serviceId}`, {
                    headers: {
                        Authorization: this.auth_code
                    }
                });
                if (!res.data || res.data == {})
                    return reject({
                        error: {
                            message: 'Something went wrong.'
                        }
                    });
                if (res.data.status == 401 || res.data.status == 204)
                    return reject({
                        error: {
                            message: res.data.error.message
                        }
                    });
                return resolve(res.data.service);
            }
            catch (err) {
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
    sendCommand(command) {
        return new Promise(async (resolve, reject) => {
            try {
                var res = await axios_1.default.post(`${this.url}/service/${this.serviceId}/command`, {
                    command: `${command}`
                }, {
                    headers: {
                        Authorization: this.auth_code
                    }
                });
                if (!res.data || res.data == {})
                    return reject({
                        error: {
                            message: 'Something went wrong.'
                        }
                    });
                if (res.data.status == 401)
                    return reject({
                        error: {
                            message: res.data.error.message
                        }
                    });
                if (res.data.status == 204)
                    return reject({
                        error: {
                            message: res.data.message
                        }
                    });
                return resolve({
                    message: res.data.message
                });
            }
            catch (err) {
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
exports.default = Service;
