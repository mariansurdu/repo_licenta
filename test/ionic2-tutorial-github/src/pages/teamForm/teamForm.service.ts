import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TeamFormService {
  private teamSaveUrl: string =  'https://licenta112.herokuapp.com/newteam';
  private personAddToTeamUrl:string='https://licenta112.herokuapp.com/newworker'
  constructor (private http: Http) {}

  saveTeam(data:any): any {
    console.log("Ok")
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.teamSaveUrl,data,{headers:headers});
  }

  addPersonToTeam(data:any) {
    console.log("Reach");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.personAddToTeamUrl,data,{headers:headers});
  }

}
