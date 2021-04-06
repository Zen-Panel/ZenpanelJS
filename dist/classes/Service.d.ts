import _service from '../interfaces/Service';
export default class Service {
    url: string;
    auth_code: string;
    serviceId: string;
    constructor(url: string, auth_code: string, serviceId: string);
    authenticate(): Promise<unknown>;
    getData(): Promise<_service>;
    start(): Promise<unknown>;
    stop(): Promise<unknown>;
    kill(): Promise<unknown>;
    sendCommand(command: string): Promise<unknown>;
}
