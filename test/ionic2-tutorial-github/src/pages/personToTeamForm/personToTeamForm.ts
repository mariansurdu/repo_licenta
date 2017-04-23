import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {TeamFormService} from "../teamForm/teamForm.service";
import { LocalStorageService } from 'angular-2-local-storage';

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
  loggedUser:any=this.localStorageService.get("data");
  photoUrl:any="http://www.mvc.gov.my/ph_album/mvc_council/no-profile-photo.jpg"
  constructor(public navCtrl: NavController,public navParams:NavParams,public teamFormService:TeamFormService,public localStorageService:LocalStorageService) {
    this.selectedItem=navParams.get('item');
    this.teamName=this.selectedItem.teamName;
    console.log(this.selectedItem);
  }

  addToTeam() {
    console.log("Xxx");
    this.data={photoUrl:this.photoUrl,idTeam:this.selectedItem._id,email:this.email,teamName:this.teamName,firstname:this.firstname,lastname:this.lastname,salutation:this.salutation}
    this.teamFormService.addPersonToTeam(this.data).subscribe((res)=>{
        console.log(res);
    })
  }



}
