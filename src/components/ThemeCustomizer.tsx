import { useTheme } from "next-themes";
import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Paintbrush } from "lucide-react";

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [colors, setColors] = useState({
    primary: '#000000',
    secondary: '#ffffff',
    tertiary: '#888888',
    text: '#000000',
    avatarBg: '#e0e0e0',
    avatarIcon: '#666666',
    inputBg: '#ffffff',
    buttonBg: '#000000',
    buttonText: '#ffffff'
  });

  const updateColor = (key: string) => (color: string) => {
    setColors(prev => ({
      ...prev,
      [key]: color
    }));
    const hsl = hexToHSL(color);
    if (key === 'avatarBg' || key === 'avatarIcon' || key === 'inputBg' || key === 'buttonBg' || key === 'buttonText') {
      document.documentElement.style.setProperty(`--${key}`, color);
    } else {
      document.documentElement.style.setProperty(`--${key}-custom`, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    }
  };

  const hexToHSL = (hex: string) => {
    hex = hex.replace(/^#/, '');
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
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
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
        <Button variant="outline" size="icon" className="fixed top-4 right-4">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 h-[30vh] overflow-y-auto">
        <div className="flex flex-col gap-2">
          <ColorPicker label="Primary" color={colors.primary} onChange={updateColor('primary')} />
          <ColorPicker label="Secondary" color={colors.secondary} onChange={updateColor('secondary')} />
          <ColorPicker label="Tertiary" color={colors.tertiary} onChange={updateColor('tertiary')} />
          <ColorPicker label="Text" color={colors.text} onChange={updateColor('text')} />
          <ColorPicker label="Avatar Background" color={colors.avatarBg} onChange={updateColor('avatarBg')} />
          <ColorPicker label="Avatar Icon" color={colors.avatarIcon} onChange={updateColor('avatarIcon')} />
          <ColorPicker label="Input Background" color={colors.inputBg} onChange={updateColor('inputBg')} />
          <ColorPicker label="Button Background" color={colors.buttonBg} onChange={updateColor('buttonBg')} />
          <ColorPicker label="Button Text" color={colors.buttonText} onChange={updateColor('buttonText')} />
        </div>
      </PopoverContent>
    </Popover>
  );
}