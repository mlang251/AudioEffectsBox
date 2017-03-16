// Arduino serial for filter

long randomvalue = 0; // random value
long qValue = 0;
long countervalue = 0;
long centerFreqValue = 0;
int serialvalue; // value for serial input
int started = 0; // flag for whether we've received serial yet

void setup()
{
  Serial.begin(9600); // open the arduino serial port
}

void loop()
{
  if(Serial.available()) // check to see if there's serial data in the buffer
  {
    serialvalue = Serial.read(); // read a byte of serial data
    
    if(serialvalue == 0)
    {
      started = 0; // set the flag to turn off
    }
    else
    {
      started = 1; // set the started flag to on
    }
  }

  if(started) // loop once serial data has been received
  {
    
    // center frequency is on a sweep, gets incremented every time
    centerFreqValue = countervalue;
    
    // qValue updated every 3 seconds (3*20ms)
    if(countervalue%60 == 0)
    {
      randomvalue = random(5);
      qValue = randomvalue;
    }
    
    Serial.print(centerFreqValue); // print the counter
    Serial.print(" "); // print a space
    Serial.print(qValue); // print the random value
    Serial.print(" "); // print a space
    Serial.print(serialvalue); // echo the received serial value
    Serial.println(); // print a line-feed
    
    countervalue = (countervalue+2)%1000; // increment the counter
    delay(100); // pause
  }
}
