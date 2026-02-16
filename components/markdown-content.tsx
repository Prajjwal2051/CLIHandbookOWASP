"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Copy, Check, ChevronRight, ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { DocContent } from "@/lib/docs";
import React from "react";

interface MarkdownContentProps {
  content: string;
  title: string;
  slug?: string[]; // We need the slug to find next/prev pages
  allDocs: DocContent[]; // Pass docs from server component
}

export function MarkdownContent({
  content,
  title,
  slug,
  allDocs,
}: MarkdownContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  // Track active section based on scroll position
  useEffect(() => {
    const scrollableElement = document.querySelector("main.overflow-y-auto");
    if (!scrollableElement) return;

    const handleScroll = () => {
      const headingElements = document.querySelectorAll("h2[id], h3[id]");
      const mainRect = scrollableElement.getBoundingClientRect();
      const scrollTop = scrollableElement.scrollTop;

      let currentActiveId = "";

      headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top - mainRect.top + scrollTop;

        if (elementTop <= scrollTop + 100) {
          // 100px offset for better UX
          currentActiveId = element.id;
        }
      });

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll listener to the main content element
    scrollableElement.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scrollableElement.removeEventListener("scroll", handleScroll);
    };
  }, [content, activeId]);

  // Parse admonitions before passing to ReactMarkdown
  // This supports the legacy HTML format: <div class="admonition type" ...>
  // and transforms it into a custom component syntax handling
  // For simplicity in this implementation, we'll parse it as a custom component if we were using mdx-remote
  // But since we are using react-markdown, we'll strip the HTML wrapper and render a Callout
  // A better approach for react-markdown is using rehype-raw, but let's try a regex replace to clean it up first

  // Transform the specific HTML pattern seen in the screenshot to a simpler format we can handle or just render cleanly
  // The screenshot shows raw HTML being rendered as text. This means react-markdown is escaping HTML by default.
  // We need to either enable HTML (dangerous) or parse it.
  // Strategy: Replace the HTML strings with a custom syntax or just clean text, then use a custom component for blockquotes or similar.
  // Actually, let's use a regex to transform the HTML block into a standard Blockquote or just clean text for now,
  // OR better: use `rehype-raw` to interpret the HTML, but safety first.

  // Regex to transform the specific HTML structure to a Callout-like block
  // Input: <div class="admonition danger" markdown> <p class="admonition-title">Critical Warning</p> <p>...</p> </div>
  // Output: > [!DANGER] Critical Warning\n> ...

  const processedContent = content.replace(
    /<div class="admonition (\w+)" markdown>\s*<p class="admonition-title">(.*?)<\/p>\s*([\s\S]*?)<\/div>/g,
    (match, type, title, body) => {
      // Clean up body paragraph tags and convert common HTML to markdown
      const cleanBody = body
        .replace(/<\/?p>/g, "")
        .replace(/<code>(.*?)<\/code>/g, "`$1`")
        .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
        .replace(/<b>(.*?)<\/b>/g, "**$1**")
        .replace(/<em>(.*?)<\/em>/g, "*$1*")
        .replace(/<i>(.*?)<\/i>/g, "*$1*")
        .trim();
      return `> [!${type.toUpperCase()}] ${title}\n\n> ${cleanBody}`;
    },
  );

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Extract headings for Table of Contents
  const headings = content.match(/^(#{2,3})\s+(.+)$/gm)?.map((heading) => {
    const level = heading.match(/^(#{2,3})/)?.[1].length || 2;
    const text = heading.replace(/^(#{2,3})\s+/, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { level, text, id };
  });

  // Calculate Prev/Next Links with cyclic navigation
  // The allDocs is now ordered by navigation structure
  const currentIndex = slug
    ? allDocs.findIndex((d) => d.slug.join("/") === slug.join("/"))
    : -1;

  // Cyclic navigation: wrap around to end/start
  const prevDoc = currentIndex !== -1
    ? allDocs[(currentIndex - 1 + allDocs.length) % allDocs.length]
    : null;
  const nextDoc = currentIndex !== -1
    ? allDocs[(currentIndex + 1) % allDocs.length]
    : null;

  return (
    <div className="xl:grid xl:grid-cols-[1fr_240px] gap-12">
      <div className="min-w-0">
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-[15px] prose-p:leading-7 prose-p:my-4 prose-li:my-1.5 prose-code:text-sm prose-code:font-mono prose-code:text-foreground prose-code:bg-muted/60 prose-code:border prose-code:border-border/60 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-border/40 prose-pre:shadow-sm prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-td:border prose-td:border-border prose-td:p-3 prose-strong:text-foreground prose-strong:font-semibold prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:not-italic prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1({ children }) {
                return <h2 className="group">{children}</h2>;
              },
              h2({ children }) {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <h2 id={id} className="group flex items-center gap-2">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <h3 id={id} className="group flex items-center gap-2">
                    {children}
                  </h3>
                );
              },
              blockquote({ children }) {
                // Check if it's a special callout block
                // We look for a pattern like > [!TYPE] Title

                // Helper to get text content from a node
                const getTextFromNode = (node: any): string => {
                  if (typeof node === "string") return node;
                  if (Array.isArray(node))
                    return node.map(getTextFromNode).join("");
                  if (node?.props?.children)
                    return getTextFromNode(node.props.children);
                  return "";
                };

                const childrenArray = React.Children.toArray(children);

                // Find the first paragraph that contains the directive
                const firstChild = childrenArray[0]; // Usually the first paragraph if we formatted correctly
                const firstChildText = getTextFromNode(firstChild);

                if (firstChildText.trim().startsWith("[!")) {
                  const match = firstChildText
                    .trim()
                    .match(/^\[!(\w+)\]\s*(.*)$/);
                  if (match) {
                    const type = match[1].toLowerCase() as any;
                    const title = match[2];

                    // The rest of the children are the body
                    // If we used \n\n in regex, the first child is the title paragraph
                    const bodyChildren = childrenArray.slice(1);

                    return (
                      <Callout type={type} title={title}>
                        {bodyChildren}
                      </Callout>
                    );
                  }
                }

                // Also check if the directive is in the first child's children (ReactMarkdown sometimes nests differently)
                // This covers cases where it might be parsed as text directly inside blockquote if not in a paragraph

                return (
                  <blockquote className="my-6 pl-4 py-2 rounded-r-lg border-l-4 border-primary bg-muted/20">
                    {children}
                  </blockquote>
                );
              },
              pre({ children }) {
                return <>{children}</>;
              },
              code({ node, inline, className, children, ...props }: any) {
                const codeString = String(children).replace(/\n$/, "");
                const match = /language-(\w+)(?::(.+))?/.exec(className || "");
                const language = match ? match[1] : "";
                const filename = match ? match[2] : "";

                if (!inline && match) {
                  const isCopied = copiedCode === codeString;

                  return (
                    <div className="relative group my-6">
                      {filename && (
                        <div className="flex items-center justify-between bg-muted/50 border border-border/40 border-b-0 rounded-t-lg px-4 py-2.5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileText className="h-3.5 w-3.5" />
                            <span className="font-mono">{filename}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs hover:bg-background"
                            onClick={() => copyCode(codeString)}
                          >
                            {isCopied ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      )}
                      {!filename && (
                        <div className="absolute right-3 top-3 z-10">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-7 px-2 text-xs border border-border/40 bg-background/50 hover:bg-background"
                            onClick={() => copyCode(codeString)}
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3 w-3 mr-1.5" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1.5" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                      <pre
                        className={`!bg-zinc-800 !border transition-all duration-300 ${filename
                          ? "!rounded-t-none !rounded-b-lg"
                          : "!rounded-lg"
                          } ${isCopied
                            ? "!border-primary !shadow-[0_0_20px_rgba(34,197,94,0.35),0_0_40px_rgba(34,197,94,0.15),inset_0_0_60px_rgba(34,197,94,0.05)] !bg-zinc-800/90"
                            : "!border-border/40"
                          } scrollbar-thin scrollbar-thumb-zinc-700/50 scrollbar-track-transparent hover:scrollbar-thumb-zinc-700/80`}
                      >
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="table-wrapper my-4 overflow-x-auto rounded-lg border border-border shadow-sm">
                    <table className="w-full">{children}</table>
                  </div>
                );
              },
              ul({ children }) {
                return <ul className="my-4 space-y-2">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="my-4 space-y-2">{children}</ol>;
              },
              a({ href, children, ...props }) {
                // Handle internal links that end with .md
                let processedHref = href;
                if (href && !href.startsWith("http") && href.endsWith(".md")) {
                  processedHref = href.replace(/\.md$/, "");
                }

                return (
                  <a
                    href={processedHref}
                    {...props}
                    className="font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>

        {/* Navigation Toggles */}
        <div className="flex flex-row items-center justify-between mt-12 pt-6 border-t border-border">
          {prevDoc ? (
            <Link
              href={`/${prevDoc.slug.join("/")}`}
              className="group flex flex-col gap-1 px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors max-w-[48%]"
            >
              <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                <ChevronLeft className="h-3 w-3 mr-1" />
                Previous
              </div>
              <div className="font-medium text-foreground truncate">
                {prevDoc.title}
              </div>
            </Link>
          ) : (
            <div /> // Spacer
          )}

          {nextDoc ? (
            <Link
              href={`/${nextDoc.slug.join("/")}`}
              className="group flex flex-col gap-1 items-end px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors max-w-[48%]"
            >
              <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                Next
                <ChevronRight className="h-3 w-3 ml-1" />
              </div>
              <div className="font-medium text-foreground truncate">
                {nextDoc.title}
              </div>
            </Link>
          ) : (
            <div /> // Spacer
          )}
        </div>
      </div>

      <div className="hidden xl:block">
        <div className="sticky top-20 space-y-4">
          <h4 className="font-semibold text-sm text-foreground">
            On This Page
          </h4>
          <nav className="flex flex-col gap-2.5 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {headings?.map((heading, index) => (
              <a
                key={index}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(heading.id);
                  const element = document.getElementById(heading.id);
                  const scrollableElement = document.querySelector(
                    "main.overflow-y-auto",
                  ) as HTMLElement;

                  if (element && scrollableElement) {
                    const mainRect = scrollableElement.getBoundingClientRect();
                    const elementRect = element.getBoundingClientRect();
                    const scrollTop = scrollableElement.scrollTop;
                    const elementTop = elementRect.top - mainRect.top + scrollTop;
                    const offset = 20; // Small offset from top

                    scrollableElement.scrollTo({
                      top: elementTop - offset,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`text-xs transition-colors leading-relaxed border-l-2 -ml-px pl-3 ${heading.level === 3 ? "pl-6" : ""
                  } ${activeId === heading.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
