---
title: Git 问题解决
---

本文记录使用 Git 的过程中遇到的一些问题以及对应的解决方法。

## 解决 Git 分支冲突的问题

一直习惯于 add commit push 的三步走，偶然间看到了一个评论说在 push 之前还应该有一个 pull，小小的疑问就埋在了我的心里。

于是我就先了解了 pull 的工作原理，就是先拉取代码（fetch）再合并分支（merge）的过程，简而言之就是将「别人在原项目的基础上更新的代码」与「我在原项目的基础上更新的代码」进行合并。

那么问题来了，如果别人更新的内容与我更新的内容在源文件的同一个地方，那不就出问题了吗？！于是有了下面的内容。

### 初始化

我们通过 GitHub 上的 Network 进行可视化讲解。假设现在我们有一个本地项目、GitHub 空仓库、本地仓库提交记录，如下：

![GitHub 空仓库](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029674.png)

/// fc
GitHub 空仓库
///

![本地项目文件夹](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029675.png)

/// fc
本地项目文件夹
///

![本地仓库提交记录](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029676.png)

/// fc
本地仓库提交记录
///

第一次 push 后，我们查看 Network 效果如下：

![第一次 push 后的 Network](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029677.png)

/// fc
第一次 push 后的 Network
///

已知 test.md 文件中内容现在是这样的：

![test.md 文件中内容](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029678.png)

/// fc
test.md 文件中内容
///

### 无冲突时

现在我们在本地对 test.md 文件进行编辑，编辑后如下：

![编辑后的 test.md 文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029680.png)

/// fc
编辑后的 test.md 文件
///

然后在 GitHub 上对该文件的 **其他地方** 进行编辑并 push，模拟 **别人更早更新项目代码但是不冲突** 的情况，如下：

![模拟别人更早更新项目代码的情况](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029681.png)

/// fc
模拟别人更早更新项目代码的情况
///

现在我们在本地进行提交操作，显然会报错，因为远程已经更新：

![远程已经更新而被 rejected](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029682.png)

/// fc
远程已经更新而被 rejected
///

现在我们需要进行合并，也就是执行 pull，再 push 即可，由于合并后会产生一个新的结点，因此会弹出 vim 界面让你编写 comment：

![vim 界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029683.png)

/// fc
vim 界面
///

然后就成功 pull 了代码，之后再 push 就没问题了：

![成功 push 了代码](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029684.png)

/// fc
成功 push 了代码
///

![成功 push 了代码](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029685.png)

我们来看一下现在的 test.md 是什么样的：

![无冲突合并后的结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029686.png)

/// fc
无冲突合并后的结果
///

可以发现内容进行了合并，现在的 Network 图如下：

![现在的 Network 图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029687.png)

/// fc
现在的 Network 图
///

### 有冲突时

为了更加直观的展示，我们在原有的基础上多增加几个正常结点，当前 Network 如下：

![当前 Network 图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029688.png)

/// fc
当前 Network 图
///

然后我们在本地对 test.md 文件进行编写：

![第二次本地修改](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029689.png)

/// fc
第二次本地修改
///

然后在 GitHub 上对该文件的 **相同地方** 进行编辑并 push，模拟 **别人更早更新项目代码但是发生冲突** 的情况，如下：

![模拟别人更早更新项目代码但是发生冲突的情况](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029690.png)

/// fc
模拟别人更早更新项目代码但是发生冲突的情况
///

然后 add、commit，在视图 pull 进行合并时，出现了问题：

![提示冲突同时分支名变成了 main|MERGING](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029691.png)

/// fc
提示冲突同时分支名变成了 main|MERGING
///

提示我们修复冲突后再进行 commit，同时分支名变成了 `main|MERGING` 状态，本地试图 push 的代码也出现了变化，如下：

![本地试图 push 的代码](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029692.png)

/// fc
本地试图 push 的代码
///

我们也可以使用 `git diff` 或 `git status` 来查看冲突：

![使用 git diff 或 git status 来查看冲突](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029693.png)

/// fc
使用 git diff 或 git status 来查看冲突
///

其中，`<<<<<<<` 和 `=======` 之间是 HEAD 的代码，`========` 和 `>>>>>>>` 之间是 main 的代码，git 对冲突内容主动进行了错位，**我方最新内容在上**（也就是 HEAD 的代码），**分支最新内容在下**，确保不会再冲突。我们根据实际情况解决冲突内容，如下：

![根据实际情况解决冲突内容后](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029694.png)

/// fc
根据实际情况解决冲突内容后
///

然后我们重新 commit 并加上 -a 参数后，进行 push：

![重新 commit 并加上 -a 参数后，进行 push](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029695.png)

/// fc
重新 commit 并加上 -a 参数后，进行 push
///

最终 test.md 内容如图：

![最终 test.md 内容](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029696.png)

/// fc
最终 test.md 内容
///

最终 Network 如图：

![最终 Network 图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029697.png)

/// fc
最终 Network 图
///

### 总结

总的来说，就两句话：

- 当我的改动与最新项目的改动没有重叠时：**pull 后就直接进行合并**
- 当我的改动与最新项目的改动有重叠时：**pull 后解决冲突，然后执行下方命令即可**
    - `git commit -a -m '<comment>'` 
    - `git push` 

## 解决 Git 自动转义中文的问题

### 问题复现

在使用 Git Bash 命令行工具时，其配套的 Git 程序会自动对中文进行转义，其他的程序则不会，如下图：

![git bash VS other bash](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409010902437.png)

/// fc
Git 程序 VS 其他程序
///

### 解决方案

在 Git Bash 终端输入下面的命令取消 Git 程序对中文的转义：

```bash
git config --global core.quotepath false
```

### 最终效果

![不会对中文自动转义了](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202502071715678.png)

/// fc
不会对中文自动转义了
///
