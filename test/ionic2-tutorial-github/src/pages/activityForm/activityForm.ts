import {Component, ViewChild, forwardRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import {NavController, NavParams} from 'ionic-angular';
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
  idPlanning:any;
  selectedItem:any;

  loggedUser:any=this.localStorageService.get("data");
  constructor(public navCtrl: NavController,public navParams:NavParams,private localStorageService:LocalStorageService,public activityFormService:ActivityFormService,public ev:EventCompService) {
    this.selectedItem=navParams.get('item');
    console.log(this.selectedItem);
  }

  ngOnInit() {
    alert(JSON.parse(this.loggedUser).companyCui)
  }

  addActivityToTeam() {
      this.activity={name:this.name,dateFrom:this.dateFrom,dateTo:this.dateTo,location:this.location,remarks:this.remarks};
    console.log(this.activity);
    console.log(this.selectedItem._id);
    this.activityFormService.getPlanningId(this.selectedItem._id).subscribe((res)=>{
      console.log(res);
      console.log(res[0]._id)


        this.activityFormService.addActivityToTeam(this.activity,res[0]._id).subscribe((res)=>{
          console.log(res.status);
          if (res.status==200) {
            alert("Activity added succesfully!");
          }
        })

    })


  }
}
