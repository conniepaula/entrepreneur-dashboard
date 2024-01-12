import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme/theme-provider";
import { Button, ButtonProps } from "@/components/ui/button";

export function ModeToggle(props: ButtonProps) {
  const { setTheme, theme } = useTheme();

  const handleThemeButtonClick = () => {
    let newTheme: "light" | "dark";
    if (theme === "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "light"
        : "dark";
    } else {
      newTheme = theme === "light" ? "dark" : "light";
    }

    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeButtonClick}
      {...props}
    >
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
