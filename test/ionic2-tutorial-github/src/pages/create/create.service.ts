import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class CreateService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/create';
  constructor (private http: Http) {}

  /*find(id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
      return res.json();
    });
  }*/

  register(data:any):any {
    return this.http.post(this.resourceUrl,data,{});
  }

}
