
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
    primary: '#9b87f5',
    secondary: '#7E69AB',
    tertiary: '#6E59A5',
    text: '#f8fafc',
  });

  const updateColor = (type: keyof typeof colors) => (color: string) => {
    setColors((prev) => ({ ...prev, [type]: color }));
    const hsl = hexToHSL(color);
    document.documentElement.style.setProperty(`--${type}-custom`, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  };

  // Helper function to convert hex to HSL
  const hexToHSL = (hex: string) => {
    // Remove the # if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
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
              label="Primary Color"
              color={colors.primary}
              onChange={updateColor('primary')}
            />
            <ColorPicker
              label="Secondary Color"
              color={colors.secondary}
              onChange={updateColor('secondary')}
            />
            <ColorPicker
              label="Tertiary Color"
              color={colors.tertiary}
              onChange={updateColor('tertiary')}
            />
            <ColorPicker
              label="Text Color"
              color={colors.text}
              onChange={updateColor('text')}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
