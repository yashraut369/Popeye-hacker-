
import { aiService } from "@/services/ai-service";
import { AIProvider } from "@/types/ai";

export async function getAITerminalResponse(
  command: string,
  provider: AIProvider
): Promise<string> {
  try {
    const apiKey = aiService.getApiKey(provider);
    if (!apiKey) {
      return `Error: API key for ${provider} is not set. Please configure it in the settings.`;
    }
    
    const result = await aiService.generateResponse(
      provider,
      [
        {
          role: "system",
          content: `You are an advanced terminal interface for ethical hackers. Reply to user commands with simulated terminal output.
          Format your response as plain text that would appear in a terminal.
          Do not use markdown formatting.
          For commands related to scanning, exploits, or tools, create realistic-looking terminal output.`
        },
        {
          role: "user",
          content: command
        }
      ],
      { temperature: 0.7 }
    );
    
    return result.text;
  } catch (error) {
    console.error("Error generating AI terminal response:", error);
    return `Error: ${error.message}`;
  }
}
