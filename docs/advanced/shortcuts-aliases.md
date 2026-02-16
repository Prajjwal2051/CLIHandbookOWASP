---
title: "Shortcuts & Aliases"
---

Boost your command-line productivity with keyboard shortcuts and custom aliases.

## Essential Keyboard Shortcuts

### Command Line Editing

| Shortcut   | Action                              |
| ---------- | ----------------------------------- |
| `Ctrl + A` | Move to **beginning** of line       |
| `Ctrl + E` | Move to **end** of line             |
| `Ctrl + U` | Delete from cursor to **beginning** |
| `Ctrl + K` | Delete from cursor to **end**       |
| `Ctrl + W` | Delete word **before** cursor       |
| `Alt + D`  | Delete word **after** cursor        |
| `Ctrl + Y` | Paste (yank) deleted text           |
| `Ctrl + _` | Undo last change                    |

### Navigation

| Shortcut          | Action                                    |
| ----------------- | ----------------------------------------- |
| `Ctrl + B` or `←` | Move backward one character               |
| `Ctrl + F` or `→` | Move forward one character                |
| `Alt + B`         | Move backward one word                    |
| `Alt + F`         | Move forward one word                     |
| `Ctrl + XX`       | Toggle between start and current position |

### Command Control

| Shortcut   | Action                                           |
| ---------- | ------------------------------------------------ |
| `Ctrl + C` | **Terminate** current command                    |
| `Ctrl + Z` | **Suspend** current command (send to background) |
| `Ctrl + D` | **Exit** shell / EOF signal                      |
| `Ctrl + L` | **Clear** screen (same as `clear`)               |
| `Ctrl + S` | **Freeze** output (pause)                        |
| `Ctrl + Q` | **Resume** output (unpause)                      |

### History Navigation

| Shortcut   | Action                                         |
| ---------- | ---------------------------------------------- |
| `↑`        | Previous command                               |
| `↓`        | Next command                                   |
| `Ctrl + R` | **Reverse search** history                     |
| `Ctrl + G` | Escape from search                             |
| `Ctrl + P` | Previous command (like ↑)                      |
| `Ctrl + N` | Next command (like ↓)                          |
| `!!`       | Repeat last command                            |
| `!n`       | Run command number n from history              |
| `!string`  | Run most recent command starting with "string" |
| `!$`       | Last argument of previous command              |
| `!*`       | All arguments of previous command              |

### Tab Completion

| Shortcut  | Action                               |
| --------- | ------------------------------------ |
| `Tab`     | Auto-complete command/file/directory |
| `Tab Tab` | Show all possible completions        |
| `Alt + /` | Attempt file name completion         |
| `Alt + ?` | List possible completions            |

## History Command Tips

### Using History

```bash
# View command history
history

# View last 20 commands
history 20

# Search history
history | grep keyword

# Execute command from history
!123  # Run command #123

# Run last command
!!

# Run last command starting with "git"
!git

# Run last command with sudo
sudo !!
```

### History Expansion

```bash
# Previous command's last argument
ls /var/log/syslog
cat !$
# Expands to: cat /var/log/syslog

# Previous command's all arguments
cp file1.txt file2.txt ~/backup/
ls !*
# Expands to: ls file1.txt file2.txt ~/backup/

# Substitute in previous command
cat file.txt
^txt^md
# Runs: cat file.md
```

### Configuring History

Add to `~/.bashrc`:

```bash
# Increase history size
HISTSIZE=10000
HISTFILESIZE=20000

# Avoid duplicates
HISTCONTROL=ignoredups:erasedups

# Ignore specific commands
HISTIGNORE="ls:pwd:cd:clear:history"

# Add timestamp to history
HISTTIMEFORMAT="%F %T "

# Append to history (don't overwrite)
shopt -s histappend
```

## Creating Aliases

Aliases create shortcuts for frequently used commands.

### Basic Alias Syntax

```bash
alias name='command'
```

### Common Useful Aliases

```bash
# Navigation shortcuts
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias ~='cd ~'

# Enhanced ls
alias ll='ls -lah'
alias la='ls -A'
alias l='ls -CF'
alias lt='ls -ltrh'  # Sort by time, newest last
alias lsize='ls -lSrh'  # Sort by size

# Safety nets
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias ln='ln -i'

# mkdir with parents by default
alias mkdir='mkdir -pv'

# Colored output
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias diff='diff --color=auto'

# Easy editing
alias vi='vim'
alias edit='nano'

# Systemctl shortcuts
alias sstart='sudo systemctl start'
alias sstop='sudo systemctl stop'
alias srestart='sudo systemctl restart'
alias sstatus='systemctl status'

# Package management (Ubuntu/Debian)
alias update='sudo apt update && sudo apt upgrade'
alias install='sudo apt install'
alias remove='sudo apt remove'
alias search='apt search'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'
alias gd='git diff'

# Network
alias ports='netstat -tulanp'
alias myip='curl ifconfig.me'
alias pingg='ping google.com'

# System monitoring
alias meminfo='free -h'
alias cpuinfo='lscpu'
alias diskinfo='df -h'

# Quick utilities
alias now='date +"%Y-%m-%d %T"'
alias week='date +%V'
alias timer='echo "Timer started. Stop with Ctrl-D." && date && time cat && date'
```

### Parameterized Aliases (Functions)

Aliases can't take parameters, but functions can:

