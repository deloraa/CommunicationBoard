#include <SoftwareSerial.h>
SoftwareSerial mySerial(8,9);
void setup()
{
  mySerial.begin(9600);   
  Serial.begin(9600);   
  delay(100);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
}

bool toggle = false;

void loop()
{
/*if (Serial.available()>0){
    mySerial.write(Serial.read());
}Serial.write("Value is 0");
  if (Serial.available()>0){
    mySerial.write(Serial.read());
  }*/
if (mySerial.available()>0){
  int code = mySerial.read();

  if(code == 3){
    if (Serial.available()>0){
      Serial.write("Value is 3");
    }
    if(toggle == false){
      toggle = true;
      digitalWrite(LED_BUILTIN, HIGH);
    }else{
      toggle = false;
      digitalWrite(LED_BUILTIN, LOW);
    }
    }
  }
}
