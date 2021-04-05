export default interface _service {
    _id: string,
    name: string,
    daemon: string,
    subUsers: Array<string>,
    user: string,
    JDKVersion: string,
    allocation: {
        localPort: number,
        publicPort: number
    },
    version: string,
    jarfile: string
}