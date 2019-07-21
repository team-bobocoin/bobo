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

    logout() {
        return this.http.get(this.serverURL + '/logout', {
            withCredentials: true,
        });
    }

    getBalances() {
        return this.http.get(`${this.serverURL}/balances`, {
            withCredentials: true,
        });
    }

    faucet() {
        return this.http.get(`${this.serverURL}/faucet`, {
            withCredentials: true,
        });
    }

    donates(helpeeID: number, amount: number, memo: string) {
        return this.http.post(`${this.serverURL}/donates`, {
            helpeeID, amount, memo
        }, {
            withCredentials: true,
        });
    }

    pay(amount: number, memo: string) {
        return this.http.post(`${this.serverURL}/pay`, {
            amount, memo
        }, {
            withCredentials: true,
        });
    }
}
