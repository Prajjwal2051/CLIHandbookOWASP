# Linux CLI Handbook

A modern, comprehensive documentation website for learning Linux Command Line Interface, built with Next.js 16, TypeScript, and shadcn/ui.

**Live Demo**: [Add your deployed URL here]

## ✨ Features

- 🎨 **Modern UI** - Beautiful interface built with shadcn/ui components
- 🌓 **Dark Mode** - Forced dark theme for comfortable reading
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🔍 **Advanced Search** - Smart search with relevance scoring, fuzzy matching, and recent searches
- 📚 **24+ Documentation Pages** - Comprehensive coverage of Linux CLI topics
- 🧭 **Table of Contents** - Auto-generated navigation for long pages
- ⌨️ **Keyboard Navigation** - Full keyboard support (⌘K for search)
- 📖 **Reading Progress** - Visual indicator showing reading progress
- 🔗 **Cyclic Navigation** - Seamless prev/next page navigation
- ⚡ **Fast Performance** - Static site generation for instant page loads

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router with Turbopack)
- **Language**: TypeScript 5
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4
- **Typography**: Plus Jakarta Sans, JetBrains Mono
- **Markdown**: react-markdown with remark-gfm
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Prajjwal2051/CLIHandbookOWASP.git
cd CLIHandbookOWASP

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

## 📁 Project Structure

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

## 📚 Documentation Structure

The documentation is organized into 7 main sections:

- **Introduction** - Overview, prerequisites, getting started
- **Core Concepts** - Terminal, shell, operators, file system
- **Commands** - Navigation, file operations
- **Advanced Topics** - File permissions, root user, shortcuts & aliases
- **Reference** - Command index, cheat sheet, flag reference
- **Troubleshooting** - Common issues and solutions
- **FAQ** - Frequently asked questions

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Prajjwal2051/CLIHandbookOWASP)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Other Platforms

Compatible with:
- AWS Amplify
- Digital Ocean App Platform
- Cloudflare Pages
- Self-hosted with Node.js

## 🔧 Development

### Adding New Documentation

1. Create a `.md` file in the appropriate `docs/` subdirectory
2. Add frontmatter:
   ```yaml
   ---
   title: Your Page Title
   description: Page description
   ---
   ```
3. Write your content in Markdown
4. Update `lib/navigation.ts` if needed

### Customizing Theme

Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: your-color;
  --background: your-color;
  /* ... */
}
```

### Adding UI Components

```bash
npx shadcn-ui@latest add [component-name]
```

## 📊 Key Features Explained

### Advanced Search
- Multi-term matching with relevance scoring
- Fuzzy matching for typo tolerance
- Recent searches with localStorage persistence
- Keyboard navigation (↑↓ arrows, Enter, Esc)

### Reading Experience
- Fixed header and sidebar navigation
- Scrollable content area with reading progress
- Auto-highlighting table of contents
- Cyclic prev/next page navigation

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Credits

**Built by OWASP NIE Student Chapter**

- 🌐 Website: [owaspwebsite.netlify.app](https://owaspwebsite.netlify.app)
- 📸 Instagram: [@owasp_nie](https://www.instagram.com/owasp_nie/)
- 💼 LinkedIn: [OWASP NIE](https://www.linkedin.com/company/owasp-nie)

### Powered By

- [Next.js](https://nextjs.org/) - React Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon Library
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown Rendering

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn Linux CLI!

---

**Made with ❤️ by OWASP NIE Student Chapter**
