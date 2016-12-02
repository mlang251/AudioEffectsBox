"""
___How to make this file work___ 

-Use pip and run pip install pyosc from the command line (if you don't know how to do this scream "HELP!")
-Use with Python 2.7 ONLY!!!

On Mac:
- install homebrew (just google install homebrew)
- run brew install python (for staying up to date with packages, like python, brew is the way to go)
- make sure /usr/local/bin is first in $PATH 
- cd to lib/Mac/lib
- run: (tells leap library to use homebrew python instead of system python) 

install_name_tool -change /Library/Frameworks/Python.framework/Versions/2.7/Python \
/usr/local/Cellar/python/2.7.12_2/Frameworks/Python.framework/Versions/2.7/lib/libpython2.7.dylib \
LeapPython.so

- Refer to bottom of https://developer.leapmotion.com/documentation/python/devguide/Project_Setup.html 
  if not working. Check /usr/local/Cellary/python check the version to use in the above command (like 2.7.12_2 above)
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

# Import Leap library, osc and leap listener class
import Leap
import OSC  
from ActivityListener import ActivityListener

def main():
    # Create OSC connection
    c = OSC.OSCClient()
    c.connect(('127.0.0.1', 57120)) 

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

    