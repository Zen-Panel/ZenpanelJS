import Ftp from "./Ftp";
import Service from "./Service";
export default class Main {
    url: string;
    constructor(url: string);
    ftp(): Ftp;
    service(auth_code: string, serviceId: string): Service | null;
}
