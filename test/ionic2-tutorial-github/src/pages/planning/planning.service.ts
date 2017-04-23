import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PlanningService {
  private resourceUrl: string =  'http://localhost:3000/teams/';
  constructor (private http: Http) {}

  getTeams1(cui:any,idLead:any):any
  {
    console.log(this.resourceUrl+cui+'/'+idLead);
    return this.http.get(this.resourceUrl+cui+'/'+idLead).map((res)=>{
      return res.json();
    })
  }

}



