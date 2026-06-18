# BAT 摄影作品集

BAT 是一个 React + Vite 创建的个人摄影作品集网站。它的方向不是商业摄影模板，而是更接近私人摄影书、地下摄影杂志和年轻摄影艺术家的独立档案。

## 本地运行

先安装 [Node.js](https://nodejs.org/) LTS 版本，然后在项目根目录运行：

```bash
npm install
npm run dev
```

浏览器打开终端里显示的地址，通常是 `http://localhost:5173`。

## 替换照片

示例图片位于：

```text
public/photos/
```

把自己的图片放进去，再修改：

```text
src/data/photos.js
```

每张作品支持标题、年份、地点、拍摄方式、分类和图片尺寸。建议保留高清原图，同时为网页另存一份压缩版，单张控制在 300KB 到 1.5MB 之间会更适合手机浏览。

## 生成占位图片

项目自带一个本地脚本，会生成黑白、高反差、胶片噪点风格的 PNG 占位图：

```bash
npm run generate:photos
```

这些图片是程序化生成的示例资产，不来自任何摄影师作品。

## 构建生产版本

```bash
npm run build
```

构建产物会生成到：

```text
dist/
```

本地预览生产版本：

```bash
npm run preview
```

## 上传 GitHub

如果你的电脑还没有 Git，先安装 [Git](https://git-scm.com/)。

```bash
git init
git add .
git commit -m "Create BAT photography portfolio"
git branch -M main
git remote add origin https://github.com/你的用户名/bat-photography-archive.git
git push -u origin main
```

推送前需要先在 GitHub 新建一个空仓库，名字可以叫 `bat-photography-archive`。

## 免费部署

推荐三种免费方式：

### Vercel

1. 打开 [vercel.com](https://vercel.com/)
2. 使用 GitHub 登录
3. 选择这个仓库导入
4. Framework Preset 选择 `Vite`
5. Build Command 使用 `npm run build`
6. Output Directory 使用 `dist`

部署后会得到一个公开网址，手机和电脑都可以访问。

### Netlify

1. 打开 [netlify.com](https://www.netlify.com/)
2. 使用 GitHub 登录
3. Add new site from Git
4. 选择仓库
5. Build command 填 `npm run build`
6. Publish directory 填 `dist`

### GitHub Pages

如果想用 GitHub Pages，需要额外配置部署 Action。对于 Vite 项目，Vercel 或 Netlify 更省心。

## 设计方向

- 黑色背景
- 灰白文字
- 非对称图片排版
- 胶片噪点覆盖
- 克制视差动效
- 分类作品索引
- 沉浸式图片查看
- 艺术家声明式 About 页面
- 响应式移动端体验

## 继续定制

主要修改位置：

- `src/data/photos.js`：作品数据
- `src/styles/global.css`：整体视觉风格
- `src/components/`：页面组件
- `public/photos/`：摄影图片
