#include "HardwareSerial.h"
#include "DFRobotDFPlayerMini.h"

//Utiliza los puertos TX2 y RX2 para la conexión del hardware
HardwareSerial mySerial(2); 
DFRobotDFPlayerMini myDFPlayer;

void setup() 
{
  Serial.begin(115200);
  mySerial.begin(9600);

  //Ajusta el volumen a su máximo 
  myDFPlayer.volume(30); 
}

void loop() 
{
  // Reproduce el archivo con el número de índice 0, el cual corresponde al primero 
  myDFPlayer.play(0);

  //Espera 5 segundos antes de reproducir de nuevo 
  delay(5000); 
}
