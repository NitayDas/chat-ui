import { ChatMessage } from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatInterfaceProps {
  messages: ChatMessageType[];
}

export function ChatInterface({ messages }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-4xl mx-auto">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}