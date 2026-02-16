---
title: "Cheat Sheet"
---

## Quick Navigation

| Command        | Description                    | Example         |
| -------------- | ------------------------------ | --------------- |
| `cd [dir]`     | Change directory               | `cd /home/user` |
| `cd` or `cd ~` | Go to home directory           | `cd`            |
| `cd ..`        | Go up one level                | `cd ..`         |
| `cd - `        | Go to previous directory       | `cd -`          |
| `pwd`          | Print working directory        | `pwd`           |
| `ls`           | List files                     | `ls`            |
| `ls -la`       | List all with details          | `ls -la`        |
| `ls -lh`       | List with human-readable sizes | `ls -lh`        |

## File Operations

| Command              | Description                  | Example                  |
| -------------------- | ---------------------------- | ------------------------ |
| `cat [file]`         | Display file contents        | `cat file.txt`           |
| `cat > [file]`       | Create file with content     | `cat > newfile.txt`      |
| `touch [file]`       | Create empty file            | `touch newfile.txt`      |
| `cp [src] [dest]`    | Copy file                    | `cp file.txt backup.txt` |
| `cp -r [src] [dest]` | Copy directory               | `cp -r folder/ backup/`  |
| `mv [src] [dest]`    | Move/rename file             | `mv old.txt new.txt`     |
| `rm [file]`          | Remove file                  | `rm file.txt`            |
| `rm -r [dir]`        | Remove directory recursively | `rm -r folder/`          |
| `rm -rf [dir]`       | Force remove (DANGEROUS!)    | `rm -rf folder/`         |

## Directory Management

| Command                       | Description               | Example                |
| ----------------------------- | ------------------------- | ---------------------- |
| `mkdir [dir]`                 | Create directory          | `mkdir newfolder`      |
| `mkdir -p [path]`             | Create nested directories | `mkdir -p a/b/c`       |
| `rmdir [dir]`                 | Remove empty directory    | `rmdir emptyfolder`    |
| `find [path] -name [pattern]` | Find files                | `find . -name "*.txt"` |
| `locate [pattern]`            | Locate files              | `locate filename`      |

## File Viewing

| Command                | Description               | Example                    |
| ---------------------- | ------------------------- | -------------------------- |
| `head [file]`          | Show first 10 lines       | `head file.txt`            |
| `head -n [N] [file]`   | Show first N lines        | `head -n 5 file.txt`       |
| `tail [file]`          | Show last 10 lines        | `tail file.txt`            |
| `tail -n [N] [file]`   | Show last N lines         | `tail -n 5 file.txt`       |
| `less [file]`          | View file with pagination | `less file.txt`            |
| `more [file]`          | View file page by page    | `more file.txt`            |
| `diff [file1] [file2]` | Compare files             | `diff file1.txt file2.txt` |

## Text Processing

| Command                   | Description               | Example                      |
| ------------------------- | ------------------------- | ---------------------------- |
| `grep [pattern] [file]`   | Search for pattern        | `grep "error" log.txt`       |
| `grep -i [pattern]`       | Case-insensitive search   | `grep -i "error" log.txt`    |
| `grep -r [pattern] [dir]` | Recursive search          | `grep -r "TODO" .`           |
| `grep -n [pattern]`       | Show line numbers         | `grep -n "error" log.txt`    |
| `grep -c [pattern]`       | Count matches             | `grep -c "error" log.txt`    |
| `sort [file]`             | Sort lines alphabetically | `sort names.txt`             |
| `sort -n [file]`          | Sort numerically          | `sort -n numbers.txt`        |
| `sort -r [file]`          | Reverse sort              | `sort -r file.txt`           |
| `uniq [file]`             | Remove duplicate lines    | `sort file.txt \| uniq`      |
| `uniq -c [file]`          | Count occurrences         | `sort file.txt \| uniq -c`   |
| `tr [set1] [set2]`        | Translate characters      | `cat file.txt \| tr a-z A-Z` |
| `wc [file]`               | Count lines, words, bytes | `wc file.txt`                |
| `wc -l [file]`            | Count lines only          | `wc -l file.txt`             |

## Permissions

| Command                       | Description          | Example                     |
| ----------------------------- | -------------------- | --------------------------- |
| `chmod [mode] [file]`         | Change permissions   | `chmod 755 script.sh`       |
| `chmod u+x [file]`            | Add execute for user | `chmod u+x script.sh`       |
| `chmod +r [file]`             | Add read for all     | `chmod +r file.txt`         |
| `chown [user]:[group] [file]` | Change ownership     | `chown user:group file.txt` |
| `ls -l [file]`                | View permissions     | `ls -l file.txt`            |

