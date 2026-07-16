import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function pngDimensions(pathname) {
  const png = await readFile(new URL(pathname, import.meta.url));
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  return [png.readUInt32BE(16), png.readUInt32BE(20)];
}

test("renders development preview metadata", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("homepage renders native title content and both approved track entrances", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /无界造物节/);
  assert.match(html, /Buildless Limits/);
  assert.doesNotMatch(html, /class=["']home-visual["']/);
  assert.match(html, /\/assets\/ui\/home-logo\.webp/);
  assert.match(html, /\/assets\/ui\/home-art\.webp/);
  assert.doesNotMatch(html, /brand-lockup/);
  assert.doesNotMatch(html, /art-glint/);
  assert.match(html, /href=["']\/coding["']/);
  assert.match(html, /href=["']\/video["']/);
});

test("track entrances use native links so returning home never leaves the routes inert", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(source, /<a className="track-button" href="\/coding">/);
  assert.match(source, /<a className="track-button" href="\/video">/);
  assert.doesNotMatch(source, /import Link from "next\/link"/);
});

test("coding page renders native cards, five videos, and five direct PDF links", async () => {
  const response = await render("/coding");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    html,
    /<article[^>]*class=["']work-entry["'][^>]*><div[^>]*class=["']work-heading["']><a(?=[^>]*href=["']\/["'])(?=[^>]*class=["']back-home-button["'])(?=[^>]*aria-label=["']返回主页面["'])[^>]*>/,
  );
  assert.match(html, /\/assets\/ui\/back-home-original\.png/);
  assert.doesNotMatch(html, /coding-page\.jpeg/);
  assert.match(html, /Shopro/);
  assert.match(html, /佛脚AI（CramAI）/);
  assert.match(html, /OfferCheck/);
  assert.match(html, /TalentX/);
  assert.match(html, /ShadowCMO/);
  assert.equal((html.match(/<video\b/g) ?? []).length, 5);
  assert.match(html, /\/assets\/videos\/shopro-hq\.mp4/);
  assert.match(html, /\/assets\/videos\/cramai-hq\.mp4/);
  assert.match(html, /\/assets\/videos\/offercheck-hq\.mp4/);
  assert.match(html, /\/assets\/videos\/talentx-hq\.mp4/);
  assert.match(html, /\/assets\/videos\/shadowcmo-hq\.mp4/);
  const pdfLinks = [
    ...html.matchAll(
      /<a[^>]*class=["']detail-link["'][^>]*href=["'](\/assets\/pdfs\/[^"']+)["'][^>]*target=["']_blank["']/g,
    ),
  ].map((match) => match[1]);
  assert.equal(new Set(pdfLinks).size, 5);
  assert.match(html, /\/assets\/pdfs\/shopro-complete\.pdf/);
  assert.match(html, /\/assets\/ui\/detail-cursor-hd\.png/);
  assert.match(html, /\/assets\/ui\/vote-thumb-hd\.png/);
  assert.match(html, /\/assets\/ui\/follow-qr\.webp/);
  assert.match(html, /\/assets\/ui\/community-hd\.webp/);
  const footer = html.match(
    /<footer[^>]*class=["']community-section["'][^>]*>([\s\S]*?)<\/footer>/,
  )?.[1] ?? "";
  assert.ok(
    footer.indexOf("/assets/ui/follow-qr.webp") <
      footer.indexOf("/assets/ui/community-hd.webp"),
  );
  assert.match(html, /width=["']1959["'][^>]*height=["']495["']/);
  assert.match(
    html,
    /<link[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*community-hd\.webp[^>]*fetchPriority=["']high["']/,
  );
  assert.match(
    html,
    /<link[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*follow-qr\.webp[^>]*fetchPriority=["']high["']/,
  );
  assert.equal((html.match(/<video[^>]*preload=["']auto["']/g) ?? []).length, 0);
  assert.equal((html.match(/<video[^>]*preload=["']metadata["']/g) ?? []).length, 5);
  assert.match(html, /\/assets\/posters\/cramai-hq\.webp/);
  assert.doesNotMatch(html, /data-media-warmup/);
  assert.doesNotMatch(html, /♡|↗/);
  const voteLinks = [
    "https://my.feishu.cn/share/base/form/shrcnC0yiyJRsIJdZvCSKS4Kuah",
    "https://my.feishu.cn/share/base/form/shrcnuTjyi6tc9pwvvN5sgdJFGe",
    "https://my.feishu.cn/share/base/form/shrcnrNatr147fHlfl6gD7sY1Le",
    "https://my.feishu.cn/share/base/form/shrcnxiVUaBkI1x0IhkdZ3ewd7d",
    "https://my.feishu.cn/share/base/form/shrcnjzDWK9AJhaKoFafAxbKrkf",
  ];
  for (const voteLink of voteLinks) {
    assert.match(
      html,
      new RegExp(
        `<a(?=[^>]*class=["']vote-button["'])(?=[^>]*href=["']${voteLink}["'])(?=[^>]*target=["']_blank["'])[^>]*>`,
      ),
    );
  }
  assert.doesNotMatch(html, /<button[^>]*class=["']vote-button["'][^>]*disabled/);
});

test("return control uses a native anchor so client routing cannot swallow the tap", async () => {
  const source = await readFile(
    new URL("../app/coding/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    source,
    /<a className="back-home-button" href="\/" aria-label="返回主页面">/,
  );
  assert.doesNotMatch(source, /import Link from "next\/link"/);
});

test("video page renders five native work cards with videos, PDFs, votes, and a reliable return", async () => {
  const response = await render("/video");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /AI Video 赛道决赛作品/);
  assert.match(
    html,
    /<article[^>]*class=["']work-entry["'][^>]*><div[^>]*class=["']work-heading["']><a(?=[^>]*href=["']\/["'])(?=[^>]*class=["']back-home-button["'])(?=[^>]*aria-label=["']返回主页面["'])[^>]*>/,
  );
  assert.deepEqual(
    ["抓马", "等你回家", "怪果公社", "狼", "玉见：你把我的家徽画错了"].map(
      (title) => html.includes(title),
    ),
    [true, true, true, true, true],
  );
  assert.equal((html.match(/<video\b/g) ?? []).length, 5);
  for (const filename of ["zhuama-hq.mp4", "homecoming-hq.mp4", "guoguo-hq.mp4", "wolf-hq.mp4", "yujian-hq.mp4"]) {
    assert.match(html, new RegExp(`/assets/videos/${filename}`));
  }
  for (const filename of ["miluo.pdf", "xiaotian.pdf", "banke.pdf", "ouyang.pdf", "xiaozhi.pdf"]) {
    assert.match(html, new RegExp(`/assets/pdfs/${filename}`));
  }
  for (const voteUrl of [
    "https://my.feishu.cn/share/base/form/shrcnalZIH6sf3thA1f2AsaN6fz",
    "https://my.feishu.cn/share/base/form/shrcnQrcBAlH9uKPJatmtLOLYLb",
    "https://my.feishu.cn/share/base/form/shrcn7dPd6rJkaD62hiqsMZS89f",
    "https://my.feishu.cn/share/base/form/shrcnDOX7X2m7BO0eEZ2qfZ4JW8",
    "https://my.feishu.cn/share/base/form/shrcnioDb3MYwgqtAVqSnoyyTqe",
  ]) {
    assert.match(html, new RegExp(voteUrl));
  }
  assert.match(html, /\/assets\/ui\/follow-qr\.webp/);
  assert.match(html, /\/assets\/ui\/community-hd\.webp/);
  assert.doesNotMatch(html, /内容准备中/);
});

test("follow prompt is centered at fifty percent width", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const rule = css.match(/\.follow-qr\s*\{([\s\S]*?)\}/)?.[1] ?? "";

  assert.match(rule, /width:\s*50%/);
  assert.match(rule, /margin-inline:\s*auto/);
});

test("legacy PDF detail route never embeds a one-page iframe", async () => {
  const response = await render("/pdf/offercheck");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /\/assets\/pdfs\/offercheck\.pdf/);
  assert.match(html, /href=["']\/coding["']/);
  assert.match(html, /返回作品列表/);
  assert.doesNotMatch(html, /<iframe\b/);
});

test("restored Shopro PDF keeps every intermediate page", async () => {
  const response = await render("/coding");
  const html = await response.text();
  const pdf = await stat(
    new URL("../public/assets/pdfs/shopro-complete.pdf", import.meta.url),
  );

  assert.equal(response.status, 200);
  assert.match(html, /href=["']\/assets\/pdfs\/shopro-complete\.pdf["']/);
  assert.ok(pdf.size < 5_500_000);
});

test("supplied interface artwork remains high resolution", async () => {
  assert.deepEqual(
    await pngDimensions("../public/assets/ui/community-hd.png"),
    [1959, 495],
  );
  assert.deepEqual(
    await pngDimensions("../public/assets/ui/detail-cursor-hd.png"),
    [181, 184],
  );
  assert.deepEqual(
    await pngDimensions("../public/assets/ui/vote-thumb-hd.png"),
    [216, 221],
  );
});

test("large display assets stay lightweight", async () => {
  const homeArt = await stat(new URL("../public/assets/ui/home-art.webp", import.meta.url));
  const community = await stat(
    new URL("../public/assets/ui/community-hd.webp", import.meta.url),
  );
  const followQr = await stat(
    new URL("../public/assets/ui/follow-qr.webp", import.meta.url),
  );
  assert.ok(homeArt.size < 100_000);
  assert.ok(community.size < 100_000);
  assert.ok(followQr.size < 100_000);
});

test("videos retain their high-quality sources and fast-start metadata", async () => {
  const sizeRanges = {
    "shopro-hq.mp4": [3_400_000, 3_900_000],
    "cramai-hq.mp4": [3_000_000, 20_000_000],
    "talentx-hq.mp4": [6_500_000, 7_200_000],
    "shadowcmo-hq.mp4": [2_400_000, 2_800_000],
    "offercheck-hq.mp4": [1_500_000, 1_900_000],
  };

  for (const [filename, [minimum, maximum]] of Object.entries(sizeRanges)) {
    const video = await readFile(
      new URL(`../public/assets/videos/${filename}`, import.meta.url),
    );
    assert.ok(video.length > minimum, `${filename} is not the HQ source`);
    assert.ok(video.length < maximum, `${filename} exceeds ${maximum} bytes`);
    assert.ok(video.indexOf("moov") < video.indexOf("mdat"));
  }
});
