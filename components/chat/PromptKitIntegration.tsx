"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { promptKit } from "@/lib/prompt-kit";
import { useState, useEffect } from "react";
import { Loader2, Sparkles, Zap } from "lucide-react";

interface PromptKitIntegrationProps {
  onPromptSelect: (prompt: string) => void;
  currentMessage?: ChatMessageType;
  conversationHistory: ChatMessageType[];
}

export function PromptKitIntegration({ 
  onPromptSelect, 
  currentMessage, 
  conversationHistory 
}: PromptKitIntegrationProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializePromptKit = async () => {
      try {
        await promptKit.initialize();
        setIsInitialized(true);
        loadSuggestions();
      } catch (error) {
        console.error('Prompt Kit initialization failed:', error);
        setIsInitialized(true);
      }
    };

    initializePromptKit();
  }, []);

  const loadSuggestions = async () => {
    setIsLoading(true);
    try {
      const lastMessage = conversationHistory[conversationHistory.length - 1]?.content || '';
      const newSuggestions = await promptKit.generateSuggestions(lastMessage);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      setSuggestions([
        "How do I handle form validation?",
        "What's the best way to manage global state?",
        "Can you explain React hooks?",
        "How to optimize React performance?"
      ]);
    }
    setIsLoading(false);
  };

  const handleSuggestionClick = async (suggestion: string) => {
    onPromptSelect(suggestion);
    setTimeout(loadSuggestions, 1000);
  };

  if (!isInitialized) {
    return (
      <Card className="sticky bottom-6 mx-6 mb-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-3" />
          <span className="text-gray-600">Initializing Prompt Kit AI...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky bottom-6 mx-6 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Prompt Suggestions
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full ml-2">
            Powered by Prompt Kit
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
            ))
          ) : (
            suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-3 px-4 text-left justify-start hover:bg-white hover:shadow-md transition-all border-dashed group"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-start gap-3 w-full">
                  <Zap className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm flex-1">{suggestion}</span>
                </div>
              </Button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentMessage ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-500">
              {currentMessage ? 'AI processing...' : 'Ready for input'}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={loadSuggestions}
            disabled={isLoading}
            className="text-xs text-purple-600 hover:text-purple-700"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-3 w-3 mr-1" />
            )}
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}