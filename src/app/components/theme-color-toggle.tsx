"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeContext } from "../../context/theme-data-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ThemeColors } from "@/types/theme-types";

const availableThemeColors = [
  { name: "Negro", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Rojo", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Azul", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Verde", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Naranja", light: "bg-orange-500", dark: "bg-orange-700" },
];

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext();

  const { theme } = useTheme();

  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem key={name} value={name}>
        <div className="flex item-center space-x-3">
          <div
            className={cn(
              "rounded-full",
              "w-[20px]",
              "h-[20px]",
              theme === "light" ? light : dark
            )}
          ></div>
          <div className="text-sm">{name}</div>
        </div>
      </SelectItem>
    ));
  };

  return (
    <Select
      onValueChange={(value) => setThemeColor(value as ThemeColors)}
      defaultValue={themeColor}
    >
      <SelectTrigger className="w-[180px] ring-offset-transparent focus:ring-transparent">
        <SelectValue placeholder="Select Color" />
      </SelectTrigger>
      <SelectContent className="border-muted">
        {createSelectItems()}
      </SelectContent>
    </Select>
  );
}
