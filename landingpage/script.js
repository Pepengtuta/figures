const C = "https://res.cloudinary.com/dhaszqaju/image/upload/";

const TIERS = [
  {
    key: "barangay",
    nav: "Barangay",
    role: "Tier 1 · Community Level",
    title: "Barangay Tier",
    desc: "BHERT field reporting, Secretary center tracking, and Chairman review & forwarding.",
    bg: C + "v1794973208/webbhertdashboad_k8ysha.png",
    slides: [
      { url: C + "v1794973210/webloginpage_ikph0n.png", cap: "The login page authenticates every user and routes them to the tier matching their role." },
      { url: C + "v1794973208/webbhertdashboad_k8ysha.png", cap: "The BHERT dashboard summarizes incidents and affected population for its own barangay." },
      { url: C + "v1794973207/webbhertcreateincident_dhscb4.png", cap: "BHERT encodes the incident details, casualties, evacuation status, and road accessibility." },
      { url: C + "v1794973210/webbhertmyreports_t6fiwi.png", cap: "Reports filed by the barangay account are listed with their current status." },
      { url: C + "v1794973209/webbhertincidentdetail_z5tizu.png", cap: "The incident detail view shows the full report, attachments, and status history." },
      { url: C + "v1794973211/webchairmandashboard_frzgxo.png", cap: "The Chairman dashboard presents barangay-wide incident and evacuation center totals." },
      { url: C + "v1794973213/webchairmanreportactions_k3j1zi.png", cap: "A pending report exposes View Details, Edit, Review, and Dismiss actions." },
      { url: C + "v1794973214/webchairmanreportactions_reviewed_zoaghe.png", cap: "Reviewing the report changes its status to Reviewed." },
      { url: C + "v1794973213/webchairmanreportactions_forwardedtomdr_jtgca7.png", cap: "The reviewed report is forwarded to the Municipal Disaster Risk Reduction and Management office." },
      { url: C + "v1794973211/webchairmanactivitylogs_sczc5w.png", cap: "The activity log records every action taken on barangay reports." },
      { url: C + "v1794973212/webchairmanmanageusers_jfj4yr.png", cap: "The Chairman manages the accounts of barangay personnel." },
      { url: C + "v1794973216/websecretarydashboard_wqcmlr.png", cap: "The Secretary dashboard shows the barangay's centers, occupants, and reports." },
      { url: C + "v1794973217/websecretaryevaccenters_zmxcaz.png", cap: "Evacuation centers are listed with type, capacity, evacuee count, and status." },
      { url: C + "v1794973215/websecretaryalert_nt4kyk.png", cap: "Alerts from higher offices are displayed to barangay personnel." },
      { url: C + "v1794973215/websecretarybrgymap_n4o6wj.png", cap: "The barangay map plots incidents and evacuation centers within the barangay." }
    ]
  },
  {
    key: "municipal",
    nav: "Municipal",
    role: "Tier 2 · Municipal MDR",
    title: "Municipal Tier",
    desc: "Incident verification, triage response, provincial referral, and Mayor read-only monitor.",
    bg: C + "v1794973225/webmdribajaydashboard_oxiyit.png",
    slides: [
      { url: C + "v1794973225/webmdribajaydashboard_oxiyit.png", cap: "The municipal dashboard aggregates reports from all barangays in Ibajay." },
      { url: C + "v1794973225/webmdribajayallincidentreport_cpmj5y.png", cap: "MDR views every incident report submitted within its municipality." },
      { url: C + "v1794973229/webmdribajayundermdrreview_ehkez4.png", cap: "Reports forwarded by barangays arrive under municipal review." },
      { url: C + "v1794973230/webmdribajayundermdrreview_actions_zbpacm.png", cap: "The action menu shows the decisions available during municipal review." },
      { url: C + "v1794973230/webmdribajayverifiedreport_vdqqdq.png", cap: "A validated report is marked Verified." },
      { url: C + "v1794973228/webmdribajayrespondingreport_fku9ar.png", cap: "A verified report moves to Responding once municipal action begins." },
      { url: C + "v1794973226/webmdribajayreferedtoprovincial_ssyjnp.png", cap: "Reports beyond municipal capacity are referred to the provincial office." },
      { url: C + "v1794973224/ibajay_mayor_bcxja3.png", cap: "The Mayor sees municipal incident totals, evacuation center status, and per-barangay urgency." }
    ]
  },
  {
    key: "provincial",
    nav: "Provincial",
    role: "Tier 3 · Provincial PDRRMO",
    title: "Provincial Tier",
    desc: "Consolidated multi-municipality incidents, provincial review, and Governor overview map.",
    bg: C + "v1794973204/webpdrrmodashboard_whwjgl.png",
    slides: [
      { url: C + "v1794973204/webpdrrmodashboard_whwjgl.png", cap: "The provincial dashboard consolidates reports from all municipalities." },
      { url: C + "v1794973205/webpdrrmoreferredreports_zwazxo.png", cap: "Reports referred by municipalities appear in the provincial queue." },
      { url: C + "v1794973207/webpdrrmoreportunderreview_gwsnfo.png", cap: "Provincial staff review referred reports before acting." },
      { url: C + "v1794973206/webpdrrmoreportresponding_auad4f.png", cap: "Reports marked Responding show where provincial resources are committed." },
      { url: C + "v1794973204/webpdrrmobrgymap_phmzxi.png", cap: "The provincial map shows incidents and centers across municipalities." },
      { url: C + "v1794973202/webgovdashboard_fdy8gu.png", cap: "The Governor sees an overview of all incidents in the province, evacuation center status, and per-municipality urgency." },
      { url: C + "v1794973203/webgovreports_x5g1i6.png", cap: "The Governor sees Provincial incident totals, evacuation center status, and per-barangay urgency." },
      { url: C + "v1794973202/webgovbrgymap_z7ntla.png", cap: "The Governor views full province-wide map plotting incidents and centers across municipalities." }
    ]
  },
  {
    key: "mobile",
    nav: "Mobile App",
    role: "Field Mobile App",
    title: "Mobile App",
    desc: "BHERT on-the-ground reporting with GPS location pinning, media evidence, and offline sync.",
    bg: C + "v1794973218/mobile_bhert_dashboard_dbmszc.png",
    slides: [
      { url: C + "v1794973223/mobile_login_uvevee.png", cap: "App login authenticating BHERT personnel in the field." },
      { url: C + "v1794973218/mobile_bhert_dashboard_dbmszc.png", cap: "BHERT mobile app dashboard with rapid reporting triggers." },
      { url: C + "v1794973220/mobile_bhert_location_pin_tzi7zd.png", cap: "Precise GPS location pinning directly from the field." },
      { url: C + "v1794973218/mobile_bhert_disastertype_qoeqr2.png", cap: "Selecting disaster type, recording casualties, affected persons, and needs." },
      { url: C + "v1794973219/mobile_bhert_evidence_azm05n.png", cap: "Camera photo/video evidence attachment for rapid ground verification." },
      { url: C + "v1794973221/mobile_bhert_myreport_fmjwww.png", cap: "My Reports view showing submitted and actively tracked reports." },
      { url: C + "v1794973221/mobile_bhert_offline_saved_ue80ha.png", cap: "Offline queued report: safely saved to device storage during network loss." },
      { url: C + "v1794973222/mobile_bhert_offline_sync_jj6q0w.png", cap: "Automatic background synchronization once internet connectivity restores." }
    ]
  },
  {
    key: "needs",
    nav: "Needs & Assistance",
    role: "Resource Allocation",
    title: "Needs & Assistance",
    desc: "Declared supply requirements, MDR/PDR pledge ledger, delivery logistics, and confirmation.",
    bg: C + "v1794973198/declaredneedsandlinkedincidents_yg0wqk.png",
    slides: [
      { url: C + "v1794973198/declaredneedsandlinkedincidents_yg0wqk.png", cap: "Evacuation center linked to confirmed incidents displaying verified headcount." },
      { url: C + "v1794973198/needsdeclared_iquq09.png", cap: "Secretary declares relief needs by item description, unit, and required quantity." },
      { url: C + "v1794973197/mdrpledge_cywxig.png", cap: "Municipal MDR records a relief pledge against the declared barangay need." },
      { url: C + "v1794973198/pdrpledge_k53rbc.png", cap: "Provincial PDRRMO pledges higher-tier supplies and logistical aid." },
      { url: C + "v1794973199/pledgeledger_aar9d8.png", cap: "Donation ledger showing transparent status tracking for all inbound assistance." },
      { url: C + "v1794973201/pledgeoutfordelivery_ujb0y3.png", cap: "Pledges updated to Sent and Out for Delivery with timestamp verification." },
      { url: C + "v1794973197/confirmedrecieved_ze3um2.png", cap: "Barangay receives and audits delivery, confirming actual received counts." },
      { url: C + "v1794973199/pledgefulfilled_cj4yja.png", cap: "Full lifecycle completion: fulfilled pledges credited against open requirements." }
    ]
  }
];