### Permission Numbers

| Number | Permission             | Symbolic |
| ------ | ---------------------- | -------- |
| 7      | read + write + execute | `rwx`    |
| 6      | read + write           | `rw-`    |
| 5      | read + execute         | `r-x`    |
| 4      | read only              | `r--`    |
| 3      | write + execute        | `-wx`    |
| 2      | write only             | `-w-`    |
| 1      | execute only           | `--x`    |
| 0      | no permissions         | `---`    |

**Example:** `chmod 755 file` sets:

- Owner: `rwx` (7)
- Group: `r-x` (5)
- Others: `r-x` (5)

## System Information

| Command       | Description                 | Example         |
| ------------- | --------------------------- | --------------- |
| `uname`       | OS name                     | `uname`         |
| `uname -a`    | All system info             | `uname -a`      |
| `uname -r`    | Kernel version              | `uname -r`      |
| `hostname`    | Show hostname               | `hostname`      |
| `hostname -I` | Show IP address             | `hostname -I`   |
| `df -h`       | Disk space (human-readable) | `df -h`         |
| `du -h [dir]` | Directory size              | `du -h folder/` |
| `free -h`     | Memory usage                | `free -h`       |
| `top`         | Process monitor             | `top`           |
| `ps aux`      | List all processes          | `ps aux`        |
| `lscpu`       | CPU information             | `lscpu`         |
| `vmstat`      | Virtual memory stats        | `vmstat`        |

## Process Management

| Command                 | Description                | Example                  |
| ----------------------- | -------------------------- | ------------------------ |
| `top`                   | Interactive process viewer | `top`                    |
| `ps aux`                | List all processes         | `ps aux`                 |
| `ps aux \| grep [name]` | Find process by name       | `ps aux \| grep firefox` |
| `kill [PID]`            | Kill process by ID         | `kill 1234`              |
| `kill -9 [PID]`         | Force kill process         | `kill -9 1234`           |
| `killall [name]`        | Kill processes by name     | `killall firefox`        |
| `jobs`                  | List background jobs       | `jobs`                   |
| `bg`                    | Resume job in background   | `bg %1`                  |
| `fg`                    | Bring job to foreground    | `fg %1`                  |
| `[command] &`           | Run in background          | `./script.sh &`          |

## User Management

| Command          | Description              | Example                 |
| ---------------- | ------------------------ | ----------------------- |
| `whoami`         | Current username         | `whoami`                |
| `id`             | User and group IDs       | `id`                    |
| `id [user]`      | Show user ID information | `id username`           |
| `sudo [command]` | Run as administrator     | `sudo apt update`       |
| `su - [user]`    | Switch user              | `su - root`             |
| `useradd [user]` | Add user                 | `sudo useradd newuser`  |
| `passwd [user]`  | Change password          | `passwd username`       |
| `userdel [user]` | Delete user              | `sudo userdel username` |
| `groups [user]`  | Show user groups         | `groups username`       |

## Networking

| Command                | Description               | Example                             |
| ---------------------- | ------------------------- | ----------------------------------- |
| `ping [host]`          | Test connectivity         | `ping google.com`                   |
| `wget [url]`           | Download file             | `wget https://example.com/file.zip` |
| `wget -O [name] [url]` | Download with custom name | `wget -O myfile.zip [url]`          |
| `curl [url]`           | Transfer data from URL    | `curl https://api.example.com`      |
| `ifconfig`             | Network interfaces (old)  | `ifconfig`                          |
| `ip addr`              | Network interfaces (new)  | `ip addr`                           |
| `netstat -tuln`        | Listening ports           | `netstat -tuln`                     |
| `nslookup [domain]`    | DNS lookup                | `nslookup google.com`               |
| `dig [domain]`         | DNS information           | `dig google.com`                    |

## Compression & Archives

| Command                      | Description           | Example                           |
| ---------------------------- | --------------------- | --------------------------------- |
| `zip [archive] [files]`      | Create zip archive    | `zip archive.zip file1 file2`     |
| `zip -r [archive] [dir]`     | Zip directory         | `zip -r archive.zip folder/`      |
| `unzip [archive]`            | Extract zip           | `unzip archive.zip`               |
| `tar -czf [archive] [files]` | Create tar.gz         | `tar -czf archive.tar.gz folder/` |
| `tar -xzf [archive]`         | Extract tar.gz        | `tar -xzf archive.tar.gz`         |
| `tar -tf [archive]`          | List archive contents | `tar -tf archive.tar.gz`          |
| `gzip [file]`                | Compress file         | `gzip file.txt`                   |
| `gunzip [file]`              | Decompress file       | `gunzip file.txt.gz`              |

