# UDP and Leap library imports
import socket
from Leap import Listener

class ActivityListener(Listener):
    """
    This class inherits from the Leap Listener class. on_connect() and on_frame() are overridden
    and will be called automatically when an ActivityListener object is added to a Leap controller object.
    """
    def on_connect(self, controller):
        """on_connect() is called when the Leap connects. Establishes a connection to a remote server using UDP."""
        self.server_address = ('localhost', 8000)
        self.server_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        print "Leap to Server connection established, sending data."

    def on_frame(self, controller):
        """on_frame() is called whenever a new frame of data is available. Sends hand coordinates using UDP."""
        frame = controller.frame()
        interaction_box = frame.interaction_box

        if not frame.hands.is_empty:                # Only run this if there is a hand present
            hand = frame.hands[0]                   # Track the first hand available
            palm_position = hand.palm_position      # Get center of palm coordinates
            pinch_strength = hand.pinch_strength    # pinch_strength is a number ranging from 0 - 1

            # If user is pinching, print the xyz coordinates and output them with an OSC socket
            if pinch_strength > 0.5:
                normalized = interaction_box.normalize_point(palm_position, True)
                coordinates = str(round(normalized.x, 3)) + " " + str(round(normalized.y, 3)) + " " + str(round(normalized.z, 3))
                print coordinates

                # Send coordinate information over UDP
                self.server_sock.sendto(coordinates.encode(), self.server_address)
