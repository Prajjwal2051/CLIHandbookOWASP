---
title: "Common Issues"
---

# Common Issues and Troubleshooting

Solutions to frequently encountered problems when using the Linux command line.

## Permission Issues

### "Permission denied" Error

**Problem**: You don't have rights to access a file or directory.

**Solution**:

```bash
# Check current permissions
ls -l filename

# Solution 1: Use sudo (for system files)
sudo command filename

# Solution 2: Change permissions (if you own the file)
chmod +r filename         # Add read permission
chmod +w filename         # Add write permission
chmod +x filename         # Add execute permission

# Solution 3: Change ownership (with sudo)
sudo chown username:groupname filename
```

### Cannot Execute Script

**Problem**: `bash: ./script.sh: Permission denied`

**Solution**:

```bash
# Make script executable
chmod +x script.sh

# Then run it
./script.sh
```

### Cannot Create/Delete Files in Directory

**Problem**: Permission denied when trying to create or delete files.

**Solution**:

```bash
# Check directory permissions
ls -ld directory/

#Directory needs write permission
chmod u+w directory/       # Add write for user
```

---

## Command Not Found Errors

### "command not found" Message

**Problem**: System can't find the command you're trying to run.

**Solutions**:

```bash
# 1. Check if installed
which command_name

# 2. Install the command (Ubuntu/Debian)
sudo apt update
sudo apt install package-name

# 3. Install the command (Fedora/RHEL)
sudo dnf install package-name

# 4. Check $PATH
echo $PATH

# 5. Add to PATH if installed elsewhere
export PATH=$PATH:/path/to/command/directory
```

### Script in Current Directory Not Running

**Problem**: `script.sh: command not found`

**Solution**:

```bash
# Wrong: script.sh
# Correct: Use ./ prefix
./script.sh
```

---

## File and Directory Issues

### Cannot Remove Directory

**Problem**: `rmdir: failed to remove 'directory': Directory not empty`

**Solution**:

```bash
# rmdir only works on empty directories
# Use rm -r for non-empty directories
rm -r directory/

# Or interactive removal
rm -ri directory/
```

### "No such file or directory"

**Problem**: File or path doesn't exist.

**Solutions**:

```bash
# 1. Check spelling (case-sensitive!)
ls              # List what's actually there

# 2. Verify current location
pwd

# 3. Use tab completion to avoid typos
cd Doc[Tab]     # Completes to Documents/

# 4. Check if file is hidden (starts with .)
ls -a
```

### Spaces in Filenames

**Problem**: Commands fail with filenames containing spaces.

**Solution**:

```bash
# Wrong: cd my directory
# Correct: Use quotes or escape
cd "my directory"
cd 'my directory'
cd my\ directory

# Best practice: Avoid spaces in filenames
mv "my directory" my-directory
```

---

## Text Display Issues

### Weird Characters (`^M` at Line Ends)

**Problem**: Files show `^M` or strange characters (Windows line endings).

**Solution**:

```bash
# Install dos2unix
sudo apt install dos2unix

# Convert file
dos2unix filename

# Alternative: using sed
sed -i 's/\r$//' filename
```

### Cannot Exit `vim` or `less`

**Problem**: Stuck in vim or less, can't exit.

**Solutions**:

```bash
# Exit less or man pages
q

# Exit vim (without saving)
ESC :q!

# Exit vim (with saving)
ESC :wq

# Exit vim (alternative)
ESC ZZ
```

### Terminal Output Corrupted

**Problem**: Terminal displays garbled text or strange characters.

**Solution**:

```bash
# Reset terminal
reset

# Or
tput reset

# Or restart terminal
exit
# Then open new terminal
```

---

## Shell and Terminal Issues

### Tab Completion Not Working

**Problem**: Pressing Tab doesn't complete commands.

**Solutions**:

```bash
# 1. Install bash-completion (Ubuntu/Debian)
sudo apt install bash-completion

# 2. Check if enabled in .bashrc
# Add to ~/.bashrc if missing:
if [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi

# 3. Reload configuration
source ~/.bashrc

# 4. Sometimes need to press Tab twice
command[Tab][Tab]
```

### Command History Not Saving

**Problem**: History doesn't persist between sessions.

**Solution**:

```bash
# Check HISTFILE variable
echo $HISTFILE

# Should be: /home/username/.bash_history

# Manually save history
history -w

# Check history settings in ~/.bashrc
HISTSIZE=10000
HISTFILESIZE=20000
```

### Colors Not Showing

**Problem**: Terminal doesn't show colors.

**Solution**:

```bash
# Check TERM variable
echo $TERM
# Should be: xterm-256color or similar

# Set in ~/.bashrc
export TERM=xterm-256color

# Enable color support for ls
alias ls='ls --color=auto'
alias grep='grep --color=auto'

# Reload configuration
source ~/.bashrc
```

---

## Process Issues

### Cannot Kill Process

**Problem**: `kill PID` doesn't work.

**Solution**:

