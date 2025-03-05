---
title: 语音识别导读
---

## 前言

本文记录语音识别技术的入门笔记。部分内容参考 [Huggingface Audio Course](https://huggingface.co/learn/audio-course/chapter0/introduction)。

成绩组成：出勤+测验（*2）+期末大项目。

## 绪论

语音识别 (Speech Recognition, SR) 是一个人工智能研究领域，也可以理解为一种技术，主要用于处理「音频数据」从而完成「预测、生成」等下游任务。

语音信号数字化。原始的模拟信号首先被麦克风捕捉，并由声音信号转化为电信号。接下来，电信号会由模数转换器 (Analog-to-Digital Converter, ADC) 经由采样过程转换为数字化表示。

人类可感知的声音频率范围：20 Hz - 20 kHz，声音强度范围：0 dB - 130 dB。

## 音频数据预处理

语音信号大约有三种表示方法：时域表示（时谱图）、频域表示（频谱图）、时频域表示（语谱图）。其余的表示方法都是在前三者的基础之上进行一定的变换得来。但本质不变。其中：

时域表示中，横坐标就是时间，纵坐标就是声音强度。如下：

![时域图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250305095425917.png)

/// fc
时谱图
///

频域表示中，横坐标就是频率，纵坐标就是声音强度。如下：

![频谱图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250305095426184.png)

/// fc
频谱图
///

时频域表示中，横坐标就是时间，纵坐标就是频率，声音强度通过颜色来表示。如下：

![语谱图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250305095422831.png)

/// fc
语谱图
///

## 后记