#include <WiFi.h>

class WifiConnection
{
public:
  WifiConnection();
  ~WifiConnection() = default;

  void connect(const char* ssid, const char* password);
  void loop(unsigned long now);

private:
  unsigned long m_timer;

  void _reconnect();

};