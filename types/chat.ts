export interface Emotion {
  label: string;
  confidence: number;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  emotions: Emotion[];
}
