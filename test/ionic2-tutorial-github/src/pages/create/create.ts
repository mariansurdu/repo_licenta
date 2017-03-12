import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CreateService} from "./create.service";
import {HomePage} from "../home/home";
import {Company} from "../companyForm/company";

@Component({
  selector: 'create',
  templateUrl: 'create.html'
})
export class Create {
email:String;
name:String;
  age:Number;
  username:String;
  password:String;
  teamleader:Boolean;
  worker:Boolean;
  individual:Boolean;
  cui:String;
  data:any;
  messageError:String;

  constructor(public navCtrl: NavController,public createService:CreateService) {
      this.teamleader=false;
      this.individual=false;
      this.worker=false;
  }

  create() {
    this.data={email:this.email,name:this.name,age:this.age,username:this.username,password:this.password,
    teamleader:this.teamleader,worker:this.worker,individual:this.individual,cui:this.cui};
    console.log(this.data);
    this.createService.register(this.data).subscribe((res)=>{
      console.log(res);
      if (res.status==200) {
        this.navCtrl.push(HomePage, {
        });
      }
      else {
        if (this.worker){
          this.messageError="You must check your CUI.Get a right CUI from your team leader to join your company.:)"
        }
        else {
          this.navCtrl.push(Company, {});
        }
      }



    })
  }

}
