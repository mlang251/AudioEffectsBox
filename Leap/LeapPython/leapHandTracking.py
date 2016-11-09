# ___How to make this file work___ #

# Use with Python 2.7 ONLY!!!
# Make sure in the directory where this file is located, you have the following:
#        Leap.py
#        Leap.pyc (the compiled Python file)
#        \x86 folder (if you are using 32-bit Python)
#        \x64 folder (if you are using 64-bit Python)

# If you are using the 32-bit version of Python 2.7
#        Do nothing, leapHandTracking.py can run at it's current state
# If you are using the 64-bit version of Python 2.7
#        Open Leap.py and change line 19 "x86" to "x64"
#        Save Leap.py

# leapHandTracking.py is ready to run


import os, sys, inspect
import Leap

def main():

    # Keep this process running until Enter is pressed
    print "Press Enter to quit..."
    try:
        sys.stdin.readline()
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()