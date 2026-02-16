---
title: "Root User & Sudo"
---

Understanding the root user, superuser privileges, and safe administration practices.

## What is Root?

The **root user** (also called superuser) is the administrative account in Linux with **complete control** over the system.

### Characteristics

- **User ID**: 0 (UID 0)
- **Home Directory**: `/root`
- **Shell Prompt**: `#` (regular users have `$`)
- **Capabilities**: Can modify any file, install software, manage users, change system configuration

## Why Root Access is Restricted

Direct root login is dangerous because:

1. **No Undo**: Mistakes can destroy the entire system
2. **Security**: Malicious commands can compromise everything
3. **No Audit Trail**: Actions taken as root can't be traced to individual users
4. **Accidental Damage**: Easy to delete critical system files

## The `sudo` Command

`sudo` (**S**uper**u**ser **Do**) allows running single commands with root privileges.

### Syntax

```bash
sudo [options] command
```

### Basic Usage

```bash
# Install software (requires root)
sudo apt update
sudo apt install package-name

# Edit system file
sudo nano /etc/hosts

# Restart system service
sudo systemctl restart nginx

# View protected log file
sudo cat /var/log/auth.log
```

### First-Time sudo

When first using `sudo`, you'll be prompted for YOUR password (not root's):

```bash
$ sudo apt update
[sudo] password for username:
```

- Credentials cached for 15 minutes (default)
- Won't ask again during cache period
- Cache timeout: `sudo -k` (kill cache)

## sudo Configuration

### Sudoers File

Location: `/etc/sudoers`

**NEVER edit directly!** Always use:

```bash
sudo visudo
```

`visudo` checks syntax before saving, preventing lockout.

### Basic Syntax

```
user    hostname = (run_as_user:run_as_group) commands
```

### Examples

```bash
# Allow user 'alice' to run all commands
alice ALL=(ALL:ALL) ALL

# Allow group 'admin' to run all commands
%admin ALL=(ALL:ALL) ALL

# Allow 'bob' to run apt without password
bob ALL=(ALL) NOPASSWD: /usr/bin/apt

# Allow 'charlie' to restart nginx
charlie ALL=(ALL) /usr/bin/systemctl restart nginx

# Allow 'sysadmins' group specific commands
%sysadmins ALL=(ALL) /usr/bin/systemctl, /usr/bin/journalctl
```

## Common sudo Options

### `-u` - Run as Different User

```bash
# Run as user 'postgres'
sudo -u postgres psql

# Run as user 'www-data'
sudo -u www-data whoami
```

### `-i` - Interactive Shell

```bash
# Login shell as root
sudo -i

# Now you're in root's environment
# Prompt changes to #
# Current directory: /root
```

### `-s` - Shell

```bash
# Start shell as root (keeps current directory)
sudo -s
```

### `-l` - List Allowed Commands

```bash
# Show what you can run with sudo
sudo -l
```

### `-k` - Kill Credentials

```bash
# Clear sudo timestamp (will ask password next time)
sudo -k
```

### `-v` - Validate/Extend

```bash
# Extend sudo timeout without running command
sudo -v
```

## Switching to Root

### Method 1: `sudo su` (Common but Not Recommended)

```bash
sudo su
# Starts root shell
# Exit with: exit
```

### Method 2: `sudo -i` (Recommended)

```bash
sudo -i
# Login shell as root
# Full root environment
# Exit with: exit
```

### Method 3: `su` (Rarely Used)

```bash
su
# Requires root password
# Most systems disable root password
```

## Root Shell Indicators

```bash
# Regular user
user@hostname:~$

# Root user
root@hostname:~#
                  ↑ Note the # instead of $
```

## Security Best Practices

### 1. Use sudo Instead of Root Login

```bash
# BAD: Logging in as root
su -

# GOOD: Using sudo for specific commands
sudo command
```

### 2. Principle of Least Privilege

```bash
# BAD: Permanent root shell for simple task
sudo -i
apt update
apt install vim
systemctl restart nginx
exit

# GOOD: Individual commands
sudo apt update
sudo apt install vim
sudo systemctl restart nginx
```

### 3. Never Run Untrusted Scripts as Root

```bash
# DANGEROUS!
curl https://example.com/script.sh | sudo bash

# SAFER: Review script first
curl https://example.com/script.sh > script.sh
cat script.sh  # REVIEW IT!
chmod +x script.sh
sudo ./script.sh
```

### 4. Be Extremely Careful with rm -rf

