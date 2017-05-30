import {Component, ViewChild, forwardRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { NavController } from 'ionic-angular';
import {EventCompService} from "../eventcomp/eventcomp.service";
import {PLanning} from "../planning/planning";
import {ActivityFormService} from "./activityForm.service";

@Component({
  selector: 'activityForm',
  templateUrl: 'activityForm.html'

})
export class ActivityForm {


  name:any;
  dateFrom:any;
  dateTo:any;
  location:any;
  activity:any;
  remarks:any;

  loggedUser:any=this.localStorageService.get("data");
  constructor(public navCtrl: NavController,private localStorageService:LocalStorageService,public activityFormService:ActivityFormService,public ev:EventCompService) {}

  ngOnInit() {
    alert(JSON.parse(this.loggedUser).companyCui)
  }

  addActivityToTeam() {
      this.activity={name:this.name,dateFrom:this.dateFrom,dateTo:this.dateTo,location:this.location,remarks:this.remarks};
    this.activityFormService.addActivityToTeam(this.activity,1).subscribe((res)=>{
      console.log(res.status);
    })

  }
}
