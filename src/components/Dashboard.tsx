
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Shield, Activity, Wifi } from "lucide-react";
import TerminalInterface from "./TerminalInterface";
import SystemInfo from "./SystemInfo";
import VoiceAssistant from "./VoiceAssistant";
import { SystemInfoType } from "@/types";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("terminal");
  
  // Mock system info data
  const systemInfo: SystemInfoType = {
    cpu: "Intel Core i7 @ 3.2GHz (Virtual)",
    memory: "16GB / 32GB",
    os: "Kali Linux 2025.1",
    network: {
      status: "connected",
      interface: "eth0",
      ip: "192.168.1.100",
    },
    securityStatus: "secure",
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-cyber-gray rounded-t-md">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-cyber-green" />
          <h2 className="text-lg font-bold text-cyber-blue">EthicalHack-AI Assistant</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-cyber-green animate-pulse-slow mr-1" />
            <span className="text-xs text-gray-400">System Active</span>
          </div>
          <div className="flex items-center">
            <Wifi className="h-4 w-4 text-cyber-green mr-1" />
            <span className="text-xs text-gray-400">{systemInfo.network.interface}</span>
          </div>
          <div className="flex items-center">
            <Battery className="h-4 w-4 text-cyber-green mr-1" />
            <span className="text-xs text-gray-400">100%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar with system info */}
        <div className="w-1/4 bg-cyber-gray border-r border-cyber-light-gray p-4 overflow-y-auto">
          <h3 className="text-cyber-blue font-bold mb-2 text-sm uppercase tracking-wider">System Info</h3>
          <SystemInfo systemInfo={systemInfo} />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col bg-cyber-dark overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="bg-cyber-gray px-4 pt-2">
              <TabsList className="bg-cyber-light-gray">
                <TabsTrigger value="terminal" className="data-[state=active]:bg-cyber-dark data-[state=active]:text-cyber-blue">
                  Terminal
                </TabsTrigger>
                <TabsTrigger value="voice" className="data-[state=active]:bg-cyber-dark data-[state=active]:text-cyber-blue">
                  Voice Assistant
                </TabsTrigger>
                <TabsTrigger value="tools" className="data-[state=active]:bg-cyber-dark data-[state=active]:text-cyber-blue">
                  Security Tools
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="terminal" className="flex-1 overflow-hidden mt-0 border-0 p-0">
              <TerminalInterface />
            </TabsContent>
            
            <TabsContent value="voice" className="flex-1 overflow-hidden mt-0 border-0 p-0">
              <VoiceAssistant />
            </TabsContent>
            
            <TabsContent value="tools" className="flex-1 overflow-auto mt-0 border-0 p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Nmap', 'Metasploit', 'Wireshark', 'Burp Suite', 'Aircrack-ng', 'John the Ripper'].map((tool, i) => (
                  <Card key={i} className="p-4 bg-cyber-gray border-cyber-light-gray hover:border-cyber-blue transition-colors">
                    <h4 className="font-medium text-cyber-blue">{tool}</h4>
                    <p className="text-xs text-gray-400 mt-1">Security tool simulation</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
