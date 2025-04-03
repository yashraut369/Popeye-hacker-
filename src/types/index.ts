
export type TerminalCommand = {
  id: string;
  timestamp: Date;
  command: string;
  response: string;
  status: 'success' | 'error' | 'info' | 'warning';
  isLoading?: boolean;
};

export type SystemInfoType = {
  cpu: string;
  memory: string;
  os: string;
  network: {
    status: 'connected' | 'disconnected';
    interface: string;
    ip: string;
  };
  securityStatus: 'secure' | 'warning' | 'critical';
};

export type VoiceCommandType = {
  id: string;
  text: string;
  timestamp: Date;
  status: 'listening' | 'processing' | 'responded' | 'error';
  response?: string;
};

export type ToolCategory = 'reconnaissance' | 'scanning' | 'exploitation' | 'post-exploitation' | 'forensics';

export type Tool = {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // icon name from lucide-react
};

export * from './ai';
