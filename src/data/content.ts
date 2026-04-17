import type { ContentItem } from "@/types/content";

export const CONTENT: ContentItem[] = [
  {
    id: "r1",
    slug: "shakshuka-rose-spices",
    kind: "recipe",
    title: "شكشوكة دافئة بنكهة هادئة",
    excerpt: "فطور سريع يجمع بين البيض والطماطم بلمسة توابل لطيفة.",
    category: "recipes",
    subcategory: "breakfast",
    readMinutes: 6,
    coverImage:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "طبق شكشوكة على مائدة فاتحة",
    badges: ["editor", "hot"],
    publishedAt: "2026-04-12",
    ingredients: ["طماطم مقطعة", "بيض", "زيت زيتون", "ثوم", "كمون ناعم", "ملح وفلفل"],
    steps: [
      "سخّني الزيت وأضيفي الثوم حتى يتضوّر بلطف.",
      "أضيفي الطماطم واتركيها حتى تتكثف قليلًا.",
      "افتحي مساحات صغيرة واسكبي البيض، غطّي المقلاة حتى ينضج.",
    ],
    body: [
      "الشكشوكة خيار مثالي عندما تريدين شيئًا دافئًا دون تعب. ركّزي على نضج الطماطم قبل البيض لتحصلي على صلصة غنية.",
      "قدّميها مع خبز رقيق أو سلطة خضار خفيفة لتوازن لطيف.",
    ],
  },
  {
    id: "r2",
    slug: "evening-tea-ritual",
    kind: "recipe",
    title: "شاي مسائي بالزهور والليمون",
    excerpt: "مشروب دافئ يناسب لحظة توقف قبل النوم.",
    category: "recipes",
    subcategory: "drinks",
    readMinutes: 4,
    coverImage:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "كوب شاي على خلفية ناعمة",
    badges: ["new"],
    publishedAt: "2026-04-14",
    ingredients: ["ماء دافئ", "شاي أخضر أو أبيض", "شرائح ليمون", "ورد مجفف (اختياري)", "عسل خفيف"],
    steps: ["اسكبي الماء على الشاي واتركيه 3 دقائق.", "أضيفي الليمون والورد ثم عسلًا بسيطًا حسب الرغبة."],
    body: ["تجنّبي الكافيين القوي قبل النوم؛ هذا الخيار أخف ويمنحكِ إيقاعًا هادئًا."],
  },
  {
    id: "a1",
    slug: "closet-reset-60",
    kind: "article",
    title: "إعادة ضبط خزانة الملابس في 60 دقيقة",
    excerpt: "خطة مركّزة: فرز، تعليق، وتخزين بذكاء دون فوضى.",
    category: "organize",
    subcategory: "closet",
    readMinutes: 8,
    coverImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "خزانة ملابس مرتبة",
    badges: ["trending"],
    publishedAt: "2026-04-10",
    body: [
      "ابدئي بسحب كل القطع التي لم تلبسيها منذ موسم كامل — غالبًا هي التي تشغل مساحة دون فائدة.",
      "قسّمي الكومة إلى: احتفاظ، تبرع، يحتاج تصليح. لا تفتحي تطبيقات التسوق أثناء الفرز!",
      "رتّبي الألوان من الفاتح للغامق داخل نفس الفئة لتشعري بفخامة بصرية بسيطة.",
    ],
  },
  {
    id: "a2",
    slug: "soft-skin-routine",
    kind: "article",
    title: "روتين بشرة «خفيف لكنه فعّال»",
    excerpt: "ثلاث خطوات صباحية وثلاث مسائية بدون مبالغة.",
    category: "skincare",
    subcategory: "routine-skin",
    readMinutes: 7,
    coverImage:
      "https://images.unsplash.com/photo-1556228578-8c89e33afff7?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "منتجات عناية بسيطة على رخام",
    badges: ["editor"],
    publishedAt: "2026-04-11",
    body: [
      "الصباح: غسل لطيف + مرطب + واقي شمس — هذا الأساس يحمي من معظم المشاكل المزعجة لاحقًا.",
      "المساء: إزالة مكياج/تنظيف + مرطب يحتوي على مكون يدعم حاجز البشرة.",
      "أضيفي مرة أسبوعيًا تقشيرًا كيميائيًا خفيفًا فقط إذا كانت بشرتكِ معتادة عليه.",
    ],
  },
  {
    id: "a3",
    slug: "weekly-clean-map",
    kind: "article",
    title: "خريطة تنظيف أسبوعية بدون إرهاق",
    excerpt: "15 دقيقة يوميًا بدل يوم كامل من التعب.",
    category: "organize",
    subcategory: "schedules",
    readMinutes: 6,
    coverImage:
      "https://images.unsplash.com/photo-1581578731548-646acef3d9d8?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "تنظيف منزل بهدوء",
    badges: ["new"],
    publishedAt: "2026-04-15",
    body: [
      "الاثنين: أسطح المطبخ. الثلاثاء: الحمام بسرعة. الأربعاء: غبار خفيف في غرفة المعيشة.",
      "الخميس: غسيل الملابس الخفيف. الجمعة: ترتيب الثلاجة. السبت: شيء واحد «كبير» فقط إن احتجتِ.",
    ],
  },
  {
    id: "a4",
    slug: "micro-habits-evening",
    kind: "article",
    title: "عادات صغيرة تغيّر مساءكِ",
    excerpt: "قبل النوم: 5 دقائق تكفي لفرق ملموس.",
    category: "growth",
    subcategory: "habits",
    readMinutes: 5,
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "أجواء مساء هادئة",
    badges: ["hot"],
    publishedAt: "2026-04-09",
    body: [
      "اكتبي سطرين فقط: ما الذي كان لطيفًا اليوم؟ ما الذي تريدين تبسيطه غدًا؟",
      "خفضي إضاءة الغرفة قبل النوم بـ30 دقيقة — إشارة بسيطة للجسم أن «الهدوء بدأ».",
    ],
  },
  {
    id: "a5",
    slug: "watchlist-cozy",
    kind: "article",
    title: "قائمة مشاهدة دافئة للأيام الباردة",
    excerpt: "مسلسلات خفيفة بلا حرق — فقط أجواء.",
    category: "entertainment",
    subcategory: "watch",
    readMinutes: 6,
    coverImage:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "تلفزيون وغرفة مريحة",
    badges: ["editor"],
    publishedAt: "2026-04-08",
    body: [
      "اختاري عملًا واحدًا طويل النفس، وآخر قصير الحلقات — يمنحكِ توازنًا بين الاستمرار والخفة.",
      "ضعي هاتفكِ بعيدًا عن يدكِ أثناء الحلقة الأولى فقط — ستشعرين بفرق بسيط لكنه مهم.",
    ],
  },
  {
    id: "a6",
    slug: "celebrity-style-soft",
    kind: "article",
    title: "لمسة إطلالات هادئة من السجادة الحمراء",
    excerpt: "ألوان ناعمة وقصّات مريحة تلهم خزانتكِ اليومية.",
    category: "celebrities",
    subcategory: "looks",
    readMinutes: 5,
    coverImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "أزياء أنيقة بلون ناعم",
    badges: ["trending"],
    publishedAt: "2026-04-07",
    body: [
      "الاتجاه الأقوى هذا الموسم: الوردي الباهت مع ذهبي خافت — سهل التنسيق مع قطع أساسية بيضاء.",
    ],
  },
  {
    id: "a7",
    slug: "horoscope-week-soft",
    kind: "article",
    title: "توقعات أسبوعية خفيفة لكل الأبراج",
    excerpt: "قراءة مرحة بلا وعود كبيرة — فقط لمسة تفاؤل.",
    category: "horoscope",
    subcategory: "week",
    readMinutes: 9,
    coverImage:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "سماء ليلية بهدوء",
    badges: ["new"],
    publishedAt: "2026-04-16",
    body: [
      "الأسبوع مناسب لخطوات صغيرة: رسالة اعتذار، ترتيب درج، أو شراء شيء يخدم راحتكِ وليس المزاج اللحظي.",
      "تذكّري أن التوقعات للمتعة — القرار الحقيقي يبقى لكِ.",
    ],
  },
  {
    id: "a8",
    slug: "series-buzz-april",
    kind: "article",
    title: "أبرز حديث المسلسلات هذا الأسبوع",
    excerpt: "مواعيد، عودات، ومفاجآت قصيرة.",
    category: "series",
    subcategory: "new-series",
    readMinutes: 7,
    coverImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede1ba?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "مقاعد سينما",
    badges: ["hot"],
    publishedAt: "2026-04-13",
    body: [
      "كثير من المنصات تعرض حلقات أسبوعية — اختاري يومًا ثابتًا لمتابعة مسلسلكِ المفضل لتصبحي جزءًا من روتين لطيف.",
    ],
  },
  {
    id: "a9",
    slug: "trend-now-soft",
    kind: "article",
    title: "رائج الآن: عناية بالشعر بلا حرارة",
    excerpt: "موجة جديدة تهتم بالتموج الطبيعي والعناية الليلية.",
    category: "trend",
    subcategory: "now",
    readMinutes: 4,
    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "شعر بموجات ناعمة",
    badges: ["trending"],
    publishedAt: "2026-04-16",
    body: ["زيت خفيف + لفّة حرير قبل النوم = نتيجة لطيفة مع الوقت دون تعقيد."],
  },
  {
    id: "t1",
    slug: "vinegar-shine",
    kind: "tip",
    title: "لمعة سريعة للحوض بدون كيماويات قوية",
    excerpt: "خل أبيض + بيكربونات + دقيقتان.",
    category: "hacks",
    subcategory: "home-hacks",
    readMinutes: 2,
    coverImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf80?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "مطبخ نظيف",
    badges: ["new"],
    publishedAt: "2026-04-15",
    body: ["رشّي الخل المخفف، اتركيه دقيقة، ثم فركي بلطف. تهوية جيدة بعدها."],
  },
  {
    id: "a10",
    slug: "hair-oil-night",
    kind: "article",
    title: "زيت ليلي خفيف للأطراف المتعبة",
    excerpt: "خطوة واحدة قبل النوم.",
    category: "personal-care",
    subcategory: "hair",
    readMinutes: 4,
    coverImage:
      "https://images.unsplash.com/photo-1522337094842-56a45f5f494a?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "زيوت عناية",
    badges: ["editor"],
    publishedAt: "2026-04-06",
    body: ["كمية صغيرة على الأطراف فقط — تجنّبي فروة الرأس إذا كانت بشرتها دهنية."],
  },
  {
    id: "r3",
    slug: "lentil-soup-cozy",
    kind: "recipe",
    title: "شورعد عدس دافئ للمساء",
    excerpt: "وصفة اقتصادية ومريحة مع بهارات دافئة.",
    category: "recipes",
    subcategory: "dinner",
    readMinutes: 7,
    coverImage:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "شورعد عدس",
    badges: ["hot"],
    publishedAt: "2026-04-05",
    ingredients: ["عدس أحمر", "بصل", "جزر", "كمون", "مرق خضار", "زيت زيتون"],
    steps: ["شوّحي البصل والجزر.", "أضيفي العدس والمرق حتى الغليان ثم هدوء النار لـ20 دقيقة.", "اهرسي جزئيًا إن رغبتِ."],
    body: ["تجمّدي كمية صغيرة ليوم مشغول — تذوقي الحرارة قبل التقديم دائمًا."],
  },
];

export function getContentBySlug(slug: string) {
  return CONTENT.find((c) => c.slug === slug);
}

export function getContentByCategory(categoryId: string) {
  return CONTENT.filter((c) => c.category === categoryId);
}

export function searchContent(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return CONTENT.filter(
    (c) =>
      c.title.toLowerCase().includes(t) ||
      c.excerpt.toLowerCase().includes(t) ||
      (c.subcategory && c.subcategory.includes(t)),
  );
}

export function mostRead() {
  return [...CONTENT].sort((a, b) => b.readMinutes - a.readMinutes).slice(0, 4);
}

export function lahloobaPicks() {
  return CONTENT.filter((c) => c.badges?.includes("editor")).slice(0, 6);
}

export function featuredHome() {
  return CONTENT.filter((c) => c.badges?.includes("hot") || c.badges?.includes("new")).slice(0, 5);
}
