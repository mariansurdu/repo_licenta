import { Component } from '@angular/core';

import {NavController, Platform} from 'ionic-angular';
import {BluetoothSerial} from "ionic-native/dist/es5/index";

@Component({
  selector: 'functions',
  templateUrl: 'functions.html'
})
export class Functions {
  public data:any;
  monStart:Boolean;
  devices:any;
  connected:Boolean;
  onConnect:Boolean;
  public test:any;


  constructor(public navCtrl: NavController,platform:Platform) {
    platform.ready().then(() => {
       /* this.monStart = false;
        this.showListOfDevices();*/
      this.devices=[{"name":"Test","id":"123124124124141241241"}];
    });
  }


  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [1, 18, 10, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['Gas', 'Air Quality', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];

  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



  connect() {
    alert("OnConnect!");
    //BluetoothSerial.subscribe('/n');
    BluetoothSerial.connect('98:D3:31:90:52:03').subscribe(res=>{
      alert(res);
    });
  }

  writeDataToSerial() {
    this.test="pula";
    alert("Write");
    BluetoothSerial.write("a").then((response)=>{
      alert(JSON.stringify(response));
    })
    BluetoothSerial.write("a").then((response)=>{
      alert(JSON.stringify(response));
    })
  }

  readData(){
    if(this.monStart) {


    }
  }

  stopMonitorizing(){
    this.monStart=false;
  }



  stopRead() {
    this.monStart=false;
  }

  startRead(){
    this.monStart=true;
    setInterval(function (){
      if (this.monStart)
        this.readDataFromSerial();
    }, 3000)
  }

  readDataFromSerial() {
    this.test="aaa";
    BluetoothSerial.write("g").then((response)=> {
        setTimeout(() => {
          alert("writed");
          BluetoothSerial.read().then((response)=> {
           this.data=response;
          })
        }, 1000)
      })
  }

  startMonitorizing() {
    this.monStart=true;
    setInterval(()=>{
      if (this.monStart)
      this.readDataFromSerial();
    },2000)
  }

  connectToDevice(id:any):void {
    this.onConnect=true;
    BluetoothSerial.connect(id).subscribe((res)=>{
      this.connected=true;
      this.onConnect=false;
    });
  }


  showListOfDevices() {
    BluetoothSerial.list().then((response)=>{
      alert("Devices:"+JSON.stringify(response));
      this.devices=response;
    })
  }


}
