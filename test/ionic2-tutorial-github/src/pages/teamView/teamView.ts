import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {PersonToTeamForm} from "../personToTeamForm/personToTeamForm";
import {MemberTeamView} from "../memberTeamView/memberTeamView";
import {EventCompService} from "../eventcomp/eventcomp.service";

@Component({
  selector: 'teamView',
  templateUrl: 'teamview.html'
})
export class TeamView {
  selectedItem:any;
  constructor(public navCtrl: NavController,public navParams:NavParams,public ev:EventCompService) {
    this.selectedItem=navParams.get('item');
    console.log(this.selectedItem);
    this.ev.getEmittedValue()
      .subscribe((item) => {
        if (item.flagEv==="memberTeam")
          this.addMemberToList(item);
      })
  }

  addPersonToTeam() {
    this.navCtrl.push(PersonToTeamForm,{
      item:this.selectedItem
    });
  }

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

}
