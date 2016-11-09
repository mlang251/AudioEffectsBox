# ___How to make this file work___ #

# Install the Leap sofware
# Use with Python 2.7 ONLY!!!
# Make sure in the directory where this file is located, you have the following:
#        Leap.py
#        Leap.pyc (the compiled Python file)
#        \x86 folder with Leap library files
#        \x64 folder with Leap library files



import sys, Leap


class SampleListener(Leap.Listener):

    def on_connect(self, controller):
        print "Connected"


    def on_frame(self, controller):
        print "Frame available"
        

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