// ── Render Nav & Frontpage Panels ──
const navEl = document.getElementById("tier-nav");
const bgStack = document.getElementById("bg-stack");
const panelStack = document.getElementById("panel-stack");

TIERS.forEach((t, i) => {
  const btn = document.createElement("button");
  btn.className = `nav-btn ${i === 0 ? "active" : ""}`;
  btn.textContent = t.nav;
  btn.onclick = () => openModal(t);
  navEl.appendChild(btn);

  const img = document.createElement("img");
  img.src = t.bg;
  img.alt = t.title;
  if (i === 0) img.classList.add("active");
  bgStack.appendChild(img);

  const p = document.createElement("article");
  p.className = "panel";
  p.innerHTML = `
    <div class="panel-info">
      <div class="panel-role">${t.role}</div>
      <h2 class="panel-title">${t.title}</h2>
      <p class="panel-desc">${t.desc}</p>
      <button class="panel-btn">Screenshots</button>
    </div>`;
  p.onmouseenter = () => {
    document.querySelectorAll(".fancy-bg img").forEach((el, idx) => el.classList.toggle("active", idx === i));
    document.querySelectorAll(".nav-btn").forEach((el, idx) => el.classList.toggle("active", idx === i));
  };
  p.onclick = () => openModal(t);
  panelStack.appendChild(p);
});

