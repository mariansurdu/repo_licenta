import {Component, ViewChild, forwardRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { NavController } from 'ionic-angular';
import {TeamFormService} from "./teamForm.service";
import {EventCompService} from "../eventcomp/eventcomp.service";
import {PLanning} from "../planning/planning";

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
  constructor(public navCtrl: NavController,private localStorageService:LocalStorageService,public teamFormService:TeamFormService,public ev:EventCompService) {}

  ngOnInit() {
    alert(JSON.parse(this.loggedUser).companyCui)
    this.companyCui=JSON.parse(this.loggedUser).cui;
  }

  createTeam() {
    this.data={flagEv:"teamAdd",companyCui:this.companyCui,teamName:this.teamName,
    photoUrl:this.photoUrl,leadId:JSON.parse(this.loggedUser)._id,team:[]};
    this.teamFormService.saveTeam(this.data).subscribe((res)=>{
      console.log(res);
      if (res.status==200) {
        console.log("send ev");
        alert("Team "+this.teamName+"has been added successfully to your plan");
        console.log(this.data);
        this.ev.sendOk1(this.data);
      }
    })
  }
}
