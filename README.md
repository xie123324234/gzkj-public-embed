# WeKnora 公共嵌入聊天页

这是一个适用于 Cloudflare Pages 的静态外壳，只展示 WeKnora 已有的网页嵌入聊天页。聊天、知识库检索和模型调用仍由 WeKnora 后端完成；本项目不包含 WeKnora 后端、模型密钥或数据库。

## 连接 WeKnora

1. 先把本仓库连接到 Cloudflare Pages，项目名建议使用 **weknora-public-embed**。
2. Cloudflare Pages 的构建设置：
   - Framework preset：None
   - Build command：留空
   - Build output directory：public
3. 部署一次，确认最终公开地址，例如 https://weknora-public-embed.pages.dev。
4. 在 WeKnora 的网页嵌入渠道中，把该站点的完整 Origin 填入“域名白名单”，例如 https://weknora-public-embed.pages.dev。这里填写的是宿主网页地址。
5. 确保 WeKnora 的嵌入页面和聊天接口也有外网可访问的 HTTPS 地址。然后在 WeKnora 管理页面复制 iframe 代码，只取 src 属性中的完整地址。
6. 把这个完整地址填入 public/config.js 的 WEKNORA_EMBED_URL，提交并推送到 GitHub。Cloudflare Pages 会自动重新部署。
7. 用手机关闭公司 Wi-Fi 后打开 Pages 地址，确认匿名聊天可用。

示例配置：

    window.WEKNORA_EMBED_URL =
      "https://weknora.example.com/embed/YOUR_CHANNEL_ID#token=YOUR_PUBLIC_EMBED_TOKEN";

public/config.example.js 只用于说明格式，不会被页面加载。实际使用时修改 public/config.js。

## 外网连接和访问范围

- Pages 地址只是访客打开的网页。它不会自动把盒子里的 WeKnora 服务发布到公网。
- 盒子需要通过 Cloudflare Tunnel 或其他受控方式提供 WeKnora 嵌入页面与聊天接口。嵌入地址必须指向可访问的公网 HTTPS 主机，不能使用 192.168.x.x、localhost 或开发服务器地址。
- 只开放嵌入聊天需要的路由；WeKnora 管理后台和管理 API 不应因嵌入站点而一并公开。上线前应核对实际请求路由和代理规则。
- WeKnora 域名白名单限制允许显示嵌入页的宿主 Origin，不等同于用户身份验证，也不能替代请求限流。
- 免登录表示拿到页面的人都可以发起提问。匿名渠道的嵌入令牌会出现在浏览器可访问的页面配置中，应将其视为公开令牌。请只开放合适的知识库和功能，并从较低的调用限额开始。

## 本地预览

无需安装依赖。在项目目录运行：

    python -m http.server 4173 --directory public

打开 http://localhost:4173。页面未配置时会显示配置提示；配置为真实 HTTPS 嵌入地址后，页面会全屏展示 WeKnora 聊天界面。