"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, Search, ChevronRight } from "lucide-react";
import { SearchDialog } from "@/components/search-dialog";
import * as React from "react";
import type { DocContent } from "@/lib/docs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/lib/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  allDocs: DocContent[];
}

export function Header({ allDocs }: HeaderProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const [openSections, setOpenSections] = React.useState<string[]>(() => {
    const currentSection = navigation.find((section) =>
      section.items?.some((item) => item.href === pathname),
    );
    return currentSection ? [currentSection.title] : [];
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? [] : [title]));
  };

  return (
    <>
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        allDocs={allDocs}
      />
      <header
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        suppressHydrationWarning
      >
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8 mr-2"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader className="px-1 text-left">
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="rounded-md bg-primary p-1.5">
                      <Terminal className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold">CLI Handbook</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-1 pr-6">
                <div className="flex flex-col space-y-3">
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
                                openSections.includes(section.title) &&
                                  "rotate-90",
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
                                onClick={() => setMobileMenuOpen(false)}
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
                          onClick={() => setMobileMenuOpen(false)}
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
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 mr-6">
            <div className="rounded-md bg-primary p-1.5">
              <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden font-bold text-sm sm:inline-block">
              CLI Handbook By OWASP NIE
            </span>
          </Link>

          <nav className="flex flex-1 items-center justify-between">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/introduction/overview"
                className="transition-colors hover:text-foreground text-foreground/60"
              >
                Docs
              </Link>
              <Link
                href="/commands/navigation"
                className="transition-colors hover:text-foreground text-foreground/60"
              >
                Commands
              </Link>
              <Link
                href="/advanced/file-permissions-deep-dive"
                className="transition-colors hover:text-foreground text-foreground/60"
              >
                Advanced
              </Link>
              <Link
                href="/reference/command-index"
                className="transition-colors hover:text-foreground text-foreground/60"
              >
                Reference
              </Link>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted/70 border border-border/40 rounded-md transition-colors w-64"
              >
                <Search className="h-4 w-4" />
                <span>Search documentation...</span>
              </button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>

              <Link
                href="https://owasp.org"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/owasp-nie-logo.jpg"
                  alt="OWASP NIE Student Chapter Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                  suppressHydrationWarning
                />
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
