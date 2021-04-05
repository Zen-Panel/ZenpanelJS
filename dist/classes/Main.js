"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ftp_1 = __importDefault(require("./Ftp"));
const Service_1 = __importDefault(require("./Service"));
class Main {
    constructor(url) {
        this.url = url;
    }
    ftp() {
        return new Ftp_1.default(this.url);
    }
    service(auth_code, serviceId) {
        if (serviceId)
            return new Service_1.default(this.url, auth_code, serviceId);
        return null;
    }
}
exports.default = Main;
