#include <iostream>
#include <string.h>
#include "Leap.h"

// includes and defines for osc packet sending
#include "osc/OscOutboundPacketStream.h"
#include "ip/UdpSocket.h"
#define ADDRESS "127.0.0.1"
#define PORT 7000
#define OUTPUT_BUFFER_SIZE 1024

// Subclass to listen for leap motion events
class LeapEventListener : public Leap::Listener
{
public:
    // Overwrite Listener event callback functions
    virtual void onConnect(const Leap::Controller&);
    virtual void onFrame(const Leap::Controller&);
	void setTransmitSocket(UdpTransmitSocket* transmitSocket);
	void setOutputPacket(osc::OutboundPacketStream* packet);
private:
	UdpTransmitSocket* listenerTransmitSocket; //udp transmit socket for listener
	osc::OutboundPacketStream* listenerOutputPacket; //buffer used to send coordinates
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

		//send packet with coordinates through udp transmit socket
		*listenerOutputPacket << osc::BeginBundleImmediate
			<< osc::BeginMessage("/xCoord")
			<< palmPosition[0] << osc::EndMessage
			<< osc::BeginMessage("/yCoord")
			<< palmPosition[1] << osc::EndMessage
			<< osc::BeginMessage("/zCoord")
			<< palmPosition[2] << osc::EndMessage
			<< osc::EndBundle;
		listenerTransmitSocket->Send(listenerOutputPacket->Data(), listenerOutputPacket->Size());
    }
//    float framesPerSec;
//    framesPerSec = frame.currentFramesPerSecond();
//    std::cout << framesPerSec << std::endl;

}

void LeapEventListener::setTransmitSocket(UdpTransmitSocket* transmitSocket)
{
	listenerTransmitSocket = transmitSocket;
}

void LeapEventListener::setOutputPacket(osc::OutboundPacketStream* packet)
{
	listenerOutputPacket = packet;
}

int main()
{
    // Create listener and controller objects
    LeapEventListener   listener;
    Leap::Controller    controller;
    
    // Add the listener to the controller to track new frames in another thread
    controller.addListener(listener);

	// open udp socket, pass to listener
	UdpTransmitSocket transmitSocket(IpEndpointName(ADDRESS, PORT));
	listener.setTransmitSocket(&transmitSocket);

	//create buffer, pass to listener
	char buffer[OUTPUT_BUFFER_SIZE];
	osc::OutboundPacketStream packet(buffer, OUTPUT_BUFFER_SIZE);
	listener.setOutputPacket(&packet);

	//send one test bundle at the beginning
	packet << osc::BeginBundleImmediate
		<< osc::BeginMessage("/test1")
		<< "hello wuld" << osc::EndMessage
		<< osc::EndBundle;
	transmitSocket.Send(packet.Data(), packet.Size());

    // Keep this process running until Enter is pressed
    std::cout << "Press Enter to quit..." << std::endl;
    std::cin.get();
    
    // Remove the listener when done
    controller.removeListener(listener);
    
    return 0;
}

