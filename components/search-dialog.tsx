"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, FileText, Clock, X } from "lucide-react";
import type { DocContent } from "@/lib/docs";
import { useRouter } from "next/navigation";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allDocs: DocContent[];
}

interface SearchResult extends DocContent {
  score: number;
  matchedIn: string[];
}

const RECENT_SEARCHES_KEY = "cli-handbook-recent-searches";
const MAX_RECENT_SEARCHES = 6;

export function SearchDialog({
  open,
  onOpenChange,
  allDocs,
}: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const router = useRouter();
  const resultsRef = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Advanced search algorithm with relevance scoring
  const searchDocs = React.useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const queryTerms = query.split(/\s+/);

    const scored: SearchResult[] = allDocs.map((doc) => {
      let score = 0;
      const matchedIn: string[] = [];

      const title = doc.title.toLowerCase();
      const content = doc.content.toLowerCase();
      const category = doc.category.toLowerCase();
      const slugText = doc.slug.join(" ").toLowerCase();

      // Exact title match (highest priority)
      if (title === query) {
        score += 100;
        matchedIn.push("exact-title");
      }

      // Title starts with query
      if (title.startsWith(query)) {
        score += 50;
        matchedIn.push("title-start");
      }

      // Title contains full query
      if (title.includes(query)) {
        score += 30;
        matchedIn.push("title");
      }

      // Category match
      if (category.includes(query)) {
        score += 20;
        matchedIn.push("category");
      }

      // Slug match
      if (slugText.includes(query)) {
        score += 15;
        matchedIn.push("slug");
      }

      // Multi-term matching
      queryTerms.forEach((term) => {
        if (term.length < 2) return;

        // Title matches
        if (title.includes(term)) {
          score += 10;
          matchedIn.push("title-term");
        }

        // Word boundary match in title (whole word)
        const titleWords = title.split(/\s+/);
        if (titleWords.some(word => word.startsWith(term))) {
          score += 15;
        }

        // Content matches (limited score to avoid content-heavy docs dominating)
        const contentMatches = (content.match(new RegExp(term, "gi")) || []).length;
        score += Math.min(contentMatches * 2, 20);
        if (contentMatches > 0) {
          matchedIn.push("content");
        }
      });

      // Fuzzy matching - allow for small typos
      const fuzzyMatch = (text: string, query: string) => {
        const maxDistance = Math.floor(query.length / 4); // Allow 1 char difference per 4 chars
        let distance = 0;
        let j = 0;

        for (let i = 0; i < query.length && j < text.length; i++) {
          while (j < text.length && text[j] !== query[i]) {
            distance++;
            j++;
            if (distance > maxDistance) return false;
          }
          j++;
        }
        return distance <= maxDistance;
      };

      // Apply fuzzy matching bonus to title
      const titleWords = title.split(/\s+/);
      titleWords.forEach((word) => {
        if (fuzzyMatch(word, query)) {
          score += 8;
          matchedIn.push("fuzzy");
        }
      });

      return {
        ...doc,
        score,
        matchedIn: [...new Set(matchedIn)],
      };
    });

    // Filter out docs with score 0 and sort by relevance
    return scored
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15); // Show top 15 results
  }, [allDocs]);

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const queryTerms = query.trim().split(/\s+/).filter(t => t.length > 1);
    const pattern = queryTerms.join("|");

    try {
      const parts = text.split(new RegExp(`(${pattern})`, "gi"));
      return parts.map((part, i) =>
        queryTerms.some(term => part.toLowerCase() === term.toLowerCase()) ? (
          <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  // Load recent searches from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save search to recent searches
  const saveRecentSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.length < 2) return;

    try {
      const updated = [
        trimmed,
        ...recentSearches.filter((s) => s !== trimmed),
      ].slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore localStorage errors
    }
  };

  // Remove a single recent search
  const removeRecentSearch = (searchQuery: string) => {
    const updated = recentSearches.filter((s) => s !== searchQuery);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
  };

  React.useEffect(() => {
    const searchResults = searchDocs(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query, searchDocs]);

  const handleSelect = (slug: string[]) => {
    // Save the current query to recent searches if valid
    if (query.trim()) {
      saveRecentSearch(query);
    }

    router.push(`/${slug.join("/")}`);
    onOpenChange(false);
    setQuery("");
    setSelectedIndex(0);
  };

  // Scroll selected item into view
  React.useEffect(() => {
    if (resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Open/close search
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
        return;
      }

      // Only handle navigation when dialog is open
      if (!open) return;

      // Arrow down
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      }

      // Arrow up
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      // Enter to select
      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex].slug);
      }

      // Escape to close
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange, results, selectedIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 w-[95vw] sm:w-full max-h-[85vh] sm:max-h-none flex flex-col">
        <DialogTitle className="sr-only">Search Documentation</DialogTitle>
        <div className="flex items-center border-b pl-3 sm:pl-4 flex-shrink-0">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 sm:h-12 text-sm sm:text-base"
            autoFocus
          />
        </div>

        <div className="max-h-[calc(85vh-4rem)] sm:max-h-[450px] overflow-y-auto p-2 flex-1">
          {/* Results count */}
          {query && results.length > 0 && (
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </div>
          )}

          {/* No results */}
          {query && results.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground px-4">
              <p className="mb-2">No results found for "{query}"</p>
              <p className="text-xs">Try different keywords or check spelling</p>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((doc, index) => (
                <button
                  key={doc.slug.join("/")}
                  ref={(el) => { resultsRef.current[index] = el; }}
                  onClick={() => handleSelect(doc.slug)}
                  className={`flex w-full items-start gap-2 sm:gap-3 rounded-md px-2 sm:px-3 py-2 text-left transition-colors ${index === selectedIndex
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted border border-transparent"
                    }`}
                >
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm capitalize mb-0.5">
                      {highlightText(doc.title, query)}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {doc.category} / {doc.slug.join(" / ")}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches & Instructions */}
          {!query && (
            <div className="py-4 px-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 group"
                      >
                        <button
                          onClick={() => setQuery(search)}
                          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left text-sm"
                        >
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{search}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(search);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted/80 transition-opacity"
                          aria-label="Remove search"
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p className="mb-4">Search through handbook</p>
                <div className="space-y-2 text-xs">
                  <p className="flex items-center justify-center gap-2">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                      ⌘K
                    </kbd>
                    <span>to open search</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                      ↑↓
                    </kbd>
                    <span>to navigate</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                      Enter
                    </kbd>
                    <span>to select</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
