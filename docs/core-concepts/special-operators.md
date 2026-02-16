---
title: "Special Operators"
---

Special operators are powerful symbols that modify how commands behave and interact with each other. Mastering these operators will significantly enhance your command-line productivity.

## Wildcard (`*`)

The wildcard (asterisk) is a pattern-matching character that represents any number of characters (including zero).

### Description

Use wildcards to select multiple files based on a pattern without typing each filename individually.

### Syntax

```bash
command pattern*
command *pattern
command *pattern*
```

### Examples

#### Basic Wildcard Usage

```bash
# List all .txt files
ls *.txt

# Remove all .log files
rm *.log

# Copy all files starting with "test"
cp test* ~/backup/
```

#### Advanced Patterns

```bash
# All files ending with numbers
ls *[0-9]

# All files with exactly 3 characters
ls ???

# All files starting with a or b
ls [ab]*

# All files NOT starting with a or b
ls [!ab]*
```

### Common Use Cases

```bash
# Move all images to a folder
mv *.jpg *.png *.gif ~/Pictures/

# Find all Python files
find . -name "*.py"

# Count all text files
ls *.txt | wc -l

# Archive all log files
tar -czf logs.tar.gz *.log
```

### Tips

- Always test with `ls` before using wildcards with destructive commands (like `rm`)
- Use quotes to prevent wildcard expansion: `echo "*"` prints asterisk literally
- Wildcards don't match hidden files (starting with `.`) by default

---

## Redirection (`>`)

The redirection operator sends command output to a file instead of the terminal.

### Description

- `>` creates a new file or **overwrites** existing file content
- `>>` **appends** to an existing file or creates a new one

### Syntax

```bash
command > output_file     # Overwrite
command >> output_file    # Append
```

### Examples

#### Basic Redirection

```bash
# Save directory listing to file
ls -la > directory_contents.txt

# Save error messages
command 2> errors.txt

# Redirect both output and errors
command > output.txt 2>&1
```

#### Creating Files with Content

```bash
# Create file with text
echo "Hello, World!" > greeting.txt

# Multi-line file creation with cat
cat > newfile.txt
Line 1
Line 2
Line 3
^D  # Press Ctrl+D to finish
```

#### Append Mode

```bash
# Add to existing file
echo "New line" >> existingfile.txt

# Append command output
date >> log.txt
```

### Redirect Streams

Linux has three standard streams:

| Stream | Number | Description     | Redirect    |
| ------ | ------ | --------------- | ----------- |
| stdin  | 0      | Standard input  | `<`         |
| stdout | 1      | Standard output | `>` or `1>` |
| stderr | 2      | Standard error  | `2>`        |

```bash
# Redirect only errors
command 2> errors.log

# Redirect output and errors separately
command > output.log 2> errors.log

# Redirect errors to same file as output
command > combined.log 2>&1

# Discard output
command > /dev/null

# Discard errors
command 2> /dev/null
```

### Common Mistakes

```bash
# WRONG: This deletes file content before reading!
sort file.txt > file.txt

# CORRECT: Use a temporary file
sort file.txt > temp.txt && mv temp.txt file.txt

# Or use sponge (from moreutils package)
sort file.txt | sponge file.txt
```

---

## Pipeline (`|`)

The pipeline operator connects commands by sending output from one command as input to another.

### Description

Takes the standard output (stdout) of the command on its left and provides it as standard input (stdin) to the command on its right.

### Syntax

```bash
command1 | command2 | command3
```

### Examples

#### Text Processing Pipelines

```bash
# List files and search for pattern
ls -la | grep ".txt"

# Count number of files
ls | wc -l

# Show top 10 largest files
ls -lS | head -10
```

#### Data Transformation

```bash
# Convert lowercase to uppercase
cat file.txt | tr a-z A-Z

# Sort and remove duplicates
cat names.txt | sort | uniq

# Search, sort, and save
grep "error" log file.txt | sort | uniq > errors.txt
```

#### System Information Pipelines

```bash
# Find processes by name
ps aux | grep firefox

# Show disk usage, sort by size
du -h | sort -h

# Network: filter listening ports
netstat -tuln | grep LISTEN
```

### Chaining Multiple Commands

```bash
# Complex pipeline example
cat access.log | grep "404" | cut -d' ' -f1 | sort | uniq -c | sort -nr | head -10

# Breakdown:
# 1. cat access.log          - Read log file
# 2. grep "404"              - Find 404 errors
# 3. cut -d' ' -f1           - Extract IP addresses
# 4. sort                    - Sort IPs
# 5. uniq -c                 - Count unique IPs
# 6. sort -nr                - Sort by count
# 7. head -10                - Show top 10
```

### Common Pipeline Commands

| Command | Purpose           | Example                        |
| ------- | ----------------- | ------------------------------ |
| `grep`  | Filter lines      | `ls \| grep txt`               |
| `wc`    | Count lines/words | `cat file \| wc -l`            |
| `sort`  | Sort lines        | `cat file \| sort`             |
| `uniq`  | Remove duplicates | `sort file \| uniq`            |
| `head`  | First N lines     | `ls \| head -5`                |
| `tail`  | Last N lines      | `ls \| tail -5`                |
| `cut`   | Extract columns   | `cat file \| cut -d: -f1`      |
| `awk`   | Text processing   | `ls -l \| awk '{print $9}'`    |
| `sed`   | Stream editing    | `cat file \| sed 's/old/new/'` |

