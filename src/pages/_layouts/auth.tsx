import { Outlet } from "react-router-dom";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theme/theme-toggle";

export function AuthLayout() {
  return (
    <div className="relative flex h-screen flex-col antialiased md:grid md:min-h-screen md:grid-cols-2">
      <ModeToggle className="absolute right-3 top-2.5" />
      <div className="flex h-fit flex-col justify-between border-r border-foreground/5 bg-muted p-4 text-muted-foreground md:h-full md:p-10">
        <div className="flex items-center gap-1 text-lg text-foreground md:gap-2">
          <Logo className="h-6 w-6 text-black" />
          <span className="font-semibold">Entrepreneur Dashboard</span>
        </div>
        <footer className="hidden text-sm md:block">
          Partner Portal &copy; Entrepreneur Dashboard -{" "}
          {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
