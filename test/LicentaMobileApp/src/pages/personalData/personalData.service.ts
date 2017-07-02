import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class PersonalDataService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/datauser';
  private resourceUrl1: string =  'https://licenta112.herokuapp.com/dataByDate';
  private resourceUrl2:string='https://licenta112.herokuapp.com/getAdvice/';
  private resourceUrl3:string='https://licenta112.herokuapp.com/getDataReport';
  private resourceUrl4:string='https://licenta112.herokuapp.com/getDataReportE';
  constructor (private http: Http) {}

  getData(id:number): Observable<any> {
    return this.http.get(this.resourceUrl+'/'+id).map((res: Response) => {
      console.log(res);
      return res.json();
    });
  }

  getStatistics(d:any,id:any):any {
    console.log(id);
    return this.http.post(this.resourceUrl1,{date:d,userId:id});
  }

  getAdvice(id:any) {
    return this.http.get(this.resourceUrl2+id).map((res:Response)=>{
      return res.json();
    })
  }

  getReportData(d:any,id:any):any {
    return this.http.post(this.resourceUrl3,{date:d,userId:id});
  }
  getReportDataE(d:any,id:any):any {
    return this.http.post(this.resourceUrl4,{date:d,userId:id});
  }

}
