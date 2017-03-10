import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class CreateService {
  private resourceUrl: string =  'app/rest/constructionRequest';
  constructor (private http: Http) {}

  find(id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
      return res.json();
    });
  }

}
