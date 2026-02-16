---
title: "Prerequisites"
---

Before diving into the Linux command line, ensure you have the necessary setup and basic understanding.

## System Requirements

### Operating System

This handbook is designed for Linux systems, but the commands also work on:

- **Linux**: Any modern distribution (Ubuntu, Debian, Fedora, Arch, etc.)
- **macOS**: Most commands work natively in Terminal
- **Windows**: Use WSL (Windows Subsystem for Linux) for full compatibility

### Hardware Requirements

Minimal hardware needed:

- Any computer capable of running a Linux distribution
- At least 512 MB RAM (though modern systems typically have much more)
- Basic keyboard for text input

## Software Setup

### For Linux Users

You're ready to go! Linux distributions come with a terminal emulator pre-installed.

**Access the terminal:**

- Press `Ctrl + Alt + T` (most distributions)
- Search for "Terminal" in your application menu
- Right-click desktop and select "Open Terminal" (if available)

### For macOS Users

macOS includes a built-in Terminal application.

**Access the terminal:**

1. Open **Applications** → **Utilities** → **Terminal**
2. Or use Spotlight: Press `Cmd + Space`, type "Terminal", press Enter
3. Optional: Install [iTerm2](https://iterm2.com/) for enhanced features

### For Windows Users

Windows users need to install WSL (Windows Subsystem for Linux) for the best experience.

**Install WSL:**

```bash
# Open PowerShell as Administrator and run:
wsl --install
```

This installs Ubuntu by default. After installation:

1. Restart your computer
2. Launch "Ubuntu" from the Start menu
3. Create a Unix username and password when prompted

**Alternative Options:**

- **Git Bash**: Limited Linux command support, comes with Git for Windows
- **Windows Terminal**: Modern terminal that can run WSL, PowerShell, and Command Prompt
- **Virtual Machine**: Run a full Linux distribution using VirtualBox or VMware

## Knowledge Prerequisites

### Required Knowledge

- **Basic Computer Skills**: File management, using a keyboard
- **Text Editing**: Ability to type and edit text
- **No Programming Required**: This handbook assumes no prior programming knowledge

### Helpful (But Not Required)

- Understanding of file systems and directories
- Familiarity with basic computer concepts (files, folders, programs)
- Patience and willingness to learn through practice

## Terminal Emulator Setup

### Choosing a Terminal Emulator

A terminal emulator is a program that lets you use the command line in a graphical environment.

**Popular Terminal Emulators:**

| Emulator         | Platform            | Features                                     |
| ---------------- | ------------------- | -------------------------------------------- |
| GNOME Terminal   | Linux               | Default on many distros, simple and reliable |
| Konsole          | Linux               | Feature-rich, KDE default                    |
| Alacritty        | Linux/macOS/Windows | GPU-accelerated, fast                        |
| iTerm2           | macOS               | Highly customizable                          |
| Windows Terminal | Windows             | Modern, supports WSL                         |

### Basic Terminal Configuration

You can customize your terminal for better usability:

**Font Size**  
Increase if text is too small:

- Usually in Settings/Preferences → Appearance → Font Size

**Color Scheme**  
Many terminals offer dark/light themes:

- Settings/Preferences → Colors/Theme

**Keyboard Shortcuts**  
Learn your terminal's shortcuts:

- Copy: Usually `Ctrl + Shift + C`
- Paste: Usually `Ctrl + Shift + V`
- New Tab: Usually `Ctrl + Shift + T`

## Verification

### Test Your Setup

Open your terminal and run these commands to verify everything works:

```bash
# Check which shell you're using
echo $SHELL

# Expected output: /bin/bash or /bin/zsh
```

```bash
# Check your operating system
uname -s

# Expected output: Linux or Darwin (macOS)
```

```bash
# Verify your username
whoami

# Expected output: your username
```

```bash
# Check current directory
pwd

# Expected output: your home directory path
```

If all these commands work, you're ready to proceed!

## Safety Tips

Before you start practicing commands:

1. **Practice Safely**: Create a test directory for practicing commands
2. **Take Backups**: Back up important data before experimenting
3. **Read Carefully**: Understand what a command does before running it
4. **Use `man` Pages**: Check command documentation with `man command_name`
5. **Start Small**: Begin with read-only commands before trying modifications
6. **Be Cautious with `sudo`**: Only use superuser privileges when necessary

## Create a Practice Environment

Set up a safe space to practice commands:

```bash
# Create a practice directory in your home folder
mkdir ~/cli-practice

# Navigate to it
cd ~/cli-practice

# Create some test files and directories
mkdir test-folder
touch test-file.txt

# Verify your setup
ls -la
```

You now have a safe environment where you can practice without risking important files!

## Need Help?

If you encounter issues:

- Check the [Troubleshooting](../troubleshooting/common-issues.md) guide
- Consult the [FAQ](../faq.md)
- Use `man command` to read command manuals
- Search online communities (Stack Overflow, Unix & Linux Stack Exchange)

## Next Steps

With your environment set up, you're ready to:

- [Getting Started](getting-started.md) - Learn basic terminal usage
- [Core Concepts](../core-concepts/terminal-emulator.md) - Understand terminal and shell
- [Navigation Commands](../commands/navigation.md) - Start with your first commands
