import { notFound } from "next/navigation";
import { codingWorks, findCodingWork } from "../../content";

export function generateStaticParams() {
  return codingWorks.map((work) => ({ slug: work.slug }));
}

export default async function PdfPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = findCodingWork(slug);

  if (!work) notFound();

  return (
    <main className="pdf-page">
      <div className="pdf-panel">
        <p className="pdf-kicker">{work.title}</p>
        <h1>查看完整作品详情</h1>
        <a className="pdf-open" href={work.pdf} target="_blank" rel="noopener noreferrer">
          打开完整 PDF
        </a>
        <a className="pdf-back" href="/coding">← 返回作品列表</a>
      </div>
    </main>
  );
}
