
import { useState } from "react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { ThemeToggle } from "../components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your startup co-pilot. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      
      // Add user message to chat
      const newMessage: Message = { role: "user", content: message };
      setMessages((prev) => [...prev, newMessage]);

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm currently in development. Soon I'll be able to help with your startup questions!",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      <ThemeToggle />
      <div className="chat-container">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-content">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-loader-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-loader-pulse delay-150" />
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-loader-pulse delay-300" />
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
