import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-blue-100">
            <Bot className="h-4 w-4 text-blue-600" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <Card className={`${isUser ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} w-full`}>
          <CardContent className="p-4">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
          </CardContent>
        </Card>
        
        <div className="flex flex-wrap gap-1">
          {message.emotions.slice(0, 2).map((emotion, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="text-xs font-normal"
            >
              {emotion.label} ({emotion.confidence}%)
            </Badge>
          ))}
          {message.emotions.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{message.emotions.length - 2} more
            </Badge>
          )}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-green-100">
            <User className="h-4 w-4 text-green-600" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}