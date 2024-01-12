import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { Card, CardContent } from "@/components/ui/card";

export function CustomTooltip(props: TooltipProps<ValueType, NameType>) {
  const { label, payload, active } = props;
  return (
    active && (
      <Card className="">
        <CardContent className="px-3 py-2">
          <div>
            <span className="text-foreground">Date:</span>
            <span className="ml-1 font-semibold text-muted-foreground ">{`${label}`}</span>
          </div>
          <div>
            <span className="text-foreground">Revenue:</span>
            <span className="ml-1 font-semibold text-violet-500 dark:text-violet-400">{`${payload?.[0].value}`}</span>
          </div>
        </CardContent>
      </Card>
    )
  );
}
