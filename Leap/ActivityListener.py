# UDP and Leap library imports
import socket
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
        self.server_address = ('localhost', 8000)
        self.server_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        print "Leap to Server connection established, sending data."

    def on_frame(self, controller):
        """
        on_frame() is called whenever a new frame of data is available.
        It is an overwritten function from the Listener class. This function
        gets and sends palm position coordinates to the application server.

        """
        frame = controller.frame()
        interaction_box = frame.interaction_box

        # Get palm position coordinates
        palm_position = self.get_palm_position(frame, interaction_box)

        # If user is pinching, send xyz palm coordinates to server
        if frame.hands[0].pinch_strength > 0.5:
            self.send_palm_position(palm_position, self.server_address,
                                    self.server_sock)

    def send_palm_position(self, palm_position, server_address, server_socket):
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

        # Send coordinate information over UDP
        #server_sock.sendto(coordinates.encode(), server_address)

    def get_palm_position(self, frame, interaction_box):
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

        # Normalize hand position within the Leap interaction box (0-1 for xyz)
        normalized_palm = interaction_box.normalize_point(hand.palm_position, True)

        # If there is a hand, return normalized palm position
        if not frame.hands.is_empty:
            return normalized_palm

        # If there is no hand, it may have left the interaction box for a
        # moment and new data will have to be smoothened
        else:
            return self.smooth_palm_data(...)

    def smooth_palm_data(self, frame):
        """
        Basic algorithm would have to wait for a new frame of data,
        calculate new coordinates and return a coordinate in between the old and new
        before sending the new?

        May need to include frame.hands.is_empty in this function instead of
        inside get_palm_position()

        1. Pass in old frame
        2. Wait for new frame
        3. Return midpoint between last frame and new frame

        """
