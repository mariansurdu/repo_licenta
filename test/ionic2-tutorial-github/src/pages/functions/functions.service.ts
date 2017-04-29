import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class FunctionsService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/data';
  constructor (private http: Http) {}

  saveData(data:any): any {
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.resourceUrl,data,{headers:headers});
  }

}
