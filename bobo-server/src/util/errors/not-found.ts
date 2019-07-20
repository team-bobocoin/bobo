export default class NotFound extends Error {
    constructor(message: any) {
        super(message);

        this.name = 'NotFound';
    }
}
