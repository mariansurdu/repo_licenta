#include <ArduinoJson.h>

#define         MQ_PIN_CO                    (0)
#define         MQ_PIN_METHAN                (1)  
#define         MQ_PIN_GAS                   (2)     //define which analog input channel you are going to use
#define         RL_VALUE                     (10)     //define the load resistance on the board, in kilo ohms
#define         RO_CLEAN_AIR_FACTOR          (9.83)  //RO_CLEAR_AIR_FACTOR=(Sensor resistance in clean air)/RO,
                                                     //which is derived from the chart in datasheet
 
/***********************Software Related Macros************************************/
#define         CALIBARAION_SAMPLE_TIMES     (50)    //define how many samples you are going to take in the calibration phase
#define         CALIBRATION_SAMPLE_INTERVAL  (10)   //define the time interal(in milisecond) between each samples in the
                                                     //cablibration phase
#define         READ_SAMPLE_INTERVAL         (50)    //define how many samples you are going to take in normal operation
#define         READ_SAMPLE_TIMES            (5)     //define the time interal(in milisecond) between each samples in 
                                                     //normal operation
 
/**********************Application Related Macros**********************************/
#define         GAS_LPG                      (0)
#define         GAS_CO                       (1)
#define         GAS_SMOKE                    (2)
#define         GAS_CO_MQ7                   (3)
#define         GAS_METHAN_MQ4               (4) 
 
/*****************************Globals***********************************************/
float           LPGCurve[3]  =  {2.3,0.21,-0.47};   //two points are taken from the curve. 
                                                    //with these two points, a line is formed which is "approximately equivalent"
                                                    //to the original curve. 
                                                    //data format:{ x, y, slope}; point1: (lg200, 0.21), point2: (lg10000, -0.59) 
float           COCurve[3]  =  {2.3,0.72,-0.34};    //two points are taken from the curve. 
                                                    //with these two points, a line is formed which is "approximately equivalent" 
                                                    //to the original curve.
                                                    //data format:{ x, y, slope}; point1: (lg200, 0.72), point2: (lg10000,  0.15) 
float           SmokeCurve[3] ={2.3,0.53,-0.44};    //two points are taken from the curve. 
  
                                                    //with these two points, a line is formed which is "approximately equivalent" 
float          MetanCurve[3]={2.0,0.4,-0.5};                                                   //to the original curve.


float          CO_MQ7Curve[3]={2.1,0.5,-0.55}; 

                                                  
float           Ro0           =  10;
float           Ro1          =  10;//Ro is initialized to 10 kilo ohms
float           Ro2           =  10;

int sensorPin4 = A3;
int sensorPin5=A4;
char junk;
String inputString="";



 
void setup()
{
  Serial.begin(9600);                               //UART setup, baudrate = 9600bps
 // Serial.print("Calibrating...\n");                
  Ro0 = MQCalibration(MQ_PIN_CO);
  Ro1=MQCalibration(MQ_PIN_METHAN);                     //Calibrating the sensor. Please make sure the sensor is in clean air 
  Ro2=MQCalibration(MQ_PIN_GAS);                                                  //when you perform the calibration                    
  
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

float calculatePPMAirquality(int mqInput) {
  int mqR = 22000;
long rO = 41763;
float minRsRo = 0.358;
float maxRsRo = 2.428;
float a = 116.6020682;
float b = -2.769034857;

    int adcRaw = analogRead(mqInput);
  long rS = ((1024.0 * mqR) / adcRaw) - mqR;
  
  float rSrO = (float)rS / (float)rO;

  if(rSrO < maxRsRo && rSrO > minRsRo) {
 float ppm = a * pow((float)rS / (float)rO, b);
 return ppm;
}
else {
 return 1.1;
  }
}
 
void loop()
{
  


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
        root["gas"] = MQGetGasPercentage(MQRead(MQ_PIN_GAS)/Ro0,GAS_LPG);
        root["metan"] = MQGetGasPercentage(MQRead(MQ_PIN_METHAN)/Ro2,GAS_METHAN_MQ4);
        root["temperature"] = readTempInCelsius(100,sensorPin5)/5.5;
        root["smoke"] = MQGetGasPercentage(MQRead(MQ_PIN_GAS)/Ro0,GAS_SMOKE);
        root["Nox"]=MQGetGasPercentage(MQRead(MQ_PIN_GAS)/Ro0,GAS_SMOKE)*0.7;
        root["co"] = MQGetGasPercentage(MQRead(MQ_PIN_GAS)/Ro0,GAS_CO)/10;
        root["airumidity"] = analogRead(sensorPin4);
        root["co2"]=analogRead(sensorPin4)*3.793;
          
          
        root.prettyPrintTo(Serial);

     //char json[]="{\"gas\":20,\"metan\":60,\"temperature\":29,\"nh3\":3,\"co\":30,\"airumidity\":50,\"co2\":28}";
      //Serial.println(root);  
    }
    inputString = "";
  }

   
}
 
