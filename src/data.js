export const SITE_URL = "https://www.marcus-sato.jp";

export const LINKS = {
  coconalaNarration: "https://coconala.com/services/3195170",
  lancersNarration: "https://www.lancers.jp/menu/detail/1277099",
  coconalaProfile: "https://coconala.com/users/2811072",
  crowdworksProfile: "https://crowdworks.jp/public/employees/2517531",
  lancersProfile: "https://www.lancers.jp/profile/markun1115",
  x: "https://x.com/marcus_narrator",
  narrationSample: "https://youtu.be/WLKWTIvK5sU",
  voiceSample: "https://youtu.be/1tKq_ienjHo",
};

// Figures copied from the public profiles; update the date whenever the numbers change.
export const STATS = {
  asOf: "2026年9月時点",
  crowdworks: { rating: "5.0", reviews: 98, orders: 117, completion: 98 },
  coconala: { rating: "5.0", reviews: 25 },
};

export const samples = {
  "vp-sincere": { title: "企業VP｜誠実なトーン", len: "0:16" },
  "vp-brand": { title: "企業VP｜ブランドイメージ", len: "0:23" },
  "vp-era": { title: "企業VP｜「変わりゆく時代の中で」", len: "0:19" },
  documentary: { title: "ドキュメンタリー", len: "0:20" },
  "deep-richness": { title: "渋いトーン｜「真の豊かさとは」", len: "0:21" },
  bright: { title: "明るいトーン", len: "0:13" },
  "cm-cosmetics": { title: "化粧品CM（自主制作の作例）", len: "0:13" },
  education: { title: "教材・解説", len: "0:18" },
  greeting: { title: "冒頭のごあいさつ", len: "0:14" },
};

export const voiceGroups = [
  { title: "企業VP・会社紹介", desc: "信頼感と誠実さを大切にした、落ち着いた中低音の語り。", ids: ["vp-sincere", "vp-brand", "vp-era"], page: "/narration/corporate-vp/" },
  { title: "ドキュメンタリー・重厚な語り", desc: "映像に寄り添い、余韻を残す深い語り。", ids: ["documentary", "deep-richness"], page: "/narration/documentary/" },
  { title: "CM・商品紹介", desc: "明るく、聞き取りやすく、商品の魅力をまっすぐ届ける語り。", ids: ["bright", "cm-cosmetics"] },
  { title: "教材・案内・ごあいさつ", desc: "内容が自然に頭に入る、やわらかく明瞭な語り。", ids: ["education", "greeting"] },
];

export const works = [
  {
    category: "TV",
    items: [
      { title: "CS チャンネル銀河『なつかしのアニメ・特撮の旅』", description: "メインナレーション（杉田かおる × ウルトラマン、涼風真世 × ベルサイユのばら ほか全6回）" },
      { title: "テレビユー福島「ふくしまSHOW」ラーメン図鑑 ナレーション（レギュラー）" },
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
      { title: "ダイエー「一の市」ナレーション" },
      { title: "アイドルグループ「Bety」ワンマンライブ OPナレーション", url: "https://youtu.be/nJ4hh3fiwyU" },
    ],
  },
];

export const services = [
  {
    title: "ナレーション収録",
    desc: "企業VP・CM・ドキュメンタリー・YouTube・官公庁映像。事前のヒアリングでトーンをすり合わせて収録します。",
    links: [
      { label: "ココナラ", url: LINKS.coconalaNarration },
      { label: "ランサーズ", url: LINKS.lancersNarration },
      { label: "クラウドワークス", url: LINKS.crowdworksProfile },
    ],
  },
];

// Answers follow the Coconala / Lancers listings as of 2026-09-24. Keep them in sync.
export const faqs = {
  price: {
    q: "ナレーションの料金の目安は？",
    a: "1,000文字までの原稿で10,000円からお受けしています。1,000文字を超える分は1文字10円が目安です。ココナラは税込、ランサーズは税抜の表示です。",
  },
  delivery: {
    q: "納期はどのくらいですか？",
    a: "ナレーションは、原稿が確定してから3〜4日が目安です。収録は水曜・土曜が中心のため、お急ぎの場合は事前にご相談ください。翌日納品は＋15,000円で承ります（要事前相談）。",
  },
  retake: {
    q: "修正や録り直しはできますか？",
    a: "トーンやニュアンスの微調整は1回まで無料です。原稿の変更による録り直しは1箇所1,000円です。こちらの読み間違いは無料で録り直します。",
  },
  format: {
    q: "納品形式を教えてください。",
    a: "WAV（48kHz／24bit）でお届けします。そのほかの形式やファイルの分け方もご相談ください。",
  },
  commercial: {
    q: "商用利用はできますか？",
    a: "はい。すべてのプランに商用・法人でのご利用が含まれています。",
  },
  variations: {
    q: "トーンを聴き比べて選ぶことはできますか？",
    a: "A案・B案など、2パターンでの収録も承ります（追加料金あり）。「このサンプルの〇分〇秒あたりのイメージで」といったご指定も歓迎です。",
  },
  script: {
    q: "原稿の段階から相談できますか？",
    a: "はい。読みにくい言い回し、固有名詞の読み方、映像の尺に収まる文字数など、収録前にご相談いただけます。",
  },
  confidential: {
    q: "実績として公開してほしくない案件でも大丈夫ですか？",
    a: "はい。実績公開NGのオプション（＋2,000円）をご用意しています。公開する場合も、掲載内容・範囲を事前にご確認いただき、許可をいただいた場合のみ掲載します。",
  },
  howto: {
    q: "どこから依頼できますか？",
    a: "このページのお問い合わせフォーム、またはココナラ・ランサーズ・クラウドワークスからご依頼いただけます。まずは用途・原稿の文字数・ご希望の納期をお知らせください。",
  },
  vsAi: {
    q: "AIナレーションとの違いは何ですか？",
    a: "事前のヒアリングで用途やトーンをすり合わせ、読み分けや原稿のご相談にも人が応えます。収録した声はナレーター本人が聞こえ方を確かめながら編集して納品します。本人の声を商用利用込みでお届けするため、声の出どころもはっきりしています。",
  },
};

