import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {TeamFormService} from "../teamForm/teamForm.service";
import { LocalStorageService } from 'angular-2-local-storage';
import {EventCompService} from "../eventcomp/eventcomp.service";

@Component({
  selector: 'personToTeamForm',
  templateUrl: 'personToTeamForm.html'
})
export class PersonToTeamForm {
  selectedItem:any;
  teamName:any;
  email:any;
  firstname:any;
  lastname:any;
  salutation:any;
  data:any;
  phone:any;
  loggedUser:any;
  photoUrl:any="http://www.mvc.gov.my/ph_album/mvc_council/no-profile-photo.jpg"
  constructor(public navCtrl: NavController,public navParams:NavParams,public teamFormService:TeamFormService,public localStorageService:LocalStorageService,public ev:EventCompService) {
    this.selectedItem=navParams.get('item');
    this.teamName=this.selectedItem.teamName;
    this.loggedUser=localStorageService.get("data");
    console.log(this.selectedItem);
    console.log(this.loggedUser);

  }

  addToTeam() {
    console.log("Xxx"+this.loggedUser._id);
    this.data={teamleaderId:JSON.parse(this.loggedUser)._id,flagEv:"memberTeam",photoUrl:this.photoUrl,idTeam:this.selectedItem._id,email:this.email,teamName:this.teamName,phone:this.phone,firstname:this.firstname,lastname:this.lastname,salutation:this.salutation}
    console.log(this.data);
    this.teamFormService.addPersonToTeam(this.data).subscribe((res)=>{
        console.log(res);
      if (res.status==200) {
     //   alert("Worker"+this.firstname+"has been added successfully to"+this.teamName);
        this.ev.sendOk1(this.data);
      }
    })
  }



}
