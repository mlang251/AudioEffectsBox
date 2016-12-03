# -*- coding: utf-8 -*-
"""
Created on Sun Nov  6 16:50:53 2016

@author: vsuha
"""

#there are a lot of different python-osc modules...I used pyosc
#https://github.com/ptone/pyosc
#pip install pyosc
#also, I'm using python2.7 ... don't try to run this with python3.5

import OSC
c = OSC.OSCClient()
c.connect(('127.0.0.1', 57120)) 

#send random text and have max seperate by ||| 
oscmsg = OSC.OSCMessage()
oscmsg.setAddress("/TestCommunication1")
oscmsg.append("apple|||banana|||coconut")
c.send(oscmsg)


#send numbers (or in our case, xyz coordiantes) and have max seperate by space
oscmsg2 = OSC.OSCMessage()
oscmsg2.setAddress("/TestCommunication2")
oscmsg2 += 1232
oscmsg2 += 222
c.send(oscmsg2)