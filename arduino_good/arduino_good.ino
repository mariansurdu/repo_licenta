
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
int piezoPin = 8;

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
StaticJsonBuffer<400> jsonBuffer;
        JsonObject& root = jsonBuffer.createObject();
         root["gas"]=analogRead(A0);
         root["methan"]=analogRead(A1);
         root["temperature"]=analogRead(A2);
         delay(3000);
        root.prettyPrintTo(Serial);
  }



