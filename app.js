const data = {
  levels: [
    {
      level: "Level 1",
      pay: "$200/hr",
      goal: "建立正確服務習慣、理解 SOP 並能獨立完成基本任務；養成準時與職場責任感。",
      cycle: "累積 150 小時評核；若第一次未通過，後續每 100 小時覆核",
      promotion: [
        "累積 150 小時完成一次評核",
        "平均評分 ≥ 4.0",
        "無營運異常紀錄",
        "外籍生：中文檢定 A2"
      ]
    },
    {
      level: "Level 2",
      pay: "$220/hr",
      goal: "能獨立支援全場、掌握節奏、主動協助他人與教導新人。",
      cycle: "晉升 Level 2 後累積 300 小時評核；若第一次未通過，後續每 150 小時覆核",
      promotion: [
        "累積 300 小時完成評核",
        "平均評分 ≥ 4.25",
        "穩定展現主動支援與帶新人行為",
        "三期內無營運異常",
        "外籍生：中文檢定 B2"
      ]
    },
    {
      level: "Level 3",
      pay: "$250/hr",
      goal: "掌握五台出單狀況、管理顧客等待預期、帶領外場協調節奏與品質。",
      cycle: "晉升 Level 3 後累積 600 小時評核；若第一次未通過，後續每 300 小時覆核",
      promotion: [
        "（此文件提供維持/觀察期規則摘要；晉升門檻以公司內部規範為準）"
      ]
    }
  ],
  scoreBands: [
    { range: "4.5–5.0", label: "卓越", meaning: "穩定可升等或維持 Level" },
    { range: "4.0–4.49", label: "合格", meaning: "符合標準、持續觀察" },
    { range: "3.5–3.99", label: "待強化", meaning: "觀察期、暫緩升級" },
    { range: "< 3.5", label: "不達標", meaning: "需重新訓練或降級觀察" }
  ],
  watchlist: [
    "平均評分 < 3.75 或出勤未達保障時數 → 觀察期一個月",
    "觀察期結束若平均 ≥ 4.0 → 維持原等級；未改善 → 降級 Level 2",
    "發生重大事件 → 立即觀察期"
  ],
  notes: [
    "「營運異常」：臨時請假、遲到或現場失誤造成班表臨時調整、出餐錯誤或影響顧客體驗等。",
    "不屬於營運異常：已提前協調請假並完成調班；不可抗力缺席需出示證明（交通事故、家中突發等）。",
    "「嚴重事件」：造成營運中斷、顧客投訴或同事需額外負擔的重大狀況；成立即啟動觀察期或降級評估。"
  ],
  timeline: [
    { title: "Level 1｜首次評核", tag: "累積 150 小時", desc: "達 150 小時進行一次評核；若未通過，後續每 100 小時覆核。" },
    { title: "Level 1｜覆核節奏", tag: "+100 小時 / 次", desc: "第一次未通過後，進入每 100 小時覆核的固定節奏。" },
    { title: "Level 2｜首次評核", tag: "累積 300 小時", desc: "晉升 Level 2 後累積 300 小時評核；若未通過，後續每 150 小時覆核。" },
    { title: "Level 2｜覆核節奏", tag: "+150 小時 / 次", desc: "第一次未通過後，進入每 150 小時覆核的固定節奏。" },
    { title: "Level 3｜首次評核", tag: "累積 600 小時", desc: "晉升 Level 3 後累積 600 小時評核；若未通過，後續每 300 小時覆核。" },
    { title: "Level 3｜覆核節奏", tag: "+300 小時 / 次", desc: "第一次未通過後，進入每 300 小時覆核的固定節奏。" }
  ]
};

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return node;
}

function renderLevelSummary() {
  const root = document.getElementById("levelSummary");
  root.innerHTML = "";

  data.levels.forEach((lv) => {
    root.appendChild(
      el("div", { class: "kv" }, [
        el("div", {}, [
          el("div", { class: "kv__k" }, [lv.level]),
          el("div", { class: "muted" }, [lv.goal])
        ]),
        el("div", { class: "kv__v" }, [lv.pay])
      ])
    );
  });
}

function renderScoreBands() {
  const root = document.getElementById("scoreBands");
  root.innerHTML = "";

  const table = el("table", { class: "table" }, [
    el("thead", {}, [
      el("tr", {}, [
        el("th", {}, ["分數區間"]),
        el("th", {}, ["評語"]),
        el("th", {}, ["意涵"])
      ])
    ]),
    el("tbody", {}, data.scoreBands.map(b =>
      el("tr", {}, [
        el("td", {}, [b.range]),
        el("td", {}, [b.label]),
        el("td", {}, [b.meaning])
      ])
    ))
  ]);

  root.appendChild(table);
}

function renderNotes() {
  const root = document.getElementById("notes");
  root.innerHTML = "";
  data.notes.forEach((t) => {
    root.appendChild(el("div", { class: "kv" }, [
      el("div", { class: "kv__k" }, ["•"]),
      el("div", { class: "kv__v", style: "font-weight:500; text-align:left; width:100%;" }, [t])
    ]));
  });
}

function renderPromotionRules() {
  const root = document.getElementById("promotionRules");
  root.innerHTML = "";

  data.levels.forEach((lv) => {
    const box = el("div", { style: "margin-bottom:12px" }, [
      el("div", { class: "titem__meta" }, [
        el("h3", { class: "titem__title" }, [lv.level]),
        el("div", { class: "titem__tag" }, [lv.pay])
      ]),
      el("p", { class: "muted", style: "margin:6px 0 8px" }, [lv.cycle]),
      el("ul", { style: "margin:0; padding-left:18px; color:#dfe6fb;" },
        lv.promotion.map(x => el("li", {}, [x]))
      )
    ]);
    root.appendChild(box);
  });
}

function renderWatchlist() {
  const root = document.getElementById("watchlist");
  root.innerHTML = "";
  root.appendChild(el("p", { class: "muted" }, ["（此段為 Level 3 維持/觀察期規則摘要）"]));
  const ul = el("ul", { style: "margin:0; padding-left:18px; color:#dfe6fb;" },
    data.watchlist.map(x => el("li", {}, [x]))
  );
  root.appendChild(ul);
}

function renderTimeline() {
  const root = document.getElementById("timeline");
  root.innerHTML = "";

  data.timeline.forEach((it, idx) => {
    const side = idx % 2 === 0 ? "titem--left" : "titem--right";
    const item = el("div", { class: `titem ${side}` }, [
      el("div", { class: "tdot", "aria-hidden": "true" }, []),
      el("div", { class: "titem__card" }, [
        el("div", { class: "titem__meta" }, [
          el("h3", { class: "titem__title" }, [it.title]),
          el("div", { class: "titem__tag" }, [it.tag])
        ]),
        el("p", { class: "titem__desc" }, [it.desc])
      ])
    ]);
    root.appendChild(item);
  });
}

document.getElementById("btnPrint").addEventListener("click", () => window.print());

renderLevelSummary();
renderScoreBands();
renderNotes();
renderTimeline();
renderPromotionRules();
renderWatchlist();
