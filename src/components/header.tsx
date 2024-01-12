import { Coins, Home, Menu } from "lucide-react";

import {
  DesktopAccountMenu,
  MobileAccountMenu,
} from "@/components/account-menu";
import { Logo } from "@/components/logo";
import { NavLink } from "@/components/nav-link";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

// TODO: Add unchangeable links to a constant file
const navigationLinks = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-6 w-6 md:h-4 md:w-4" />,
  },
  {
    label: "Orders",
    href: "/",
    icon: <Coins className="h-6 w-6 md:h-4 md:w-4" />,
  },
];

export function Header() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 border-b bg-background">
      <div className="flex h-16 items-center gap-6 px-6">
        <Logo className="h-6 w-6 text-black" />
        {/* Mobile navigation bar */}
        <div className="w-full md:hidden">
          <Drawer fixed={true}>
            <DrawerTrigger asChild>
              <Menu className="ml-auto" />
            </DrawerTrigger>
            <DrawerContent className="flex h-full flex-col px-8 pb-8 md:hidden">
              <div className="space-y-4 pt-8">
                {navigationLinks.map((link) => (
                  <NavLink key={link.label} to={link.href}>
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <MobileAccountMenu />
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop navigation bar */}
        <Separator orientation="vertical" className="hidden h-6 md:block" />
        <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
          {navigationLinks.map((link) => (
            <NavLink key={link.label} to={link.href}>
              {link.icon}
              Home
            </NavLink>
          ))}
        </div>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ModeToggle />
          <DesktopAccountMenu />
        </div>
      </div>
    </nav>
  );
}
