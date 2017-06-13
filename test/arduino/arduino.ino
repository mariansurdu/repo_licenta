/*
Arduino Turn LED On/Off using Serial Commands
Created April 22, 2015
Hammad Tariq, Incubator (Pakistan)

It's a simple sketch which waits for a character on serial
and in case of a desirable character, it turns an LED on/off.

Possible string values:
a (to turn the LED on)
b (tor turn the LED off)
*/
#include <ArduinoJson.h>

char junk;
String inputString="";
int i=0;
int sum0=0;
int sum1=0;
int sum2=0;
int sum3=0;
String x="";
int sensorPin1 = A0;
int sensorPin2 = A1;
int sensorPin3 = A2;
int sensorPin4 = A3;
//for example
//char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";

void setup()                    // run once, when the sketch starts
{
 Serial.begin(9600);            // set the baud rate to 9600, same should be of your Serial Monitor
 pinMode(13, OUTPUT);
 pinMode(sensorPin1, INPUT);
 pinMode(sensorPin2, INPUT);
 pinMode(sensorPin3, INPUT);
 pinMode(sensorPin4, INPUT);
}

void loop()
{  i=i+1;
sum0=0;
sum1=0;
sum2=0;
sum3=0;
for (int i=0;i<100;i++) {
 // Serial.println(analogRead(sensorPin1));
  sum0=sum0+analogRead(0);
   sum1=sum1+analogRead(1);
    sum2=sum2+analogRead(2);
     sum3=sum3+analogRead(3);
  }
float mediaValoare0  =sum0/100;
float mediaValoare1  =sum1/100;
float mediaValoare2  =sum2/100;
float mediaValoare3  =sum3/100;
//Serial.print("Media1");
//Serial.println(mediaValoare0);
//Serial.print("Media2");
///Serial.println(mediaValoare1);
//Serial.print("Media3");
//Serial.println(mediaValoare2);
//Serial.print("Media4");
//Serial.println(mediaValoare3);
//delay(6000);


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
        root["temperature"] = 29;
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

