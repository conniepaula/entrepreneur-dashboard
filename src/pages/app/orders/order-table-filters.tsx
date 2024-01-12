import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrderTableFilters() {
  return (
    <form className="relative flex items-center overflow-clip [&>*]:pb-2 md:[&>*]:pb-0">
      <span className="sticky left-0 pb-2 text-sm font-semibold">Filters:</span>
      <div className="ml-1 mr-2 flex h-12 flex-1 items-center gap-2 overflow-x-scroll px-1 md:mx-2 md:px-0">
        <Input placeholder="Order ID" className="h-8 w-auto" />
        <Input
          placeholder="Client name"
          className="h-8 w-[160px] md:w-[320px]"
        />
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="en-route">Out for delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" variant="secondary" size="xs">
          <Search className="h-3 w-3 md:mr-2" />
          <span className="sr-only md:not-sr-only">Filter results</span>
        </Button>
        <Button type="button" variant="outline" size="xs">
          <X className="h-3 w-3 md:mr-2" />
          <span className="sr-only md:not-sr-only"> Remove filters</span>
        </Button>
      </div>
    </form>
  );
}
