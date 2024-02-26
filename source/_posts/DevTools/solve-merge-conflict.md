---
title: solve-merge-conflict
categoried: DevTools
category_bar: true
---

## 一、前言

一直习惯于 add commit push 的三步走，偶然间看到了一个评论说在 push 之前还有一个 pull，小小的疑问就埋在了我的心里。于是我就先了解了 pull 的工作原理，就是先拉取代码（fetch）再合并分支（merge）的过程，简而言之就是在本地进行项目编写时，他人也在其他地方进行项目编写并且提前进行了 push 操作，使得当前的云端文件比我克隆下来的文件版本更加新，那么进行合并就会因为冲突被拒绝（rejected）。因此才需要先更新项目（pull），再进行我的 push。那么问题来了，如果别人编写的内容与我编写的内容在源文件的同一个地方，那不就出问题了吗？！于是有了这篇文章

## 二、项目演示

我们通过 github 上的 Network 进行可视化讲解。假设现在我们有一个本地项目、github 空仓库、本地仓库提交记录，如下

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029674.png" alt="github 空仓库" /></center>

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029675.png" alt="本地项目文件夹" style="zoom:67%;" /></center>

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029676.png" alt="本地仓库提交记录" /></center>

第一次 push 后，我们查看 Network 效果如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029677.png" alt="第一次 push 后的 Network" /></center>

已知 test.md 文件中内容现在是这样的

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029678.png" alt=" test.md 文件中内容" /></center>

### 2.1 没有冲突时

现在我们在本地对 test.md 文件进行编辑，编辑后如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029680.png" alt="编辑后的 test.md 文件" /></center>

然后在 github 上对该文件的 **其他地方** 进行编辑并 push，模拟 **别人更早更新项目代码但是不冲突** 的情况，如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029681.png" alt="模拟别人更早更新项目代码的情况" /></center>

现在我们在本地进行提交操作，显然会报错，因为远程已经更新：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029682.png" alt="远程已经更新而被 rejected" /></center>

现在我们需要进行合并，也就是执行 pull，再 push 即可，由于合并后会产生一个新的结点，因此会弹出 vim 界面让你编写 comment：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029683.png" alt=" vim 界面" style="zoom:67%;" /></center>

然后就成功 pull 了代码，之后再 push 就没问题了：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029684.png" alt="成功 push 了代码" /></center>

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029685.png" alt="成功 push 了代码" /></center>

我们来看一下现在的 test.md 是什么样的：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029686.png" alt="无冲突合并后的结果" /></center>

可以发现内容进行了合并，现在的 Network 图如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029687.png" alt="现在的 Network 图" /></center>

### 2.2 有冲突时

为了更加直观的展示，我们在原有的基础上多增加几个正常结点，当前 Network 如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029688.png" alt="当前 Network 图" /></center>

然后我们在本地对 test.md 文件进行编写：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029689.png" alt="第二次本地修改" /></center>

然后在 github 上对该文件的 **相同地方** 进行编辑并 push，模拟 **别人更早更新项目代码但是发生冲突** 的情况，如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029690.png" alt="模拟别人更早更新项目代码但是发生冲突的情况" /></center>

然后 add、commit，在视图 pull 进行合并时，出现了问题：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029691.png" alt="提示冲突同时分支名变成了 main|MERGING" /></center>

提示我们修复冲突后再进行 commit，同时分支名变成了 `main|MERGING` 状态，本地试图 push 的代码也出现了变化，如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029692.png" alt="本地试图 push 的代码" /></center>

我们也可以使用 `git diff` 或 `git status` 来查看冲突：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029693.png" alt="使用 git diff 或 git status 来查看冲突" /></center>

其中，`<<<<<<<` 和 `=======` 之间是 HEAD 的代码，`========` 和 `>>>>>>>` 之间是 main 的代码，git 对冲突内容主动进行了错位，**我方最新内容在上**（也就是 HEAD 的代码），**分支最新内容在下**，确保不会再冲突。我们根据实际情况解决冲突内容，如下：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029694.png" alt="根据实际情况解决冲突内容后" /></center>

然后我们重新 commit 并加上 -a 参数后，进行 push：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029695.png" alt="重新 commit 并加上 -a 参数后，进行 push" /></center>

最终 test.md 内容如图：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029696.png" alt="最终 test.md 内容" /></center>

最终 Network 如图：

<center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402270029697.png" alt="最终 Network 图" /></center>

## 三、总结

总的来说，就两句话

- 当我的改动与最新项目的改动没有重叠时：**pull 后就直接进行合并**
- 当我的改动与最新项目的改动有重叠时：**pull 后解决冲突，然后执行下方命令即可**
    - `git commit -a -m '<comment>'` 
    - `git push` 
