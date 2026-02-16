---
title: "Flag Reference"
---

Quick reference of commonly used flags across different commands.

## Universal Flags

These flags work with many commands:

| Flag                  | Purpose                           | Commands                          |
| --------------------- | --------------------------------- | --------------------------------- |
| `-h`, `--help`        | Show help message                 | Most commands                     |
| `-v`, `--version`     | Show version                      | Most commands                     |
| `-v`, `--verbose`     | Verbose output                    | cp, mv, rm, tar, rsync            |
| `-q`, `--quiet`       | Suppress output                   | grep, wget, curl                  |
| `-r`, `-R`            | Recursive operation               | cp, rm, grep, chmod, chown        |
| `-f`, `--force`       | Force operation without prompting | cp, mv, rm, ln                    |
| `-i`, `--interactive` | Prompt before action              | cp, mv, rm                        |
| `-n`                  | Dry run / number                  | Many commands (context-dependent) |

## Listing and Display Flags

### `ls` Command

| Flag                     | Description                               |
| ------------------------ | ----------------------------------------- |
| `-a`, `--all`            | Show all files (including hidden)         |
| `-l`                     | Long format with details                  |
| `-h`, `--human-readable` | Human-readable file sizes                 |
| `-t`                     | Sort by modification time                 |
| `-r`, `--reverse`        | Reverse sort order                        |
| `-S`                     | Sort by file size                         |
| `-R`, `--recursive`      | List subdirectories recursively           |
| `-1`                     | One file per line                         |
| `-d`                     | List directories themselves, not contents |

### `ps` Command

| Flag | Description                                 |
| ---- | ------------------------------------------- |
| `a`  | Show processes for all users                |
| `u`  | Show user/owner information                 |
| `x`  | Show processes without controlling terminal |
| `-e` | Show all processes                          |
| `-f` | Full format listing                         |

## File Operation Flags

### Copy/Move (`cp`, `mv`)

| Flag       | Description                             |
| ---------- | --------------------------------------- |
| `-r`, `-R` | Copy directories recursively (cp only)  |
| `-i`       | Interactive - prompt before overwrite   |
| `-f`       | Force - overwrite without prompting     |
| `-v`       | Verbose - show files being processed    |
| `-u`       | Update - copy only when source is newer |
| `-p`       | Preserve file attributes (cp)           |
| `-a`       | Archive mode - preserve everything (cp) |
| `-n`       | No clobber - don't overwrite existing   |
| `-b`       | Backup - make backup of existing files  |

### Remove (`rm`)

| Flag       | Description                            |
| ---------- | -------------------------------------- |
| `-r`, `-R` | Remove directories recursively         |
| `-f`       | Force removal without prompting        |
| `-i`       | Interactive - prompt for each file     |
| `-v`       | Verbose - show what's being deleted    |
| `-d`       | Remove empty directories               |
| `-I`       | Prompt once before removing many files |

## Search Flags

### `grep`

| Flag       | Description                            |
| ---------- | -------------------------------------- |
| `-i`       | Case-insensitive search                |
| `-v`       | Invert match (show non-matching lines) |
| `-r`, `-R` | Recursive search in directories        |
| `-n`       | Show line numbers                      |
| `-c`       | Count matching lines                   |
| `-l`       | Show only filenames with matches       |
| `-w`       | Match whole words only                 |
| `-A <n>`   | Show n lines after match               |
| `-B <n>`   | Show n lines before match              |
| `-C <n>`   | Show n lines before and after match    |
| `-E`       | Use extended regex                     |
| `-o`       | Show only matching part                |

### `find`

| Flag      | Description                      |
| --------- | -------------------------------- |
| `-name`   | Search by filename               |
| `-iname`  | Case-insensitive filename search |
| `-type f` | Find only files                  |
| `-type d` | Find only directories            |
| `-size`   | Find by size                     |
| `-mtime`  | Modified time                    |
| `-user`   | Find by owner                    |
| `-perm`   | Find by permissions              |
| `-delete` | Delete found files               |
| `-exec`   | Execute command on found files   |

## Archive and Compression Flags

### `tar`

| Flag        | Description                  |
| ----------- | ---------------------------- |
| `-c`        | Create archive               |
| `-x`        | Extract archive              |
| `-t`        | List contents                |
| `-v`        | Verbose                      |
| `-f`        | Specify filename             |
| `-z`        | gzip compression (.tar.gz)   |
| `-j`        | bzip2 compression (.tar.bz2) |
| `-C`        | Change directory             |
| `--exclude` | Exclude files/patterns       |

Common combinations:

- `tar -czf`: Create gzip archive
- `tar -xzf`: Extract gzip archive
- `tar -cjf`: Create bzip2 archive
- `tar -xjf`: Extract bzip2 archive

### `zip`/`unzip`

| Flag | Description                     |
| ---- | ------------------------------- |
| `-r` | Recursive (for directories)     |
| `-q` | Quiet mode                      |
| `-v` | Verbose                         |
| `-d` | Delete files from archive (zip) |
| `-u` | Update existing archive         |
| `-l` | List contents (unzip)           |

