import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class PersonalDataService {
  private resourceUrl: string =  'http://localhost:3000/datauser';
  private resourceUrl1: string =  'http://localhost:3000/dataByDate';
  constructor (private http: Http) {}

  getData(id:number): Observable<any> {
    return this.http.get(this.resourceUrl+'/'+id).map((res: Response) => {
      console.log(res);
      return res.json();
    });
  }

  getStatistics(d:Date):Observable<any> {
    return this.http.get(this.resourceUrl1+"/"+d).map((res:Response)=>{
      return res.json();
    })
  }

}
