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
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination(props: PaginationProps) {
  const {
    pageIndex: optimisticPageIndex,
    itemCount,
    perPage,
    onPageChange,
  } = props;
  const numberOfPages = Math.ceil(itemCount / perPage) || 1;
  const pageIndex = Math.min(optimisticPageIndex, numberOfPages - 1);
  const firstItemShown = Math.min(pageIndex * perPage + 1);
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
          <Button
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex === numberOfPages - 1}
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            onClick={() => onPageChange(numberOfPages - 1)}
            disabled={pageIndex === numberOfPages - 1}
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
