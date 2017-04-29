import { Component } from '@angular/core';
import { BluetoothSerial } from 'ionic-native';
import {NavController, Platform} from 'ionic-angular';
import {ItemView} from "../itemView/itemview";
import {HomeService} from "./homeservice";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string,personName:any,date:Date,photo:String,photoUser:String,news:String}>;
  post:String;
  aux:String;
  loggedUser:any=this.localStorageService.get("data");


  constructor(public navCtrl: NavController,
  platform:Platform,public homeService:HomeService,public localStorageService:LocalStorageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins ar eavailable.
      // Here you can do any higher level native things you might need.
      // alert("Device Ready");
    });
    this.ngInit();
  }


  ngInit() {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];
    /*for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        name:"aaa",
        date:new Date(),
        photo:"aaa"
      });
    }*/
    this.homeService.getposts(JSON.parse(this.loggedUser).cui).subscribe((res)=>{
      console.log(res);
      this.items=res;
    })
  }

  dateConverter(date:any) {
    var days=["Monday","Tueday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let date1=new Date(date);
    var month=date1.getUTCMonth()+1;
    var hours=date1.getHours()+3;
    var minutes=date1.getMinutes();
    var today=days[date1.getUTCDay()-1];
    var x=today+" "+date1.getUTCDate()+"/"+month+"/"+date1.getUTCFullYear()+" "+hours+":"+minutes;
    return x;

  }

  posting() {
    console.log({personName:JSON.parse(this.loggedUser).name,news:this.post,photo:"http://www.car-brand-names.com/wp-content/uploads/2016/02/Skoda-logo.png",userId:JSON.parse(this.loggedUser)._id});
    this.homeService.post({personName:JSON.parse(this.loggedUser).name,cui:JSON.parse(this.loggedUser).cui,post:this.post,photo:"http://www.car-brand-names.com/wp-content/uploads/2016/02/Skoda-logo.png",
      userId:JSON.parse(this.loggedUser)._id}).subscribe((res)=>{
      console.log(JSON.parse(res._body).post);
        this.items.unshift(
          {title: 'Item '+this.items.length,
              note:res._body.post +"" + this.items.length.toString(),
            icon:this.icons[Math.floor(Math.random()*this.icons.length)],
            personName:JSON.parse(this.loggedUser).name,
            date:new Date(),
            photo:"http://www.car-brand-names.com/wp-content/uploads/2016/02/Skoda-logo.png",
            photoUser:"http://www.car-brand-names.com/wp-content/uploads/2016/02/Skoda-logo.png",
            news:JSON.parse(res._body).post
          }
        );


    })

    this.post="";
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ItemView, {
      item: item
    });
  }

}
