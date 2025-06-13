"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
    className?: string;
    inputClassName?: string;
    iconClassName?: string;
    placeholder?: string;
};

export function SearchInput({
    inputClassName = "",
    iconClassName = "",
    placeholder = "Search for products...",
}: SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const params = new URLSearchParams(searchParams.toString());

            if (searchQuery.trim()) {
                params.set("search", searchQuery.trim());
            } else {
                params.delete("search");
            }

            const newUrl = `/?${params.toString()}`;
            const currentUrl = `/?${searchParams.toString()}`;

            // Only navigate if URL actually changed
            if (newUrl !== currentUrl) {
                router.push(newUrl);
            }
        },
        [searchQuery, searchParams, router],
    );

    return (
        <form onSubmit={handleSearch} className={`relative w-full`}>
            <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${iconClassName || "text-gray-400"}`}
            />
            <Input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 w-full bg-white rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 ${inputClassName}`}
                style={{ height: "40px", boxShadow: "none" }}
            />
        </form>
    );
}
