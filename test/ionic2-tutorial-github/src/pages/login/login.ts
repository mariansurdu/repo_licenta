import {Component, ViewChild} from '@angular/core';

import {NavController, Nav} from 'ionic-angular';
import {LoginService} from "./login.service";
import {Settings} from "../settings/settings";
import {HomePage} from "../home/home";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,public loginService:LoginService) {

  };
  email:String;
  password:String;
  login() {
    console.log("1"+this.email);
    this.loginService.login(this.email,this.password).subscribe((res)=>{
      console.log(res.status);
      if(res.status==200) {
        this.navCtrl.push(HomePage);
      }
    });
  }

}
