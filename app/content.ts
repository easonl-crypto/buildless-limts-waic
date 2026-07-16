export type CodingWork = {
  slug: string;
  title: string;
  contestant: string;
  video: string | null;
  poster: string | null;
  pdf: string;
  voteUrl: string;
};

export type VideoWork = {
  slug: string;
  title: string;
  contestant: string;
  video: string;
  poster: string;
  pdf: string;
  voteUrl: string;
};

export const codingWorks: CodingWork[] = [
  {
    slug: "shopro",
    title: "Shopro",
    contestant: "晓叶",
    video: "/assets/videos/shopro-hq.mp4",
    poster: "/assets/posters/shopro.jpeg",
    pdf: "/assets/pdfs/shopro-complete.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnC0yiyJRsIJdZvCSKS4Kuah",
  },
  {
    slug: "cramai",
    title: "佛脚AI（CramAI）",
    contestant: "周涛",
    video: "/assets/videos/cramai-hq.mp4",
    poster: "/assets/posters/cramai-hq.webp",
    pdf: "/assets/pdfs/cramai.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnuTjyi6tc9pwvvN5sgdJFGe",
  },
  {
    slug: "offercheck",
    title: "OfferCheck",
    contestant: "王耀中",
    video: "/assets/videos/offercheck-hq.mp4",
    poster: "/assets/posters/offercheck.jpeg",
    pdf: "/assets/pdfs/offercheck.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnrNatr147fHlfl6gD7sY1Le",
  },
  {
    slug: "talentx",
    title: "TalentX",
    contestant: "许恒",
    video: "/assets/videos/talentx-hq.mp4",
    poster: "/assets/posters/talentx.jpeg",
    pdf: "/assets/pdfs/talentx.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnxiVUaBkI1x0IhkdZ3ewd7d",
  },
  {
    slug: "shadowcmo",
    title: "ShadowCMO",
    contestant: "李扬",
    video: "/assets/videos/shadowcmo-hq.mp4",
    poster: "/assets/posters/shadowcmo.jpeg",
    pdf: "/assets/pdfs/shadowcmo.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnjzDWK9AJhaKoFafAxbKrkf",
  },
];

export function findCodingWork(slug: string) {
  return codingWorks.find((work) => work.slug === slug);
}

export const videoWorks: VideoWork[] = [
  {
    slug: "zhuama",
    title: "drama抓马",
    contestant: "米洛Millom",
    video: "/assets/videos/zhuama-hq.mp4",
    poster: "/assets/posters/zhuama.webp",
    pdf: "/assets/pdfs/miluo.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnalZIH6sf3thA1f2AsaN6fz",
  },
  {
    slug: "homecoming",
    title: "等你回家",
    contestant: "小天",
    video: "/assets/videos/homecoming-hq.mp4",
    poster: "/assets/posters/homecoming.webp",
    pdf: "/assets/pdfs/xiaotian.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnQrcBAlH9uKPJatmtLOLYLb",
  },
  {
    slug: "guoguo",
    title: "怪果公社",
    contestant: "班壳",
    video: "/assets/videos/guoguo-hq.mp4",
    poster: "/assets/posters/guoguo.webp",
    pdf: "/assets/pdfs/banke.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcn7dPd6rJkaD62hiqsMZS89f",
  },
  {
    slug: "wolf",
    title: "狼",
    contestant: "ouyang",
    video: "/assets/videos/wolf-hq.mp4",
    poster: "/assets/posters/wolf.webp",
    pdf: "/assets/pdfs/ouyang.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnDOX7X2m7BO0eEZ2qfZ4JW8",
  },
  {
    slug: "yujian",
    title: "玉见：你把我的家徽画错了",
    contestant: "小智",
    video: "/assets/videos/yujian-hq.mp4",
    poster: "/assets/posters/yujian.webp",
    pdf: "/assets/pdfs/xiaozhi.pdf",
    voteUrl: "https://my.feishu.cn/share/base/form/shrcnioDb3MYwgqtAVqSnoyyTqe",
  },
];
