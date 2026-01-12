// ====== ここを書き換えると「スタンプ対象」が増やせます ======
const PLACES = [
  { id: "hakodate", name: "函館", area: "北海道" },
  { id: "aomori", name: "青森", area: "青森" },
  { id: "iwakidaira", name: "いわき平", area: "福島" },
  { id: "yahiko", name: "弥彦", area: "新潟" },
  { id: "maebasi", name: "前橋", area: "群馬" },
  { id: "toride", name: "取手", area: "宇都宮" },
  { id: "oomiya", name: "大宮", area: "埼玉" },
  { id: "seibuenn", name: "西武園", area: "埼玉" },
  { id: "keioukaku", name: "京王閣", area: "東京" },
  { id: "tachikawa", name: "立川", area: "東京" },
  { id: "matsudo", name: "松戸", area: "千葉" },
  { id: "kawasaki", name: "川崎", area: "神奈川" },
  { id: "hiratsuka", name: "平塚", area: "神奈川" },
  { id: "odawara", name: "小田原", area: "神奈川" },
  { id: "itou", name: "伊東", area: "静岡" },
  { id: "sizuoka", name: "静岡", area: "静岡" },
  { id: "nagoya", name: "名古屋", area: "北海道" },
  { id: "gihu", name: "岐阜", area: "岐阜" },
  { id: "oogaki", name: "大垣", area: "岐阜" },
  { id: "toyohasi", name: "豊橋", area: "愛知" },
  { id: "toyama", name: "富山", area: "富山" },
  { id: "matsuzaka", name: "松坂", area: "三重" },
  { id: "hukui", name: "福井", area: "福井" },
  { id: "nara", name: "奈良", area: "奈良" },
  { id: "mukoumati", name: "向日町", area: "京都" },
  { id: "wakayama", name: "和歌山", area: "和歌山" },
  { id: "kisiwada", name: "岸和田", area: "大阪" },
  { id: "tamano", name: "玉野", area: "岡山" },
  { id: "hirosima", name: "広島", area: "広島" },
  { id: "houhu", name: "防府", area: "山口" },
  { id: "takamatsu", name: "高松", area: "香川" },
  { id: "komatujima", name: "小松島", area: "徳島" },
  { id: "kouchi", name: "高知", area: "高知" },
  { id: "matsuyama", name: "松山", area: "愛媛" },
  { id: "kokura", name: "小倉", area: "福岡" },
  { id: "kurume", name: "久留米", area: "福岡" },
  { id: "takeo", name: "武雄", area: "佐賀" },
  { id: "sasebo", name: "佐世保", area: "長崎" },
  { id: "beppu", name: "別府", area: "大分" },
  { id: "kumamoto", name: "熊本", area: "熊本" },
];
// ===========================================================

const STORAGE_KEY = "stamp_rally_pressed_v1";

const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const countText = document.getElementById("countText");
const barFill = document.getElementById("barFill");

function loadPressedSet() {
  // 共有リンク（?p=...）があれば優先して読み込み
  const url = new URL(location.href);
  const p = url.searchParams.get("p");
  if (p) {
    const decoded = decodePressedFromQuery(p);
    if (decoded) return decoded;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function savePressedSet(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

function updateProgress(set) {
  const total = PLACES.length;
  const done = set.size;
  countText.textContent = `${done} / ${total}`;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  barFill.style.width = `${pct}%`;
}

function render(set) {
  grid.innerHTML = "";
  for (const place of PLACES) {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");

    card.innerHTML = `
      <div class="card__name">${escapeHtml(place.name)}</div>
      <div class="card__meta">${escapeHtml(place.area)}</div>
      <div class="stamp" aria-hidden="true">
        <div class="stamp__text">済</div>
      </div>
    `;

    const pressed = set.has(place.id);
    if (pressed) {
      card.classList.add("is-pressed");
      card.setAttribute("aria-pressed", "true");
    }

    const toggle = () => {
      if (set.has(place.id)) set.delete(place.id);
      else set.add(place.id);
      savePressedSet(set);
      render(set);
    };

    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    grid.appendChild(card);
  }

  updateProgress(set);
}

clearBtn.addEventListener("click", () => {
  const set = new Set();
  savePressedSet(set);
  // URLの共有パラメータも消す
  const url = new URL(location.href);
  url.searchParams.delete("p");
  history.replaceState(null, "", url.toString());
  render(set);
});

copyBtn.addEventListener("click", async () => {
  const set = loadPressedSet();
  const url = new URL(location.href);
  url.searchParams.set("p", encodePressedToQuery(set));

  try {
    await navigator.clipboard.writeText(url.toString());
    copyBtn.textContent = "コピーしました！";
    setTimeout(() => (copyBtn.textContent = "共有リンクをコピー"), 1200);
  } catch {
    // クリップボード不可の環境用フォールバック
    prompt("このURLをコピーしてください", url.toString());
  }
});

// ====== 共有リンク用（短くするため base64 + ざっくり圧縮） ======
function encodePressedToQuery(set) {
  const ids = PLACES.map(p => p.id);
  const bits = ids.map(id => (set.has(id) ? "1" : "0")).join("");
  // bits -> bytes
  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8).padEnd(8, "0"), 2));
  }
  const bin = String.fromCharCode(...bytes);
  return btoa(bin).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_"); // URL safe
}

function decodePressedFromQuery(q) {
  try {
    const base64 = q.replaceAll("-", "+").replaceAll("_", "/");
    const pad = "=".repeat((4 - (base64.length % 4)) % 4);
    const bin = atob(base64 + pad);
    const bytes = [...bin].map(ch => ch.charCodeAt(0));
    const bits = bytes.map(b => b.toString(2).padStart(8, "0")).join("");
    const set = new Set();
    for (let i = 0; i < PLACES.length; i++) {
      if (bits[i] === "1") set.add(PLACES[i].id);
    }
    return set;
  } catch {
    return null;
  }
}
// ============================================================

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// 起動
const pressedSet = loadPressedSet();
render(pressedSet);
