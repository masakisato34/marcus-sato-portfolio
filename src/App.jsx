import { LINKS, samples, voiceGroups, works, homeFaqKeys, useCasePages, HOME, SITE_URL } from "./data.js";
import { useSamplePlayer, SampleRow, Header, UseCaseLinks, Services, Faq, FaqJsonLd, Contact, Footer } from "./components.jsx";

// Fixed heights so the server and client render the same markup.
const WAVE = [22, 38, 64, 48, 90, 120, 84, 150, 110, 70, 132, 176, 128, 96, 150, 104, 66, 118, 82, 50, 72, 40, 28];

export const ROUTES = ["/", ...Object.keys(useCasePages)];

export function normalizePath(url) {
  const path = (url || "/").split(/[?#]/)[0];
  return path.endsWith("/") ? path : `${path}/`;
}

// Per-page <head> values used by the prerender step.
export function getHead(url) {
  const path = normalizePath(url);
  const page = useCasePages[path];
  return {
    title: page ? page.title : HOME.title,
    description: page ? page.description : HOME.description,
    canonical: `${SITE_URL}${path}`,
  };
}

function Hero({ player }) {
  return (
    <header className="hero">
      <div className="container hero__grid">
        <div>
          <h1>
            <span className="hero__role">地上波CM・TV番組のナレーター</span>
            <span className="hero__name-en">Marcus Sato</span>
            <span className="hero__name-ja">マーカス佐藤</span>
          </h1>
          <p className="hero__lead">信頼の中低音で、<br />企業VP・CM・ドキュメンタリーに<span className="nowrap">説得力を。</span></p>
          <p className="hero__tagline">感情と知性が交差する声で、あなたのコンテンツに命を吹き込む。</p>
          <div className="hero__actions">
            <button type="button" className="btn btn--gold" onClick={() => player.toggle("vp-sincere")}>
              {player.current === "vp-sincere" ? "❚❚ 再生中" : "▶ 声を聴く（16秒）"}
            </button>
            <a className="btn btn--ghost" href="#contact">ご依頼・ご相談</a>
          </div>
          <a className="badge" href={LINKS.coconalaNarration} target="_blank" rel="noopener noreferrer">
            <span className="badge__star">★ 5.0</span>
            <span className="badge__text">ココナラ評価 25件すべて星5</span>
            <span className="badge__note">（2026年9月時点）</span>
          </a>
        </div>
        {/* Placeholder until a portrait photo is ready */}
        <div className={`wave${player.current ? " is-playing" : ""}`} aria-hidden="true">
          {WAVE.map((h, i) => (
            <i key={i} style={{ height: `${Math.round((h / 176) * 100)}%`, animationDelay: `${(i % 7) * 0.12}s` }} />
          ))}
        </div>
      </div>
    </header>
  );
}

function Home({ player }) {
  return (
    <>
      <Hero player={player} />
      <main>
        <section className="section section--tint" id="voice">
          <div className="container">
            <p className="eyebrow">Voice</p>
            <h2 className="h2">スタイル別ボイスサンプル</h2>
            <p className="lead">男性ナレーター・マーカス佐藤の声を、用途別にお聴きいただけます。「このトーンで」というご指定も歓迎です。</p>
            <div className="voice-grid">
              {voiceGroups.map((g) => (
                <div key={g.title} className="voice-card">
                  <h3 className="voice-card__title">{g.title}</h3>
                  <p className="voice-card__desc">{g.desc}</p>
                  {g.ids.map((id) => <SampleRow key={id} id={id} player={player} />)}
                  {g.page && <a className="voice-card__more" href={g.page}>この用途のくわしい案内 →</a>}
                </div>
              ))}
            </div>
            <p className="voice-more">
              まとめて聴く：
              <a href={LINKS.narrationSample} target="_blank" rel="noopener noreferrer">ナレーションサンプル（YouTube）→</a>
              <a href={LINKS.voiceSample} target="_blank" rel="noopener noreferrer">ボイスサンプル（YouTube）→</a>
            </p>
          </div>
        </section>

        <section className="section" id="works">
          <div className="container">
            <p className="eyebrow">Works</p>
            <h2 className="h2">主な実績</h2>
            <p className="lead">地上波CM・TV番組・官公庁映像のナレーションを担当してきました。</p>
            <div className="works">
              {works.map((group) => (
                <div key={group.category}>
                  <h3 className="works__cat">{group.category}</h3>
                  {group.items.map((item) => (
                    <div key={item.title} className="works__item">
                      <div className="works__title">{item.title}</div>
                      {item.description && <p className="works__desc">{item.description}</p>}
                      {item.url && <a className="works__link" href={item.url} target="_blank" rel="noopener noreferrer">▶ 視聴する →</a>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tint" id="services">
          <div className="container">
            <p className="eyebrow">Services</p>
            <h2 className="h2">ご依頼の窓口</h2>
            <p className="lead">ココナラ・ランサーズからもご依頼いただけます。料金の詳細・評価は各ページをご覧ください。</p>
            <Services />
            <h3 className="subhead">用途別のご案内</h3>
            <UseCaseLinks />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">よくある質問</h2>
            <Faq keys={homeFaqKeys} />
            <FaqJsonLd keys={homeFaqKeys} />
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}

function UseCase({ page, player }) {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="breadcrumb"><a href="/">ホーム</a> ／ {page.h1}</p>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="page-hero__title">{page.h1}</h1>
          <p className="page-hero__lead">{page.lead}</p>
          <div className="hero__actions">
            <button type="button" className="btn btn--gold" onClick={() => player.toggle(page.sampleIds[0])}>
              {player.current === page.sampleIds[0] ? "❚❚ 再生中" : `▶ 声を聴く（${samples[page.sampleIds[0]].len.replace("0:", "")}秒）`}
            </button>
            <a className="btn btn--ghost" href="#contact">ご依頼・ご相談</a>
          </div>
        </div>
      </header>
      <main>
        <section className="section section--tint">
          <div className="container page-grid">
            <div>
              <h2 className="h2">こんな映像に</h2>
              <ul className="checklist">
                {page.forList.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="voice-card">
              <h2 className="voice-card__title">ボイスサンプル</h2>
              <p className="voice-card__desc">その場で再生できます。</p>
              {page.sampleIds.map((id) => <SampleRow key={id} id={id} player={player} />)}
            </div>
          </div>
        </section>

        {page.works && (
          <section className="section">
            <div className="container">
              <h2 className="h2">実績・作例</h2>
              {page.works.map((w) => (
                <div key={w.title} className="works__item">
                  <div className="works__title">{w.title}</div>
                  {w.description && <p className="works__desc">{w.description}</p>}
                  {w.url && <a className="works__link" href={w.url} target="_blank" rel="noopener noreferrer">▶ 視聴する →</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={`section${page.works ? " section--tint" : ""}`}>
          <div className="container">
            <h2 className="h2">進め方</h2>
            <ol className="steps">
              {page.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
            <div className="page-links">
              {page.links.map((l) => (
                <a key={l.url} className="btn btn--ghost" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="h2">よくある質問</h2>
            <Faq keys={page.faqKeys} />
            <FaqJsonLd keys={page.faqKeys} />
            <h3 className="subhead">ほかの用途</h3>
            <UseCaseLinks />
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}

export default function App({ url }) {
  const player = useSamplePlayer();
  const page = useCasePages[normalizePath(url)];
  return (
    <>
      <Header />
      {page ? <UseCase page={page} player={player} /> : <Home player={player} />}
      <Footer />
    </>
  );
}
