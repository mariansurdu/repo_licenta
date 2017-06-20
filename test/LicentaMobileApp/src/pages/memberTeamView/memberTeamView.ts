import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {PersonalDataService} from "../personalData/personalData.service";
import { LocalStorageService } from 'angular-2-local-storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'memberTeamView',
  templateUrl: 'memberTeamView.html'
})
export class MemberTeamView {
  selectedItem:any;
  data:any;
  worker:any=false;
  teamleader:any=false;
  labels:any=[];
  arrayGas:any=[];
  arrayMetan:any=[];
  arraySmoke:any=[];
  arrayNOX:any=[];
  arrayCO:any=[];
  arrayCO2:any=[];
  arrayAirQuality:any=[];
  arrayTemperature:any=[];

  labels1:any=[];
  arrayGas1:any=[];
  arrayMetan1:any=[];
  arraySmoke1:any=[];
  arrayNOX1:any=[];
  arrayCO1:any=[];
  arrayCO21:any=[];
  arrayAirQuality1:any=[];
  arrayTemperature1:any=[];


  timeStarts:any=[];
  auxData:any=[];
  message:any;
  localData:any=JSON.parse(localStorage.getItem("my-app.data"));
  public lineChartType:string = 'line';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public days:any=['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  public barChartLabels:string[] = this.labels;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0,0,0,0,0,0,0,0], label: 'Gas'},
    {data: [0,0,0,0,0,0,0,0], label: 'Metan'},
    {data: [0,0,0,0,0,0,0,0], label: 'Smoke'},
    {data: [0,0,0,0,0,0,0,0], label: 'NOx'},
    {data: [0,0,0,0,0,0,0,0], label: 'CO'},
    {data: [0,0,0,0,0,0,0,0], label: 'CO2'},
    {data: [0,0,0,0,0,0,0,0], label: 'Air quality'},
    {data: [0,0,0,0,0,0,0,0], label: 'Temperature'}
  ];
  public lineChartType1:string = 'line';
  public barChartLabels1:string[] = this.labels1;
  public barChartType1:string = 'bar';
  public barChartLegend1:boolean = true;

  public barChartData1:any[] = [
    {data: [0,0,0,0,0,0,0,0], label: 'Gas'},
    {data: [0,0,0,0,0,0,0,0], label: 'Metan'},
    {data: [0,0,0,0,0,0,0,0], label: 'Smoke'},
    {data: [0,0,0,0,0,0,0,0], label: 'NOx'},
    {data: [0,0,0,0,0,0,0,0], label: 'CO'},
    {data: [0,0,0,0,0,0,0,0], label: 'CO2'},
    {data: [0,0,0,0,0,0,0,0], label: 'Air quality'},
    {data: [0,0,0,0,0,0,0,0], label: 'Temperature'}
  ];
  constructor(public navCtrl: NavController,public navParams:NavParams,public personalDataService:PersonalDataService,public localStorageService:LocalStorageService,
              private spinnerDialog: SpinnerDialog) {
    this.selectedItem=navParams.get('item');
    console.log(this.selectedItem);
    this.timeStarts=new Date("MMM-DD-YYYY");
    console.log(JSON.parse(this.localData).personType);
    if (JSON.parse(this.localData).personType==1) {
      alert("You are teamleader")
      this.teamleader=true;
    }
    if (JSON.parse(this.localData).personType==2) {
      alert("You are worker");
      this.worker=true;
    }
  }


