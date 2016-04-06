# rgb-toggle
## Raspberry Pi hypriot nodejs GPIO docker

Toggles the inputs of a RGB LED on/off.

Adapted from https://github.com/Kylir/rgb-slider
Replaced pi-blaster with rpi-gpio as a strategy for gaining access to GPIO from docker containers.

Note that rpi-gpio turns the GPIO pins on/off, whereas pi-blaster enables variable pin output voltages.  

The pi-blaster approach would have been better. As at April 3, 2016 I could not get pi-blaster working on Raspberry Pi 3, nor access the pi-blaster device from within a docker container on a Pi1B.

___

## My setup includes:
- Raspberry Pi 3, and also tested on Raspberry Pi 1st gen Model B
- Hypriot distribution
  -  https://github.com/hypriot

- Additional packages added to enable Hypriot to build/run nodejs apps using the rpi-gpio module.
  - https://github.com/JamesBarwell/rpi-gpio.js
  - http://www.robert-drummond.com/2013/06/06/raspberry-pi-gpio-inputoutput-in-javascript
  - http://blog.hypriot.com/post/lets-get-physical

- Physical setup for the Raspberry Pi RGB LED tutorials
 - example: http://raspberrypi.powersbrewery.com/project-6-rgb-led

___

![photo of project](docs/app-photo.png "Project")

___

## Note:

If you have installed pi-blaster -- I discovered that you need to stop the pi-blaster service before running this app. 
 
___

## Suggestion:

If you are a newbie like me, get the app working on the raspberry first. I spent much time chasing apt-get install dependencies and such.

Build and run as a docker container as second step.
