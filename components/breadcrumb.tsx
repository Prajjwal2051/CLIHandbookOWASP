"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";
import { navigation } from "@/lib/navigation";

interface BreadcrumbProps {
    slug?: string[];
}

export function Breadcrumb({ slug }: BreadcrumbProps) {
    if (!slug || slug.length === 0) {
        return null;
    }

    // Helper function to resolve the correct href for breadcrumb segments
    const getResolvedHref = (segments: string[]): string => {
        const path = `/${segments.join("/")}`;

        // Check if this exact path exists in navigation
        for (const navItem of navigation) {
            // Check main navigation item
            if (navItem.href === path) {
                return navItem.href;
            }

            // Check sub-items
            if (navItem.items) {
                for (const subItem of navItem.items) {
                    if (subItem.href === path) {
                        return subItem.href;
                    }
                }
            }
        }

        // If it's a single segment (category), find the category's default page
        if (segments.length === 1) {
            const category = segments[0];
            const categoryNav = navigation.find(
                (item) => item.href.startsWith(`/${category}`)
            );

            if (categoryNav) {
                // Return the category's default href (first page in category)
                return categoryNav.href;
            }
        }

        // Fallback to the constructed path (shouldn't normally reach here)
        return path;
    };

    const breadcrumbItems = [
        { label: "Home", href: "/", icon: true },
        ...slug.map((segment, index) => ({
            label: segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
            href: getResolvedHref(slug.slice(0, index + 1)),
            icon: false,
        })),
    ];

    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto py-2"
        >
            {breadcrumbItems.map((item, index) => (
                <Fragment key={`${index}-${item.href}`}>
                    {index === breadcrumbItems.length - 1 ? (
                        <span className="font-medium text-foreground whitespace-nowrap">
                            {item.label}
                        </span>
                    ) : (
                        <>
                            <Link
                                href={item.href as any}
                                className="hover:text-foreground transition-colors flex items-center gap-1 whitespace-nowrap"
                            >
                                {item.icon && <Home className="h-3.5 w-3.5" />}
                                {!item.icon && item.label}
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                        </>
                    )}
                </Fragment>
            ))}
        </nav>
    );
}
