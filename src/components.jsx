import { useEffect, useRef, useState } from "react";
import { LINKS, samples, services, faqs } from "./data.js";

export function useSamplePlayer() {
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

export function SampleRow({ id, player }) {
  const s = samples[id];
  const on = player.current === id;
  return (
    <div className="sample">
      <button
        type="button"
        className={`sample__btn${on ? " is-playing" : ""}`}
        onClick={() => player.toggle(id)}
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
}

export function Header() {
  return (
    <nav className="nav" aria-label="サイト内の案内">
      <div className="container nav__inner">
        <a className="nav__brand" href="/">Marcus Sato</a>
        <div className="nav__links">
          <a href="/#voice">ボイスサンプル</a>
          <a href="/#works">実績</a>
          <a href="/#faq">よくある質問</a>
          <a className="nav__cta" href="/#contact">ご依頼</a>
        </div>
      </div>
    </nav>
  );
}

export function UseCaseLinks({ exclude } = {}) {
  const items = [
    { href: "/narration/corporate-vp/", label: "企業VP・会社紹介のナレーション" },
    { href: "/narration/documentary/", label: "ドキュメンタリー・紀行番組のナレーション" },
    { href: "/video/15sec-pr/", label: "声入り15秒 商品紹介・PR動画" },
  ];
  return (
    <div className="usecases">
      {items.filter((i) => i.href !== exclude).map((i) => (
        <a key={i.href} className="usecase" href={i.href}>{i.label}<span>→</span></a>
      ))}
    </div>
  );
}

export function Services() {
  return (
    <div className="services">
      {services.map((s) => (
        <div key={s.title} className="service">
          <h3 className="service__title">
            {s.title}
            {s.isNew && <span className="service__new">NEW</span>}
          </h3>
          <p className="service__desc">{s.desc}</p>
          {s.page && <a className="service__more" href={s.page}>くわしく見る →</a>}
          <div className="service__links">
            {s.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}で見る →</a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Faq({ keys }) {
  return (
    <div className="faq">
      {keys.map((k) => (
        <details key={k} className="faq__item">
          <summary className="faq__q">{faqs[k].q}</summary>
          <p className="faq__a">{faqs[k].a}</p>
        </details>
      ))}
    </div>
  );
}

// FAQPage structured data built from the same answers shown on the page.
export function FaqJsonLd({ keys }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: keys.map((k) => ({
      "@type": "Question",
      name: faqs[k].q,
      acceptedAnswer: { "@type": "Answer", text: faqs[k].a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", style: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

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
                <option value="声入り15秒動画">声入り15秒 商品紹介・PR動画</option>
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
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">Marcus Sato</p>
      <p className="footer__role">NARRATOR &amp; VOICE ARTIST</p>
      <div className="footer__links">
        <a href="/narration/corporate-vp/">企業VP</a>
        <a href="/narration/documentary/">ドキュメンタリー</a>
        <a href="/video/15sec-pr/">声入り15秒動画</a>
      </div>
      <div className="footer__links">
        <a href={LINKS.x} target="_blank" rel="noopener noreferrer">X</a>
        <a href={LINKS.narrationSample} target="_blank" rel="noopener noreferrer">NARRATION SAMPLE</a>
        <a href={LINKS.voiceSample} target="_blank" rel="noopener noreferrer">VOICE SAMPLE</a>
        <a href={LINKS.coconalaProfile} target="_blank" rel="noopener noreferrer">COCONALA</a>
        <a href={LINKS.lancersProfile} target="_blank" rel="noopener noreferrer">LANCERS</a>
      </div>
      <p className="footer__copy">© 2024–2026 Marcus Sato. All rights reserved.</p>
    </footer>
  );
}
