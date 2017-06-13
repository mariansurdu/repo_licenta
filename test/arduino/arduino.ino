
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

double CalcultateTemperature(int RawADC) {  //Function to perform the fancy math of the Steinhart-Hart equation
 double Temp;
 Temp = log(((10240000/RawADC) - 10000));
 Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp );
 Temp = Temp - 273.15;              // Convert Kelvin to Celsius
 Temp = (Temp * 9.0)/ 5.0 + 32.0; // Celsius to Fahrenheit - comment out this line if you need Celsius
 return Temp;
}

void loop()
{  
sum0=0;
sum1=0;
sum2=0;
sum3=0;
sum4=0;

//Calibrate temperature sensor!
if (temperatureAux==0){
 
  temperatureAux=(analogRead((sensorPin5))/10)-10;
  }
 
if (((analogRead((sensorPin5))/10)-10)>temperatureAux){
  
  Serial.println((analogRead((sensorPin5))/10)-10+((((analogRead((sensorPin5))/10)-10)-temperatureAux)*10));
  temperaturaFinala=(analogRead((sensorPin5))/10)-10+((((analogRead((sensorPin5))/10)-10)-temperatureAux)*10);
 
  temperatureAux=((analogRead((sensorPin5))/10)-10)+((((analogRead((sensorPin5))/10)-10)-temperatureAux)*10);
  }
  else {
   temperaturaFinala=(analogRead((sensorPin5))/10)-10;
    }

    
    delay(5000);

    

for (int i=0;i<100;i++) {
  sum0=sum0+analogRead(0);
   sum1=sum1+analogRead(1);
    sum2=sum2+analogRead(2);
     sum3=sum3+analogRead(sensorPin4);
     
  }


  //sensors calibration good!!!!!!!!!!!!!!!!
  
  voltage0=(analogRead(sensorPin1)*3.3)/4095;
float mediaValoare0  =voltage0;
Serial.println("ppm co");
Serial.println(voltage0);
Serial.println(3.027*exp(1.0698*voltage0));

voltage1=(analogRead(sensorPin2)*3.3)/4095;
float mediaValoare1  =voltage1;
Serial.println("ppm methan");
Serial.println(voltage1);
Serial.println(10.938*exp(1.7742*voltage1));

voltage2=(analogRead(sensorPin3)*3.3)/4095;
float mediaValoare2  =voltage2;
Serial.println("ppm gas");
Serial.println(voltage2);
Serial.println(26.572*exp(1.2894*voltage2));

voltage3=analogRead(sensorPin4);
float mediaValoare3  =voltage3;
Serial.println("Air quality:");
Serial.println(voltage3);

voltage4=analogRead(sensorPin5);
float mediaValoare4=CalcultateTemperature(voltage4);
Serial.println("temperature:");
Serial.println(mediaValoare4);




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
        root["temperature"] = temperaturaFinala;
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


