import { Component } from '@angular/core';
import { BluetoothSerial } from 'ionic-native';

import { NavController,Platform } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
data:any;
  constructor(public navCtrl: NavController,
              platform:Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins ar eavailable.
      // Here you can do any higher level native things you might need.

      alert("Device Ready");
    });
  }

  connect() {
    alert("OnConnect!");
    //BluetoothSerial.subscribe('/n');
    BluetoothSerial.connect('98:D3:31:90:52:03').subscribe(res=>{
      alert(res);
    });
  }

  writeDataToSerial() {
    alert("Write");
    BluetoothSerial.write("a").then((response)=>{
      alert(JSON.stringify(response));
    })
    BluetoothSerial.write("a").then((response)=>{
      alert(JSON.stringify(response));
    })
  }

  readDataFromSerial() {
    this.data=BluetoothSerial.read().then((response)=>{
      alert("DAta");
      alert(JSON.stringify(response));
    })

  }


  showListOfDevices() {
    BluetoothSerial.list().then((response)=>{
      alert("Devices:"+JSON.stringify(response));
    })
  }

}
