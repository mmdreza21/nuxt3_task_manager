export interface CreateAgentDto {
  task: string;
  model: string; // groq | google | ...
}

export interface AgentResponse {
  text: string;
  content: string;
}
