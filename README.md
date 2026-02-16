# Linux CLI Handbook

A modern, production-ready documentation website built with Next.js 14, TypeScript, and shadcn/ui.

## Features

- **Modern UI** - Built with shadcn/ui components for a sleek, professional look
- **Dark Mode** - Automatic theme switching with system preference support
- **Responsive** - Works perfectly on all screen sizes
- **Beautiful Design** - Smooth animations and modern aesthetics
- **Comprehensive** - Covers 40+ Linux commands with detailed examples
- **Searchable** - Find any command or concept quickly
- **Copy to Clipboard** - One-click code copying
- **Fast** - Built on Next.js 14 with optimized performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Markdown**: react-markdown with GFM support
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`

## Project Structure

```
cli-handbook/
├── app/                    # Next.js app directory
│   ├── [...slug]/         # Dynamic documentation routes
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Navigation header
│   │   ├── sidebar.tsx    # Documentation sidebar
│   │   └── footer.tsx     # Footer
│   ├── ui/                # shadcn/ui components
│   ├── markdown-content.tsx
│   └── theme-provider.tsx
├── docs/                  # Markdown documentation files
│   ├── introduction/
│   ├── core-concepts/
│   ├── commands/
│   ├── advanced/
│   └── reference/
├── lib/                   # Utility functions
│   ├── docs.ts           # Documentation file utilities
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Documentation Structure

All documentation is written in Markdown and stored in the `docs/` folder:

- **Introduction**: Getting started with CLI
- **Core Concepts**: Terminal, shell, operators, file system
- **Commands**: Detailed command documentation
- **Advanced Topics**: Permissions, sudo, aliases
- **Reference**: Quick reference guides

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Self-hosted with Node.js

## Development

### Adding New Documentation

1. Create a new `.md` file in the appropriate `docs/` subdirectory
2. Write your content in Markdown
3. The page will automatically be generated at `/[folder]/[filename]`

### Customizing Themes

Edit `tailwind.config.ts` to customize colors and theming:

```typescript
theme: {
  extend: {
    colors: {
      // Customize your color palette
    }
  }
}
```

### Adding Components

Use shadcn/ui CLI to add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Built by **OWASP NIE Student Chapter** with ❤️

Powered by:

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
# CLIHandbookOWASP
