"use client"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useTheme } from "@/lib/theme-provider";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Theme:</span>
      <Select value={theme} onValueChange={(value) => setTheme(value as any)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="forest">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#274156] to-[#3B6978]" />
              Forest
            </span>
          </SelectItem>
          <SelectItem value="cold">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-300 via-blue-100 to-blue-50" />
              Cold
            </span>
          </SelectItem>
          <SelectItem value="underwater">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-b from-blue-800 via-teal-700 to-cyan-500" />
              Underwater
            </span>
          </SelectItem>
          <SelectItem value="halloween">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400" />
              Halloween
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}