---
title: "Command Index"
---

Alphabetical index of all Linux CLI commands covered in this handbook.

## A-C

### base64

Encode and decode data using Base64 encoding.

```bash
base64 file.txt              # Encode file
base64 -d encoded.txt        # Decode file
```

### cat

Display file contents, concatenate files, create files.

```bash
cat file.txt
cat file1.txt file2.txt > combined.txt
```

### cd

Change directory, navigate file system.

```bash
cd /path/to/directory
cd ..
cd ~
```

### chmod

Change file permissions.

```bash
chmod 755 script.sh
chmod u+x file.txt
```

### chown

Change file owner and group.

```bash
chown user:group file.txt
```

### clear

Clear the terminal screen.

```bash
clear
# OR: Ctrl+L
```

### cp

Copy files and directories.

```bash
cp source.txt destination.txt
cp -r sourcedir/ destdir/
```

## D-F

### df

Display disk space usage.

```bash
df -h                        # Human-readable format
```

### diff

Compare files line by line.

```bash
diff file1.txt file2.txt
```

### du

Display directory/file disk usage.

```bash
du -h folder/
```

### exiftool

Read, write, and edit file metadata.

```bash
exiftool image.jpg
```

### find

Search for files and directories.

```bash
find . -name "*.txt"
find . -type d
```

### free

Display memory usage.

```bash
free -h
```

## G-K

### getent

Get entries from system databases.

```bash
getent group username
```

### grep

Search for patterns in files.

```bash
grep "pattern" file.txt
grep -r "pattern" directory/
```

### head

Display beginning of files.

```bash
head file.txt
head -n 20 file.txt
```

### history

Display command history.

```bash
history
history | grep command
```

### hostname

Show or set system hostname.

```bash
hostname
hostname -I                  # Show IP address
```

### id

Display user and group IDs.

```bash
id
id username
```

### jobs

List background jobs.

```bash
jobs
```

### kill

Terminate processes.

```bash
kill PID
kill -9 PID
```

## L-M

### locate

Find files by name quickly.

```bash
locate filename
locate "*.pdf"
```

### ls

List directory contents.

```bash
ls
ls -la
ls -lh
```

### lscpu

Display CPU information.

```bash
lscpu
```

### lsof

List open files.

```bash
lsof
lsof -u username
```

### man

Display manual pages.

```bash
man command
man ls
```

### mkdir

Create directories.

```bash
mkdir directoryname
mkdir -p path/to/nested/dir
```

### mv

Move or rename files/directories.

```bash
mv old.txt new.txt
mv file.txt /path/to/destination/
```

## N-P

### netstat

Network statistics and connections.

```bash
netstat -tuln
```

### nslookup

DNS lookup utility.

```bash
nslookup domain.com
```

### passwd

Change user password.

```bash
passwd
passwd username
```

### ping

Test network connectivity.

```bash
ping google.com
```

### pwd

Print working directory.

```bash
pwd
```

## R-T

### rm

Remove files and directories.

```bash
rm file.txt
rm -r directory/
```

### sort

Sort lines in text files.

```bash
sort file.txt
sort -n numbers.txt
```

### sudo

Execute commands as superuser.

```bash
sudo command
```

### tail

Display end of files.

```bash
tail file.txt
tail -n 20 file.txt
tail -f logfile.txt
```

### top

Display running processes.

```bash
top
```

### touch

Create empty files or update timestamps.

```bash
touch file.txt
```

### tr

Translate or delete characters.

```bash
cat file.txt | tr a-z A-Z
```

## U-Z

### uname

Display system information.

```bash
uname -a
uname -r
```

### uniq

Filter duplicate lines.

```bash
sort file.txt | uniq
uniq -c file.txt
```

### unzip

Extract zip archives.

```bash
unzip archive.zip
```

### useradd

Add new user.

```bash
sudo useradd username
```

### userdel

Delete user.

```bash
sudo userdel username
```

### vmstat

Virtual memory statistics.

```bash
vmstat
vm stat -s m         # Display in MB
```

### wget

Download files from web.

```bash
wget URL
wget -O filename URL
```

### whoami

Display current username.

```bash
whoami
```

### zip

Create zip archives.

```bash
zip archive.zip files
zip -r archive.zip directory/
```

---

## Commands by Category

### Navigation & File System

- **cd** - Change directory
- **ls** - List files
- **pwd** - Print working directory
- **mkdir** - Make directory
- **find** - Find files
- **locate** - Locate files

### File Operations

- **cat** - View/concatenate files
- **touch** - Create files
- **cp** - Copy files
- **mv** - Move/rename files
- **rm** - Remove files
- **head** - View file start
- **tail** - View file end
- **diff** - Compare files

### Text Processing

- **grep** - Search patterns
- **sort** - Sort lines
- **uniq** - Filter duplicates
- **tr** - Translate characters

### Permissions

- **chmod** - Change permissions
- **chown** - Change owner

### Compression

- **zip** - Create zip archives
- **unzip** - Extract zip archives

### System Information

- **uname** - System info
- **hostname** - Hostname/IP
- **df** - Disk space
- **du** - Directory size
- **free** - Memory usage
- **lscpu** - CPU info
- **vmstat** - Virtual memory

### Process Management

- **top** - Process monitor
- **ps** - Process status
- **kill** - Terminate process
- **jobs** - List jobs

### User Management

- **whoami** - Current user
- **id** - User/group IDs
- **sudo** - Run as root
- **useradd** - Add user
- **passwd** - Change password
- **userdel** - Delete user

### Networking

- **ping** - Test connectivity
- **wget** - Download files
- **nslookup** - DNS lookup
- **netstat** - Network statistics

### Utilities

- **man** - Manual pages
- **history** - Command history
- **clear** - Clear screen
- **base64** - Base64 encoding
- **exiftool** - Metadata tool
- **lsof** - List open files
- **getent** - Get system entries

---

## Quick Search Tips

Use your browser's search function (`Ctrl+F` or `Cmd+F`) to quickly find commands on this page.

Looking for something specific?

- **File operations**: cp, mv, rm, cat
- **Navigation**: cd, ls, pwd
- **System info**: top, df, free, uname
- **Networking**: ping, wget, netstat
- **Text processing**: grep, sort, uniq

## See Also

- [Cheat Sheet](cheat-sheet.md) - Quick reference for all commands
- [Flag Reference](flag-reference.md) - Common flags across commands
