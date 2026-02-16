---
title: "File Operations"
---

Creating, moving, and deleting files are the bread and butter of the command line.

## Create

- **Make a file:**

  ```bash
  touch newfile.txt
  ```

  _Creates an empty file._

- **Make a folder:**
  ```bash
  mkdir NewFolder
  ```
  _Creates a new directory._

## Copy (`cp`)

Think "Copy and Paste".

- **Copy a file:**

  ```bash
  cp source.txt destination.txt
  ```

- **Copy a folder:**
  You need the `-r` (recursive) flag to copy a folder and everything inside it.
  ```bash
  cp -r source_folder destination_folder
  ```

## Move & Rename (`mv`)

In Linux, moving and renaming are the same thing!

- **Rename a file:**

  ```bash
  mv oldname.txt newname.txt
  ```

- **Move a file to a folder:**
  ```bash
  mv file.txt Folder/
  ```

## Delete (`rm`)

> **[!] WARNING:** There is no "Recycle Bin" in the terminal. When you delete, it's gone forever.

- **Remove a file:**

  ```bash
  rm file.txt
  ```

- **Remove a folder:**
  You need `-r` again.
  ```bash
  rm -r FolderName
  ```

## View (`cat`)

Want to see what's inside a file quickly?

- **Print content to screen:**
  ```bash
  cat filename.txt
  ```

[Next: Advanced Topics →](../advanced/file-permissions-deep-dive.md)
