
import { useTheme } from "next-themes";
import { ColorPicker } from "./ColorPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [colors, setColors] = useState({
    background: '#1a1f2c',
    foreground: '#f8fafc',
    accent: '#2d3748',
  });

  const updateColor = (type: keyof typeof colors) => (color: string) => {
    setColors((prev) => ({ ...prev, [type]: color }));
    document.documentElement.style.setProperty(`--${type}-custom`, color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-16 right-4">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Customize Theme</h3>
          <div className="flex flex-col gap-2">
            <ColorPicker
              label="Background"
              color={colors.background}
              onChange={updateColor('background')}
            />
            <ColorPicker
              label="Text"
              color={colors.foreground}
              onChange={updateColor('foreground')}
            />
            <ColorPicker
              label="Accent"
              color={colors.accent}
              onChange={updateColor('accent')}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
