# Contributing to Linux CLI Handbook

Thank you for considering contributing to the Linux CLI Handbook! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Enhancements

We love new ideas! Please create an issue with:

- A clear title and description
- Why this enhancement would be useful
- Any examples or mockups

### Adding Documentation

To add or improve documentation:

1. Fork the repository
2. Create a new branch (`git checkout -b docs/topic-name`)
3. Add your `.md` file in the appropriate `docs/` folder
4. Include proper frontmatter:
   ```yaml
   ---
   title: Your Page Title
   description: Brief description
   ---
   ```
5. Update `lib/navigation.ts` if adding a new page
6. Test locally with `npm run dev`
7. Commit with a descriptive message
8. Push and create a Pull Request

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly:
   ```bash
   npm run dev    # Test in development
   npm run build  # Test production build
   ```
5. Ensure code quality:
   - Follow existing code style
   - Add TypeScript types where applicable
   - Keep components modular and reusable
6. Commit your changes with clear messages
7. Push to your fork
8. Create a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the existing component structure
- Use Tailwind CSS for styling
- Keep components in appropriate directories:
  - `components/ui/` - reusable UI components
  - `components/layout/` - layout components
  - `components/` - feature components

### Commit Messages

Use clear, descriptive commit messages:

- `feat: Add search history feature`
- `fix: Resolve sidebar scroll issue`
- `docs: Update installation instructions`
- `style: Format code with Prettier`
- `refactor: Simplify navigation logic`

### Pull Request Process

1. Update the README.md if needed
2. Ensure your PR description clearly describes the changes
3. Link any related issues
4. Wait for review and address any feedback
5. Once approved, your PR will be merged

## Questions?

Feel free to reach out:

- Open an issue for discussion
- Contact OWASP NIE Student Chapter via [social media links]

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help create a welcoming environment for all contributors

Thank you for contributing! 🎉
