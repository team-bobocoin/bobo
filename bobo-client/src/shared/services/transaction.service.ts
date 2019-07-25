import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {iif, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

const isExist = (params: any): boolean => {
    return !!params;
};

const basicOptions: any = {
    withCredentials: true,
};

@Injectable()
export class TransactionService {
    serverURL = environment.serverURL;

    constructor(private http: HttpClient) {
    }
    getTransactions(params: any) {
        return iif(() => {
                return isExist(params);
            }, of('').pipe(
            map(() => {
                let queryParams = new HttpParams();

                for (const prop in params) {
                    if (typeof params[prop] === 'string') {
                        queryParams = queryParams.append(prop, params[prop]);
                    } else {
                        queryParams = queryParams.append(prop, JSON.stringify(params[prop]));
                    }
                }

                const options: any = basicOptions;

                options.params = queryParams;

                return options;
            })
            ), of('').pipe(
            map(() => basicOptions)
            )
        ).pipe(
            mergeMap((options) => {
                return this.http.get(`${this.serverURL}/transactions`, options);
            })
        );
    }
}
