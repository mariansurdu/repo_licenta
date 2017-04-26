import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {TeamForm} from "../teamForm/teamForm";
import {TeamView} from "../teamView/teamview";
import {PlanningService} from "./planning.service";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'planning',
  templateUrl: 'planning.html'
})
export class PLanning {

  loggedUser:any=this.localStorageService.get("data");
  teams:any;
  teamLeader:any;
  constructor(public navCtrl: NavController,public  planningService:PlanningService,private localStorageService:LocalStorageService) {

  }

  ngOnInit() {
    if (JSON.parse(this.loggedUser).personType!=1) {
        this.teamLeader=false;
    }
    else {
      this.teamLeader=true;
    }
 this.planningService.getTeams1("12345",JSON.parse(this.loggedUser)._id).subscribe((res)=>{
 this.teams=res;
   console.log(this.teams);
 })
 }

  addTeam() {
    this.navCtrl.push(TeamForm, {
    });
  }

  viewTeamDetails(item) {
    this.navCtrl.push(TeamView,{
      item:item
    });
  }
}
