import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {PersonToTeamForm} from "../personToTeamForm/personToTeamForm";
import {MemberTeamView} from "../memberTeamView/memberTeamView";

@Component({
  selector: 'teamView',
  templateUrl: 'teamview.html'
})
export class TeamView {
  selectedItem:any;
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.selectedItem=navParams.get('item');
    console.log(this.selectedItem);
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

}
