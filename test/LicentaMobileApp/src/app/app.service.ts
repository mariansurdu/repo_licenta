import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class AppService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/updateToken';
  constructor (private http: Http) {}

  updateToken(data:any):any {
    return this.http.post(this.resourceUrl,data,{});
  }

}
