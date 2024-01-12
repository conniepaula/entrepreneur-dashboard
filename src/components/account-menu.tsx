import { Building, ChevronDown, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// TODO: Add unchangeable links to a constant file

export function DesktopAccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2 "
        >
          Company Name
          <ChevronDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span>Representative Name</span>
          <span className="text-xs font-normal text-muted-foreground">
            representativeemail@company.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="space-x-2">
          <Building className="h-4 w-4" />
          <span className="">Business Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2 text-violet-500 dark:text-violet-400">
          <LogOut className="h-4 w-4" />
          <span className="">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileAccountMenu() {
  return (
    <div className="mt-auto md:hidden">
      <div className="flex items-center gap-2">
        <span className="text-md flex select-none items-center gap-2">
          Company Name
        </span>
        <span className="ml-auto text-sm text-muted-foreground">
          Representative Name
        </span>
      </div>
      <Separator className="my-2" />
      <div className="space-y-2">
        <Link to="/" className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <span className="text-sm">Business Profile</span>
        </Link>
        <Link
          to="/sign-in"
          className="flex items-center gap-2 text-violet-500 dark:text-violet-400"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Log Out</span>
        </Link>
      </div>
    </div>
  );
}
