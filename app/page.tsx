"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { PromptKitIntegration } from "@/components/chat/PromptKitIntegration";
import { ChatMessage } from "@/types/chat";
import { promptKit } from "@/lib/prompt-kit";
import { messages as initialMessages } from "@/data/messages";
import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [currentMessage, setCurrentMessage] = useState<ChatMessage>();
  const [isPromptKitReady, setIsPromptKitReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await promptKit.initialize();
        setIsPromptKitReady(true);
      } catch (error) {
        console.error('Prompt Kit initialization failed:', error);
        setIsPromptKitReady(true);
      }
    };

    initialize();
  }, []);

  const handlePromptSelect = async (prompt: string) => {
    const emotions = await promptKit.analyzeEmotions(prompt);
    
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      role: "user",
      content: prompt,
      emotions: emotions
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage(newMessage);

    setTimeout(async () => {
      try {
        const aiResponse = await promptKit.generateResponse(prompt, messages);
        const aiEmotions = await promptKit.analyzeEmotions(aiResponse);
        
        const aiMessage: ChatMessage = {
          id: messages.length + 2,
          role: "assistant",
          content: aiResponse,
          emotions: aiEmotions
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setCurrentMessage(aiMessage);
      } catch (error) {
        console.error('Failed to generate AI response:', error);
        const fallbackMessage: ChatMessage = {
          id: messages.length + 2,
          role: "assistant",
          content: "I apologize, I'm having trouble generating a response right now. Please try again.",
          emotions: [
            { label: "Apology", confidence: 90 },
            { label: "Concern", confidence: 75 }
          ]
        };
        setMessages(prev => [...prev, fallbackMessage]);
        setCurrentMessage(fallbackMessage);
      }
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            💬 Chat Assistant
          </h1>
          <p className="text-gray-600 mb-4">
            Demonstrating Next.js with TypeScript, Shadcn/ui, TailwindCSS, and Prompt Kit Integration
          </p>
          {!isPromptKitReady && (
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              Initializing AI capabilities...
            </div>
          )}
        </div>
        
        
      </div>
    </main>
  );
}
