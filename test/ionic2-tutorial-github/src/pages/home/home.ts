import { Component } from '@angular/core';
import { BluetoothSerial } from 'ionic-native';
import {NavController, Platform} from 'ionic-angular';
import {ItemView} from "../itemView/itemview";
import {HomeService} from "./homeservice";
import { LocalStorageService } from 'angular-2-local-storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Vibration } from '@ionic-native/vibration';
import {ImagePicker} from '@ionic-native/image-picker';
import { PhotoLibrary } from '@ionic-native/photo-library';







@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string,personName:any,date:Date,photo:String,photoUser:String,news:String}>;
  post:String;
  aux:String;
  imgForServer:any;
  options:any
  testPhoto:any
  loggedUser:any=this.localStorageService.get("data");


  constructor(public navCtrl: NavController,
  platform:Platform,public homeService:HomeService,public localStorageService:LocalStorageService,private spinnerDialog: SpinnerDialog,private sms: SMS,
              private localNotifications: LocalNotifications,private photoViewer: PhotoViewer,private vibration: Vibration,
  private imagePicker:ImagePicker,private photoLibrary: PhotoLibrary) {
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
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'key' }
    });
    //this.sms.send('0733931547', 'Hello world!');
   // this.photoViewer.show('http://www.car-brand-names.com/wp-content/uploads/2016/02/Skoda-logo.png');
    this.spinnerDialog.show("Loading","Company news");
    this.vibration.vibrate(2000);

/*    this.imagePicker.getPictures({
      width: 100,
      height: 100,
      quality: 70}).then((results)=>{
      alert(results.length);
      for (var i=0;i<results.length;i++) {
        alert("Image Uri:"+results[i]);
      }
      this.testPhoto=results[0];
      this.imgForServer=this.getBase64Image(document.getElementById("testPhoto"));

    })*/





    this.homeService.getposts(JSON.parse(this.loggedUser).cui).subscribe((res)=>{
      console.log(res);
      this.spinnerDialog.hide();
      this.items=res;
    })
  }
  getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

  addPhoto() {
    alert("Get p")
    this.imagePicker.getPictures({
      width: 100,
      height: 100,
      quality: 70}).then((results)=>{
      alert(results.length);
      for (var i=0;i<results.length;i++) {
        alert("Image Uri:"+results[i]);
      }
      this.testPhoto=results[0];
      this.imgForServer=this.getBase64Image(document.getElementById("testPhoto"));

    })
  }


  dateConverter(date:any) {
  var days=["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday"];
  let date1=new Date(date);
  var month=date1.getUTCMonth()+1;
  var hours=date1.getHours()+1;
  var minutes=date1.getMinutes();
  var today=days[date1.getUTCDay()];
  var x=today+" "+date1.getUTCDate()+"/"+month+"/"+date1.getUTCFullYear()+" "+hours+":"+minutes;
  return x;

}

  posting() {
    console.log({personName:JSON.parse(this.loggedUser).name,news:this.post,userId:JSON.parse(this.loggedUser)._id});
    this.homeService.post({personName:JSON.parse(this.loggedUser).name,cui:JSON.parse(this.loggedUser).cui,post:this.post,photo:this.imgForServer,
      userId:JSON.parse(this.loggedUser)._id}).subscribe((res)=>{
      console.log(JSON.parse(res._body).post);
        this.items.unshift(
          {title: 'Item '+this.items.length,
              note:res._body.post +"" + this.items.length.toString(),
            icon:this.icons[Math.floor(Math.random()*this.icons.length)],
            personName:JSON.parse(this.loggedUser).name,
            date:new Date(),
            photo:this.testPhoto,
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
