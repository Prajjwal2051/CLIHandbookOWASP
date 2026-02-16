---
title: "File System"
---

Imagine your computer's storage as a giant tree. But wait - this tree is upside down!

## The Root (`/`)

At the very top (or bottom, depending on how you see it) is the **Root Directory**. We write it as a simple forward slash: `/`.

Everything on your Linux system lives inside this root directory. There are no "C: drives" or "D: drives" here. Just one big tree.

## Important Folders (Directories)

Here are the main branches you need to know:

- **`/home`** - **Your Stuff**. This is where your documents, downloads, and pictures live. Each user gets their own folder here (e.g., `/home/prajjwal`).
- **`/bin`** - **Programs**. Contains essential commands like `ls`, `cp`, and `cat`.
- **`/etc`** - **Settings**. Configuration files live here. Think of it as the "Control Panel" settings.
- **`/tmp`** - **Temporary**. A scratchpad for files that aren't needed forever. It usually gets cleared when you restart.
- **`/var`** - **Variable**. Files that change often, like logs and website files.

## Paths: The Address System

To find a file, you need its "address" or **Path**.

### Absolute Path

Start from the Root `/`.
Example: `/home/prajjwal/Documents/notes.txt`
_Like giving a full address: "123 Main St, City, Country"_

### Relative Path

Start from where you are right now.
Example: `Documents/notes.txt` (if you are in `/home/prajjwal`)
_Like giving directions: "Go down the hall and turn left"_

## Hidden Files

In Linux, any file that starts with a dot (`.`) is hidden.
Examples: `.bashrc`, `.config`

They aren't secret - they just don't clutter up your normal view. Use `ls -a` to see them!

[Next: File Operations →](../commands/file-operations.md)
