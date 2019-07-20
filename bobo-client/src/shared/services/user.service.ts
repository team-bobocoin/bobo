import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
    serverURL = environment.serverURL;

    constructor(private http: HttpClient) {
    }

    signup(data: any) {
        return this.http.post(this.serverURL + '/signup', data);
    }
    signin(data: any) {
        return this.http.post(this.serverURL + '/signin', data, {
            withCredentials: true,
        });
    }
}
