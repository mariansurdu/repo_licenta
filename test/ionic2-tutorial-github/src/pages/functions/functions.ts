import { Component } from '@angular/core';

import {NavController, Platform} from 'ionic-angular';
import {BluetoothSerial} from "ionic-native/dist/es5/index";

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


  constructor(public navCtrl: NavController,platform:Platform) {
    platform.ready().then(() => {
      this.monStart = false;
        this.showListOfDevices();
      /*this.devices=[{"name":"Test","id":"123124124124141241241"}];*/
    });
  }

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 200], label: 'Series B'}
  ];
  public lineChartLabels:Array<any> = ['1M', '2M', '3M', '4M',"5M"];
  public lineChartLegend:Array<any> = ['Gas', 'Metan', 'NH3', 'CO',"CO2"];
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
