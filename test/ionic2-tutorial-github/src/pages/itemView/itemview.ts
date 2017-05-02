import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'itemview',
  templateUrl: 'itemview.html'
})
export class ItemView {
  selectedItem:any;
  constructor(public navCtrl: NavController,public navParams:NavParams,private photoViewer: PhotoViewer) {
    this.selectedItem=navParams.get('item');
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

  imgClick() {
    this.photoViewer.show(this.selectedItem.photo);
  }

}
