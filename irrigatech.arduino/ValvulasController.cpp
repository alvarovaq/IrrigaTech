#include "ValvulasController.h"
#include <Arduino.h>

#define VAL1 13
#define VAL2 12
#define VAL3 14
#define VAL4 27
#define VAL5 26
#define VAL6 25

void ValvulasController::init() const
{
  pinMode(VAL1, OUTPUT);
  pinMode(VAL2, OUTPUT);
  pinMode(VAL3, OUTPUT);
  pinMode(VAL4, OUTPUT);
  pinMode(VAL5, OUTPUT);
  pinMode(VAL6, OUTPUT);
}

void ValvulasController::setStatus(int id, bool status) const
{
  int value = status ? HIGH : LOW;
  if (id == 1)
  {
    digitalWrite(VAL1, value);
  }
  else if (id == 2)
  {
    digitalWrite(VAL2, value);
  }
  else if (id == 3)
  {
    digitalWrite(VAL3, value);
  }
  else if (id == 4)
  {
    digitalWrite(VAL4, value);
  }
  else if (id == 5)
  {
    digitalWrite(VAL5, value);
  }
  else if (id == 6)
  {
    digitalWrite(VAL6, value);
  }
}

bool ValvulasController::getStatus(int id) const
{
  int value = 0;
  if (id == 1)
  {
    value = digitalRead(VAL1);
  }
  else if (id == 2)
  {
    value = digitalRead(VAL2);
  }
  else if (id == 3)
  {
    value = digitalRead(VAL3);
  }
  else if (id == 4)
  {
    value = digitalRead(VAL4);
  }
  else if (id == 5)
  {
    value = digitalRead(VAL5);
  }
  else if (id == 6)
  {
    value = digitalRead(VAL6);
  }

  return value == HIGH;
}