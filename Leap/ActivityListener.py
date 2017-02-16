import OSC
from collections import deque
from Leap import Listener

class ActivityListener(Listener):
    """
    This class inherits from the Leap Listener class. on_connect() and
    on_frame() are overridden and will be called automatically when an
    ActivityListener object is added to a Leap controller object.

    """
    def on_connect(self, controller):
        """
        on_connect() is called when the Leap connects.
        Establishes a connection to a remote server using UDP.

        """
        # Setup OSC connection to local host port 8000
        self.data_client = OSC.OSCClient()
        self.data_client.connect(('127.0.0.1', 8000))
        print "Connected"

        # Create a queue to hold Leap frame data with a set max length
        self.frame_queue = deque(maxlen=2)

    def on_frame(self, controller):
        """
        on_frame() is called whenever a new frame of data is available.
        It is an overwritten function from the Listener class. This function
        gets and sends palm position coordinates to the application server.

        """
        # Store new frame
        frame = controller.frame()
        interaction_box = frame.interaction_box

        # Get palm position coordinates of newest frame in queue
        palm_position = self.get_palm_position(frame)

        # Normalize hand position within the Leap interaction box (0-1 for xyz)
        normalized_palm = interaction_box.normalize_point(palm_position, True)

        # Set pinch threshold: number from 0-1 describing pinch strength
        pinch_threshold = 0.7

        # If user is pinching, send xyz palm coordinates to server
        if frame.hands[0].pinch_strength > pinch_threshold:
            self.send_palm_position(normalized_palm)

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
        coordinates = (str(round(palm_position.x, 3)) + " " +
                       str(round(palm_position.y, 3)) + " " +
                       str(round(palm_position.z, 3)))
        print coordinates

        # Use OSC to send xyz coordiantes and have max seperate by space
        self.oscmsg = OSC.OSCMessage()
        self.oscmsg.setAddress("/Coordinates")
        self.oscmsg += round(palm_position.x, 3)
        self.oscmsg += round(palm_position.y, 3)
        self.oscmsg += round(palm_position.z, 3)
        self.data_client.send(self.oscmsg)

    def get_palm_position(self, frame):
        """
        Gets normalized palm position coordinates.
        This function also smoothens out palm position data when a user's hand
        moves outside of the interaction box and back in at another point.
        Normally there is a skip in hand coordinate data that results in an
        undesired audio effect.

        Parameters
        ----------
        A Leap frame containing hand data

        Output
        ------
        Outputs a hand.palm_position

        """
        # Track first hand available
        hand = frame.hands[0]

        # If there is a hand, return normalized palm position
        if not frame.hands.is_empty:
            # Add good frame to the frame queue
            self.frame_queue.append(frame)
            return hand.palm_position

        # If there is no hand, it may have left the interaction box for a
        # moment and new data will have to be smoothened
        else:
            print "OUT OF BOUNDS"

            # Wait for new frame of hand data that is inside interaction box
            # and use last good frame to calculate and return a midpoint
            # as hand position
            last_good_frame = self.frame_queue.pop()

    def smooth_palm_data(self, last_frame):
        """
        Basic algorithm would have to wait for a new frame of data,
        calculate new coordinates and return a coordinate in between the old and new
        before sending the new?

        May need to include frame.hands.is_empty in this function instead of
        inside get_palm_position()

        1. Pass in previous frame
        2. Wait for new frame
        3. Return midpoint between last frame and new frame

        """
