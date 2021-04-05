import Ftp from "./Ftp";
import Service from "./Service";

export default class Main {
    url: string;
    constructor(url: string) {
        this.url = url;
    }

    ftp() {
        return new Ftp(this.url);
    }

    service(auth_code: string, serviceId: string) {
        if (serviceId) return new Service(this.url, auth_code, serviceId);
        return null;
    }
}