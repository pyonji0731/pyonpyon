:root{
  --bg: #0b0d12;
  --panel: #121827;
  --text: #e8ecf5;
  --muted: #a6b0c2;
  --stroke: rgba(255,255,255,.10);
  --accent: #7aa2ff;
  --danger: #ff6b6b;
  --stamp: #ff3b3b;
}

*{ box-sizing: border-box; }
html, body{ height: 100%; }
body{
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif;
  background: radial-gradient(1200px 600px at 20% -10%, rgba(122,162,255,.25), transparent 60%),
              radial-gradient(900px 500px at 90% 0%, rgba(255,59,59,.18), transparent 55%),
              var(--bg);
  color: var(--text);
}

.header{
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(11,13,18,.55);
  border-bottom: 1px solid var(--stroke);
}
.header__inner{
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 16px 14px;
}
.title{
  margin: 0;
  font-size: 22px;
  letter-spacing: .02em;
}
.subtitle{
  margin: 6px 0 12px;
  color: var(--muted);
  font-size: 13px;
}

.actions{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px 0 12px;
}
.btn{
  border: 1px solid rgba(122,162,255,.35);
  background: rgba(122,162,255,.14);
  color: var(--text);
  padding: 9px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}
.btn:hover{ background: rgba(122,162,255,.20); }
.btn--ghost{
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
}
.btn--ghost:hover{ background: rgba(255,255,255,.10); }

.progress{
  display: grid;
  gap: 8px;
}
#countText{ color: var(--muted); font-size: 13px; }
.bar{
  height: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.10);
}
.bar__fill{
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, rgba(122,162,255,.85), rgba(255,59,59,.85));
}

.main{
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 16px 50px;
}

.grid{
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(220px, 1fr) );
  gap: 12px;
}

.card{
  position: relative;
  border: 1px solid var(--stroke);
  background: linear-gradient(180deg, rgba(18,24,39,.86), rgba(18,24,39,.62));
  border-radius: 16px;
  padding: 14px 14px 12px;
  min-height: 86px;
  cursor: pointer;
  transition: transform .08s ease, border-color .12s ease, background .12s ease;
  user-select: none;
}
.card:hover{
  transform: translateY(-1px);
  border-color: rgba(122,162,255,.40);
}
.card__name{
  font-weight: 800;
  letter-spacing: .02em;
  line-height: 1.25;
}
.card__meta{
  margin-top: 6px;
  color: var(--muted);
  font-size: 12px;
}

/* stamp */
.stamp{
  position: absolute;
  right: 12px;
  top: 10px;
  width: 78px;
  height: 78px;
  border-radius: 999px;
  border: 3px solid rgba(255,59,59,.85);
  color: rgba(255,59,59,.92);
  display: grid;
  place-items: center;
  transform: rotate(-12deg) scale(.92);
  opacity: 0;
  pointer-events: none;
  filter: drop-shadow(0 10px 14px rgba(255,59,59,.14));
}
.stamp::before{
  content:"";
  position: absolute;
  inset: 6px;
  border-radius: 999px;
  border: 2px dashed rgba(255,59,59,.55);
}
.stamp__text{
  font-weight: 900;
  font-size: 14px;
  letter-spacing: .12em;
}

/* pressed state */
.card.is-pressed{
  border-color: rgba(255,59,59,.35);
}
.card.is-pressed .stamp{
  opacity: 1;
  animation: pop .18s ease-out;
}
@keyframes pop{
  from{ transform: rotate(-12deg) scale(.75); opacity: .0; }
  to  { transform: rotate(-12deg) scale(.92); opacity: 1; }
}

.footer{
  border-top: 1px solid var(--stroke);
  color: var(--muted);
  padding: 18px 16px;
  text-align: center;
}
