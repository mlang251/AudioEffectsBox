# ___How to make this file work___ #

# Use with Python 2.7 ONLY!!!
# Make sure in the directory where this file is located, you have the following:
#        Leap.py
#        Leap.pyc (the compiled Python file)
#        \x86 folder with Leap library files
#        \x64 folder with Leap library files



import sys, Leap


def main():

    # Keep this process running until Enter is pressed
    print "Press Enter to quit..."
    try:
        sys.stdin.readline()
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()