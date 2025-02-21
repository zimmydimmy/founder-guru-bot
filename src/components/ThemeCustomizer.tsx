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
    document.documentElement.style.setProperty(`--color-${key}`, color);
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