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
int sum=0;
String x="";
int sensorPin = A0;
//for example
//char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";

void setup()                    // run once, when the sketch starts
{
 Serial.begin(9600);            // set the baud rate to 9600, same should be of your Serial Monitor
 pinMode(13, OUTPUT);
 pinMode(sensorPin, INPUT);
}

void loop()
{  i=i+1;
sum=0;
for (int i=0;i<100;i++) {
 // Serial.println(analogRead(sensorPin));
  sum=sum+analogRead(0);
  }
float mediaValoare  =sum/100;
//Serial.print("Media");
//Serial.println(mediaValoare);


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
        root["gas"] = 20;
        root["metan"] = 5;
        root["temperature"] = "29";
        root["nh3"] = 3;
        root["co"] = mediaValoare;
        root["airumidity"] = 50;
        root["co2"]=28;
        root.prettyPrintTo(Serial);

     //char json[]="{\"gas\":20,\"metan\":60,\"temperature\":29,\"nh3\":3,\"co\":30,\"airumidity\":50,\"co2\":28}";
      //Serial.println(root);  
    }
    inputString = "";
  }
}

