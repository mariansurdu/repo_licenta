import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ActivityFormService {
  private teamSaveUrl: string =  'https://licenta112.herokuapp.com/newteam';
  private activityAddToTeamUrl:string='https://licenta112.herokuapp.com/saveactiviti/'
  constructor (private http: Http) {}

  addActivityToTeam(data:any,idP:any) {
    console.log("Reach");
    //id planning de unde dracu?????
   
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.activityAddToTeamUrl+idP,data,{headers:headers});
  }

}
