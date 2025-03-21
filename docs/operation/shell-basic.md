---
title: Shell 基础
---

## 前言

尝试在 Windows11 上使用 wget 通过一个 url 下载一个 js 静态文件。但是发现本地 bash 使用 wget 命令报错：command not found。于是借 wget 之名展开”古老“的 Shell 之旅。

**Shell 是什么**？我们用 GLM4 总结一下：

> Shell 的准确定义是：在操作系统中，Shell 是一个程序，它提供了一个用户界面，允许用户通过命令行输入指令来与操作系统交互。它充当用户与操作系统内核之间的中介，处理用户的输入，解释这些输入为操作系统可以理解和执行的操作，并返回执行结果。

也就是说 Shell 是一个命令解释器。可以将其理解为人机交互的中间层，通过解析字符串命令与操作系统交互，进而完成系统资源的调用与处理。可以将「解析命令并调用系统资源完成任务」这个过程简单地理解为：Shell 解析输入 $\to$ Shell 调用对应的 C 函数向 OS 发起请求 $\xrightarrow[]{\text{API}}$ OS 接受请求并执行相关底层操作 $\to$ OS 返回执行结果给 C 函数 $\to$ Shell 接受 C 函数返回结果并显示提示信息。

**为什么用 Bash Shell**？常见的命令解释器有：Bash (Bourne Again Shell)、Sh (Bourne Shell)、Zsh (Z Shell) 等。其中 Bash 是最流行的跨平台 Shell 之一。虽然它是 GNU/Linux 和 macOS 的默认 Shell，但也可以在 Windows 上通过 Windows Subsystem for Linux (WSL) 或第三方工具如 Git Bash 来运行。

**文章标题为什么不叫 GNU/Linux 基础**？在我看来，GNU/Linux 基础的内容更多应当偏向于讲解  GNU/Linux 的理论知识，然而目前主流的讲解 GNU/Linux 基础的内容均偏向于指导大家如何使用 Shell 与操作系统交互，那这与 Python 等解释型编程语言有什么区别？Python 是用 Python 解释器与操作系统交互，相关的教程默认都叫「Python 基础」，Shell 是用 Shell 解释器与操作系统交互，那为什么不叫「Shell 基础」呢？

注：本文基于 Windows11 的 Git Bash 命令解释器配合 Ubuntu22.04 的 Bash 命令解释器展开。两个平台的 Bash 版本信息如下：

Windows11 **Git Bash** Version Info:

```bash
$ bash --version
GNU bash, version 5.2.26(1)-release (x86_64-pc-msys)
Copyright (C) 2022 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

GNU/Linux **Bash** Version Info:

```bash
root@dwj2:~# bash --version
GNU bash，版本 5.1.16(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2020 Free Software Foundation, Inc.
许可证 GPLv3+：GNU GPL 许可证第三版或者更新版本 <http://gnu.org/licenses/gpl.html>

本软件是自由软件，您可以自由地更改和重新发布。
在法律许可的情况下特此明示，本软件不提供任何担保。
```

在开始之前，我们可以使用 `echo $SHELL` 命令查看当前的命令解释器是什么：

```bash
root@dwj2:~# echo $SHELL
/bin/bash
```

## 改变目录 cd

```bash
cd ../
```

`../` 表示上一级，`./` 表示当前一级（也可以不写），`/` 表示从根目录开始。

## 打印目录内容 ls

```bash
ls
```

- `-l` 参数即 long listing format，表示打印详细信息。
- `-h` 参数即 human-readable，会使得结果更加可读，例如占用存储空间加上单位等等。

## 打印当前路径 pwd

```bash
pwd
```

## 打印当前用户名

```bash
whoami
```

## 创建文件夹 mkdir

```bash
mkdir <FolderName>
```

## 创建文件 touch

```bash
touch <FileName>
```

## 复制 cp

```bash
cp [option] <source> <target>
```

- `-r` 表示递归复制，`-i` 用来当出现重名文件时进行提示。
- source 表示被拷贝的资源。
- target 表示拷贝后的资源名称或者路径。

## 移动 mv

```bash
mv [option] <source> <target>
```

- `-i` 用来当出现重名文件时进行提示。
- source 表示被移动的资源。
- target 表示移动后的资源名称或者路径（可以以此进行重命名）。

## 删除 rm

```bash
rm [option] <source>
```

- `-i` 需要一个一个确认，`-f` 表示强制删除，`-r` 表示递归删除。

## 打印 echo

```bash
echo "hello"
```

- 将 echo 后面紧跟着的内容打印到命令行解释器中。可以用来查看环境变量的具体值。

- 也可以配合输出重定向符号 `>` 将信息打印到文件中实现创建新文件的作用。例如 `echo "hello" > file.txt` 用于创建 file.txt 文件并且在其中写下 `hello` 信息。

## 查看 cat

```bash
cat [option] <source>
```

- `-n` 或 `--number` 表示将 source 中的内容打印出来的同时带上行号。
- 也可以配合输出重定位符号 `>` 将信息输出到文件中。例如 `cat -n a.txt > b.txt` 表示将 a.txt 文件中的内容带上行号输出到 b.txt 文件中。

## 分页查看 more

```bash
more <source>
```

与 `cat` 类似，只不过可以分页展示。按空格键下一页，`b` 键上一页，`q` 键退出。

可以配合管道符 `|` (将左边的输出作为右边的输入) 与别的命令组合从而实现分页展示，例如 `tree | more` 表示分页打印文件目录。

## 输出重定向 >

标准输出（stdout）默认是显示器。

`>` 表示创建或覆盖，`>>` 表示追加。

## 查找 find

```bash
find <path> <expression>
```

- `-maxdepth <num>`, `-mindepth <num>`: 最大、最小搜索深度。

## 匹配 grep

```bash
grep [option] <pattern> <source>
```

使用正则表达式在指定文件中进行模式匹配。

- `-n` 显示行号，`-i` 忽略大小写，`-r` 递归搜索，`-c` 打印匹配数量。
