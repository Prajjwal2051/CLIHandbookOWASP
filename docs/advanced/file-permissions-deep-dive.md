Linux is built for multiple users. To keep things safe, every file has a set of rules about who can do what.

## The Three Actions

1.  **Read (`r`)**: You can open and look at the file.
2.  **Write (`w`)**: You can change or delete the file.
3.  **Execute (`x`)**: You can run the file (if it's a program or script).

## The Three Groups

1.  **Owner (`u`)**: The person who created the file (usually you).
2.  **Group (`g`)**: A team of users who share access.
3.  **Others (`o`)**: Everyone else.

## Checking Permissions

Run `ls -l` to see permissions:

```text
-rwxrw-r--
```

Ignore the first `-`. Then read in groups of three:

- `rwx` (Owner): Read, Write, Execute
- `rw-` (Group): Read, Write (No Execute)
- `r--` (Others): Read Only

## Changing Permissions (`chmod`)

Use `chmod` (Change Mode) to update rules.

**The Easy Way (Symbolic):**

- `u` = User, `g` = Group, `o` = Others, `a` = All
- `+` = Add, `-` = Remove

**Examples:**

```bash
# Make a script executable for me
chmod u+x script.sh

# Stop others from reading my secret file
chmod o-r secret.txt

# Give everyone read access
chmod a+r public.doc
```

**The Number Way (Octal):**

- `4` = Read
- `2` = Write
- `1` = Execute
- `0` = None

Add them up! (e.g., Read + Write = 4 + 2 = 6)

**Common Numbers:**

- `777`: Everyone can do everything (Dangerous!)
- `755`: I can do everything; others can only read/run.
- `644`: I can read/write; others can only read.
- `600`: Only I can read/write. Nobody else.

```bash
chmod 644 myfile.txt
```

[Next: Reference →](../reference/command-index.md)
