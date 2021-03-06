import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfileService} from "./profile.service";
import { LocalStorageService } from 'angular-2-local-storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {
  localData:any;
  profileData:any;
  teamName:any;
  job:any;
  indivUse:any=true;
  constructor(public navCtrl: NavController,public profileService:ProfileService,private localStorageService: LocalStorageService,private spinnerDialog: SpinnerDialog) {

  }

ngOnInit() {
  this.localData=JSON.parse(localStorage.getItem("my-app.data"));
  this.localData=JSON.parse(this.localData);
  this.job=this.localData.personType==1?'TeamLeader':'Worker';
  if (this.localData.personType==3) {
    this.job='-';
    this.indivUse=false;
  }

  console.log(this.localData);
  this.spinnerDialog.show("Loading","Company news");
  this.profileService.find(this.localData._id).subscribe((res)=>{
    this.spinnerDialog.hide();
      this.profileData=res;
    console.log(this.profileData);
  })
  this.profileService.getTeamName(this.localData.email,this.localData.personType).subscribe((res)=>{
    console.log(res);

      this.teamName=res.team;

  })
}


}
