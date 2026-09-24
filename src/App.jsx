import { useEffect, useRef, useState } from "react";

// Title, meta, OGP and JSON-LD live in index.html so crawlers see them without running JS.

const COCONALA_NARRATION = "https://coconala.com/services/3195170";

const voiceGroups = [
  {
    title: "企業VP・会社紹介",
    desc: "信頼感と誠実さを大切にした、落ち着いた中低音の語り。",
    samples: [
      { id: "vp-sincere", title: "企業VP｜誠実なトーン", len: "0:16" },
      { id: "vp-brand", title: "企業VP｜ブランドイメージ", len: "0:23" },
      { id: "vp-era", title: "企業VP｜「変わりゆく時代の中で」", len: "0:19" },
    ],
  },
  {
    title: "ドキュメンタリー・重厚な語り",
    desc: "映像に寄り添い、余韻を残す深い語り。",
    samples: [
      { id: "documentary", title: "ドキュメンタリー", len: "0:20" },
      { id: "deep-richness", title: "渋いトーン｜「真の豊かさとは」", len: "0:21" },
    ],
  },
  {
    title: "CM・商品紹介",
    desc: "明るく、聞き取りやすく、商品の魅力をまっすぐ届ける語り。",
    samples: [
      { id: "bright", title: "明るいトーン", len: "0:13" },
      { id: "cm-cosmetics", title: "化粧品CM（自主制作の作例）", len: "0:13" },
    ],
  },
  {
    title: "教材・案内・ごあいさつ",
    desc: "内容が自然に頭に入る、やわらかく明瞭な語り。",
    samples: [
      { id: "education", title: "教材・解説", len: "0:18" },
      { id: "greeting", title: "冒頭のごあいさつ", len: "0:14" },
    ],
  },
];

const works = [
  {
    category: "TV",
    items: [
      { title: "CS チャンネル銀河『なつかしのアニメ・特撮の旅』", description: "メインナレーション（杉田かおる × ウルトラマン、涼風真世 × ベルサイユのばら ほか全6回）", url: null },
      { title: "テレビユー福島「ふくしまSHOW」ラーメン図鑑 ナレーション（レギュラー）", url: null },
    ],
  },
  {
    category: "TVCM",
    items: [
      { title: "オートレース公式重勝式 CMナレーション", url: "https://youtu.be/U9n5zRReWkQ" },
      { title: "「うまか亭」CMナレーション", url: "https://youtu.be/KQT_NtTqnmU" },
    ],
  },
  {
    category: "Public",
    items: [
      { title: "文化庁100年フード「福島市 円盤餃子」ナレーション", url: "https://youtu.be/t3y1szdgOqk" },
    ],
  },
  {
    category: "Store / Live",
    items: [
      { title: "ダイエー「一の市」ナレーション", url: null },
      { title: "アイドルグループ「Bety」ワンマンライブ OPナレーション", url: "https://youtu.be/nJ4hh3fiwyU" },
    ],
  },
];

const services = [
  {
    title: "ナレーション収録",
    desc: "企業VP・CM・ドキュメンタリー・YouTube・官公庁映像。事前のヒアリングでトーンをすり合わせて収録します。",
    links: [
      { label: "ココナラ", url: COCONALA_NARRATION },
      { label: "ランサーズ", url: "https://www.lancers.jp/menu/detail/1277099" },
    ],
  },
  {
    title: "声入り15秒 商品紹介・PR動画",
    isNew: true,
    desc: "ナレーションの収録から動画の編集まで一人で担当。写真・動画素材と原稿から、プロの声が入った短い動画を制作します。",
    links: [
      { label: "ココナラ", url: "https://coconala.com/services/4393214" },
      { label: "ランサーズ", url: "https://www.lancers.jp/menu/detail/1342606" },
    ],
  },
  {
    title: "ナレーション音声の編集",
    desc: "収録済みの声のカット・間・音質・音量を、ナレーターが聞こえ方から整えます。",
    links: [
      { label: "ココナラ", url: "https://coconala.com/services/4393239" },
      { label: "ランサーズ", url: "https://www.lancers.jp/menu/detail/1342608" },
    ],
  },
];

// Fixed heights so the server and client render the same markup.
const WAVE = [22, 38, 64, 48, 90, 120, 84, 150, 110, 70, 132, 176, 128, 96, 150, 104, 66, 118, 82, 50, 72, 40, 28];

