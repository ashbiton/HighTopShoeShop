
import { get } from './serverUtils';

export class Auth {
    constructor() {
        this.position = null;
        this.user = null;
        this.isAuthenticated = false;
    }

    async getUser() {
        return get('/user')
            .then(res => {
                if (res && res.user) {
                    this.position = res.user.position;
                    this.user = res.user;
                    this.isAuthenticated = true;
                    return true;
                } else {
                    return false;
                }
            }).catch(() => {
                return false;
            });
    }

}
// this syntax allows to create a single instace through out the application
export let auth = new Auth();

