import NewFtpUserContent from '../interfaces/NewFtpUserContent';
export default class Ftp {
    url: string;
    constructor(url: string);
    authenticateUser(secret_code: string, username: string, password: string): Promise<unknown>;
    newFtpUser(auth_code: string, content: NewFtpUserContent): Promise<unknown>;
    getAllUsers(auth_code: string, serviceId: string): Promise<unknown>;
}