## Utilities

| Command                  | Description       | Example              |
| ------------------------ | ----------------- | -------------------- |
| `man [command]`          | Manual page       | `man ls`             |
| `[command] --help`       | Quick help        | `ls --help`          |
| `history`                | Command history   | `history`            |
| `history \| grep [term]` | Search history    | `history \| grep cd` |
| `clear`                  | Clear screen      | `clear` (`Ctrl+L`)   |
| `echo [text]`            | Print text        | `echo "Hello"`       |
| `date`                   | Current date/time | `date`               |
| `cal`                    | Calendar          | `cal`                |
| `uptime`                 | System uptime     | `uptime`             |
| `which [command]`        | Command location  | `which python3`      |
| `alias [name]=[command]` | Create alias      | `alias ll='ls -la'`  |

## Special Operators

| Operator | Description                 | Example                      |
| -------- | --------------------------- | ---------------------------- |
| `*`      | Wildcard (any characters)   | `ls *.txt`                   |
| `?`      | Single character wildcard   | `ls file?.txt`               |
| `>`      | Redirect output (overwrite) | `ls > list.txt`              |
| `>>`     | Redirect output (append)    | `echo "text" >> file.txt`    |
| `<`      | Redirect input              | `sort < unsorted.txt`        |
| `\|`     | Pipe output to input        | `ls \| grep txt`             |
| `&`      | Run in background           | `command &`                  |
| `&&`     | Run if previous succeeds    | `mkdir dir && cd dir`        |
| `\|\|`   | Run if previous fails       | `command \|\| echo "failed"` |
| `;`      | Run commands sequentially   | `cd /tmp ; ls`               |
| `$()`    | Command substitution        | `echo $(date)`               |
| `~`      | Home directory              | `cd ~`                       |
| `.`      | Current directory           | `cp file.txt .`              |
| `..`     | Parent directory            | `cd ..`                      |

## Keyboard Shortcuts

| Shortcut   | Action                      |
| ---------- | --------------------------- |
| `Ctrl + C` | Cancel current command      |
| `Ctrl + D` | Exit terminal / EOF         |
| `Ctrl + L` | Clear screen                |
| `Ctrl + A` | Beginning of line           |
| `Ctrl + E` | End of line                 |
| `Ctrl + U` | Delete to beginning of line |
| `Ctrl + K` | Delete to end of line       |
| `Ctrl + W` | Delete word before cursor   |
| `Ctrl + R` | Search command history      |
| `↑` / `↓`  | Navigate command history    |
| `Tab`      | Auto-complete               |
| `Tab Tab`  | Show all completions        |

## Common Patterns

### Create and enter directory

```bash
mkdir my-project && cd my-project
```

### Backup file before editing

```bash
cp important.txt important.txt.bak
```

### Find and delete

```bash
find . -name "*.tmp" -delete
```

### Count files

```bash
ls | wc -l
```

### Search in files

```bash
grep -r "search term" .
```

### Disk usage by directory

```bash
du -h --max-depth=1 | sort -hr
```

### Find large files

```bash
find . -type f -size +100M
```

### Monitor log file in real-time

```bash
tail -f /var/log/syslog
```

### Create nested directories

```bash
mkdir -p project/{src,tests,docs}
```

### Batch rename extensions

```bash
for file in *.txt; do mv "$file" "${file%.txt}.md"; done
```

## Tips

- Always test destructive commands with non-destructive versions first (use `ls` before `rm`)
- Use tab completion to avoid typos
- Check `man pages` when unsure: `man command`
- `Ctrl+R` for reverse history search is incredibly useful
- Practice in a safe directory first
- Make backups before important operations
- Use `pwd` frequently to know where you are

## Safety Reminders

- `rm -rf` is permanent - no undo!
- Always verify current directory with `pwd` before destructive commands
- Test wildcard patterns with `ls` before using with `rm`
- Use `-i` flag for interactive confirmation: `rm -i file.txt`
- Create backups before batch operations

---

For detailed information on any command, see the full documentation or use `man command`.
