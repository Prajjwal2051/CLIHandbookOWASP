export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Introduction",
    href: "/introduction/overview",
    items: [
      { title: "Overview", href: "/introduction/overview" },
      { title: "Prerequisites", href: "/introduction/prerequisites" },
      { title: "Getting Started", href: "/introduction/getting-started" },
    ],
  },
  {
    title: "Core Concepts",
    href: "/core-concepts/terminal-emulator",
    items: [
      { title: "Terminal Emulator", href: "/core-concepts/terminal-emulator" },
      { title: "Shell", href: "/core-concepts/shell" },
      { title: "Special Operators", href: "/core-concepts/special-operators" },
      { title: "File System", href: "/core-concepts/file-system" },
    ],
  },
  {
    title: "Commands",
    href: "/commands/navigation",
    items: [
      { title: "Navigation", href: "/commands/navigation" },
      { title: "File Operations", href: "/commands/file-operations" },
    ],
  },
  {
    title: "Advanced Topics",
    href: "/advanced/file-permissions-deep-dive",
    items: [
      {
        title: "File Permissions",
        href: "/advanced/file-permissions-deep-dive",
      },
      { title: "Root User & Sudo", href: "/advanced/root-user" },
      { title: "Shortcuts & Aliases", href: "/advanced/shortcuts-aliases" },
    ],
  },
  {
    title: "Reference",
    href: "/reference/command-index",
    items: [
      { title: "Command Index", href: "/reference/command-index" },
      { title: "Cheat Sheet", href: "/reference/cheat-sheet" },
      { title: "Flag Reference", href: "/reference/flag-reference" },
    ],
  },
  {
    title: "Troubleshooting",
    href: "/troubleshooting/common-issues",
    items: [
      { title: "Common Issues", href: "/troubleshooting/common-issues" },
    ],
  },
  {
    title: "FAQ",
    href: "/faq",
    items: [],
  },
];