```bash
# Create directory and enter it
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Extract any archive
extract() {
    if [ -f "$1" ]; then
        case "$1" in
            *.tar.bz2)   tar xjf "$1"     ;;
            *.tar.gz)    tar xzf "$1"     ;;
            *.bz2)       bunzip2 "$1"     ;;
            *.rar)       unrar x "$1"     ;;
            *.gz)        gunzip "$1"      ;;
            *.tar)       tar xf "$1"      ;;
            *.tbz2)      tar xjf "$1"     ;;
            *.tgz)       tar xzf "$1"     ;;
            *.zip)       unzip "$1"       ;;
            *.Z)         uncompress "$1"  ;;
            *.7z)        7z x "$1"        ;;
            *)           echo "'$1' cannot be extracted" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}

# Backup file with timestamp
backup() {
    cp "$1" "$1.backup.$(date +%Y%m%d-%H%M%S)"
}

# Quick server
serve() {
    local port="${1:-8000}"
    python3 -m http.server "$port"
}

# Find process by name
psgrep() {
    ps aux | grep -v grep | grep -i -e VSZ -e "$1"
}
```

### Making Aliases Permanent

#### For Bash

Edit `~/.bashrc`:

```bash
nano ~/.bashrc

# Add your aliases
alias ll='ls -lah'

# Save and reload
source ~/.bashrc
```

#### For Zsh

Edit `~/.zshrc`:

```bash
nano ~/.zshrc

# Add your aliases
alias ll='ls -lah'

# Save and reload
source ~/.zshrc
```

#### Create Separate Alias File

```bash
# Create aliases file
nano ~/.bash_aliases

# Add to ~/.bashrc
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

## Managing Aliases

```bash
# List all aliases
alias

# View specific alias
alias ll

# Temporarily disable alias (use full command)
\ls  # Runs real ls, not alias

# Remove alias (current session only)
unalias ll

# Remove all aliases (current session)
unalias -a
```

## Advanced Productivity Tricks

### Command Substitution

```bash
# Use command output in another command
echo "Today is $(date +%A)"

# Edit file from find result
vim $(find . -name "*.conf")
```

### Command Chaining

```bash
# Run commands in sequence
cd project && git pull && npm install && npm start

# Run second command only if first fails
command1 || command2

# Background jobs
long_task & another_task &

# Group commands
(cd /tmp && ls -la)  # Returns to original directory after
```

### Brace Expansion

```bash
# Create multiple files
touch file{1..10}.txt

# Create directory structure
mkdir -p project/{src,tests,docs}/{js,css,images}

# Backup multiple files
cp file.txt{,.bak}  # Same as: cp file.txt file.txt.bak

# Move files with common pattern
mv file.{txt,md}  # Moves file.txt to file.md
```

### Here Documents

```bash
# Multi-line input
cat << EOF > config.txt
Line 1
Line 2
Line 3
EOF

# SQL script
mysql -u user -p database << EOF
SELECT * FROM users;
UPDATE users SET active=1;
EOF
```

## Customizing Your Prompt

### Basic PS1 Customization

Add to `~/.bashrc`:

```bash
# Simple prompt
PS1="\u@\h:\w$ "
# Output: username@hostname:~/directory$

# Colored prompt
PS1="\[\e[32m\]\u@\h\[\e[0m\]:\[\e[34m\]\w\[\e[0m\]\$ "

# Prompt with git branch (requires git-prompt.sh)
PS1="\u@\h:\w\$(__git_ps1 " (%s)") \$ "
```

### Prompt Escape Sequences

| Sequence | Meaning                       |
| -------- | ----------------------------- |
| `\u`     | Username                      |
| `\h`     | Hostname                      |
| `\w`     | Current directory (full path) |
| `\W`     | Current directory (basename)  |
| `\$`     | $ for user, # for root        |
| `\t`     | Time (24-hour HH:MM:SS)       |
| `\d`     | Date (e.g., "Mon Feb 15")     |
| `\n`     | Newline                       |

## Shell Options

Useful shell options for `~/.bashrc`:

```bash
# Enable extended globbing
shopt -s extglob

# Autocorrect minor directory spelling errors
shopt -s cdspell

# Check window size after each command
shopt -s checkwinsize

# Save multi-line commands as one history entry
shopt -s cmdhist

# Case-insensitive globbing
shopt -s nocaseglob

# Enable ** globbing (recursive)
shopt -s globstar
# Now: ls **/*.txt  # Lists all .txt files recursively
```

## Example Configuration File

Complete `~/.bash_aliases`:

```bash
# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ~='cd ~'

# Enhanced commands
alias ll='ls -lah'
alias la='ls -A'
alias grep='grep --color=auto'

# Safety nets
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit -m'
alias gp='git push'

# System
alias update='sudo apt update && sudo apt upgrade'
alias meminfo='free -h'
alias cpuinfo='lscpu'

# Functions
mkcd() {
    mkdir -p "$1" && cd "$1"
}

backup() {
    cp "$1" "$1.backup.$(date +%Y%m%d)"
}
```

## Related Topics

- [Getting Started](../introduction/getting-started.md) - Basic terminal usage
- [Shell](../core-concepts/shell.md) - Shell concepts and configuration
- [Troubleshooting](../troubleshooting/common-issues.md) - Common terminal issues

## Quick Reference

```bash
# Create alias
alias name='command'

# List aliases
alias

# Remove alias
unalias name

# Make permanent (bash)
echo "alias name='command'" >> ~/.bashrc
source ~/.bashrc

# History search
Ctrl + R

# Clear screen
Ctrl + L

# Cancel command
Ctrl + C
```

<div class="admonition tip" markdown>
<p class="admonition-title">Pro Tip</p>
<p>Start with a few essential aliases and shortcuts. Add more as you discover repetitive tasks. The most valuable customizations are the ones you'll actually use daily!</p>
</div>
