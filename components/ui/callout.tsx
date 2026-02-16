"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Terminal,
  AlertCircle,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface CalloutProps {
  type?: "note" | "warning" | "danger" | "tip" | "info" | "important";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "note", title, children }: CalloutProps) {
  let Icon = Info;
  let variant: "default" | "destructive" = "default";
  let className = "";

  switch (type) {
    case "danger":
      Icon = AlertCircle;
      variant = "destructive";
      className =
        "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400 [&>svg]:text-red-500";
      break;
    case "warning":
      Icon = AlertTriangle;
      className =
        "border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-500";
      break;
    case "tip":
      Icon = Lightbulb;
      className =
        "border-primary/50 bg-primary/10 text-primary [&>svg]:text-primary";
      break;
    case "important":
      Icon = AlertCircle;
      className =
        "border-purple-500/50 bg-purple-500/10 text-purple-600 dark:text-purple-400 [&>svg]:text-purple-500";
      break;
    case "note":
      Icon = Info;
      className =
        "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-500";
      break;
    default:
      Icon = Info;
      className =
        "border-border bg-muted/50 text-foreground [&>svg]:text-muted-foreground";
  }

  return (
    <Alert className={`my-6 ${className}`}>
      <Icon className="h-4 w-4" />
      <AlertTitle className="font-semibold">
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </AlertTitle>
      <AlertDescription className="mt-2 text-sm leading-relaxed [&>p]:m-0">
        {children}
      </AlertDescription>
    </Alert>
  );
}
