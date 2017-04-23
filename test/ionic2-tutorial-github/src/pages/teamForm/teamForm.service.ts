import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TeamFormService {
  private teamSaveUrl: string =  'http://localhost:3000/newteam';
  constructor (private http: Http) {}

  saveTeam(data:any): any {
    console.log("Ok")
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.teamSaveUrl,data,{headers:headers});
  }

}
