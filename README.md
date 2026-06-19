# BAT 摄影与私人文本档案

BAT 使用 React + Vite 构建，照片是视觉档案，`蝙蝠小脑袋在想什么？` 是由 Decap CMS 管理的私人文本页。

## 本地运行

```bash
npm install
npm run dev
```

打开终端显示的地址，通常是 `http://localhost:5173`。

## 私人诗歌系统如何工作

- 后台地址：`https://你的网站域名/admin/`
- 内容目录：`src/content/thoughts/`
- 后台发布后，Decap CMS 会把文章作为 JSON 文件提交到 GitHub。
- Netlify 检测到 GitHub 更新后重新构建网站。
- 前台在构建时读取全部文章，并按日期倒序显示。
- 正文使用纯文本保存，换行、空行和段首空格会原样保留。
- 网站没有评论、注册或投稿功能。

## 第一次启用后台

这些设置只需做一次：

1. 确保 Netlify 站点连接到本项目的 GitHub 仓库。
2. 进入 Netlify 中该站点的设置，启用 **Identity**。
3. 把 Identity 的注册方式设为 **Invite only / 仅邀请**。不要开放公开注册。
4. 在 Identity 的服务设置中启用 **Git Gateway**。
5. 在 Identity 用户页面选择 **Invite users**，只邀请你自己的邮箱。
6. 打开邀请邮件并完成密码设置。
7. 访问 `https://你的网站域名/admin/`，使用该邮箱登录。

任何人都可以看到 `/admin/` 的登录页面，但只有被邀请的账号拥有登录和写入仓库的权限。

## 发布第一首诗

1. 登录 `/admin/`。
2. 打开 `蝙蝠小脑袋在想什么？`。
3. 点击 `新建一页私人文本`。
4. 填写标题、日期和类型。
5. 标签可以留空，也可以填写多个。
6. 在正文框中直接输入诗歌。需要空行时按两次回车，段首空格可以直接输入。
7. 点击 `发布`。
8. 等待 Netlify 自动部署完成，前台 `#thoughts` 页面会出现新内容。

## 部署或更新到 Netlify

先确认构建通过：

```bash
npm run build
```

然后提交并推送源代码：

```bash
git add .
git commit -m "add private writing archive"
git push origin main
```

如果 Netlify 已连接该 GitHub 仓库，推送后会自动运行 `npm run build`，并发布 `dist/`。CMS 必须使用 GitHub 自动部署；只手动拖入 `dist/` 无法让后台把新文章持续写回源代码。

## 主要文件

- `public/admin/index.html`：Decap CMS 后台入口。
- `public/admin/config.yml`：后台字段、权限后端和内容目录配置。
- `src/content/thoughts/`：每一篇私人文本的源文件。
- `src/data/thoughts.js`：读取并按日期排序内容。
- `src/components/Thoughts.jsx`：私人诗集前台页面。
- `src/data/photos.js`：照片资料和项目序列。
- `src/styles/global.css`：全站视觉与响应式样式。
- `netlify.toml`：Netlify 构建配置。
