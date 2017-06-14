import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {PersonToTeamForm} from "../personToTeamForm/personToTeamForm";
import {MemberTeamView} from "../memberTeamView/memberTeamView";
import {EventCompService} from "../eventcomp/eventcomp.service";
import {ActivityForm} from "../activityForm/activityForm";
import {TeamFormService} from "../teamForm/teamForm.service";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'teamView',
  templateUrl: 'teamview.html'
})
export class TeamView {
  selectedItem:any;
  teamleader:any;
  loggedUser:any=this.localStorageService.get("data");
  activitiesList:any=[];
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];
  constructor(public navCtrl: NavController,public navParams:NavParams,public ev:EventCompService,public teamFormService:TeamFormService,private localStorageService:LocalStorageService) {
    alert("You are teamlead:"+JSON.parse(this.loggedUser).personType==="1"?true:false);
    this.teamleader=JSON.parse(this.loggedUser).personType==="1"?true:false;
    this.selectedItem=navParams.get('item');
    console.log(this.selectedItem);
    this.ev.getEmittedValue()
      .subscribe((item) => {
        if (item.flagEv==="memberTeam")
          this.addMemberToList(item);
      })
    /*for(let i = 0; i < 10; i++ ){
      this.data.push({
        title: 'Title '+i,
        details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }*/
    this.getActivitiesForTeam();
  }

  addPersonToTeam() {
    this.navCtrl.push(PersonToTeamForm,{
      item:this.selectedItem
    });
  }

  /*toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }*/

  goToPersonDetails(item) {
    console.log(item);
    this.navCtrl.push(MemberTeamView,{
      item:item
    });
  }

  addMemberToList(item) {
    console.log(item);
    this.selectedItem.team.push(item)
  }

  addActivitiesToTeam() {
    this.navCtrl.push(ActivityForm,{
      item:this.selectedItem
    });
  }

  getActivitiesForTeam() {
    this.teamFormService.getActivitiesForTeam(this.selectedItem._id).subscribe((res)=>{
      console.log(res);
      this.activitiesList=res;
    })
  }

}