function useSamplePlayer() {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    });
    audio.addEventListener("ended", () => { setCurrent(null); setProgress(0); });
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const toggle = (id) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (current === id) {
      audio.pause();
      setCurrent(null);
      return;
    }
    audio.src = `/audio/${id}.mp3`;
    setProgress(0);
    audio.play().then(() => setCurrent(id)).catch(() => setCurrent(null));
  };

  return { current, progress, toggle };
}

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", company: "", style: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const player = useSamplePlayer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xdapwbgz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          style: form.style,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data?.errors?.[0]?.message || "送信に失敗しました。もう一度お試しください。");
      }
    } catch (err) {
      setError("送信に失敗しました。もう一度お試しください。");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
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
            <a className="badge" href={COCONALA_NARRATION} target="_blank" rel="noopener noreferrer">
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

      <main>
        {/* Voice samples */}
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
                  {g.samples.map((s) => {
                    const on = player.current === s.id;
                    return (
                      <div key={s.id} className="sample">
                        <button
                          type="button"
                          className={`sample__btn${on ? " is-playing" : ""}`}
                          onClick={() => player.toggle(s.id)}
                          aria-label={`${s.title}を${on ? "停止" : "再生"}`}
                        >
                          {on ? "❚❚" : "▶"}
                        </button>
                        <div>
                          <div className="sample__title">{s.title}</div>
                          <div className="sample__bar"><span style={{ width: on ? `${player.progress * 100}%` : "0%" }} /></div>
                        </div>
                        <span className="sample__len">{s.len}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="voice-more">
              まとめて聴く：
              <a href="https://youtu.be/WLKWTIvK5sU" target="_blank" rel="noopener noreferrer">ナレーションサンプル（YouTube）→</a>
              <a href="https://youtu.be/1tKq_ienjHo" target="_blank" rel="noopener noreferrer">ボイスサンプル（YouTube）→</a>
            </p>
          </div>
        </section>

        {/* Works */}
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
                      {item.url && (
                        <a className="works__link" href={item.url} target="_blank" rel="noopener noreferrer">▶ 視聴する →</a>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section section--tint" id="services">
          <div className="container">
            <p className="eyebrow">Services</p>
            <h2 className="h2">ご依頼の窓口</h2>
            <p className="lead">ココナラ・ランサーズからもご依頼いただけます。料金の詳細・評価は各ページをご覧ください。</p>
            <div className="services">
              {services.map((s) => (
                <div key={s.title} className="service">
                  <h3 className="service__title">
                    {s.title}
                    {s.isNew && <span className="service__new">NEW</span>}
                  </h3>
                  <p className="service__desc">{s.desc}</p>
                  <div className="service__links">
                    {s.links.map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}で見る →</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container contact">
            <p className="eyebrow">Contact</p>
            <h2 className="h2">お仕事のご依頼・ご相談</h2>
            <p className="lead">ご希望の参考音声やブランドトーンに合わせた演出も可能です。まずはお気軽にご連絡ください。</p>

            {sent ? (
              <div className="form__sent">
                <h3>送信完了しました</h3>
                <p>お問い合わせありがとうございます。<br />内容を確認の上、改めてご連絡いたします。</p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form__row">
                  <div>
                    <label htmlFor="f-name">お名前 <span className="req">*</span></label>
                    <input id="f-name" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="山田 太郎" />
                  </div>
                  <div>
                    <label htmlFor="f-email">メールアドレス <span className="req">*</span></label>
                    <input id="f-email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="f-company">会社・団体名</label>
                  <input id="f-company" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="株式会社〇〇（任意）" />
                </div>
                <div>
                  <label htmlFor="f-style">ご希望のナレーションスタイル</label>
                  <select id="f-style" value={form.style} onChange={e => setForm({ ...form, style: e.target.value })}>
                    <option value="">選択してください（任意）</option>
                    <option value="落ち着いた語り口">落ち着いた語り口（信頼・知性・安心感）</option>
                    <option value="自然な会話調">自然な会話調（商品紹介・説明動画）</option>
                    <option value="ドラマチックな演出">ドラマチックな演出（CM・ドキュメンタリー）</option>
                    <option value="クール／知的／誠実">クール／知的／誠実（企業VP・官公庁）</option>
                    <option value="その他・ご相談">その他・ご相談</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="f-message">メッセージ <span className="req">*</span></label>
                  <textarea id="f-message" required rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="ご依頼内容・ご希望・ご質問などをご記入ください" />
                </div>
                {error && <p className="form__error">{error}</p>}
                <div>
                  <button type="submit" className="btn btn--gold" disabled={sending}>
                    {sending ? "送信中..." : "送信する"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__name">Marcus Sato</p>
        <p className="footer__role">NARRATOR &amp; VOICE ARTIST</p>
        <div className="footer__links">
          <a href="https://x.com/marcus_narrator" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://youtu.be/WLKWTIvK5sU" target="_blank" rel="noopener noreferrer">NARRATION SAMPLE</a>
          <a href="https://youtu.be/1tKq_ienjHo" target="_blank" rel="noopener noreferrer">VOICE SAMPLE</a>
          <a href="https://coconala.com/users/2811072" target="_blank" rel="noopener noreferrer">COCONALA</a>
          <a href="https://www.lancers.jp/profile/markun1115" target="_blank" rel="noopener noreferrer">LANCERS</a>
        </div>
        <p className="footer__copy">© 2024–2026 Marcus Sato. All rights reserved.</p>
      </footer>
    </>
  );
}
