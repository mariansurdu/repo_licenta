import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { NavController } from 'ionic-angular';
import {TeamFormService} from "./teamForm.service";

@Component({
  selector: 'teamForm',
  templateUrl: 'teamForm.html'
})
export class TeamForm {

  teamName:any;
  companyCui:any;
  photoUrl:any="https://thumbs.dreamstime.com/z/shipping-company-workers-two-recording-vehicles-exporting-31709382.jpg";
  leadId:any;
  data:any;
  loggedUser:any=this.localStorageService.get("data");
  constructor(public navCtrl: NavController,private localStorageService:LocalStorageService,public teamFormService:TeamFormService) {

  }

  createTeam() {
    this.data={companyCui:this.companyCui,teamName:this.teamName,
    photoUrl:this.photoUrl,leadId:JSON.parse(this.loggedUser)._id};
    this.teamFormService.saveTeam(this.data).subscribe((res)=>{
      console.log(res);
    })
  }

}
