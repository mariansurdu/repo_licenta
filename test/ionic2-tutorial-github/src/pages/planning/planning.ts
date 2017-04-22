import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {TeamForm} from "../teamForm/teamForm";
import {TeamView} from "../teamView/teamView";

@Component({
  selector: 'planning',
  templateUrl: 'planning.html'
})
export class PLanning {

  constructor(public navCtrl: NavController) {

  }

  addTeam() {
    this.navCtrl.push(TeamForm, {
    });
  }

  /*viewTeamDetails() {
    this.navCtrl.push(TeamView, {
    });
  }*/
}
