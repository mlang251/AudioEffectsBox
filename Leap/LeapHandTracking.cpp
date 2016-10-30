#include <iostream>
#include <string.h>
#include "Leap.h"

// Subclass to listen for leap motion events
class LeapEventListener : public Leap::Listener
{
public:
    // Overwrite Listener event callback functions
    virtual void onConnect(const Leap::Controller&);
    virtual void onFrame(const Leap::Controller&);
};

// This callback function will be called once the leap motion is conencted
void LeapEventListener::onConnect(const Leap::Controller& controller)
{
    std::cout << "Connected" << std::endl;
}

// This callback function is called every time a new frame is available.
// Frames contain all information concerning hands and hand position
void LeapEventListener::onFrame(const Leap::Controller& controller)
{
    const Leap::Frame frame = controller.frame();       // Store the newly available frame of data
    Leap::Hand hand = frame.hands()[0];                 // Track the first hand available
    Leap::Vector palmPosition = hand.palmPosition();    // Get center of palm coordinates
    float pinchStrength = hand.pinchStrength();         // pinchStrength is a float ranging from 0 - 1
    
    // Only send position data when user is pinching
    //std::cout << pinchStrength << std::endl;
    if (pinchStrength > 0.5)
    {
        //std::cout << palmPosition << std::endl;
        std::cout << int(palmPosition[0]);
        std::cout << " ";
        std::cout << int(palmPosition[1]);
        std::cout << " ";
        std::cout << int(palmPosition[2]) << std::endl;
    }
//    float framesPerSec;
//    framesPerSec = frame.currentFramesPerSecond();
//    std::cout << framesPerSec << std::endl;

}

int main()
{
    // Create listener and controller objects
    LeapEventListener   listener;
    Leap::Controller    controller;
    
    // Add the listener to the controller to track new frames in another thread
    controller.addListener(listener);
    
    // Keep this process running until Enter is pressed
    std::cout << "Press Enter to quit..." << std::endl;
    std::cin.get();
    
    // Remove the listener when done
    controller.removeListener(listener);
    
    return 0;
}