## Permissions Flags

### `chmod`

| Flag | Description                      |
| ---- | -------------------------------- |
| `-R` | Recursive - apply to directories |
| `-v` | Verbose output                   |
| `-c` | Report only when changes made    |

### Permission shortcuts:

- `u` = user/owner
- `g` = group
- `o` = others
- `a` = all
- `+` = add permission
- `-` = remove permission
- `=` = set exactly

## System Information Flags

### `df` (Disk Free)

| Flag                     | Description                       |
| ------------------------ | --------------------------------- |
| `-h`, `--human-readable` | Human-readable sizes (KB, MB, GB) |
| `-T`                     | Show filesystem type              |
| `-i`                     | Show inode information            |

### `du` (Disk Usage)

| Flag            | Description                              |
| --------------- | ---------------------------------------- |
| `-h`            | Humanreadable sizes                      |
| `-s`            | Summary only (don't show subdirectories) |
| `-c`            | Grand total                              |
| `--max-depth=N` | Limit directory depth                    |

### `free` (Memory)

| Flag     | Description            |
| -------- | ---------------------- |
| `-h`     | Human-readable         |
| `-m`     | Show in megabytes      |
| `-g`     | Show in gigabytes      |
| `-t`     | Show total             |
| `-s <n>` | Update every n seconds |

## Network Flags

### `ping`

| Flag     | Description              |
| -------- | ------------------------ |
| `-c <n>` | Count - send n packets   |
| `-i <n>` | Interval between packets |
| `-s <n>` | Packet size              |
| `-q`     | Quiet - summary only     |
| `-4`     | Use IPv4                 |
| `-6`     | Use IPv6                 |

### `wget`

| Flag           | Description                 |
| -------------- | --------------------------- |
| `-O <file>`    | Output to specific filename |
| `-c`           | Continue partial download   |
| `-q`           | Quiet mode                  |
| `-r`           | Recursive download          |
| `--limit-rate` | Limit download speed        |
| `-b`           | Background download         |

## Text Processing Flags

### `sort`

| Flag        | Description                |
| ----------- | -------------------------- |
| `-n`        | Numerical sort             |
| `-r`        | Reverse order              |
| `-u`        | Unique (remove duplicates) |
| `-f`        | Case-insensitive           |
| `-k <n>`    | Sort by field n            |
| `-t <char>` | Field delimiter            |

### `head`/`tail`

| Flag     | Description                    |
| -------- | ------------------------------ |
| `-n <n>` | Show n lines                   |
| `-c <n>` | Show n bytes                   |
| `-q`     | Quiet (suppress headers)       |
| `-f`     | Follow (tail only - real-time) |

## Process Management Flags

### `kill`

| Flag/Signal      | Description                    |
| ---------------- | ------------------------------ |
| `-9`, `SIGKILL`  | Force kill (cannot be ignored) |
| `-15`, `SIGTERM` | Terminate gracefully (default) |
| `-1`, `SIGHUP`   | Hang up                        |
| `-2`, `SIGINT`   | Interrupt (Ctrl+C)             |
| `-STOP`          | Pause process                  |
| `-CONT`          | Resume process                 |

### `ps`

| Flag        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `aux`       | All processes, user format, including those without terminal |
| `-e`        | Every process                                                |
| `-f`        | Full format                                                  |
| `-u <user>` | Processes for specific user                                  |
| `--sort`    | Sort by column                                               |

## Sudo Flags

| Flag        | Description                   |
| ----------- | ----------------------------- |
| `-u <user>` | Run as specific user          |
| `-i`        | Login shell                   |
| `-s`        | Shell                         |
| `-l`        | List allowed commands         |
| `-v`        | Validate (extend timeout)     |
| `-k`        | Invalidate cached credentials |

## Common Flag Patterns

### Verbose and Interactive Combination

```bash
cp -vi source dest        # Verbose + interactive copy
rm -rvi directory/        # Verbose + interactive recursive remove
```

### Force Operations (Use with Caution!)

```bash
rm -rf directory/         # Force recursive remove
cp -rf source/ dest/      # Force recursive copy
```

### Human-Readable Outputs

```bash
ls -lh                    # File sizes in KB/MB/GB
df -h                     # Disk space in KB/MB/GB
du -h folder/             # Directory size in KB/MB/GB
free -h                   # Memory in KB/MB/GB
```

### Archive Operations

```bash
tar -czf archive.tar.gz files/     # Create gzip archive
tar -xzf archive.tar.gz            # Extract gzip archive
tar -tvf archive.tar               # List archive contents
```

## Tips

1. **Check compatibility**: Not all flags work the same on different systems (Linux vs macOS vs BSD)
2. **Man pages are your friend**: `man command` for complete flag documentation
3. **Combine short flags**: `-l -a -h` can be written as `-lah`
4. **Long flags are clearer**: `--human-readable` is more readable than `-h` in scripts
5. **Test with safe flags first**: Use `--help` or `-n` (dry-run) before destructive operations

## See Also

- [Cheat Sheet](cheat-sheet.md) - Quick command reference
- [Command Index](command-index.md) - Alphabetical command listing
