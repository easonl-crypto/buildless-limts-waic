import Image from "next/image";

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-shell">
        <header className="brand-original">
          <Image
            src="/assets/ui/home-logo.webp"
            width={620}
            height={90}
            priority
            unoptimized
            alt="GMI × Happy Horse"
          />
        </header>

        <section className="hero-copy" aria-labelledby="festival-title">
          <h1 id="festival-title">无界造物节</h1>
          <p className="english-title">Buildless Limits</p>
          <div className="cloud-divider"><span>GMI Cloud</span></div>
          <p className="event-subtitle">『HI AI』全球 AI 创作季 WAIC 特别企划</p>
        </section>

        <div className="hero-art" aria-hidden="true">
          <Image
            src="/assets/ui/home-art.webp"
            width={1030}
            height={670}
            priority
            unoptimized
            alt=""
          />
        </div>

        <nav className="track-nav" aria-label="选择赛道">
          {/* Native links keep the primary routes usable even when hosted client routing is unavailable. */}
          <a className="track-button" href="/coding">
            <span>AI Coding</span><b>赛道</b>
          </a>
          <a className="track-button" href="/video">
            <span>AI Video</span><b>赛道</b>
          </a>
        </nav>
      </div>
    </main>
  );
}