  ngOnInit() {
    if (this.teamleader) {
      this.spinnerDialog.show("Loading","Member Data");
    this.personalDataService
       .getData(JSON.parse(this.localData)._id)
       .subscribe((res) => {
         this.spinnerDialog.hide();
       if (res.length!=0) {
       this.message="";
       this.data = res[0].dataUser[0].airumidity;
       for (var i = 0; i < res[0].dataUser.length; i++) {
       this.arrayAirQuality1.push(res[0].dataUser[i].airumidity);
       this.arrayMetan1.push(res[0].dataUser[i].metan);
       this.arrayCO1.push(res[0].dataUser[i].co);
       this.arrayCO21.push(res[0].dataUser[i].co2);
       this.arraySmoke1.push(res[0].dataUser[i].smoke);
         this.arrayNOX1.push(res[0].dataUser[i].Nox);
       this.arrayGas1.push(res[0].dataUser[i].gas);
         this.arrayTemperature1.push(res[0].dataUser[i].temperature);
       this.labels1.push(this.days[new Date(res[0].dataUser[i].date).getDay()]);
       //aaaaaa
       }
       this.barChartData1 = [
       {data: this.arrayGas1, label: 'Gas'},
       {data: this.arrayMetan1, label: 'Metan'},
       {data: this.arraySmoke1, label: 'Smoke'},
       {data: this.arrayCO1, label: 'CO'},
         {data: this.arrayNOX1, label: 'NOx'},
       {data: this.arrayCO21, label: 'CO2'},
       {data: this.arrayAirQuality1, label: 'Air quality'},
         {data:this.arrayTemperature1,label:'Temperature'}
       ];

       this.barChartLabels1 = this.labels1;
       console.log(this.barChartLabels);

       }
       else  {
       this.message="You dont have records :(";
       }

       });
  }
  else {
      console.log("Not a teamleader!");
    }
}
  dateConverter(date:any) {

    let date1=new Date(date);
    let yminutes=""
    var hours=date1.getHours()+3;
    var minutes=date1.getMinutes();
    if (minutes<10)
      yminutes=0+""+minutes.toString();
    else
      yminutes=minutes+"";
    var x=hours+":"+yminutes;
    return x;

  }

  getStatistics() {
    this.spinnerDialog.show("Loading","Statistics");
    this.personalDataService.getStatistics(this.timeStarts,JSON.parse(this.localData)._id).subscribe((res)=> {
      console.log((JSON.parse(res._body)));
      this.spinnerDialog.hide();
      this.auxData = JSON.parse(res._body);
      if (this.auxData.length == 0) {
        this.labels=[];
        this.arrayAirQuality = [];
        this.arrayMetan = [];
        this.arrayCO= [];
        this.arrayCO2 = [];
        this.arraySmoke = [];
        this.arrayNOX=[];
        this.arrayGas = [];
        this.arrayTemperature=[];

        for (var i = 0; i < 3; i++) {
          this.arrayAirQuality.push(0);
          this.arrayMetan.push(0);
          this.arrayCO.push(0);
          this.arrayCO2.push(0);
          this.arraySmoke.push(0);
          this.arrayNOX.push(0);
          this.arrayGas.push(0);
          this.arrayTemperature.push(0);
          this.labels.push('-');
        }
        this.barChartData = [
          {data: this.arrayGas, label: 'Gas'},
          {data: this.arrayMetan, label: 'Metan'},
          {data: this.arraySmoke, label: 'NH3'},
          {data: this.arrayCO, label: 'CO'},
          {data: this.arrayNOX, label: 'NOx'},
          {data: this.arrayCO2, label: 'CO2'},
          {data: this.arrayAirQuality, label: 'Air quality'},
          {data:this.arrayTemperature,label:'Temperature'}
        ];
      }
      else{

        this.arrayAirQuality = [];
        this.arrayMetan = [];
        this.arrayCO = [];
        this.arrayCO2 = [];
        this.arraySmoke = [];
        this.arrayNOX=[];
        this.arrayGas = [];

        for (var i = 0; i < this.auxData.length; i++) {
          this.labels.push(this.dateConverter(new Date(this.auxData[i].date)));
          this.arrayAirQuality.push(this.auxData[i].airumidity);
          this.arrayMetan.push(this.auxData[i].metan);
          this.arrayCO.push(this.auxData[i].co);
          this.arrayCO2.push(this.auxData[i].co2);
          this.arraySmoke.push(this.auxData[i].smoke);
          this.arrayNOX.push(this.auxData[i].Nox);
          this.arrayTemperature.push(this.auxData[i].temperature);
          this.arrayGas.push(this.auxData[i].gas);

        }
        this.barChartData= [
          {data: this.arrayGas, label: 'Gas'},
          {data: this.arrayMetan, label: 'Metan'},
          {data: this.arraySmoke, label: 'Smoke'},
          {data: this.arrayNOX, label: 'NOx'},
          {data: this.arrayCO, label: 'CO'},
          {data: this.arrayCO2, label: 'CO2'},
          {data: this.arrayAirQuality, label: 'Air quality'},
          {data:this.arrayTemperature,label:'Temperature'}
        ];
      }
    })
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomizeType1():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }
  public randomizeType2():void {
    this.barChartType1 = this.barChartType1 === 'line' ? 'bar' : 'line';
  }

}
