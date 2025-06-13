"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    const _values = React.useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                  ? defaultValue
                  : [min, max],
        [value, defaultValue, min, max],
    );

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                "relative flex w-full touch-none items-center select-none",
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    "relative grow overflow-hidden rounded-full bg-blue-300 h-2",
                )}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn("absolute h-full bg-blue-200")}
                />
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className="block size-5 shrink-0 rounded-full bg-white border-2 border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                />
            ))}
        </SliderPrimitive.Root>
    );
}

export { Slider };
