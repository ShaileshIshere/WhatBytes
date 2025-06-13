"use client";

import type React from "react";

export default function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
