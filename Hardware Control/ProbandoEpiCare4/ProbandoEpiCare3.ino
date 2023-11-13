//Incluí las bibliotecas llamadas Time, NTPClient para tener acceso al tiempo real en el que se presiona cada botón 
#include <Time.h> 
#include <NTPClient.h>

//También incluí la biblioteca GSM para conectarla al módulo 
#include <GSM.h>
#include <GSM3CircularBuffer.h>
#include <GSM3IO.h>
#include <GSM3MobileAccessProvider.h>
#include <GSM3MobileCellManagement.h>
#include <GSM3MobileClientProvider.h>
#include <GSM3MobileClientService.h>
#include <GSM3MobileDataNetworkProvider.h>
#include <GSM3MobileMockupProvider.h>
#include <GSM3MobileNetworkProvider.h>
#include <GSM3MobileNetworkRegistry.h>
#include <GSM3MobileServerProvider.h>
#include <GSM3MobileServerService.h>
#include <GSM3MobileSMSProvider.h>
#include <GSM3MobileVoiceProvider.h>
#include <GSM3ShieldV1.h>
#include <GSM3ShieldV1AccessProvider.h>
#include <GSM3ShieldV1BandManagement.h>
#include <GSM3ShieldV1BaseProvider.h>
#include <GSM3ShieldV1CellManagement.h>
#include <GSM3ShieldV1ClientProvider.h>
#include <GSM3ShieldV1DataNetworkProvider.h>
#include <GSM3ShieldV1DirectModemProvider.h>
#include <GSM3ShieldV1ModemCore.h>
#include <GSM3ShieldV1ModemVerification.h>
#include <GSM3ShieldV1MultiClientProvider.h>
#include <GSM3ShieldV1MultiServerProvider.h>
#include <GSM3ShieldV1PinManagement.h>
#include <GSM3ShieldV1ScanNetworks.h>
#include <GSM3ShieldV1ServerProvider.h>
#include <GSM3ShieldV1SMSProvider.h>
#include <GSM3ShieldV1VoiceProvider.h>
#include <GSM3SMSService.h>
#include <GSM3SoftSerial.h>
#include <GSM3VoiceCallService.h>

//Librería para establecer conexiones GPRS, enviar mensajes SMS y realizar llamadas 
#include <TinyGsmClient.h>

//Librería para manejar la conectividad WiFi en el NodeMCU 
#include <ArduinoWiFiServer.h>
#include <BearSSLHelpers.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiGratuitous.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureBearSSL.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiServerSecureBearSSL.h>
#include <WiFiUdp.h>

//Librería para realizar solicitudes HTTP a un servidor intermedio para enviar datos 
#include <ESP8266HTTPClient.h>

//Librería para permitir crear puertos serie virtuales en otros pines distintos a los predeterminados (RX y TX) 
#include <SoftwareSerial.h>

// Constantes de los botones de inicio y final
const int botonIniciarPublicoPin = 5;
const int botonIniciarPrivadoPin = 4;
const int botonDetenerPin = 14;

//Variables para saber a qué hora y minuto es presionado cada botón 
int horaBotonIniciarPublico = 0;
int minutoBotonIniciarPublico = 0;
int horaBotonIniciarPrivado = 0;
int minutoBotonIniciarPrivado = 0;
int horaBotonDetener = 0;
int minutoBotonDetener = 0;

// Variables del cronómetro
unsigned long tiempoInicio = 0;
int segundosTranscurridos = 0;
int minutosTranscurridos = 0; 
bool InicioEstablecido = false;
bool cronometroActivo = false; 

//Variables que controlan si botonIniciarPublicoPin y botonIniciarPrivadoPin han sido presionados y activados 
bool inicioPublicoEstablecido = false; 
bool inicioPrivadoEstablecido = false; 
bool inicioPublicoActivo = false; 
bool inicioPrivadoActivo = false; 

//Creación de la estructura "Tiempo" para que agrupe las variables minutos y segundos en una sola entidad
struct Tiempo {
  unsigned long minutos;
  unsigned long segundos;
};

//Creación de una variable que almacena los datos de la estructura "Tiempo"
Tiempo TiempoTranscurrido = {0, 0};

//Variable para almacenar el tiempo en formato "00:00" 
String formatoTiempo; 

