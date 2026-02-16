"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

interface BreadcrumbProps {
    slug?: string[];
}

export function Breadcrumb({ slug }: BreadcrumbProps) {
    if (!slug || slug.length === 0) {
        return null;
    }

    const breadcrumbItems = [
        { label: "Home", href: "/", icon: true },
        ...slug.map((segment, index) => ({
            label: segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
            href: `/${slug.slice(0, index + 1).join("/")}`,
            icon: false,
        })),
    ];

    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto py-2"
        >
            {breadcrumbItems.map((item, index) => (
                <Fragment key={item.href}>
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
