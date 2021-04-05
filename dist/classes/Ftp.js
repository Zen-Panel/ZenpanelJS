"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Ftp {
    constructor(url) {
        this.url = url;
    }
    authenticateUser(secret_code, username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios_1.default.post(`${this.url}/ftp/user`, {
                    username: `${username}`,
                    password: `${password}`
                }, {
                    headers: {
                        Authorization: secret_code
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
                    path: res.data.path,
                    serviceId: res.data.serviceId
                });
            }
            catch (err) {
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
    newFtpUser(auth_code, content) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios_1.default.post(`${this.url}/ftp/users`, {
                    serviceId: content.serviceId,
                    path: content.path,
                    daemon: content.daemon
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
    getAllUsers(auth_code, serviceId) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios_1.default.get(`${this.url}/ftp/${serviceId}/users`, {
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
                if (res.data.status == 401 || res.data.status == 204)
                    return reject({
                        error: {
                            message: res.data.error.message
                        }
                    });
                return resolve(res.data.users);
            }
            catch (err) {
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
exports.default = Ftp;
