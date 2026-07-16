import Image from "next/image";
import { videoWorks } from "../content";

export default function VideoPage() {
  return (
    <main className="coding-page">
      <div className="coding-shell">
        <header className="coding-header">
          <h1>AI Video 赛道决赛作品</h1>
        </header>

        <section className="work-list" aria-label="AI Video 赛道决赛作品列表">
          {videoWorks.map((work, index) => (
            <article className="work-entry" key={work.slug}>
              <div className="work-heading">
                {index === 0 ? (
                  // Keep this as a native link: the hosted client router can intercept and drop the tap.
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a className="back-home-button" href="/" aria-label="返回主页面">
                    <Image
                      src="/assets/ui/back-home-original.png"
                      width={506}
                      height={500}
                      priority
                      unoptimized
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
                <h2>{work.title}</h2>
              </div>
              <div className="work-card">
                <p className="contestant">参赛选手：{work.contestant}</p>
                <div className="media-frame">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={work.poster}
                    aria-label={`${work.title} 作品视频，参赛者 ${work.contestant}`}
                  >
                    <source src={work.video} type="video/mp4" />
                  </video>
                </div>
                <a
                  className="detail-link"
                  href={work.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`打开 ${work.title} 完整作品详情 PDF`}
                >
                  作品详情
                  <Image
                    className="detail-cursor"
                    src="/assets/ui/detail-cursor-hd.png"
                    width={181}
                    height={184}
                    unoptimized
                    alt=""
                    aria-hidden="true"
                  />
                </a>
              </div>
              <a
                className="vote-button"
                href={work.voteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`为 ${work.title} 投票（在新窗口打开飞书表单）`}
              >
                <Image
                  className="vote-thumb"
                  src="/assets/ui/vote-thumb-hd.png"
                  width={216}
                  height={221}
                  unoptimized
                  alt=""
                  aria-hidden="true"
                />
                投他一票
              </a>
            </article>
          ))}
        </section>

        <footer className="community-section">
          <Image
            className="follow-qr"
            src="/assets/ui/follow-qr.webp"
            width={1409}
            height={1117}
            priority
            unoptimized
            alt="关注公众号，获取更多接入教程与实践案例"
          />
          <Image
            className="community-original"
            src="/assets/ui/community-hd.webp"
            width={1959}
            height={495}
            priority
            unoptimized
            alt="合作社区：去探索、51CTO、OpenBuild、有新、极新、机智流、SEE AI、原子社"
          />
        </footer>
      </div>
    </main>
  );
}
