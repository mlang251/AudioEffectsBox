"""
main.py will connect to a Leap motion and send hand coordinate 
data over OSC to a remote server.
"""

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

# Import Leap library and activity listener 
import Leap
from ActivityListener import ActivityListener

def main():
    # Create listener and controller objects
    listener = ActivityListener()
    controller = Leap.Controller()

    # Have the listener receive events from the controller
    controller.add_listener(listener)

    # Keep this process running until Enter is pressed
    print "Press Enter to quit..."
    try:
        sys.stdin.readline()
    except KeyboardInterrupt:
        pass
    finally:
        # Remove the listener when done
        controller.remove_listener(listener)

if __name__ == "__main__":
    main()

    