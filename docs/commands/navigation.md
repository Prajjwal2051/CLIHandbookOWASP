---
title: "Navigation"
---

# Basics of Navigation

Deep diving into the Linux file system can feel like exploring a maze. These three commands are your map and compass.

## The Big Three

Use these commands 90% of the time to get around:

1.  **`pwd`** - **P**rint **W**orking **D**irectory (Where am I?)
2.  **`ls`** - **L**i**s**t (What is here?)
3.  **`cd`** - **C**hange **D**irectory (Take me there!)

---

## 1. Where am I? (`pwd`)

Unlike a graphical folder window, the terminal doesn't always show you exactly where you are.

**Command:**

```bash
pwd
```

**Output:**

```text
/home/prajjwal/Documents
```

This tells you the **absolute path** to your current location.

---

## 2. What is here? (`ls`)

Use `ls` to look around.

**Basic Command:**

```bash
ls
```

**Common Options:**

- **Show Everything (Allocated/Hidden):**

  ```bash
  ls -a
  ```

  _Shows hidden files that start with a dot (like `.bashrc`)._

- **Show Details (Long Format):**

  ```bash
  ls -l
  ```

  _Shows permissions, owner, size, and modification date._

- **Human Readable Sizes:**
  ```bash
  ls -lh
  ```
  _Shows file sizes in KB, MB, GB instead of bytes._

---

## 3. Take me there! (`cd`)

This is your teleportation device.

**Go to a folder:**

```bash
cd Documents
```

**Go back home:**
Simply type `cd` with nothing else, or use the tilde `~`:

```bash
cd
# OR
cd ~
```

**Go up one level:**
The double dot `..` means "parent directory".

```bash
cd ..
```

**Go back to where you just were:**
The dash `-` is like the "Back" button on your browser.

```bash
cd -
```

---

## Pro Tips

### Tab Completion

Never type a full filename! Type the first few letters and press **Tab**. The terminal will finish the word for you.

### Permission Denied?

If you try to enter a folder and get `Permission denied`, you might not have access rights. You can use `sudo` to peek inside if you have administrator privileges:

```bash
sudo ls /root
```

[Next: File Operations →](file-operations.md)
