// Biblioteca para controlar el acelerómetro 
#include <Adafruit_MPU6050.h> 

// Biblioteca del ESP32 
#include <dummy.h> 

// Ajusta este valor según tus necesidades
const int umbralCaida = 11; 

// Variable del acelerómetro
Adafruit_MPU6050 mpu;

void setup() 
{
  //Declaración de la velocidad de la comunicación serial 
  Serial.begin(115200);
  mpu.begin();
}

void loop() 
{
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Detectar caída
  if (a.acceleration.z > umbralCaida) 
  {
    Serial.println("¡Caída detectada!");
  }
  delay(500);
}
