import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PlanningService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/teams/';
  private resourceUrlW:string="https://licenta112.herokuapp.com/teamsW/"
  constructor (private http: Http) {}

  getTeams1(cui:any,idLead:any,personType:any,email:any):any {

    console.log("Test:");
    console.log(personType+email);

    if (personType == 1) {
      return this.http.get(this.resourceUrl + cui + '/' + idLead).map((res)=> {
        return res.json();
      })
    }
    if (personType==2) {
      return this.http.get(this.resourceUrlW +email).map((res)=> {
        return res.json();
      })
    }
  }

}



