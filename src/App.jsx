import { useState } from "react";

// Title, meta, OGP and JSON-LD live in index.html so crawlers see them without running JS.
export default function App() {
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

  const works = [
    {
      category: "テレビ",
      items: [
        { title: "CS チャンネル銀河『なつかしのアニメ・特撮の旅』", description: "メインナレーション（杉田かおる × ウルトラマン、涼風真世 × ベルサイユのばら ほか全6回）", url: null },
        { title: "オートレース公式重勝式 CMナレーション", url: "https://youtu.be/U9n5zRReWkQ" },
        { title: "テレビユー福島「ふくしまSHOW」ラーメン図鑑 ナレーション（レギュラー）", url: null },
        { title: "「うまか亭」CMナレーション", url: "https://youtu.be/KQT_NtTqnmU" },
      ],
    },
    {
      category: "官公庁",
      items: [
        { title: "文化庁100年フード「福島市 円盤餃子」ナレーション", url: "https://youtu.be/t3y1szdgOqk" },
      ],
    },
    {
      category: "店頭・YouTube",
      items: [{ title: "ダイエー「一の市」ナレーション", url: null }],
    },
    {
      category: "ライブ",
      items: [
        { title: "アイドルグループ「Bety」ワンマンライブ OPナレーション", url: "https://youtu.be/nJ4hh3fiwyU" },
      ],
    },
  ];

  const styles = [
    { icon: "🎙️", label: "落ち着いた語り口", desc: "信頼・知性・安心感" },
    { icon: "💬", label: "自然な会話調", desc: "商品紹介や説明動画に◎" },
    { icon: "🎬", label: "ドラマチックな演出", desc: "CM・ドキュメンタリーなど" },
    { icon: "🏛️", label: "クール／知的／誠実", desc: "企業VP、官公庁向けに" },
  ];

  const COCONALA_NARRATION = "https://coconala.com/services/3195170";

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
      badge: "NEW",
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

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    background: "rgba(255,255,255,0.04)", border: "1px solid #2d2040",
    borderRadius: "6px", color: "#e8e8f0", fontSize: "15px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  };

  const labelStyle = {
    display: "block", fontSize: "12px", letterSpacing: "2px",
    color: "#6b7280", textTransform: "uppercase", marginBottom: "8px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: "hidden" }}>

      {/* Hero */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "40px 24px",
        background: "radial-gradient(ellipse at 50% 40%, #1a0a2e 0%, #0a0a0f 70%)",
      }}>
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <p style={{ fontSize: "13px", letterSpacing: "4px", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "24px", fontWeight: "500" }}>
          NARRATOR & VOICE ARTIST
        </p>

        <h1 style={{
          fontSize: "clamp(48px, 8vw, 96px)", fontWeight: "700", letterSpacing: "-2px",
          lineHeight: "1", marginBottom: "16px",
          background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Marcus Sato</h1>

        <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "#6b7280", letterSpacing: "2px", marginBottom: "48px", textTransform: "uppercase" }}>
          マーカス 佐藤
        </p>

        <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "#c4b5fd", maxWidth: "560px", lineHeight: "1.7", marginBottom: "56px" }}>
          感情と知性が交差する声で、<br />あなたのコンテンツに命を吹き込む。
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
          <a href="https://youtu.be/WLKWTIvK5sU" target="_blank" rel="noopener noreferrer" style={{
            padding: "14px 32px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            color: "#fff", borderRadius: "4px", textDecoration: "none", fontSize: "14px",
            letterSpacing: "1px", fontWeight: "600",
          }}>▶ NARRATION SAMPLE</a>
          <a href="https://youtu.be/1tKq_ienjHo" target="_blank" rel="noopener noreferrer" style={{
            padding: "14px 32px", background: "transparent", color: "#c4b5fd",
            borderRadius: "4px", textDecoration: "none", fontSize: "14px",
            letterSpacing: "1px", fontWeight: "600", border: "1px solid #4c1d95",
          }}>▶ VOICE SAMPLE</a>
        </div>

        <a href={COCONALA_NARRATION} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "2px 10px", marginBottom: "28px", whiteSpace: "nowrap",
          padding: "8px 18px", border: "1px solid #2d2040", borderRadius: "999px",
          color: "#d1d5db", textDecoration: "none", fontSize: "13px", letterSpacing: "0.5px",
          background: "rgba(139, 92, 246, 0.06)",
        }}>
          <span style={{ color: "#fbbf24" }}>★ 5.0</span>
          <span>ココナラ評価 25件すべて星5</span>
          <span style={{ color: "#6b7280", fontSize: "11px" }}>（2026年9月時点）</span>
        </a>

        <a href="https://x.com/marcus_narrator" target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: "8px",
          color: "#6b7280", textDecoration: "none", fontSize: "13px",
          letterSpacing: "1px", transition: "color 0.2s",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
          @マーカス佐藤 on X
        </a>

        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "#4b5563", fontSize: "11px", letterSpacing: "2px" }}>
          <span>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #4b5563, transparent)" }} />
        </div>
      </section>

      {/* About */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "120px 24px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "24px" }}>ABOUT</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "700", lineHeight: "1.2", marginBottom: "32px", letterSpacing: "-1px" }}>
          プロのナレーションで、<br />映像・音声コンテンツに命を吹き込む。
        </h2>
        <p style={{ fontSize: "16px", color: "#9ca3af", lineHeight: "1.9", maxWidth: "640px" }}>
          企業VP・CM・ドキュメンタリー・YouTube・官公庁映像まで幅広く対応。
          ご希望のトーンやブランドイメージに合わせ、事前のヒアリングで方向性をしっかりすり合わせた上でご提供します。
        </p>
      </section>

      {/* Styles */}
      <section style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0f0a1e 50%, #0a0a0f 100%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "48px" }}>STYLE</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
            {styles.map((s, i) => (
              <div key={i} style={{ padding: "32px 24px", border: "1px solid #1f1b2e", borderRadius: "8px", background: "rgba(139, 92, 246, 0.04)" }}>
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>{s.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "8px", color: "#e8e8f0" }}>{s.label}</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "120px 24px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "48px" }}>WORKS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {works.map((group, gi) => (
            <div key={gi}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#4b5563", textTransform: "uppercase", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #1f1b2e" }}>
                {group.category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {group.items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#8b5cf6", marginTop: "8px", flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: "15px", color: "#d1d5db", lineHeight: "1.6" }}>{item.title}</span>
                      {item.description && <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>{item.description}</p>}
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "6px", fontSize: "12px", color: "#8b5cf6", textDecoration: "none", letterSpacing: "1px" }}>
                          ▶ 視聴する →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0f0a1e 50%, #0a0a0f 100%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "24px" }}>SERVICES</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "700", lineHeight: "1.3", marginBottom: "16px", letterSpacing: "-0.5px" }}>
            ご依頼の窓口
          </h2>
          <p style={{ fontSize: "15px", color: "#9ca3af", lineHeight: "1.8", marginBottom: "40px" }}>
            ココナラ・ランサーズからもご依頼いただけます。料金の詳細・評価は各ページをご覧ください。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: "28px 24px", border: "1px solid #1f1b2e", borderRadius: "8px", background: "rgba(139, 92, 246, 0.04)", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px", color: "#e8e8f0", lineHeight: "1.5" }}>
                  {s.title}
                  {s.badge && <span style={{ marginLeft: "8px", fontSize: "10px", letterSpacing: "1px", color: "#8b5cf6", border: "1px solid #4c1d95", borderRadius: "3px", padding: "1px 6px", verticalAlign: "middle" }}>{s.badge}</span>}
                </div>
                <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.8", marginBottom: "20px", flexGrow: 1 }}>{s.desc}</div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {s.links.map((l, li) => (
                    <a key={li} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                      padding: "8px 16px", border: "1px solid #4c1d95", borderRadius: "4px",
                      color: "#c4b5fd", textDecoration: "none", fontSize: "13px", letterSpacing: "0.5px",
                    }}>{l.label}で見る →</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ background: "linear-gradient(135deg, #0f0a1e, #1a0a2e)", padding: "120px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", letterSpacing: "4px", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "24px" }}>CONTACT</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "700", marginBottom: "16px", letterSpacing: "-1px" }}>
            お仕事のご依頼・ご相談
          </h2>
          <p style={{ fontSize: "15px", color: "#9ca3af", marginBottom: "56px", lineHeight: "1.8" }}>
            ご希望の参考音声やブランドトーンに合わせた演出も可能です。まずはお気軽にご連絡ください。
          </p>

          {sent ? (
            <div style={{ padding: "48px", textAlign: "center", border: "1px solid #3b0764", borderRadius: "12px", background: "rgba(139, 92, 246, 0.08)" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
              <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>送信完了しました</h3>
              <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: "1.7" }}>
                お問い合わせありがとうございます。<br />内容を確認の上、改めてご連絡いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>お名前 <span style={{ color: "#8b5cf6" }}>*</span></label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="山田 太郎" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>メールアドレス <span style={{ color: "#8b5cf6" }}>*</span></label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>会社・団体名</label>
                <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="株式会社〇〇（任意）" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>ご希望のナレーションスタイル</label>
                <select value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">選択してください（任意）</option>
                  <option value="落ち着いた語り口">落ち着いた語り口（信頼・知性・安心感）</option>
                  <option value="自然な会話調">自然な会話調（商品紹介・説明動画）</option>
                  <option value="ドラマチックな演出">ドラマチックな演出（CM・ドキュメンタリー）</option>
                  <option value="クール／知的／誠実">クール／知的／誠実（企業VP・官公庁）</option>
                  <option value="その他・ご相談">その他・ご相談</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>メッセージ <span style={{ color: "#8b5cf6" }}>*</span></label>
                <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="ご依頼内容・ご希望・ご質問などをご記入ください" rows={6} style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }} />
              </div>

              {error && (
                <p style={{ color: "#f87171", fontSize: "14px", padding: "12px 16px", background: "rgba(248, 113, 113, 0.1)", borderRadius: "6px", border: "1px solid rgba(248, 113, 113, 0.2)" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={sending} style={{
                padding: "16px 48px", background: sending ? "#4c1d95" : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px",
                letterSpacing: "2px", fontWeight: "600", cursor: sending ? "not-allowed" : "pointer",
                alignSelf: "flex-start", transition: "opacity 0.2s", opacity: sending ? 0.7 : 1,
              }}>
                {sending ? "送信中..." : "送信する"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1f1b2e", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "700", letterSpacing: "-0.5px", marginBottom: "8px",
          background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Marcus Sato</p>
        <p style={{ fontSize: "12px", color: "#4b5563", letterSpacing: "2px", marginBottom: "24px" }}>NARRATOR & VOICE ARTIST</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px 24px", marginBottom: "32px" }}>
          <a href="https://x.com/marcus_narrator" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", textDecoration: "none", fontSize: "13px", letterSpacing: "1px" }}>X</a>
          <a href="https://youtu.be/WLKWTIvK5sU" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", textDecoration: "none", fontSize: "13px", letterSpacing: "1px" }}>NARRATION SAMPLE</a>
          <a href="https://youtu.be/1tKq_ienjHo" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", textDecoration: "none", fontSize: "13px", letterSpacing: "1px" }}>VOICE SAMPLE</a>
          <a href="https://coconala.com/users/2811072" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", textDecoration: "none", fontSize: "13px", letterSpacing: "1px" }}>COCONALA</a>
          <a href="https://www.lancers.jp/profile/markun1115" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", textDecoration: "none", fontSize: "13px", letterSpacing: "1px" }}>LANCERS</a>
        </div>
        <p style={{ fontSize: "12px", color: "#374151" }}>© 2024–2026 Marcus Sato. All rights reserved.</p>
      </footer>
    </div>
  );
}
