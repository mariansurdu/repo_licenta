import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ActivityFormService {
  private teamSaveUrl: string =  'https://licenta112.herokuapp.com/newteam';
  private activityAddToTeamUrl:string='https://licenta112.herokuapp.com/saveactiviti/';
  private getPlanningUrl:string="https://licenta112.herokuapp.com/planning/";
  constructor (private http: Http) {}

  addActivityToTeam(data:any,idP:any) {
    console.log("Reach"+idP);
    //id planning de unde dracu?????

    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.activityAddToTeamUrl+idP,data,{headers:headers});
  }

  getPlanningId(teamId:any) {
      return this.http.get(this.getPlanningUrl+teamId).map((res)=>{
        return res.json();
      })
  }

}
