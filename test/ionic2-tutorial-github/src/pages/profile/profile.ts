import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfileService} from "./profile.service";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {
  localData:any;
  profileData:any;
  job:any;
  constructor(public navCtrl: NavController,public profileService:ProfileService,private localStorageService: LocalStorageService) {

  }

ngOnInit() {
  this.localData=JSON.parse(localStorage.getItem("my-app.data"));
  this.localData=JSON.parse(this.localData);
  this.job=this.localData.personType==1?'TeamLeader':'Worker';
  if (this.job==3) { 
    this.job='Liber profesionist!';
  }
  console.log(this.localData);

  this.profileService.find(this.localData._id).subscribe((res)=>{
      this.profileData=res;
    console.log(this.profileData);
  })
}


}
