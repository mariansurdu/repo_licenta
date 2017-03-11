import { Component } from '@angular/core';
import { BluetoothSerial } from 'ionic-native';
import {NavController, Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;


  constructor(public navCtrl: NavController,
  platform:Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins ar eavailable.
      // Here you can do any higher level native things you might need.
      // alert("Device Ready");
    });
    this.ngInit();
  }


  ngInit() {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }


}