```bash
# CATASTROPHIC COMMAND - Never run!
sudo rm -rf /

# Safe practice: Always specify full path
sudo rm -rf /path/to/specific/directory

# Even better: Use -i for confirmation
sudo rm -rfi /path/to/specific/directory
```

### 5. Verify Your Command Before sudo

```bash
# Check first without sudo
ls -la /etc/important_file

# Then execute with sudo
sudo rm /etc/important_file
```

## Common Administrative Tasks

### Package Management

```bash
# Ubuntu/Debian
sudo apt update
sudo apt upgrade
sudo apt install package
sudo apt remove package

# Fedora/RHEL
sudo dnf update
sudo dnf install package
sudo dnf remove package
```

### Service Management

```bash
# Start service
sudo systemctl start nginx

# Stop service
sudo systemctl stop nginx

# Restart service
sudo systemctl restart nginx

# Enable on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### User Management

```bash
# Add user
sudo useradd username

# Set password
sudo passwd username

# Delete user
sudo userdel username

# Add user to group
sudo usermod -aG groupname username
```

### File System Operations

```bash
# Change ownership
sudo chown user:group file

# Change permissions
sudo chmod 755 file

# Mount drive
sudo mount /dev/sdb1 /mnt/external

# Unmount drive
sudo umount /mnt/external
```

### System Logs

```bash
# View system log
sudo journalctl

# View specific service log
sudo journalctl -u nginx

# View recent kernel messages
sudo dmesg | tail

# View authentication log
sudo cat /var/log/auth.log
```

## Troubleshooting sudo

### "User is not in the sudoers file"

**Problem**: Your user doesn't have sudo privileges.

**Solution**:

```bash
# Log in as root or another sudo user
su -

# Add user to sudo group
usermod -aG sudo username

# Or on some systems
usermod -aG wheel username

# Log out and back in
```

### "sudo: command not found"

**Problem**: sudo isn't installed (rare).

**Solution**:

```bash
# Log in as root
su -

# Install sudo (Debian/Ubuntu)
apt install sudo

# Install sudo (Fedora)
dnf install sudo
```

### "Sorry, user X may not run sudo on hostname"

**Problem**: User not configured in sudoers.

**Solution**: Add to sudoers file using `visudo` (as root).

### Forgot to Prefix Command with sudo

```bash
# Instead of typing the whole command again
apt update
# bash: permission denied

# Use !!
sudo !!
# Reruns last command with sudo
```

## Security Considerations

### Audit sudo Usage

```bash
# Check who used sudo and what they ran
sudo cat /var/log/auth.log | grep sudo

# Recent sudo commands
sudo journalctl | grep sudo
```

### Require Password Every Time (Maximum Security)

Edit `/etc/sudoers`:

```
Defaults    timestamp_timeout=0
```

### Lock Root Account

```bash
# Disable root password (force sudo usage)
sudo passwd -l root
```

## Dangerous Commands to Avoid

```bash
# NEVER RUN THESE!
sudo rm -rf /
sudo dd if=/dev/zero of=/dev/sda
sudo mkfs.ext4 /dev/sda
sudo chmod -R 777 /
sudo chown -R nobody:nobody /

# Even these can be dangerous
sudo chmod 777 file  # Makes file world-writable
sudo chown www-data:www-data -R /  # Changes ownership of entire system
```

## Best Practices Summary

**DO:**

1. Use `sudo` for individual commands
2. Avoid staying in root shell
3. Review commands before running with sudo
4. Use `visudo` to edit sudoers file
5. Check `sudo -l` to see your permissions
6. Use `sudo -k` after administrative sessions

**DON'T:**

1. Never share root password
2. Never run untrusted scripts with sudo
3. Never disable sudo password requirement
4. Never use `chmod 777` or `chown -R` carelessly

## Related Topics

- [File Permissions](file-permissions-deep-dive.md) - Understanding ownership and permissions
- [User Management](../commands/user-management.md) - Managing users and groups
- [System Security](../troubleshooting/common-issues.md) - Security best practices

## Quick Reference

```bash
# Run command as root
sudo command

# Interactive root shell
sudo -i

# Run as different user
sudo -u username command

# List privileges
sudo -l

# Edit sudoers file
sudo visudo

# Clear credentials
sudo -k

# Extend timeout
sudo -v
```

<div class="admonition danger" markdown>
<p class="admonition-title">Critical Warning</p>
<p>With great power comes great responsibility. Root access can destroy your entire system with a single command. Always double-check before pressing Enter!</p>
</div>
