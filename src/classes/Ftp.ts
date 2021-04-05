import axios from 'axios';
import NewFtpUserContent from '../interfaces/NewFtpUserContent';

export default class Ftp {
    url: string;
    constructor(url: string) {
        this.url = url;
    }

    authenticateUser(secret_code: string, username: string, password: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios.post(`${this.url}/ftp/user`, {
                    username: `${username}`,
                    password: `${password}`
                }, {
                    headers: {
                        Authorization: secret_code
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
                    path: res.data.path,
                    serviceId: res.data.serviceId
                });
            } catch(err) {
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

    newFtpUser(auth_code: string, content: NewFtpUserContent) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios.post(`${this.url}/ftp/users`, {
                    serviceId: content.serviceId,
                    path: content.path,
                    daemon: content.daemon
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
                if (res.data.status == 401 || res.data.status == 204) return reject({
                    error: {
                        message: res.data.error.message
                    }
                });
                return resolve({
                    message: res.data.message
                });
            } catch(err) {
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

    getAllUsers(auth_code: string, serviceId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios.get(`${this.url}/ftp/${serviceId}/users`, {
                    headers: {
                        Authorization: auth_code
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
                return resolve(res.data.users);
            } catch(err) {
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