"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
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
exports.default = Service;
