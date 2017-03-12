import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class CompanyService {
  private resourceUrl: string =  'http://localhost:3000/createCompany';
  constructor (private http: Http) {}

  register(data:any):any {
    return this.http.post(this.resourceUrl,data,{});
  }

}
