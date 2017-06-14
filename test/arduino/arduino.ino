
#include <ArduinoJson.h>

char junk;
String inputString="";
int i=0;
int sum0=0;
int sum1=0;
int sum2=0;
int sum3=0;
int sum4=0;
String x="";
int sensorPin1 = A0;
int sensorPin2 = A1;
int sensorPin3 = A2;
int sensorPin4 = A3;
int sensorPin5=A4;
int temperatureAux=0;
int temperaturaFinala=0;

//voltages
float voltage0=0;
float voltage1=0;
float voltage2=0;
float voltage3=0;
float voltage4=0;


void setup()                  
{
 Serial.begin(9600);      
 pinMode(13, OUTPUT);
 pinMode(sensorPin1, INPUT);
 pinMode(sensorPin2, INPUT);
 pinMode(sensorPin3, INPUT);
 pinMode(sensorPin4, INPUT);
 pinMode(sensorPin5,INPUT);
}

float readTempInCelsius(int count, int pin) {
  float temperaturaMediata = 0;
  float sumaTemperatura = 0;
  for (int i =0; i < count; i++) {
    int reading = analogRead(pin);
    float voltage = reading * 5.0;
    voltage /= 1024.0;
    float temperatureCelsius = (voltage - 0.5) * 100 ;
    sumaTemperatura = sumaTemperatura + temperatureCelsius;
  }
  return sumaTemperatura / (float)count;
}

void loop()
{  
//sensors calibration good!!!!!!!!!!!!!!!!
  
  voltage0=(analogRead(sensorPin1)*3.3)/4095;
float mediaValoare0  =3.027*exp(1.0698*voltage0);
//Serial.println("ppm co");
//Serial.println(voltage0);
//Serial.println(3.027*exp(1.0698*voltage0));

voltage1=(analogRead(sensorPin2)*3.3)/4095;
float mediaValoare1  =10.938*exp(1.7742*voltage1);
//Serial.println("ppm methan");
//Serial.println(voltage1);
//Serial.println(10.938*exp(1.7742*voltage1));

voltage2=(analogRead(sensorPin3)*3.3)/4095;
float mediaValoare2  =26.572*exp(1.2894*voltage2);
//Serial.println("ppm gas");
//Serial.println(voltage2);
//Serial.println(26.572*exp(1.2894*voltage2));

voltage3=analogRead(sensorPin4);
float mediaValoare3  =voltage3;
//Serial.println("Air quality:");
//Serial.println(voltage3);

voltage4=analogRead(sensorPin5);
float mediaValoare4=readTempInCelsius(100,sensorPin5)/5.5;
//Serial.println("temperature:");
//Serial.println(mediaValoare4);




//**************************************************



  if(Serial.available()){
  while(Serial.available())
    {
      char inChar = (char)Serial.read(); //read the input
      inputString += inChar;        //make a string of the characters coming on serial
    }
    //Serial.write("[1,2,3,4]");
    while (Serial.available() > 0)  
    { junk = Serial.read() ; }      // clear the serial buffer
    if(inputString == "g"){  
    //  json="{'gas:'" + String(345678,DEC)+"," + "'metan:'" + String(3457878,DEC)+","+"'temperature:'" + String(345678,DEC)+","+"nh3:'" + String(345678,DEC)+","+"'co:'" + String(345678,DEC)+"," + "'air umidity:'" + String(3457878,DEC)+","+"'co2:'" + String(341678,DEC)+"}";
        int valoare=analogRead(0);
        StaticJsonBuffer<400> jsonBuffer;
        JsonObject& root = jsonBuffer.createObject();
        root["gas"] = mediaValoare2;
        root["metan"] = mediaValoare1;
        root["temperature"] = mediaValoare4;
        root["nh3"] = mediaValoare3;
        root["co"] = mediaValoare0;
        root["airumidity"] = mediaValoare3;
        root["co2"]=mediaValoare2;
        root.prettyPrintTo(Serial);

     //char json[]="{\"gas\":20,\"metan\":60,\"temperature\":29,\"nh3\":3,\"co\":30,\"airumidity\":50,\"co2\":28}";
      //Serial.println(root);  
    }
    inputString = "";
  }
}


