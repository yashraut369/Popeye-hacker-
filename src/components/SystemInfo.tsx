
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SystemInfoType } from "@/types";
import { Shield, Cpu, HardDrive, Globe } from "lucide-react";

interface SystemInfoProps {
  systemInfo: SystemInfoType;
}

const SystemInfo: React.FC<SystemInfoProps> = ({ systemInfo }) => {
  const getStatusColor = (status: 'secure' | 'warning' | 'critical') => {
    switch (status) {
      case 'secure':
        return 'text-cyber-green';
      case 'warning':
        return 'text-cyber-yellow';
      case 'critical':
        return 'text-cyber-red';
      default:
        return 'text-gray-400';
    }
  };

  // Mock CPU and memory usage
  const cpuUsage = 35;
  const memoryUsage = 62;

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-cyber-gray border-cyber-light-gray">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className={`h-4 w-4 ${getStatusColor(systemInfo.securityStatus)}`} />
          <span className={`text-sm font-medium ${getStatusColor(systemInfo.securityStatus)}`}>
            Security Status: {systemInfo.securityStatus.charAt(0).toUpperCase() + systemInfo.securityStatus.slice(1)}
          </span>
        </div>
        {systemInfo.securityStatus === 'secure' && (
          <p className="text-xs text-gray-400">All security checks passed. No vulnerabilities detected.</p>
        )}
      </Card>

      <Card className="p-4 bg-cyber-gray border-cyber-light-gray">
        <div className="flex items-center space-x-2 mb-3">
          <Cpu className="h-4 w-4 text-cyber-blue" />
          <span className="text-sm font-medium">CPU</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-400">{systemInfo.cpu}</span>
            <span className="text-xs text-cyber-blue">{cpuUsage}%</span>
          </div>
          <Progress value={cpuUsage} className="h-1.5 bg-cyber-light-gray" indicatorClassName="bg-cyber-blue" />
        </div>
      </Card>

      <Card className="p-4 bg-cyber-gray border-cyber-light-gray">
        <div className="flex items-center space-x-2 mb-3">
          <HardDrive className="h-4 w-4 text-cyber-purple" />
          <span className="text-sm font-medium">Memory</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-400">{systemInfo.memory}</span>
            <span className="text-xs text-cyber-purple">{memoryUsage}%</span>
          </div>
          <Progress value={memoryUsage} className="h-1.5 bg-cyber-light-gray" indicatorClassName="bg-cyber-purple" />
        </div>
      </Card>

      <Card className="p-4 bg-cyber-gray border-cyber-light-gray">
        <div className="flex items-center space-x-2 mb-2">
          <Globe className="h-4 w-4 text-cyber-green" />
          <span className="text-sm font-medium">Network</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Interface</span>
            <span className="text-xs">{systemInfo.network.interface}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">IP Address</span>
            <span className="text-xs">{systemInfo.network.ip}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Status</span>
            <span className="text-xs text-cyber-green">
              {systemInfo.network.status === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-cyber-gray border-cyber-light-gray">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Operating System</span>
            <span className="text-xs">{systemInfo.os}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Kernel Version</span>
            <span className="text-xs">5.15.0-25-generic</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Uptime</span>
            <span className="text-xs">4h 23m</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemInfo;
