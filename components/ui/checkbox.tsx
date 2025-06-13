"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                // Base
                "peer size-5 shrink-0 rounded-[4px] border transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1565c0]",
                // Default: white bg, blue border
                "bg-white border-blue-300",
                // Checked: blue bg, blue border, white check
                "data-[state=checked]:bg-[#1565c0] data-[state=checked]:border-[#1565c0] data-[state=checked]:text-white",
                // Shadow and disabled
                "shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-white transition-none"
            >
                <CheckIcon className="size-4" strokeWidth={3} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
