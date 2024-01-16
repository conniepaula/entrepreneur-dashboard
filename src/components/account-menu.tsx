import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { getProfile } from "@/api/get-profile";
import { getRepresentedBusiness } from "@/api/get-represented-business";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { BusinessProfileDialog } from "./business-profile-dialog";

// TODO: Add unchangeable links to a constant file

export function DesktopAccountMenu() {
  const { data: representative, isLoading: isLoadingRepresentative } = useQuery(
    {
      queryKey: ["profile"],
      queryFn: getProfile,
    },
  );
  const { data: business, isLoading: isLoadingBusiness } = useQuery({
    queryKey: ["represented-business"],
    queryFn: getRepresentedBusiness,
    staleTime: Infinity,
  });
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2 "
          >
            {isLoadingBusiness ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              business?.name
            )}
            <ChevronDown className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-1">
            {isLoadingRepresentative ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{representative?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {representative?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem className="space-x-2">
              <Building className="h-4 w-4" />
              <span className="">Business Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="space-x-2 text-violet-500 dark:text-violet-400">
            <LogOut className="h-4 w-4" />
            <span className="">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BusinessProfileDialog />
    </Dialog>
  );
}

export function MobileAccountMenu() {
  const { data: representative, isLoading: isLoadingRepresentative } = useQuery(
    {
      queryKey: ["profile"],
      queryFn: getProfile,
    },
  );
  const { data: business, isLoading: isLoadingBusiness } = useQuery({
    queryKey: ["represented-business"],
    queryFn: getRepresentedBusiness,
    staleTime: Infinity,
  });
  return (
    <div className="mt-auto md:hidden">
      <div className="flex items-center gap-2">
        {isLoadingBusiness || isLoadingRepresentative ? (
          <div className="flex w-full justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <>
            <span className="text-md flex select-none items-center gap-2">
              {business?.name}
            </span>
            <span className="ml-auto text-sm text-muted-foreground">
              {representative?.name}
            </span>
          </>
        )}
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
