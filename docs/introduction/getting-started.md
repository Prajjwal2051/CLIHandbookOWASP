---
title: "Getting Started"
---

Ready to type your first commands? This guide will help you open your terminal and start exploring!

## Opening Your Terminal

The first step is simply opening the terminal application on your computer.

### On Ubuntu (and most Linux distributions)

1. Press `Ctrl` + `Alt` + `T` on your keyboard
2. Or open your dashboard and search for **"Terminal"**

### On macOS

1. Press `Command` + `Space` to open Spotlight
2. Type **"Terminal"** and press Enter

### On Windows (WSL)

1. Open the Start menu
2. Search for **"Ubuntu"** (if you installed WSL) or **"Terminal"**

## Your First Commands

Once your terminal window is open, you'll see a blinking cursor next to some text (this is called the **prompt**). It's waiting for you!

Try typing these commands one by one. Press `Enter` after each one to run it.

### 1. Who am I?

Ask the computer who is currently logged in:

```bash
whoami
```

**What happens:** It prints your username. simple!

### 2. Where am I?

Find out which folder you are currently in:

```bash
pwd
```

**What happens:** `pwd` stands for **P**rint **W**orking **D**irectory. It shows the path to your current folder (usually `/home/yourusername`).

### 3. What's here?

List the files and folders in your current location:

```bash
ls
```

**What happens:** You'll see names of files and folders like `Documents`, `Downloads`, `Music`, etc.

### 4. Let's make a mess (and clean it up)

Let's create a new empty file:

```bash
touch my-first-file.txt
```

Now list the files again to see it:

```bash
ls
```

You should see `my-first-file.txt` in the list!

Now, let's remove it:

```bash
rm my-first-file.txt
```

Check one last time:

```bash
ls
```

It's gone!

## Understanding the "Prompt"

You might see some text before your cursor, like:

```text
user@hostname:~$
```

Here's what it means:

- `user`: Your username
- `@`: "at"
- `hostname`: The name of your computer
- `~`: The current folder (`~` is a shortcut for your home folder)
- `$`: The symbol that says "I'm ready for a command!"

## Pro Tips for Beginners

- **Case Matters**: `Desktop` is different from `desktop`. Linux is case-sensitive!
- **Don't Panic**: If you type something wrong, the computer will usually just say "command not found". Nothing bad will happen.
- **Use the Arrow Keys**: Press the `Up Arrow` key to see commands you typed previously. It saves a lot of typing!

## What's Next?

Now that you've dipped your toes in, let's learn about the **Terminal Emulator** and how it actually works!

[Next: The Terminal Emulator →](../core-concepts/terminal-emulator.md)
