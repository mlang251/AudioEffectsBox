import OSC
import time
import sys
import Leap

class LeapController(object):
    """
    Leap Motion driver for the Audio Effects Box.

    """
    def initialize(self):
        """
        Creates a Leap.Controller object and sets frame policies

        """
        print "Initializing Leap..."

        # Create a Leap.Controller object
        self.controller = Leap.Controller()
        time.sleep(0.5)

        # Check that the Leap is connected
        if not self.controller.is_connected:
            print "Make sure Leap is plugged in and ready."
            sys.exit(1)

        # Request to receive tracking data when running in the background
        # You must have the Allow Background Apps setting checked in the Leap Settings
        self.controller.set_policy(Leap.Controller.POLICY_BACKGROUND_FRAMES)
        print "Requesting background frames."
        time.sleep(0.1)

        # Check that the correct policy has been set
        if self.controller.is_policy_set(Leap.Controller.POLICY_BACKGROUND_FRAMES):
            print "Background frames policy in effect."
        print "Leap Initialized."

    def connect(self):
        """
        Initializes OSC connection.

        """
        # Setup OSC connection to local host port 8000
        self.data_client = OSC.OSCClient()
        self.data_client.connect(('127.0.0.1', 8000))
        print "Leap is connected to Server."

    def send_palm_position(self, palm_position):
        """
        Sends Leap hand position coordinates to the AudioEffectsBox server
        using OSC.

        Parameters
        ----------
        A Leap hand.palm_position

        Outputs
        -------
        An OSC message containing hand position coordinates

        """
        # coordinates = (str(round(palm_position.x, 3)) + " " +
        #                str(round(palm_position.y, 3)) + " " +
        #                str(round(palm_position.z, 3)))
        # print coordinates

        Use OSC to send xyz coordiantes and have max seperate by space
        try:
            self.oscmsg = OSC.OSCMessage()
            self.oscmsg.setAddress("/Coordinates")
            self.oscmsg += round(palm_position.x, 3)
            self.oscmsg += round(palm_position.y, 3)
            self.oscmsg += round(palm_position.z, 3)
            self.data_client.send(self.oscmsg)
        except OSC.OSCClientError:
            print "Server is not running, stopping program."
            sys.exit(1)

    def runloop(self):
        """
        Main runloop for the Leap. Sends user palm position
        coordinates to the server at a set framerate.

        """
        # Set Leap framerate
        framerate = 65

        # Main loop
        while True:
            # Sleep to maintain roughly desired framerate
            time.sleep(1./framerate)

            # Collect current frame
            frame = self.controller.frame()
            ibox = frame.interaction_box

            # If a hand is present
            if not frame.hands.is_empty:
                # Get palm position of first available hand
                palm_position = frame.hands[0].palm_position

                # Normalize coordinates on a scale from 0 - 1 for x,y,z
                normalized_palm = ibox.normalize_point(palm_position)

                # Send coordinates to the server
                self.send_palm_position(normalized_palm)
            else:
                print "OUT OF BOUNDS"
                continue
                                                                                    # TODO: Add smoothing function
                                                                                    # Wait for new frame of hand data that is inside interaction box
                                                                                    # Calculate midpoint palm position between new frame
                                                                                    # and last good frame
