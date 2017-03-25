import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {
  private resourceUrl: string =  'http://localhost:3000/profiledata';
  constructor (private http: Http) {}

  find(id:String): Observable<any> {
    return this.http.get(this.resourceUrl+"/"+id).map((res: Response) => {
      return res.json();
    });
  }

}
