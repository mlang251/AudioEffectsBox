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

        # Flags
        self.tracking_hand = False      # Flag for tracking mode enable/disable
        self.bound_msg_sent = False     # Flag for bound message
        self.in_bounds = False          # Flag for tracking if in/out of bounds

        print "Leap Initialized."

    def connect(self):
        """
        Initializes OSC connections.

        """
        # OSC connection for sending Leap data
        self.data_client = OSC.OSCClient()
        self.data_client.connect(('127.0.0.1', 8000))

        # OSC connection for sending statuses
        self.status_client = OSC.OSCClient()
        self.status_client.connect(('127.0.0.1', 8010))

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
        # TODO: Remove coordinates print when testing is done
        # coordinates = (str(round(palm_position.x, 3)) + " " +
        #                str(round(palm_position.y, 3)) + " " +
        #                str(round(palm_position.z, 3)))
        # print coordinates

        # Use OSC to send xyz coordiantes and have max seperate by space
        # try:
        #     coord_msg = OSC.OSCMessage()
        #     coord_msg.setAddress("/Coordinates")
        #     coord_msg += round(palm_position.x, 3)
        #     coord_msg += round(palm_position.y, 3)
        #     coord_msg += round(palm_position.z, 3)
        #     self.data_client.send(coord_msg)
        # except OSC.OSCClientError:
        #     print "Server is not running, stopping program."
        #     sys.exit(1)

    def runloop(self):
        """
        Main runloop for the Leap. Sends user palm position
        coordinates to the server at a set framerate.

        """
        # Set Leap framerate
        framerate = 70

        # Main loop
        while True:
            # Sleep to maintain roughly desired framerate
            time.sleep(1./framerate)

            # Collect current frame
            frame = self.controller.frame()
            ibox = frame.interaction_box

            # If a hand is present (user in bounds)
            if not frame.hands.is_empty:
                # Flag for tracking if hand is in/out of bounds
                if self.in_bounds == False:
                    # Reset bound_msg_sent flag so new status will be sent
                    # when in/out of bounds status has changed
                    self.bound_msg_sent = False

                # Set flag for in bounds
                self.in_bounds = True

                # Check if user pinches to start/stop hand tracking mode
                # No coordinates are sent when a user is pinching
                self.check_pinch()

                # If in tracking mode
                if self.tracking_hand:
                    # Get palm position of first available hand
                    palm_position = frame.hands[0].palm_position

                    # Normalize coordinates on a scale from 0 - 1 for x,y,z
                    normalized_palm = ibox.normalize_point(palm_position)

                    # Send coordinates to the server
                    self.send_palm_position(normalized_palm)

            # If no hand present (user out of bounds)
            else:
                if self.in_bounds == True:
                    # Reset bound_msg flag so new status will be sent
                    # when in/out of bounds status has changed
                    self.bound_msg_sent = False

                # Set flag for out of bounds
                self.in_bounds = False

                # TODO: Add smoothing function
                # Wait for new frame of hand data that is inside interaction box
                # Calculate midpoint palm position between new frame
                # and last good frame

            # Send status of hand being in or out of bounds if not already sent
            if not self.bound_msg_sent:
                self.send_bound_status()

    def check_pinch(self):
        """
        Checks for user pinch lasting longer than a set time and adjusts
        self.tracking_hand flag to manage switching between tracking
        and not-tracking modes.

        """
        # Collect a new frame
        new_frame = self.controller.frame()
        pinch_threshold = 0.7

        # If user is pinching
        if new_frame.hands[0].pinch_strength > pinch_threshold:
            user_is_pinching = True
            start_pinch = time.time()
            pinch_time = 0.0

            # Collect new frames and wait for set time
            while (pinch_time < 1.5) and (user_is_pinching):
                new_frame = self.controller.frame()

                # If user stops pinching, break
                if new_frame.hands[0].pinch_strength < pinch_threshold:
                    user_is_pinching = False

                # Keep track of pinch time/length
                pinch_time = time.time() - start_pinch
        else:
            user_is_pinching = False

        # If user pinched for longer than the set time
        if user_is_pinching:
            # set self.tracking_hand flag to its opposite
            self.tracking_hand = not self.tracking_hand
            print "Tracking Mode: %s" % str(self.tracking_hand)

            # TODO: Send tracking mode OSC message, and only once

    def send_bound_status(self):
        """
        Send a status message that reports if the user's hand is
        inside the interaction box or not.

        """
        try:
            # bound_status = OSC.OSCMessage()
            # bound_status.setAddress("/BoundError")
            # bound_status += self.in_bounds
            # self.status_client.send(bound_status)
            print "Bound Status Sent: %s"  % str(self.in_bounds)

            # Set flag for error message sent
            self.bound_msg_sent = True
        except OSC.OSCClientError:
            print "Server is not running, stopping program."
            sys.exit(1)

        # TODO: Change send_bound_status to generic status message that includes in/out bounds and tracking mode
