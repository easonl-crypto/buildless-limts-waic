# 无界造物节 Buildless Limits

GMI Cloud「Hi AI」全球 AI 创作季 WAIC 特别企划的移动端作品展示与投票网站，包含 AI Coding 与 AI Video 两个赛道。

## 功能

- 移动端主视觉与双赛道入口
- Coding、Video 各 5 个决赛作品
- 原生视频播放、PDF 作品详情与飞书投票跳转
- 公众号二维码及合作社区展示
- 可靠的首页返回与重复进入交互

## 本地运行

需要 Node.js 22.13 或更高版本，以及 `curl`。

```bash
npm install
npm run assets:download
npm run dev
```

打开终端显示的本地地址即可预览。

## 构建与测试

```bash
npm run lint
npm test
npm run build
```

## 素材说明

比赛视频、PDF 与视觉素材体积较大，不直接提交到 GitHub。运行 `npm run assets:download` 会从当前公开站点下载完整素材到 `public/assets/`。

也可以指定其他素材源：

```bash
ASSET_BASE_URL=https://example.com npm run assets:download
```

## 在线版本

- [网站首页](https://buildless-limits-waic.ruby-flute-4091.chatgpt.site/?v=19)
- [AI Video 赛道](https://buildless-limits-waic.ruby-flute-4091.chatgpt.site/video?v=19)

## 免费部署到 Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/easonl-crypto/buildless-limts-waic)

点击按钮后选择免费方案即可。Render 会自动安装依赖、下载比赛素材、构建并启动网站。
