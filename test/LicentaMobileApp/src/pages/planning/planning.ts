import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {TeamForm} from "../teamForm/teamForm";
import {TeamView} from "../teamView/teamview";
import {PlanningService} from "./planning.service";
import { LocalStorageService } from 'angular-2-local-storage';
import {EventCompService} from "../eventcomp/eventcomp.service";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";

@Component({
  selector: 'planning',
  templateUrl: 'planning.html'
})
export class PLanning {

  loggedUser:any=this.localStorageService.get("data");
  teams:any;
  teamLeader:any;
  constructor(public navCtrl: NavController,public  planningService:PlanningService,private localStorageService:LocalStorageService,public ev:EventCompService,private spinnerDialog: SpinnerDialog) {
    this.ev.getEmittedValue()
      .subscribe((item) => {
        if (item.flagEv==="teamAdd")
        this.addTeamToList(item);
      })

  }

  ngOnInit() {
    alert(JSON.parse(this.loggedUser).personType);
    if (JSON.parse(this.loggedUser).personType!=1) {
        this.teamLeader=false;
    }
    else {
      alert("true")
      this.teamLeader=true;
    }
    this.spinnerDialog.show("Loading","Teams");
 this.planningService.getTeams1(JSON.parse(this.loggedUser).cui,JSON.parse(this.loggedUser)._id,JSON.parse(this.loggedUser).personType,JSON.parse(this.loggedUser).email).subscribe((res)=>{
   this.spinnerDialog.hide();
 this.teams=res;
   console.log(this.teams);
 })
 }

  addTeam() {
    this.navCtrl.push(TeamForm, {
    });
  }

  addTeamToList(item) {
    console.log("aaaaaaaaaa");
    console.log(JSON.stringify(item));
    this.teams.unshift(item);
  }

  viewTeamDetails(item) {
    this.navCtrl.push(TeamView,{
      item:item
    });
  }
}
