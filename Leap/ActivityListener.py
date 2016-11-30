# OSC and Leap library imports
import OSC
from Leap import Listener

class ActivityListener(Listener):
    """
    This class inherits from the Leap Listener class. on_connect() and on_frame() are overridden
    and will be called automatically when an ActivityListener object is added to a Leap controller object.

    on_connect() is called when the Leap connects.
    on_frame() is called whenever a new frame of data is available.
    
    """
    def on_connect(self, controller):
        print "Connected"

    def on_frame(self, controller):
        frame = controller.frame()
        #print frame.current_frames_per_second
        
        if not frame.hands.is_empty:                # Only run this if there is a hand present
            hand = frame.hands[0]                   # Track the first hand available
            palm_position = hand.palm_position       # Get center of palm coordinates
            pinch_strength = hand.pinch_strength     # pinch_strength is a number ranging from 0 - 1
    
            # If user is pinching, print the xyz coordinates and output them with an OSC socket
            if pinch_strength > 0.5:
                print str(int(palm_position.x)) + " " + str(int(palm_position.y)) + " " + str(int(palm_position.z)) 
                
                #send numbers (or in our case, xyz coordiantes) and have max seperate by space
                oscmsg = OSC.OSCMessage()
                oscmsg.setAddress("/Coordinates")
                oscmsg += int(palm_position.x)
                oscmsg += int(palm_position.y)
                oscmsg += int(palm_position.z)
                c.send(oscmsg)