
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TerminalCommand } from "@/types";

const TerminalInterface: React.FC = () => {
  const [commands, setCommands] = useState<TerminalCommand[]>([
    {
      id: "welcome",
      timestamp: new Date(),
      command: "",
      response: "Welcome to EthicalHack-AI Assistant. Type 'help' to see available commands.",
      status: "info",
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to bottom when commands change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [commands]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    // Add user command
    const newCommand: TerminalCommand = {
      id: Date.now().toString(),
      timestamp: new Date(),
      command: currentCommand,
      response: "",
      status: "info",
      isLoading: true,
    };

    setCommands((prevCommands) => [...prevCommands, newCommand]);
    setCurrentCommand("");

    // Simulate command processing
    setTimeout(() => {
      setCommands((prevCommands) =>
        prevCommands.map((cmd) => {
          if (cmd.id === newCommand.id) {
            return {
              ...cmd,
              isLoading: false,
              status: "success",
              response: processCommand(currentCommand),
            };
          }
          return cmd;
        })
      );
    }, 500);
  };

  const processCommand = (cmd: string): string => {
    const command = cmd.trim().toLowerCase();
    
    if (command === "help") {
      return `
Available commands:
  help            - Show this help message
  scan [target]   - Scan a target system (simulation)
  exploit [vuln]  - Attempt to exploit a vulnerability (simulation)
  tools           - List available security tools
  clear           - Clear the terminal
`;
    } else if (command.startsWith("scan")) {
      return `Running security scan (simulation)...\n
╭────────────────────────────────╮
│ Target: ${command.split(" ")[1] || "localhost"}              │
│ Scan type: Comprehensive        │
│ Open ports: 22, 80, 443         │
│ Services: SSH, HTTP, HTTPS      │
│ Vulnerabilities found: 2        │
╰────────────────────────────────╯

Recommended actions:
1. Patch CVE-2023-1234 on SSH service
2. Update web server to latest version
`;
    } else if (command.startsWith("exploit")) {
      const target = command.split(" ")[1] || "default";
      return `
╭─────────────────────────────────────────────╮
│ Exploit simulation: ${target.padEnd(25)} │
│ Status: Initiated                          │
│ Warning: This is a simulation only         │
╰─────────────────────────────────────────────╯

[*] Preparing exploit payload
[*] Delivering payload to target
[+] Exploitation successful (simulated)
[*] Access granted to target system (simulated)

Type "help" for more commands within the target system.
`;
    } else if (command === "tools") {
      return `
Available security tools:
  - Network Scanners
  - Vulnerability Assessment
  - Exploitation Frameworks
  - Password Crackers
  - Forensic Analysis

Use "help [tool]" for more information on a specific tool.
`;
    } else if (command === "clear") {
      // Special case: clear the terminal
      setTimeout(() => {
        setCommands([
          {
            id: "clear",
            timestamp: new Date(),
            command: "",
            response: "Terminal cleared.",
            status: "info",
          },
        ]);
      }, 10);
      return "";
    } else if (command === "exit") {
      return "Cannot exit terminal interface. To change interfaces, use the tabs above.";
    } else {
      return `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-cyber-dark terminal text-sm">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {commands.map((cmd, index) => (
          <div key={cmd.id} className="mb-2">
            {cmd.command && (
              <div className="flex items-center mb-1">
                <span className="text-cyber-green mr-2">$</span>
                <span>{cmd.command}</span>
              </div>
            )}
            <div className={`ml-4 ${getResponseStyles(cmd.status)}`}>
              {cmd.isLoading ? (
                <div className="flex items-center">
                  <span className="animate-pulse-slow">Processing...</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{cmd.response}</pre>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="border-t border-cyber-light-gray p-4 flex items-center">
        <span className="text-cyber-green mr-2">$</span>
        <Input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          className="flex-1 bg-transparent border-none text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
          placeholder="Type command..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};

const getResponseStyles = (status: string): string => {
  switch (status) {
    case "success":
      return "text-foreground";
    case "error":
      return "text-cyber-red";
    case "warning":
      return "text-cyber-yellow";
    case "info":
      return "text-cyber-blue";
    default:
      return "text-foreground";
  }
};

export default TerminalInterface;
