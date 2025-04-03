
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VoiceCommandType } from "@/types";
import { Mic, MicOff, Volume2, Settings } from "lucide-react";

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [commands, setCommands] = useState<VoiceCommandType[]>([
    {
      id: "welcome",
      text: "",
      timestamp: new Date(),
      status: "responded",
      response: "Hey there, ethical hacker! I'm your AI assistant. How can I help you today?"
    }
  ]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Simulating end of voice command
      setCommands(prev => prev.filter(cmd => cmd.status !== "listening"));
    } else {
      setIsListening(true);
      // Simulating listening
      setCommands(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          text: "",
          timestamp: new Date(),
          status: "listening"
        }
      ]);
      
      // Simulate receiving a voice command after 3 seconds
      setTimeout(() => {
        simulateVoiceCommand();
      }, 3000);
    }
  };
  
  const simulateVoiceCommand = () => {
    const commandOptions = [
      "Run a security scan on the local network",
      "What vulnerabilities were found in the last scan?",
      "Explain how cross-site scripting works",
      "What's the difference between symmetric and asymmetric encryption?"
    ];
    
    const randomCommand = commandOptions[Math.floor(Math.random() * commandOptions.length)];
    
    setCommands(prev => 
      prev.map(cmd => {
        if (cmd.status === "listening") {
          return {
            ...cmd,
            text: randomCommand,
            status: "processing"
          };
        }
        return cmd;
      })
    );
    
    // Simulate processing and response
    setTimeout(() => {
      setCommands(prev => 
        prev.map(cmd => {
          if (cmd.status === "processing") {
            return {
              ...cmd,
              status: "responded",
              response: generateResponse(randomCommand)
            };
          }
          return cmd;
        })
      );
      setIsListening(false);
    }, 2000);
  };
  
  const generateResponse = (command: string): string => {
    if (command.includes("security scan")) {
      return "Initiating a security scan on your local network. This will take a few minutes. I'll analyze for common vulnerabilities and open ports. I've got your back, brother!";
    } else if (command.includes("vulnerabilities")) {
      return "In the last scan, I found 3 potential issues: an outdated SSH configuration, an open port 8080 with no authentication, and a potential misconfiguration in your firewall rules. Want me to help you address these?";
    } else if (command.includes("cross-site scripting")) {
      return "Cross-site scripting, or XSS, is a security vulnerability that allows attackers to inject malicious client-side scripts into web pages viewed by other users. It happens when an application includes untrusted data without proper validation or escaping. There are three main types: reflected, stored, and DOM-based XSS. Want me to explain each one in more detail?";
    } else if (command.includes("symmetric and asymmetric")) {
      return "Great question! Symmetric encryption uses the same key for both encryption and decryption - it's faster but has key distribution challenges. Asymmetric encryption uses a pair of keys (public and private) - it's slower but more secure for key exchange. In practice, we often use both: asymmetric to exchange a symmetric key, then symmetric for the actual data encryption. That's a solid approach for most security scenarios.";
    } else {
      return "I understand what you're asking about. Let me think about that and get back to you with a comprehensive answer. Cybersecurity requires precision, and I want to make sure I give you accurate information.";
    }
  };

  return (
    <div className="flex flex-col h-full bg-cyber-dark">
      <ScrollArea className="flex-1 p-4">
        {commands.map((cmd) => (
          <div key={cmd.id} className="mb-6">
            {cmd.status === "listening" ? (
              <Card className="p-3 bg-cyber-gray border-cyber-blue">
                <div className="flex items-center">
                  <Mic className="h-4 w-4 text-cyber-blue animate-pulse-slow mr-2" />
                  <span className="text-gray-400">Listening...</span>
                </div>
              </Card>
            ) : cmd.text ? (
              <div className="mb-3">
                <div className="flex justify-end">
                  <Card className="p-3 bg-cyber-gray border-cyber-light-gray inline-block max-w-[80%]">
                    <p className="text-sm">{cmd.text}</p>
                  </Card>
                </div>
                {cmd.status === "processing" ? (
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-400 animate-pulse-slow">Processing...</span>
                  </div>
                ) : cmd.response ? (
                  <div className="flex mt-2">
                    <Card className="p-3 bg-cyber-blue bg-opacity-10 border-cyber-blue inline-block max-w-[80%]">
                      <div className="flex items-start">
                        <Volume2 className="h-4 w-4 text-cyber-blue mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{cmd.response}</p>
                      </div>
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : cmd.response ? (
              <div className="flex mt-2">
                <Card className="p-3 bg-cyber-blue bg-opacity-10 border-cyber-blue inline-block max-w-[80%]">
                  <div className="flex items-start">
                    <Volume2 className="h-4 w-4 text-cyber-blue mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{cmd.response}</p>
                  </div>
                </Card>
              </div>
            ) : null}
          </div>
        ))}
      </ScrollArea>
      
      <div className="border-t border-cyber-light-gray p-4 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {isListening ? "Listening for commands..." : "Click the microphone to speak"}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-cyber-light-gray hover:border-cyber-blue hover:bg-cyber-blue hover:bg-opacity-10"
            onClick={() => {}}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            onClick={toggleListening}
            size="icon"
            className={`rounded-full ${
              isListening 
                ? "bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/90" 
                : "bg-cyber-light-gray hover:bg-cyber-light-gray/90"
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
