# EmoPaper

EmoPaper 是一个基于 Vue 3 和 Vite 的情感计算论文展示项目，用于将数据集、方法、基准和扩展文章组织成可视化时间线与阅读页面，方便浏览、筛选和持续补充内容。

在线地址：

- https://akanthawang.github.io/EmoPaper/

## 项目功能

- 以时间线形式浏览情感计算相关论文
- 按论文类型和模态进行筛选
- 在右侧面板查看论文摘要信息
- 通过 Markdown 文章页进行深入阅读
- 使用 GitHub Actions 自动部署到 GitHub Pages

## 技术栈

- Vue 3
- Vite
- JSON 静态数据
- Markdown 文章
- GitHub Pages

## 项目结构

```text
EmoPaper/
|- src/
|  |- components/
|  |- composables/
|  |- views/
|  |  `- Home.vue
|  `- main.js
|- public/
|  |- blog/
|  |  |- viewer.html
|  |  `- *.md
|  |- data/
|  |  `- papers.json
|  `- img/
|- .github/
|  `- workflows/
|     `- deploy.yml
|- vite.config.js
`- README.md
```

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

执行构建：

```bash
npm run build
```

## 部署说明

当前项目已经配置为通过 GitHub Pages 自动发布。

部署流程如下：

1. 将修改推送到 `master` 分支
2. GitHub Actions 自动执行 `.github/workflows/deploy.yml`
3. 工作流执行 `npm ci` 和 `npm run build`
4. 构建产物 `dist/` 自动发布到 GitHub Pages
5. 页面发布地址为 `https://akanthawang.github.io/EmoPaper/`

项目中的 Vite 基础路径配置为：

```js
base: '/EmoPaper/'
```

这样配置的原因是该站点并不是部署在域名根路径，而是部署在仓库子路径 `/EmoPaper/` 下。

## 如何新增论文内容

如果你要新增一条论文卡片，以及对应的 `Read More` 阅读页面，需要补充论文数据和文章内容。

### 1. 添加论文数据

只需要修改这个文件：

- `public/data/papers.json`

新增一条类似下面的记录：

```json
{
  "id": "new-paper",
  "title": "New Paper",
  "fullTitle": "New Paper Full Title",
  "acronym": "NP",
  "year": 2026,
  "type": "Method",
  "modality": "image",
  "tags": ["FER", "Image"],
  "contribution": "这里填写论文贡献简介。",
  "blog": {
    "enabled": true,
    "slug": "/blog/new-paper"
  },
  "venue": "CVPR 2026"
}
```

### 2. 添加文章内容

在下面这个位置新建 Markdown 文件：

- `public/blog/new-paper.md`

示例内容：

```md
---
title: New Paper Analysis
---

# New Paper Analysis

## 简介

在这里写论文背景和核心问题。

## 方法

在这里写方法结构和思路。

## 结果

在这里写实验结果、图表说明或阅读笔记。
```

### 3. 这些名字必须一致

- `id`：`new-paper`
- `blog.slug`：`/blog/new-paper`
- Markdown 文件名：`public/blog/new-paper.md`

如果这三个地方不一致，`Read More` 将无法正确打开对应文章。

## 当前维护注意事项

当前项目已经统一为单一数据源：

- `public/data/papers.json`

它同时供以下两个部分使用：

- Vue 主页面
- `viewer.html` 文章阅读页

因此你后续新增、删除或修改论文时，只需要维护这一份数据即可。

## 后续可继续优化

- 统一 Markdown 和文章文件编码，避免中文乱码
- 增加新增论文模板，降低补充内容成本
- 增强搜索、标签统计和筛选体验
