import network
import socket
import time
import machine
from time import sleep
import utime
  
from machine import Pin
 
intled = machine.Pin(LED, machine.Pin.OUT)
relay = Pin(16, Pin.OUT)
sensor_temp = machine.ADC(4)
conversion_factor = 3.3  (65535)
  
ssid = '#####'
password = '####'
 
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

html = !DOCTYPE html
    html
        head titlePico Wtitle head
        body h1Pico Wh1
            pHello Worldp
            p
            a href='lighton'Turn Light Ona
            p
            p
            a href='lightoff'Turn Light Offa
            p
            br
        body
    html

 
# Wait for connect or fail
max_wait = 10
while max_wait  0
    if wlan.status()  0 or wlan.status() = 3
        break
    max_wait -= 1
    print('waiting for connection...')
    time.sleep(1)

# Handle connection error
if wlan.status() != 3
    raise RuntimeError('network connection failed')
else
    print('connected')
    status = wlan.ifconfig()
    print( 'ip = ' + status[0] )
 
# Open socket
addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
 
s = socket.socket()
s.bind(addr)
s.listen(1)
 
print('listening on', addr)

stateis = 
 
# Listen for connections
while True
    try
        cl, addr = s.accept()
        print('client connected from', addr)

        request = cl.recv(1024)
        print(request)

        request = str(request)
        led_on = request.find('lighton')
        led_off = request.find('lightoff')
        relay_tick = request.find('relay')
        print( 'led on = ' + str(led_on))
        print( 'led off = ' + str(led_off))
        reading = sensor_temp.read_u16()  conversion_factor 
        temperature = 27 - (reading - 0.706)0.001721
        print(Temperature {}.format(temperature))
        if led_on == 6
            print(led on)
            intled.value(1)
            stateis = LED is ON

        if led_off == 6
            print(led oftestestf)
            intled.value(0)
            stateis = LED is OFF
        if relay_tick == 6
            relay.toggle()
                 
     
        response = str(temperature)
        
        cl.send('HTTP1.0 200 OKrnContent-type texthtmlrnrn')
        cl.send(response)
        cl.close()
         
    except OSError as e
        cl.close()
        print('connection closed')
    