```bash
# Use force kill
kill -9 PID

# Or by name
killall -9 process_name

# Use sudo if not your process
sudo kill -9 PID
```

### Accidental `Ctrl+S` Freeze

**Problem**: Terminal appears frozen, not responding.

**Solution**:

```bash
# Press Ctrl+Q to unfreeze
# Ctrl+S pauses output, Ctrl+Q resumes
```

### Background Job Issues

**Problem**: Need to manage background or suspended jobs.

**Solutions**:

```bash
# List jobs
jobs

# Bring to foreground
fg %1

# Send to background
bg %1

# Kill background job
kill %1

# Suspend current job
Ctrl+Z
```

---

## Redirection and Pipe Issues

### "No such file or directory" with Redirection

**Problem**: `command > /path/to/file` fails.

**Solution**:

```bash
# Directory must exist first
mkdir -p /path/to/
command > /path/to/file

# Check permissions
ls -ld /path/to/
```

### Accidentally Overwrote File

**Problem**: Used `>` instead of `>>` and lost data.

**Prevention**:

```bash
# Enable noclobber to prevent overwriting
set -o noclobber

# Override when needed
command >| file.txt

# Always use >> for appending
command >> file.txt
```

### Pipe Not Working as Expected

**Problem**: Pipeline produces unexpected results.

**Solution**:

```bash
# Debug pipeline step by step
command1
command1 | command2
command1 | command2 | command3

# Check intermediate output
command1 | tee temp.txt | command2

# Ensure proper quoting
echo "text with spaces" | command
```

---

## Network Issues

### `ping: command not found`

**Problem**: ping not available (rare).

**Solution**:

```bash
# Install iputils (Ubuntu/Debian)
sudo apt install iputils-ping

# Check PATH
which ping
```

### `wget` or `curl` Fails

**Problem**: Download fails or connection issues.

**Solutions**:

```bash
# Check internet connection
ping google.com

# Use verbose mode to see error
wget -v URL
curl -v URL

# Ignore SSL certificate errors (use cautiously)
wget --no-check-certificate URL
curl -k URL

# Resume interrupted download
wget -c URL
```

---

## Disk Space Issues

### "No space left on device"

**Problem**: Disk is full.

**.Solutions**:

```bash
# Check disk usage
df -h

# Find large directories
du -h /home/username | sort -hr | head -20

# Find large files
find / -type f -size +100M 2>/dev/null

# Clean package cache (Ubuntu/Debian)
sudo apt clean

# Remove old logs
sudo journalctl --vacuum-time=7d
```

### "Disk quota exceeded"

**Problem**: User quota limit reached.

**Solution**:

```bash
# Check quota
quota -v

# Find what's using space
du -sh ~/* | sort -hr

# Delete unnecessary files
rm -rf ~/Downloads/old_files
```

---

## Miscellaneous Issues

### Deleted File Still Shows in `ls`

**Problem**: File appears deleted but shows in listings.

**Solution**:

```bash
# Update directory cache
sync

# Or refresh with:
ls -la

# May be a hidden file
ls -a
```

### Command Takes Too Long

**Problem**: Command running very slow.

**Solutions**:

```bash
# Run in background
command &

# Check system load
top
htop

# Limit resource usage
nice -n 19 command           # Lower priority
ionice -c 3 command          # Idle I/O priority
```

### Accidentally Ran `rm -rf`

**Problem**: Deleted important files.

**Prevention & Recovery**:

```bash
# PREVENTION: Always use -i
alias rm='rm -i'

# PREVENTION: Use trash instead
trash-put file               # Moves to trash
trash-list                   # View trash
trash-restore               # Restore files

# RECOVERY: Stop immediately!
# Unmount drive if data is critical
# Use data recovery tools (extundelete, photorec, testdisk)
# Recovery success depends on quick action
```

---

## Getting More Help

When stuck:

1. **Read error messages carefully** - they usually tell you what's wrong
2. **Use `man` pages**:
   ```bash
   man command_name
   ```
3. **Check command help**:
   ```bash
   command --help
   ```
4. **Search online**:
   - Stack Overflow
   - Unix & Linux Stack Exchange
   - Command-specific forums
5. **Use verbose mode**:
   ```bash
   command -v
   ```
6. **Check system logs**:
   ```bash
   sudo journalctl -xe
   dmesg | tail
   ```

---

## Prevention Tips

1. **Always check before destructive operations**:
   ```bash
   ls *.txt              # Check what matches
   rm *.txt              # Then delete
   ```
2. **Use interactive flags**:
   ```bash
   rm -i file
   cp -i source dest
   ```
3. **Make backups**:
   ```bash
   cp important.txt important.txt.bak
   ```
4. **Test in safe directory first**
5. **Use version control (git)** for important files
6. **Create aliases for safety**:
   ```bash
   alias rm='rm -i'
   alias cp='cp -i'
   alias mv='mv -i'
   ```

## Still Having Issues?

- Check the [FAQ](../faq.md)
- Review command-specific documentation
- Search online communities
- Ask in forums with specific error messages
