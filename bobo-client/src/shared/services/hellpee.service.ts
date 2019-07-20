import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class HellpeeService {
    serverURL = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getHellpees() {
      return this.http.get(this.serverURL + '/helpees');
  }
}
