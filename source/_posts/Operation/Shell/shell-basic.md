---
title: shell-basic
categories:
  - Operation
  - Shell
category_bar: true
---

## Shell 基础

尝试在 Windows11 OS 上使用 wget 来下载一个 js 静态文件。但是发现本地 bash 使用 wget 命令报「command not found」错误。于是借 wget 之名展开”古老“的 shell 之旅。

**Shell 是什么**？我们用 GLM4 总结一下：

> Shell 的准确定义是：在操作系统中，Shell 是一个程序，它提供了一个用户界面，允许用户通过命令行输入指令来与操作系统交互。它充当用户与操作系统内核之间的中介，处理用户的输入，解释这些输入为操作系统可以理解和执行的操作，并返回执行结果。

也就是说 shell 是一个命令解释器。可以将其理解为人机交互的中间层，通过解析字符串命令与操作系统交互，进而完成系统资源调用与处理。可以将「解析命令并调用系统资源完成任务」这个过程简单理解为：shell 解析输入 $\to$ shell 调用对应的 C 函数向 OS 发起请求 $\xrightarrow[]{\text{API}}$ OS 接受请求并执行相关底层操作 $\to$ OS 返回执行结果给 C 函数 $\to$ shell 接受 C 函数返回结果并显示提示信息。

**为什么用 Bash Shell**？常见的命令解释器有：Bash (Bourne Again Shell)、Sh (Bourne Shell)、Zsh (Z Shell) 等。其中 Bash 是最流行的跨平台 Shell 之一。虽然它是 Linux 和 macOS 的默认 Shell，但也可以在 Windows 上通过 Windows Subsystem for Linux (WSL) 或第三方工具如 Git Bash 来运行。

本文基于 Windows11 OS 的 Git Bash 命令解释器配合 Ubuntu22.04 的 Bash 命令解释器展开讲解。两个平台的 Bash 版本如下：

 Git Bash 的版本信息：

```bash
$ bash --version
GNU bash, version 5.2.26(1)-release (x86_64-pc-msys)
Copyright (C) 2022 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

Linux Bash 的版本信息：

```bash
root@dwj2:~# bash --version
GNU bash，版本 5.1.16(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2020 Free Software Foundation, Inc.
许可证 GPLv3+：GNU GPL 许可证第三版或者更新版本 <http://gnu.org/licenses/gpl.html>

本软件是自由软件，您可以自由地更改和重新发布。
在法律许可的情况下特此明示，本软件不提供任何担保。
```

## 基本命令

在开始之前，我们可以使用 `echo $SHELL` 命令查看当前的命令解释器是什么。

### 改变目录 cd

```bash
cd ../
```

`../` 表示上一级，`./` 表示当前一级（也可以不写），`/` 表示从根目录开始。

### 列出目录内容 ls

```bash
ls
```

### 显示当前路径 pwd

```bash
pwd
```

### 创建文件夹 mkdir

```bash
mkdir <FolderName>
```

### 创建文件 touch

```bash
touch <FileName>
```

### 复制 cp

```bash
cp [option] <source> <target>
```

- option 中：`-r` 表示递归复制，`-i` 用来当出现重名文件时进行提示。
- source 表示被拷贝的资源。
- target 表示拷贝后的资源名称或者路径。

### 移动 mv

```bash
mv [option] <source> <target>
```

- option 中：`-i` 用来当出现重名文件时进行提示。
- source 表示被移动的资源。
- target 表示移动后的资源名称或者路径（可以以此进行重命名）。

### 删除 rm

```bash
rm [option] <source>
```

- option 中：`-i` 需要一个一个确认，`-f` 表示强制删除，`-r` 表示递归删除。

### 打印 echo

```bash
echo "hello"
```

将 echo 后面紧跟着的内容打印到命令行解释器中。可以用来查看环境变量的具体值。

也可以配合输出重定向符号 `>` 将信息打印到文件中实现创建新文件的作用。例如 `echo "hello" > file.txt` 用于创建 file.txt 文件并且在其中写下 `hello` 信息。

### 查看 cat

```bash
cat [option] <source>
```

- option: -n 或 --number 表示将 source 中的内容打印出来的同时带上行号。
- 也可以配合输出重定位符号 `>` 将信息输出到文件中。例如 `cat -n a.txt > b.txt` 表示将 a.txt 文件中的内容带上行号输出到 b.txt 文件中。

### 分页查看 more

```bash
more <source>
```

与 cat 类似，只不过可以分页展示。按空格键下一页，b 键上一页，q 键退出。

可以配合管道符 `|` 与别的命令组合从而实现分页展示，例如 `tree | more` 表示分页打印文件目录。

### 查找 find *

```bash
find <path> <expression>
```

- -maxdepth LEVELS, -mindepth LEVELS: 最大、最小搜索深度

### 匹配 grep *

```bash
grep [option] <pattern> <source>
```

使用正则表达式在指定文件中进行模式匹配。

- option: `-n` 显示行号，`-i` 忽略大小写，`-r` 递归搜索，`-c` 打印匹配数量。

### 输出重定向

标准输出（stdout）默认是显示器。

`>` 表示创建或覆盖，`>>` 表示追加。

## Shell 编程



## 软件扩展

### tree

下载地址：[Tree for Windows (sourceforge.net)open in new window](hhttps://gnuwin32.sourceforge.net/packages/tree.htm)，下载 Binaries 的 Zip 文件。解压完成后，将 bin 目录下的 tree.exe 复制到 Git Bash 安装路径下的 usr/bin 文件夹下，即可使用 tree 命令。

常用命令：

- 基本命令格式：`tree [-option] [dir]`。
- 显示中文：`-N`，如果中文名是中文，不加 -N  有些电脑上是乱码的。
- 选择展示的层级：`-L [n]`。
- 只显示文件夹：`-d。`
- 区分文件夹、普通文件、执行文件：`-FC`，C 是加上颜色。
- 起别名：可以起一个别名 `alias tree='tree -FCN'`。
- 输出目录结构到文件：写文档的时候需要展示项目目录就会用到 `tree -L 2 -I '*.js|node_modules|*.md|*.json|*.css|*.ht' > tree.txt。`

### wget

下载 wget 二进制安装包，地址：[Windows binaries of GNU Wget)](https://eternallybored.org/misc/wget/)，选择合适的版本和架构包进行下载。将 wget.exe 移动到 Git Bash 安装路径下的 usr/bin 文件夹下，即可使用 wget 命令。

常用命令：

- 最直接的下载命令：`wget [url]`。
- 指定文件名：`-O`。
- 指定目录：`-P`。
- 下载多个文件：`wget -i [url.txt]`。
- 断点续传：`wget -c -t [n] [url]`，n 代表尝试的次数，0 代表一直尝试。
- 后台执行：`wget -b [url]`，可以添加 `-b` 选项，这时执行该命令的回显信息都会自动存储在 `wget.log` 文件中。
- 下载一个网站的所有图片、视频和 pdf 文件：`wget -r -A.pdf url`。

## 参考引用

[在 Windows 中使用 Bash shell](https://northword.cn/code/bash-for-windows/)