
import { AIProvider, AIMessage, AIResponse } from "@/types/ai";

class AIService {
  private apiKeys: {
    grok?: string;
    gemini?: string;
    cohere?: string;
    perplexity?: string;
  } = {};

  setApiKey(provider: AIProvider, key: string) {
    this.apiKeys[provider] = key;
    localStorage.setItem(`${provider}_api_key`, key);
  }

  getApiKey(provider: AIProvider): string | undefined {
    if (!this.apiKeys[provider]) {
      this.apiKeys[provider] = localStorage.getItem(`${provider}_api_key`) || undefined;
    }
    return this.apiKeys[provider];
  }

  async generateResponse(
    provider: AIProvider,
    messages: AIMessage[],
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<AIResponse> {
    const apiKey = this.getApiKey(provider);
    
    if (!apiKey) {
      throw new Error(`API key not set for ${provider}`);
    }

    switch (provider) {
      case 'grok':
        return this.callGrokApi(apiKey, messages, options);
      case 'gemini':
        return this.callGeminiApi(apiKey, messages, options);
      case 'cohere':
        return this.callCohereApi(apiKey, messages, options);
      case 'perplexity':
        return this.callPerplexityApi(apiKey, messages, options);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  private async callGrokApi(
    apiKey: string, 
    messages: AIMessage[], 
    options: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.grok.x/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'grok-1',
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 800
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Grok API error: ${error}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        provider: 'grok'
      };
    } catch (error) {
      console.error('Error calling Grok API:', error);
      throw new Error(`Failed to get response from Grok API: ${error.message}`);
    }
  }

  private async callGeminiApi(
    apiKey: string, 
    messages: AIMessage[], 
    options: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    try {
      const formattedMessages = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: [{ text: m.content }]
      }));

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.maxTokens || 800,
            topP: 0.8,
            topK: 40
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error: ${error}`);
      }

      const data = await response.json();
      return {
        text: data.candidates[0].content.parts[0].text,
        provider: 'gemini'
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error(`Failed to get response from Gemini API: ${error.message}`);
    }
  }

  private async callCohereApi(
    apiKey: string, 
    messages: AIMessage[], 
    options: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Cohere-Version': '2023-05-24'
        },
        body: JSON.stringify({
          model: 'command-r-plus',
          chat_history: messages.slice(0, -1).map(m => ({
            role: m.role,
            message: m.content
          })),
          message: messages[messages.length - 1].content,
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 800
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Cohere API error: ${error}`);
      }

      const data = await response.json();
      return {
        text: data.text,
        provider: 'cohere'
      };
    } catch (error) {
      console.error('Error calling Cohere API:', error);
      throw new Error(`Failed to get response from Cohere API: ${error.message}`);
    }
  }

  private async callPerplexityApi(
    apiKey: string, 
    messages: AIMessage[], 
    options: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages,
          temperature: options.temperature || 0.2,
          max_tokens: options.maxTokens || 1000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Perplexity API error: ${error}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        provider: 'perplexity'
      };
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      throw new Error(`Failed to get response from Perplexity API: ${error.message}`);
    }
  }
}

export const aiService = new AIService();
