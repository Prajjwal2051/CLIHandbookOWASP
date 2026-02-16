"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { navigation } from "@/lib/navigation";
export function Sidebar() {
  const pathname = usePathname();

  // Find which section contains the current page
  const getInitialOpenSection = () => {
    const currentSection = navigation.find((section) =>
      section.items?.some((item) => item.href === pathname),
    );
    return currentSection ? [currentSection.title] : [navigation[0].title];
  };

  const [openSections, setOpenSections] = useState<string[]>(
    getInitialOpenSection(),
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? [] : [title]));
  };

  return (
    <div className="hidden md:flex w-60 border-r border-border/40 bg-background flex-shrink-0" suppressHydrationWarning>
      <ScrollArea className="h-full w-full py-6 pr-4 pl-6">
        <nav className="space-y-1">
          {navigation.map((section) => (
            <div key={section.title} className="space-y-1">
              {section.items && section.items.length > 0 ? (
                // Section with items - show as toggle
                <>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full py-1.5 text-sm font-semibold text-foreground hover:text-foreground transition-colors"
                  >
                    {section.title}
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openSections.includes(section.title) && "rotate-90",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "ml-0 space-y-1 overflow-hidden transition-all duration-300 ease-in-out",
                      openSections.includes(section.title)
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href as any}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm transition-all hover:bg-muted",
                          pathname === item.href
                            ? "bg-muted text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                // Section without items - show as direct link
                <Link
                  href={section.href as any}
                  className={cn(
                    "block py-1.5 text-sm font-semibold transition-colors",
                    pathname === section.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {section.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
