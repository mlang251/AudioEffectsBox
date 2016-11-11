# ___How to make this file work___ #

# Install the Leap sofware
# pip install pyosc
# Use with Python 2.7 ONLY!!!
# Make sure in the directory where this file is located, you have the following:
#        Leap.py
#        Leap.pyc (the compiled Python file)
#        \x86 folder with Leap library files
#        \x64 folder with Leap library files



import sys, Leap
import OSC
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