export const homeFaqKeys = ["price", "delivery", "retake", "format", "commercial", "variations", "script", "confidential", "howto", "vsAi"];

export const useCasePages = {
  "/narration/corporate-vp/": {
    title: "企業VP・会社紹介のナレーション｜マーカス佐藤",
    description: "企業VP・会社紹介・採用動画のナレーションを、地上波CM・TV番組の実績がある男性ナレーター マーカス佐藤が担当。落ち着いた中低音で、事前のヒアリングからトーンをすり合わせて収録します。",
    eyebrow: "Corporate VP",
    h1: "企業VP・会社紹介のナレーション",
    lead: "会社の「顔」になる映像に、信頼の中低音を。地上波CM・TV番組のナレーション実績がある男性ナレーター・マーカス佐藤が、事前のヒアリングでトーンをすり合わせて収録します。",
    forList: ["会社紹介・採用動画", "製品・サービスの紹介映像", "展示会・イベントでの上映映像", "周年記念・社史の映像"],
    sampleIds: ["vp-sincere", "vp-brand", "vp-era"],
    steps: ["用途・尺・原稿を確認します", "トーンをすり合わせます（参考動画の「〇分〇秒のイメージ」でも大丈夫です）", "収録し、聞こえ方を確かめながら編集します", "ご確認いただき、修正のうえ納品します"],
    faqKeys: ["price", "delivery", "retake", "commercial", "script"],
    links: [
      { label: "ココナラで見る", url: LINKS.coconalaNarration },
      { label: "ランサーズで見る", url: LINKS.lancersNarration },
    ],
  },
  "/narration/documentary/": {
    title: "ドキュメンタリー・紀行番組のナレーション｜マーカス佐藤",
    description: "ドキュメンタリー・紀行番組・歴史映像のナレーションを、CS チャンネル銀河でメインナレーションを担当した男性ナレーター マーカス佐藤が担当。映像に寄り添い、余韻を残す語りで収録します。",
    eyebrow: "Documentary",
    h1: "ドキュメンタリー・紀行番組のナレーション",
    lead: "映像に寄り添い、余韻を残す語りを。CS チャンネル銀河『なつかしのアニメ・特撮の旅』では、メインナレーション（全6回）を担当しました。",
    forList: ["ドキュメンタリー・紀行番組", "企業・団体の歴史や歩みの映像", "地域・文化・食の紹介映像", "YouTube のドキュメンタリー作品"],
    sampleIds: ["documentary", "deep-richness"],
    works: [
      { title: "CS チャンネル銀河『なつかしのアニメ・特撮の旅』", description: "メインナレーション（全6回）" },
      { title: "文化庁100年フード「福島市 円盤餃子」", url: "https://youtu.be/t3y1szdgOqk" },
      { title: "スーパーアルプス「町の八百屋から始まった物語｜75年の歩み」", url: "https://youtu.be/Ab0HppwQw_Y" },
    ],
    steps: ["映像の内容・尺・原稿を確認します", "語りの温度感や間の取り方をすり合わせます", "収録し、映像の流れに合わせて編集します", "ご確認いただき、修正のうえ納品します"],
    faqKeys: ["price", "delivery", "retake", "format", "variations"],
    links: [
      { label: "ココナラで見る", url: LINKS.coconalaNarration },
      { label: "ランサーズで見る", url: LINKS.lancersNarration },
    ],
  },
};

export const HOME = {
  title: "マーカス佐藤 | プロナレーター・ボイスアーティスト",
  description: "プロナレーター マーカス佐藤の公式サイト。企業VP・CM・ドキュメンタリー・YouTube・官公庁映像まで対応。感情豊かな表現で映像に命を吹き込みます。お仕事のご依頼はこちらから。",
};