/****************** MQResistanceCalculation ****************************************
Input:   raw_adc - raw value read from adc, which represents the voltage
Output:  the calculated sensor resistance
Remarks: The sensor and the load resistor forms a voltage divider. Given the voltage
         across the load resistor and its resistance, the resistance of the sensor
         could be derived.
************************************************************************************/ 
float MQResistanceCalculation(int raw_adc)
{
  return ( ((float)RL_VALUE*(1023-raw_adc)/raw_adc));
}
 
/***************************** MQCalibration ****************************************
Input:   mq_pin - analog channel
Output:  Ro of the sensor
Remarks: This function assumes that the sensor is in clean air. It use  
         MQResistanceCalculation to calculates the sensor resistance in clean air 
         and then divides it with RO_CLEAN_AIR_FACTOR. RO_CLEAN_AIR_FACTOR is about 
         10, which differs slightly between different sensors.
************************************************************************************/ 
float MQCalibration(int mq_pin)
{
  int i;
  float val=0;
 
  for (i=0;i<CALIBARAION_SAMPLE_TIMES;i++) {            //take multiple samples
    val += MQResistanceCalculation(analogRead(mq_pin));
    delay(CALIBRATION_SAMPLE_INTERVAL);
  }
  val = val/CALIBARAION_SAMPLE_TIMES;                   //calculate the average value
 
  val = val/RO_CLEAN_AIR_FACTOR;                        //divided by RO_CLEAN_AIR_FACTOR yields the Ro 
                                                        //according to the chart in the datasheet 
 
  return val; 
}
/*****************************  MQRead *********************************************
Input:   mq_pin - analog channel
Output:  Rs of the sensor
Remarks: This function use MQResistanceCalculation to caculate the sensor resistenc (Rs).
         The Rs changes as the sensor is in the different consentration of the target
         gas. The sample times and the time interval between samples could be configured
         by changing the definition of the macros.
************************************************************************************/ 
float MQRead(int mq_pin)
{
  int i;
  float rs=0;
 
  for (i=0;i<READ_SAMPLE_TIMES;i++) {
    rs += MQResistanceCalculation(analogRead(mq_pin));
    delay(READ_SAMPLE_INTERVAL);
  }
 
  rs = rs/READ_SAMPLE_TIMES;
 
  return rs;  
}
 
/*****************************  MQGetGasPercentage **********************************
Input:   rs_ro_ratio - Rs divided by Ro
         gas_id      - target gas type
Output:  ppm of the target gas
Remarks: This function passes different curves to the MQGetPercentage function which 
         calculates the ppm (parts per million) of the target gas.
************************************************************************************/ 
int MQGetGasPercentage(float rs_ro_ratio, int gas_id)
{
  if ( gas_id == GAS_LPG ) {
     return MQGetPercentage(rs_ro_ratio,LPGCurve);
  } else if ( gas_id == GAS_CO ) {
     return MQGetPercentage(rs_ro_ratio,COCurve);
  } else if ( gas_id == GAS_SMOKE ) {
     return MQGetPercentage(rs_ro_ratio,SmokeCurve);
  } 
  else if ( gas_id == GAS_CO_MQ7 ) {
     return MQGetPercentage(rs_ro_ratio,CO_MQ7Curve);
  }     
  else if (gas_id==GAS_METHAN_MQ4) {
    return MQGetPercentage(rs_ro_ratio,MetanCurve);
    }
 
  return 0;
}
 
/*****************************  MQGetPercentage **********************************
Input:   rs_ro_ratio - Rs divided by Ro
         pcurve      - pointer to the curve of the target gas
Output:  ppm of the target gas
Remarks: By using the slope and a point of the line. The x(logarithmic value of ppm) 
         of the line could be derived if y(rs_ro_ratio) is provided. As it is a 
         logarithmic coordinate, power of 10 is used to convert the result to non-logarithmic 
         value.
************************************************************************************/ 
int  MQGetPercentage(float rs_ro_ratio, float *pcurve)
{
  return (pow(10,( ((log(rs_ro_ratio)-pcurve[1])/pcurve[2]) + pcurve[0])));
}

