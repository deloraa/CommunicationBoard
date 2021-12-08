#include <SoftwareSerial.h>
SoftwareSerial mySerial(8,9);
void setup()
{
mySerial.begin(9600);   
Serial.begin(9600);   
delay(100);
}
void loop()
{
if (Serial.available()>0){
mySerial.write(Serial.read());
}
if (mySerial.available()>0){
int code = mySerial.read();
if(code == 0){
  Serial.write("Value is 0");
}else if(code == 1){
  Serial.write("Value is 1");
}
}
}
