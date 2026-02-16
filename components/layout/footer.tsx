import Link from "next/link";
import { Instagram, Linkedin, Link2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0" suppressHydrationWarning>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="https://owaspwebsite.netlify.app"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            OWASP NIE Student Chapter
          </Link>
          .
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.instagram.com/owasp_nie/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://www.linkedin.com/company/owasp-nie-mysuru-student-chapter/posts/?feedView=all"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://linktr.ee/owaspniestudentchapter"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link2 className="h-5 w-5" />
            <span className="sr-only">Linktree</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
