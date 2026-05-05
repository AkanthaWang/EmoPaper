# 📊 情感图像分析时间线与博客系统

## 🧠 项目简介

本项目是一个用于**情感计算（Affective Computing）领域的研究可视化与知识管理系统**，用于系统整理情感图像分析领域的发展脉络，并支持未来扩展到情感视频分析任务。

---

## 🎯 项目目标

本项目旨在解决情感计算领域研究碎片化问题，构建一个结构化的可视化知识系统：

### ✅ 1. 多维时间线浏览

支持不同研究维度的独立演进分析：

* 数据集（Dataset）
* 方法（Method）
* 评估基准（Benchmark）

👉 后续可扩展：

* 情感视频分析（Video-based Affective Computing）

---

### ✅ 2. 结构化论文展示系统

* 卡片式论文浏览
* 按年份自动分组
* 按类型动态筛选
* 支持模态扩展（Image / Video）

---

### ✅ 3. 深度论文解析系统

* 博客式论文解读
* 方法结构分析
* 数据集构建说明
* Benchmark 设计解析

---

### ✅ 4. 可扩展知识架构

* JSON 驱动数据层
* 组件化前端结构
* 支持多模态扩展（Image → Video）

---

# 🧠 设计原则（新增⭐重点）

本系统遵循以下设计原则：

### 1️⃣ 数据驱动 UI（Data-driven UI）

所有论文信息统一由 JSON 控制，而非硬编码

---

### 2️⃣ 视图与内容解耦

* Vue：负责结构化浏览与交互
* Docusaurus：负责深度内容表达

---

### 3️⃣ 多模态分离（重要升级）

当前系统支持：

| 模态                  | 状态     |
| ------------------- | ------ |
| Image-based Emotion | ✔      |
| Video-based Emotion | 🔜 可扩展 |

---

### 4️⃣ 渐进式信息展示

* Timeline（概览）
* Card（摘要）
* Blog（深度）

---

# 🏗️ 系统架构

```text id="arch-final"
                        ┌────────────────────────────┐
                        │   Docusaurus 博客系统     │
                        │   （深度论文解析）        │
                        │  - Markdown 文章          │
                        │  - 方法/数据集分析        │
                        │  - Benchmark 解读         │
                        └────────────┬──────────────┘
                                     ↑ 链接跳转
                                     │
┌────────────────────────────────────┴────────────────────────────┐
│                    Vue 时间线系统（主系统）                     │
│  - Dataset / Method / Benchmark 三视图                          │
│  - 卡片式论文浏览                                               │
│  - 年份分组                                                     │
│  - 标签筛选                                                     │
│  - 模态扩展（Image / Video）                                    │
└─────────────────────────────────────────────────────────────────┘
                                     │
                             JSON 数据层（统一管理）
```

---

# 🧰 技术栈

## 前端系统

* Vue.js（Vue 3）
* Vite
* 可选状态管理：Pinia
* 可选路由系统：Vue Router

---

## 博客系统

* Docusaurus
* Markdown 内容驱动
* 静态站点生成（SSG）

---

## 数据层

* JSON 结构化数据
* 无需后端

---

# 📁 项目结构

```text id="structure-final"
emotion-timeline-project/
│
├── timeline-app/                 # Vue 主应用
│   ├── src/
│   │   ├── data/
│   │   │     └── papers.json     # ⭐统一数据源
│   │   │
│   │   ├── components/
│   │   │     ├── Timeline.vue
│   │   │     ├── YearSection.vue
│   │   │     ├── PaperCard.vue
│   │   │     ├── PaperDetail.vue
│   │   │     └── Tabs.vue
│   │   │
│   │   ├── views/
│   │   │     └── Home.vue
│   │   └── main.js
│   │
│   └── vite.config.js
│
├── docs-site/                    # Docusaurus 博客系统
│   ├── blog/
│   │     ├── image/
│   │     ├── video/
│   │     ├── affectnet.md
│   │     └── deepemotionnet.md
│   │
│   ├── docusaurus.config.js
│   └── sidebars.js
│
└── README.md
```

---

# 📦 数据结构规范（增强版）

```json id="data-final"
{
  "id": "affectnet",
  "title": "AffectNet",
  "fullTitle": "AffectNet: A Database for Facial Expression, Valence, and Arousal Computing in the Wild",
  "acronym": "AN",

  "year": 2017,
  "type": "Dataset",

  "modality": "image",

  "tags": ["FER", "Image"],
  "contribution": "大规模面部表情数据集",

  "blog": {
    "enabled": true,
    "slug": "/blog/affectnet-review"
  }
}
```

---

# 🔄 系统运行流程

## 1️⃣ 时间线浏览（Vue）

* 选择模态（Image / Video）
* 选择类型（Dataset / Method / Benchmark）
* 自动按年份分组展示

---

## 2️⃣ 论文卡片展示

包含：

* 标题（title + acronym）
* 年份
* 标签
* 简要贡献
* 博客入口

---

## 3️⃣ 深度阅读（Docusaurus）

进入：

* 方法分析
* 数据集解析
* Benchmark 对比
* 实验结果解读

---

# 🎨 项目核心特点（增强版）

## 📊 1. 多模态时间线系统（扩展能力）

* Image-based Emotion Analysis
* Video-based Emotion Analysis（可扩展）

---

## 🧠 2. 结构化知识体系

* JSON 驱动
* 强一致数据结构

---

## 📝 3. 双层知识系统

* Vue：结构化浏览
* Docusaurus：深度理解

---

## 🔗 4. 解耦架构设计

* 前端展示层独立
* 内容系统独立

---

# 🚀 启动方式

```bash
# Vue系统
cd timeline-app
npm install
npm run dev
```

```bash
# 博客系统
cd docs-site
npm install
npm run start
```

---

# 🔮 未来扩展方向（升级版）

* 🔍 多标签组合筛选系统
* 📊 Benchmark 自动排行可视化
* 🔗 论文引用关系图谱
* 🎬 情感视频分析时间线（Video branch）
* 🤖 AI 自动论文摘要生成
* 🌐 在线数据库接入（API化）

---

# 📌 项目总结

本项目构建了一个面向情感计算领域的**双层知识系统架构**：

* Vue 负责构建**结构化时间线浏览系统**
* Docusaurus 负责构建**深度学术知识解析系统**

同时支持从**图像情感分析 → 视频情感分析**的扩展演进路径，形成一个可持续扩展的研究知识平台。

