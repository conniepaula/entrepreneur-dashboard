import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export interface PaginationProps {
  pageIndex: number;
  itemCount: number;
  perPage: number;
}

export function Pagination(props: PaginationProps) {
  const { pageIndex, itemCount, perPage } = props;
  const numberOfPages = Math.ceil(itemCount / perPage) || 1;
  const firstItemShown = pageIndex * perPage + 1;
  const lastItemShown = Math.min((pageIndex + 1) * perPage, itemCount);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Showing {firstItemShown}-{lastItemShown} of {itemCount}
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Page {pageIndex + 1} of {numberOfPages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
