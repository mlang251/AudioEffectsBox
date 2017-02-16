""" Runs the Leap motion driver for the Audio Effects Box. """

# Add platform specific Leap library to python path
import sys, os, inspect
if sys.platform == "darwin":
    sys.path.insert(0, 'lib/Mac/lib')
elif sys.platform == "win32":
    src_dir = os.path.abspath(os.path.dirname(inspect.getfile(inspect.currentframe())))
    arch_dir = 'lib\\windows\\lib\\x64' if sys.maxsize > 2**32 else 'lib\\windows\\lib\\x86'
    sys.path.insert(0, os.path.join(src_dir, 'lib\\windows\\lib'))
    sys.path.insert(0, os.path.join(src_dir, arch_dir))
else:
    print "Leap is not supported on this platform."

# Import LeapController class
from LeapController import LeapController

if __name__ == "__main__":
    # Create LeapController object
    controller = LeapController()

    # Initialize the Leap Motion controller
    controller.initialize()

    # Setup Leap-server communication
    controller.connect()

    # Start Leap runloop
    try:
        print "Running..."
        controller.runloop()
    except KeyboardInterrupt:
        sys.exit(1)
