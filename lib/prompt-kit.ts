import { ChatMessage } from '@/types/chat';

export class PromptKit {
  private static instance: PromptKit;

  static getInstance(): PromptKit {
    if (!PromptKit.instance) {
      PromptKit.instance = new PromptKit();
    }
    return PromptKit.instance;
  }

  async initialize(): Promise<void> {
    console.log('Prompt Kit initialized successfully');
  }

  async generateSuggestions(context: string = ''): Promise<string[]> {
    const allSuggestions = [
      "How do I handle form validation in React?",
      "What's the difference between useState and useReducer?",
      "How to optimize React component performance?",
      "Best practices for React component structure?",
      "How to test React components effectively?",
      "What are React hooks and when to use them?",
      "How to manage global state in React?",
      "How to handle API calls in React?"
    ];

    if (!context) return allSuggestions.slice(0, 4);

    const filtered = allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(context.toLowerCase())
    );

    return filtered.length > 0 ? filtered.slice(0, 4) : allSuggestions.slice(0, 4);
  }

  async analyzeEmotions(text: string): Promise<Array<{ label: string; confidence: number }>> {
    const emotions = [
      { label: "Curiosity", confidence: Math.min(95, Math.random() * 50 + 45) },
      { label: "Engagement", confidence: Math.min(90, Math.random() * 50 + 40) },
      { label: "Initiative", confidence: Math.min(85, Math.random() * 50 + 35) }
    ];

    if (text.includes('?')) {
      emotions.push({ label: "Questioning", confidence: 80 });
    }
    if (text.includes('!')) {
      emotions.push({ label: "Excitement", confidence: 75 });
    }
    if (text.toLowerCase().includes('help') || text.toLowerCase().includes('stuck')) {
      emotions.push({ label: "NeedHelp", confidence: 85 });
    }

    return emotions.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  }

  async generateResponse(prompt: string, history: ChatMessage[]): Promise<string> {
    const responses: Record<string, string> = {
      "form validation": `For form validation, I recommend using **React Hook Form** with **Zod** for schema validation. It's lightweight and has excellent TypeScript support.

\`\`\`typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(formSchema)
});
\`\`\``,

      "state management": `For state management decisions:

• **useState**: Local component state
• **useReducer**: Complex state logic
• **Zustand**: Lightweight global state
• **Redux Toolkit**: Enterprise-grade state
• **React Context**: Prop drilling solution

\`\`\`typescript
// Global state with Zustand
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));
\`\`\``,

      "default": `I'd be happy to help you with that! To give you the best advice, could you provide a bit more context about:

1. What you've tried already?
2. Any specific error messages you're seeing?
3. Your React version and any related dependencies?

This will help me provide more targeted guidance for your situation.`
    };

    const lowerPrompt = prompt.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerPrompt.includes(key)) {
        return response;
      }
    }

    return responses.default;
  }
}

export const promptKit = PromptKit.getInstance();