import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CompanyService} from "./company.service";

@Component({
  selector: 'company',
  templateUrl: 'company.html'
})
export class Company {
  name:String;
  cui:String;
  email:String;
  data:any;
  message:String;
  constructor(public navCtrl: NavController,public companyService:CompanyService) {
  //    alert("this")
  }

  createCompany() {
     this.data={email:this.email,name:this.name,cui:this.cui};
    this.companyService.register(this.data).subscribe((res)=>{
      if (res.status==200)
        this.message="Company added successfully!Go back and save your account! :)";
        else
        this.message="Check your data.Probably this CUI is used and you missed something :)";
    })
  }

}
