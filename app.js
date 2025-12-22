const data = {
  levels: [
    { name:"Level 1", pay:"$200/hr", desc:"建立基本服務與出勤穩定度" },
    { name:"Level 2", pay:"$220/hr", desc:"能獨立支援全場並協助新人" },
    { name:"Level 3", pay:"$250/hr", desc:"具備外場節奏掌控與帶班能力" }
  ],
  scores: [
    "4.5–5.0：卓越",
    "4.0–4.49：合格",
    "3.5–3.99：待加強",
    "< 3.5：不達標"
  ],
  notes: [
    "臨時請假、遲到影響營運視為營運異常",
    "重大失誤將直接進入觀察期"
  ],
  timeline: [
    "Level 1｜150 小時評核（未過每 100 小時覆核）",
    "Level 2｜300 小時評核（未過每 150 小時覆核）",
    "Level 3｜600 小時評核（未過每 300 小時覆核）"
  ],
  watch: [
    "平均低於 3.75 進入觀察期",
    "一個月未改善降級"
  ]
};

const el = id => document.getElementById(id);

el("levelSummary").innerHTML = data.levels.map(
  l => `<p><b>${l.name}</b>｜${l.pay}<br>${l.desc}</p>`
).join("");

el("scoreBands").innerHTML = data.scores.map(s=>`<p>${s}</p>`).join("");
el("notes").innerHTML = data.notes.map(n=>`<p>${n}</p>`).join("");

el("timeline").innerHTML = data.timeline.map((t,i)=>`
  <div class="titem ${i%2===0?"left":"right"}">
    <div class="tdot"></div>
    <div class="tcard">${t}</div>
  </div>
`).join("");

el("watchlist").innerHTML = data.watch.map(w=>`<p>${w}</p>`).join("");
el("promotionRules").innerHTML = "<p>依公司內部評核標準執行</p>";
