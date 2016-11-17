# ___How to make this file work___ #

# Download the Leap SDK at https://developer.leapmotion.com/v2
# Install the Leap sofware (the installer can be found in the unzipped SDK folder)
# Use pip and run pip install pyosc from the command line (if you don't know how to do this scream "HELP!")
# Use with Python 2.7 ONLY!!!
# In the unzipped Leap SDK copy the entire 'lib' folder, paste it in the same directory as this script (leapHandTracking.py)



import os, sys, inspect
src_dir = os.path.abspath(os.path.dirname(inspect.getfile(inspect.currentframe())))
arch_dir = 'lib\\x64' if sys.maxsize > 2**32 else 'lib\\x86'
sys.path.insert(0, os.path.join(src_dir, 'lib'))
sys.path.insert(0, os.path.join(src_dir, arch_dir))

import Leap, OSC
c = OSC.OSCClient()
c.connect(('127.0.0.1', 57120)) 


class SampleListener(Leap.Listener):

    def on_connect(self, controller):
        print "Connected"


    def on_frame(self, controller):
        frame = controller.frame()
        #print frame.current_frames_per_second
        
        if not frame.hands.is_empty:                # Only run this if there is a hand present
            hand = frame.hands[0]                   # Track the first hand available
            palmPosition = hand.palm_position       # Get center of palm coordinates
            pinchStrength = hand.pinch_strength     # pinchStrength is a number ranging from 0 - 1
    
            # If user is pinching, print the xyz coordinates and output them with an OSC socket
            if pinchStrength > 0.5:
                print str(int(palmPosition.x)) + " " + str(int(palmPosition.y)) + " " + str(int(palmPosition.z)) 
                
                #send numbers (or in our case, xyz coordiantes) and have max seperate by space
                oscmsg = OSC.OSCMessage()
                oscmsg.setAddress("/Coordinates")
                oscmsg += int(palmPosition.x)
                oscmsg += int(palmPosition.y)
                oscmsg += int(palmPosition.z)
                c.send(oscmsg)
                        
        

def main():
    # Create a sample listener and controller
    listener = SampleListener()
    controller = Leap.Controller()

    # Have the sample listener receive events from the controller
    controller.add_listener(listener)

    # Keep this process running until Enter is pressed
    print "Press Enter to quit..."
    try:
        sys.stdin.readline()
    except KeyboardInterrupt:
        pass
    finally:
        # Remove the sample listener when done
        controller.remove_listener(listener)

if __name__ == "__main__":
    main()