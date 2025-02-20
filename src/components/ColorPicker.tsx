
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Paintbrush } from "lucide-react";
import { useEffect, useState } from "react";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color);

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    onChange(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="w-full flex justify-between items-center gap-2">
          <span className="text-sm">{label}</span>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: selectedColor }}
            />
            <Paintbrush className="h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full h-8"
          />
          <div className="grid grid-cols-5 gap-2">
            {['#1a1f2c', '#2d3748', '#4a5568', '#718096', '#a0aec0'].map((presetColor) => (
              <button
                key={presetColor}
                className="w-8 h-8 rounded-full border focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ backgroundColor: presetColor }}
                onClick={() => handleColorChange(presetColor)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
