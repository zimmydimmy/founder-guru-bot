
import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your startup question..."
            className="flex-1 px-4 py-3 rounded-xl text-secondary-foreground border border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/10 transition-all"
            style={{ backgroundColor: 'var(--inputBg, hsl(var(--secondary)))' }}
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="px-4 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed border border-tertiary"
            style={{ 
              backgroundColor: 'var(--buttonBg, hsl(var(--secondary)))',
              color: 'var(--buttonText, hsl(var(--secondary-foreground)))'
            }}
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
