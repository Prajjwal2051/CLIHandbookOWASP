"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CopyAllCodeButton() {
    const [copied, setCopied] = useState(false);

    const copyAllCode = () => {
        // Find all code blocks on the page
        const codeBlocks = document.querySelectorAll("pre code");
        const allCode = Array.from(codeBlocks)
            .map((block) => block.textContent || "")
            .filter((text) => text.trim().length > 0)
            .join("\n\n# ─────────────────\n\n");

        if (allCode) {
            navigator.clipboard.writeText(allCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Button
            onClick={copyAllCode}
            variant="outline"
            size="sm"
            className="gap-2"
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4" />
                    Copied All!
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4" />
                    Copy All Code
                </>
            )}
        </Button>
    );
}
