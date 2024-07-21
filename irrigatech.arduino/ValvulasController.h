#pragma once

class ValvulasController
{
public:
  ValvulasController() = default;
  ~ValvulasController() = default;

  void init() const;
  void setStatus(int id, bool status) const;
  bool getStatus(int id) const;

};