// ── Modal Engine ──
const modal = document.getElementById("modal");
const modalRole = document.getElementById("modal-role");
const modalTitle = document.getElementById("modal-title");
const slideImg = document.getElementById("slide-img");
const slideStep = document.getElementById("slide-step");
const slideCaption = document.getElementById("slide-caption");
const dotsEl = document.getElementById("dots");
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let activeSlides = [];
let cur = 0;

function openModal(data) {
  activeSlides = data.slides;
  modalRole.textContent = data.role;
  modalTitle.textContent = data.title;

  dotsEl.innerHTML = activeSlides.map((_, i) => `<span class="${i === 0 ? "active" : ""}"></span>`).join("");
  dotsEl.querySelectorAll("span").forEach((d, i) => d.onclick = () => showSlide(i));

  showSlide(0);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function showSlide(i) {
  cur = i;
  const s = activeSlides[cur];
  slideImg.src = s.url;
  slideStep.textContent = `Slide ${cur + 1} of ${activeSlides.length}`;
  slideCaption.textContent = s.cap;

  dotsEl.querySelectorAll("span").forEach((d, idx) => d.classList.toggle("active", idx === cur));
  counter.textContent = `${cur + 1} / ${activeSlides.length}`;
  prevBtn.disabled = cur === 0;
  nextBtn.disabled = cur === activeSlides.length - 1;
}

prevBtn.onclick = () => { if (cur > 0) showSlide(cur - 1); };
nextBtn.onclick = () => { if (cur < activeSlides.length - 1) showSlide(cur + 1); };

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modal-close").onclick = closeModal;
modal.onclick = (e) => { if (e.target === modal) closeModal(); };

// ── Original Team Overlay Engine (Easter Egg) ──
const teamOverlay = document.getElementById("team-overlay");
const teamClose = document.getElementById("team-close");
const teamAudio = document.getElementById("bg-music");
const teamHeading = document.getElementById("generals-heading");
const teamHint = document.getElementById("music-hint");
const teamItems = () => [...document.querySelectorAll(".carousel__item")];
const teamPrev = document.getElementById("team-prev");
const teamNext = document.getElementById("team-next");
let teamAutoTimer;

const getActiveTeamIndex = () => teamItems().findIndex(el => el.hasAttribute("data-active"));

const activateTeamSlide = (index) => {
  const items = teamItems();
  const total = items.length;
  const i = ((index % total) + total) % total;
  items.forEach(el => el.removeAttribute("data-active"));
  items[i].setAttribute("data-active", true);
  items[i].focus();
};

const nextTeamSlide = () => activateTeamSlide(getActiveTeamIndex() + 1);
const prevTeamSlide = () => activateTeamSlide(getActiveTeamIndex() - 1);
const pauseTeamAuto = () => clearInterval(teamAutoTimer);

teamNext.onclick = () => { pauseTeamAuto(); nextTeamSlide(); };
teamPrev.onclick = () => { pauseTeamAuto(); prevTeamSlide(); };

document.querySelector(".carousel__list").onclick = (e) => {
  const slide = e.target.closest(".carousel__item");
  if (!slide) return;
  pauseTeamAuto();
  activateTeamSlide(teamItems().indexOf(slide));
};

teamHeading.onclick = () => {
  if (teamAudio.paused) {
    teamAudio.play().then(() => {
      teamHint.textContent = "♪ now playing — click to pause";
      teamHint.classList.add("playing");
    }).catch(() => { });
  } else {
    teamAudio.pause();
    teamHint.textContent = "♪ click to play";
    teamHint.classList.remove("playing");
  }
};

function openTeam() {
  teamOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  teamAutoTimer = setInterval(nextTeamSlide, 3500);
}

function closeTeam() {
  teamOverlay.classList.remove("open");
  document.body.style.overflow = "";
  pauseTeamAuto();
  teamAudio.pause();
  teamHint.textContent = "♪ click to play";
  teamHint.classList.remove("playing");
}

document.getElementById("brand-egg").onclick = (e) => {
  e.preventDefault();
  openTeam();
};
teamClose.onclick = closeTeam;

// ── Global Key Navigation ──
document.onkeydown = (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "ArrowRight" && cur < activeSlides.length - 1) showSlide(cur + 1);
    if (e.key === "ArrowLeft" && cur > 0) showSlide(cur - 1);
    if (e.key === "Escape") closeModal();
  } else if (teamOverlay.classList.contains("open")) {
    if (e.key === "ArrowRight" || e.key === "d") { pauseTeamAuto(); nextTeamSlide(); }
    if (e.key === "ArrowLeft" || e.key === "a") { pauseTeamAuto(); prevTeamSlide(); }
    if (e.key === "Escape") closeTeam();
  }
};
