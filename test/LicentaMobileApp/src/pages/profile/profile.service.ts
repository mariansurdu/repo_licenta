import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/profiledata';
  private resourceUrl2:string="https://licenta112.herokuapp.com/app/getCurrentJob"
  constructor (private http: Http) {}

  find(id:String): Observable<any> {
    return this.http.get(this.resourceUrl+"/"+id).map((res: Response) => {
      return res.json();
    });
  }

  getTeamName(email:String,personType:String) {
    return this.http.get(this.resourceUrl2+"/"+email+"/"+personType).map((res: Response) => {
      return res.json();
    });
  }

}
