
import { Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={`message ${role}-message`}>
      <div className="message-content-wrapper">
        {role === "assistant" && (
          <div className="assistant-avatar">
            <Bot className="w-6 h-6 text-primary" />
          </div>
        )}
        <div className="message-content">{content}</div>
      </div>
    </div>
  );
};
