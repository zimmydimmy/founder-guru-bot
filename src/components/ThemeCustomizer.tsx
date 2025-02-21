
import { useTheme } from "next-themes";
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
    <div className="fixed top-16 right-4 flex flex-col gap-2">
      {(Object.entries(colors) as [keyof typeof colors, string][]).map(([key, color]) => (
        <div
          key={key}
          className="h-10 w-10 rounded-md border-2 border-input relative overflow-hidden hover:opacity-80 transition-opacity"
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => updateColor(key)(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0 w-full h-full"
            aria-label={`Pick ${key} color`}
          />
        </div>
      ))}
    </div>
  );
}