---

## Line Continuation (`\`)

The backslash allows you to continue a long command on the next line.

### Description

When a command becomes too long, use `\` at the end of a line to continue on the next line, making commands more readable.

### Syntax

```bash
command argument1 \
  argument2 \
  argument3
```

### Examples

```bash
# Long find command
find /var/log \
  -type f \
  -name "*.log" \
  -mtime +30 \
  -delete

# Long rsync command
rsync -avz \
  --progress \
  --exclude='*.tmp' \
  /source/directory \
  user@remote:/destination/
```

### Important Notes

- No spaces allowed after the backslash
- The newline immediately following `\` is escaped
- Useful for scripts and documentation

---

## Current Directory (`.`)

A single period represents the current directory.

### Syntax

```bash
.
```

### Examples

```bash
# Copy file to current directory
cp /path/to/file.txt .

# Run script in current directory
./script.sh

# Find in current directory
find . -name "*.txt"

# List current directory explicitly
ls .
```

### Common Uses

```bash
# Search current directory recursively
grep -r "pattern" .

# Copy entire directory here
cp -r /source/directory .

# Set permissions for all files here
chmod 644 ./*
```

---

## Parent Directory (`..`)

A double period represents the parent directory (one level up).

### Syntax

```bash
..
```

### Examples

```bash
# Move up one directory
cd ..

# Move up two directories
cd ../..

# Copy from parent directory
cp ../file.txt .

# Move file to parent directory
mv file.txt ..
```

### Relative Path Navigation

```bash
# Go to sibling directory
cd ../sibling-directory

# Access file in parent's sibling directory
cat ../../other-directory/file.txt

# Complex relative path
cd ../../../somewhere/else
```

---

## Command Substitution (`$(...)` or `` `...` ``)

Execute a command and use its output in another command.

### Syntax

```bash
$(command)      # Modern syntax (recommended)
`command`       # Legacy syntax
```

### Examples

```bash
# Use command output as argument
echo "Today is $(date)"

# Store command output in variable
CURRENT_USER=$(whoami)
echo "User: $CURRENT_USER"

# Nested substitution
echo "Files in home: $(ls -1 ~ | wc -l)"
```

---

## Background Execution (`&`)

Run a command in the background, freeing up the terminal.

### Syntax

```bash
command &
```

### Examples

```bash
# Run long process in background
./long-running-script.sh &

# Multiple background processes
command1 & command2 & command3 &

# Check background jobs
jobs

# Bring job to foreground
fg %1
```

---

## Command Chaining

### Sequential Execution (`;`)

Run commands one after another, regardless of success or failure.

```bash
command1 ; command2 ; command3

# Example
cd /tmp ; ls ; pwd
```

### Conditional AND (`&&`)

Run next command only if previous succeeds.

```bash
command1 && command2

# Example: Create directory and enter it
mkdir newdir && cd newdir

# Compile and run if compilation succeeds
gcc program.c -o program && ./program
```

### Conditional OR (`||`)

Run next command only if previous fails.

```bash
command1 || command2

# Example: Try command, fallback if fails
command || echo "Command failed!"

# Create directory or notify if exists
mkdir mydir || echo "Directory already exists"
```

### Combining Operators

```bash
# Complex chains
command1 && command2 || command3

# Real example
cd /project && make && ./run || echo "Build failed"
```

---

## Practical Examples

### Combining Multiple Operators

```bash
# Find, process, and save
find . -name "*.txt" | xargs cat | grep "important" > results.txt

# Backup with timestamp
tar -czf backup-$(date +%Y%m%d).tar.gz *.txt && echo "Backup complete"

# Process logs
cat access.log | \
  grep "404" | \
  cut -d' ' -f1 | \
  sort | \
  uniq -c | \
  sort -nr > top_404_ips.txt

# Create directory structure
mkdir -p project/{src,tests,docs} && cd project && ls
```

## Summary Table

| Operator | Name        | Purpose             | Example                   |
| -------- | ----------- | ------------------- | ------------------------- |
| `*`      | Wildcard    | Pattern matching    | `ls *.txt`                |
| `>`      | Redirect    | Save output to file | `ls > list.txt`           |
| `>>`     | Append      | Add to file         | `echo "text" >> file.txt` |
| `\|`     | Pipeline    | Chain commands      | `ls \| grep txt`          |
| `\`      | Continue    | Multi-line command  | `command \`               |
| `.`      | Current dir | This directory      | `cp file.txt .`           |
| `..`     | Parent dir  | One level up        | `cd ..`                   |
| `&`      | Background  | Run in background   | `command &`               |
| `;`      | Sequential  | Run regardless      | `cmd1 ; cmd2`             |
| `&&`     | AND         | Run if success      | `cmd1 && cmd2`            |
| `\|\|`   | OR          | Run if failure      | `cmd1 \|\| cmd2`          |

## Next Steps

- [File System](file-system.md) - Navigate directories
- [Navigation Commands](../commands/navigation.md) - Practice with real commands
- [Text Processing](../commands/text-processing.md) - Use operators with text commands

<div class="admonition warning" markdown>
<p class="admonition-title">Caution</p>
<p>Be especially careful with the <code>></code> operator and wildcards when using destructive commands like <code>rm</code>. A mistake can permanently delete files!</p>
</div>
