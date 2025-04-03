
export type AIProvider = 'grok' | 'gemini' | 'cohere' | 'perplexity';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  text: string;
  provider: AIProvider;
}
