import { Component } from '@angular/core';

import {NavController, Platform} from 'ionic-angular';
import {BluetoothSerial} from "ionic-native/dist/es5/index";
import { AlertController } from 'ionic-angular';
import {FunctionsService} from "./functions.service";

@Component({
  selector: 'functions',
  templateUrl: 'functions.html'
})
export class Functions {
  public data:any;
  public gas:any;
  public metan:any;
  public temperature:any;
  public nh3:any;
  public co:any;
  public airumidity:any;
  public co2:any;
  monStart:Boolean;
  devices:any;
  connected:Boolean;
  onConnect:Boolean;
  public test:any;


  constructor(public navCtrl: NavController,platform:Platform,public alertCtrl: AlertController,
  public functionsService:FunctionsService
  ) {
    platform.ready().then(() => {
      this.monStart = false;
        this.showListOfDevices();
         this.metan=0;this.co2=0;this.co=0;this.airumidity=0;this.nh3=0;this.temperature=0;this.gas=0;
    });
  }
  public lineChartType:string = 'line';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 34, 55, 40], label: 'Gas'},
    {data: [10, 48, 40, 19, 86, 27, 90], label: 'Metan'},
    {data: [12, 48, 40, 19, 12, 27, 90], label: 'NH3'},
    {data: [60, 48, 40, 19, 22, 27, 90], label: 'CO'},
    {data: [35, 48, 40, 19, 52, 27, 90], label: 'CO2'}
  ];





  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



  connect() {
    BluetoothSerial.connect('98:D3:31:90:52:03').subscribe(res=>{
      let alert = this.alertCtrl.create({
        title: 'Awesome',
        subTitle: 'You are now connected to HG-05! :)',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  writeDataToSerial() {
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
          BluetoothSerial.read().then((response)=> {
           this.data=JSON.parse(response);
            this.gas=this.data.gas;
            this.metan=this.data.metan;
            this.temperature=this.data.temperature;
            this.co=this.data.co;
            this.nh3=this.data.nh3;
            this.airumidity=this.data.airumidity;
            this.co2=this.data.co2;
            this.functionsService.saveData(this.data).subscribe((res)=>{
            })
            
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
    alert(id);
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