void setup() {
  //Declaración de la velocidad de la comunicación serial 
  Serial.begin(9600);
  
  // Configuración de los pines de los botones como entrada 
  pinMode(botonIniciarPublicoPin, INPUT_PULLUP); 
  pinMode(botonIniciarPrivadoPin, INPUT_PULLUP); 
  pinMode(botonDetenerPin, INPUT_PULLUP);

}

void loop() 
{
  
    //Condicional para que su función sólo se efectue cuando el botonIniciarPrivadoPin fue presionado y el cronómetro no está activo
    if (digitalRead(botonIniciarPublicoPin) == LOW && !cronometroActivo && !inicioPublicoEstablecido && !inicioPrivadoActivo) 
    {
      //Se ejecutará la función CronometroActivo y las variables cronometroActivo, InicioPublicoEstablecido e inicioPublicoActivo pasarán a ser true, de modo que indiquen que empezó su conteo
      CronometroActivo(); 
      horaBotonIniciarPublico = hour(); 
      minutoBotonIniciarPublico = minute(); 
      cronometroActivo = true; 
      inicioPublicoEstablecido = true;
      inicioPublicoActivo = true;
      Serial.print ("Hora de inicio del ataque en público: " + horaBotonIniciarPublico + minutoBotonIniciarPublico); 
    }

    if (digitalRead(botonIniciarPrivadoPin) == LOW && !cronometroActivo && !inicioPrivadoEstablecido && !inicioPublicoActivo) 
    {
      CronometroActivo(); 
      cronometroActivo = true; 
      inicioPrivadoEstablecido = true;
      inicioPrivadoActivo = true; 
    }
    
    //Condicional para que su función sólo se efectue cuando el botonDetenerPin fue presionado y el cronómetro está activo
    if (digitalRead(botonDetenerPin) == LOW && cronometroActivo)
    {
      //Se ejecutará la función CronometroApagado y la variable cronometroActivo pasará a ser false, de modo que indique que terminó su conteo
      CronometroApagado(); 
      cronometroActivo = false; 

      //Todos los bools que determinan si los botones de inicio público y privado pasan a ser false, de forma que puedan ser presionados nuevamente
      inicioPublicoEstablecido = false;
      inicioPrivadoEstablecido = false;
      inicioPublicoActivo = false; 
      inicioPrivadoActivo = false;

      Serial.print ("Tiempo transcurrido: " + formatoTiempo + "\n"); 
      //Función temporal (porque no va a quedar en el código final): se va a imprimir por pantalla cuánto duró el ataque
    }
}

//Creación de una función que describa el procedimiento que seguirá el cronómetro cuando sea presionado
void CronometroActivo()
{
  if (!InicioEstablecido) 
  {
    tiempoInicio = millis();
    InicioEstablecido = true;
  }
}

//Creación de una función que indica qué debe hacer el programa cuando el cronómetro se apaga 
void CronometroApagado ()
{
  unsigned long tiempoActual = millis();
  unsigned long tiempoTranscurrido = tiempoActual - tiempoInicio;
  TiempoTranscurrido.segundos = tiempoTranscurrido / 1000;
  TiempoTranscurrido.minutos = TiempoTranscurrido.segundos / 60;
  TiempoTranscurrido.segundos = TiempoTranscurrido.segundos % 60;
  
  formatoTiempo = "";
  
  //Condicional para que en vez de guardarse "5" minutos, se guarden "05"
  if (TiempoTranscurrido.minutos < 10) 
  {
    formatoTiempo += "0";
  }
  
  //Se le suman los minutos transcurridos a la variable formatoTiempo, además de ":" para, cuando estén los segundos incluidos, haya cierta separación entre ellos
  formatoTiempo += TiempoTranscurrido.minutos;
  formatoTiempo += ":";

  //Si los segundos transcurridos son menos de 10, se le pondrá un 0 adelante, de forma que quede, por ejemplo, "05" en vez de "5"
  if (TiempoTranscurrido.segundos < 10) 
  {
    formatoTiempo += "0";
  }
  
  //A la variable formatoTiempo se le agregan los segundos, de forma que el formato 00:00 con sus respectivos números se cumpla
  formatoTiempo += TiempoTranscurrido.segundos;
  InicioEstablecido = false;
}
