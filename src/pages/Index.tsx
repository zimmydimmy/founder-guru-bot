
import { useState } from "react";
import { Bot } from "lucide-react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { ThemeToggle } from "../components/ThemeToggle";
import { ThemeCustomizer } from "../components/ThemeCustomizer";
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
      <ThemeCustomizer />
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
            <div className="message-content-wrapper">
              <div className="assistant-avatar">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div className="loading-bubble">
                <div className="loading-dots">
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                </div>
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
