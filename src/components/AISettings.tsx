
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { aiService } from "@/services/ai-service";
import { AIProvider } from "@/types/ai";

interface AISettingsProps {
  open: boolean;
  onClose: () => void;
}

const AISettings: React.FC<AISettingsProps> = ({ open, onClose }) => {
  const [grokKey, setGrokKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [cohereKey, setCohereKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");

  useEffect(() => {
    setGrokKey(localStorage.getItem("grok_api_key") || "");
    setGeminiKey(localStorage.getItem("gemini_api_key") || "");
    setCohereKey(localStorage.getItem("cohere_api_key") || "");
    setPerplexityKey(localStorage.getItem("perplexity_api_key") || "");
  }, [open]);

  const saveSettings = () => {
    if (grokKey) aiService.setApiKey("grok", grokKey);
    if (geminiKey) aiService.setApiKey("gemini", geminiKey);
    if (cohereKey) aiService.setApiKey("cohere", cohereKey);
    if (perplexityKey) aiService.setApiKey("perplexity", perplexityKey);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-gray border-cyber-light-gray text-foreground">
        <DialogHeader>
          <DialogTitle>AI API Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="grok-api">Grok API Key</Label>
            <Input
              id="grok-api"
              value={grokKey}
              onChange={(e) => setGrokKey(e.target.value)}
              placeholder="Enter Grok API key"
              className="bg-cyber-dark border-cyber-light-gray"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gemini-api">Google Gemini API Key</Label>
            <Input
              id="gemini-api"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="Enter Gemini API key"
              className="bg-cyber-dark border-cyber-light-gray"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cohere-api">Cohere API Key</Label>
            <Input
              id="cohere-api"
              value={cohereKey}
              onChange={(e) => setCohereKey(e.target.value)}
              placeholder="Enter Cohere API key"
              className="bg-cyber-dark border-cyber-light-gray"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="perplexity-api">Perplexity API Key</Label>
            <Input
              id="perplexity-api"
              value={perplexityKey}
              onChange={(e) => setPerplexityKey(e.target.value)}
              placeholder="Enter Perplexity API key"
              className="bg-cyber-dark border-cyber-light-gray"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={saveSettings} className="bg-cyber-blue hover:bg-cyber-blue/80">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AISettings;
