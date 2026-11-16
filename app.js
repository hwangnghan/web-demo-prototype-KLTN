(function () {
  "use strict";
  var C = window.CONTENT, A = window.ASSETS || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var state = { nhanh: null, pose: 0, msg: 0, flipped: 0, tpl: "thuong" };
  // Dữ liệu của phiên này, chỉ nằm trong bộ nhớ trang: tải lại trang là bắt đầu lại từ đầu.
  var ten = "";                                                    // tên người dùng (không lưu, không gửi đi)
  var S = { visited: [], flips: {}, postcards: 0, stamps: {} };    // nhánh đã đi, thẻ đã lật, số postcard đã tải, tem

  function src(key) { return A[key] || key; }               // tên hình -> ảnh nhúng, hoặc đường dẫn
  // có ảnh thật không: ảnh nhúng trong assets.js, hoặc đường dẫn file (vd "images/anh-xoai.jpg")
  function hasImg(key) { return !!key && (!!A[key] || /\.(jpe?g|png|webp)$/i.test(key)); }
  function phText(b) { return "[ẢNH: " + (b.canAnh || b.tieuDe) + "]"; }   // khung tạm khi chưa có ảnh
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  // thay {ten} và các ký hiệu khác; {ten} đứng đầu câu thì viết hoa chữ cái đầu
  function T(str, extra) {
    var name = ten || C.xungHo.macDinh;
    var out = String(str).replace(/\{(\w+)\}/g, function (m, k) {
      if (k === "ten") return "\u0001" + name;
      return extra && extra[k] != null ? String(extra[k]) : m;
    });
    out = out.replace(/(^|[.!?…]\s+)\u0001(.)/g, function (m, pre, ch) { return pre + ch.toUpperCase(); });
    return out.replace(/\u0001/g, "");
  }
  function byId(id) { return C.nhanh.filter(function (n) { return n.id === id; })[0]; }
  function stampCount() { return C.nhanh.filter(function (n) { return S.stamps[n.id]; }).length; }
  function allStamps() { return stampCount() === C.nhanh.length; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- màu từ content.js ---------- */
  var root = document.documentElement.style, M = C.mau;
  root.setProperty("--sen", M.sen); root.setProperty("--sen-nhat", M.senNhat); root.setProperty("--la", M.la);
  root.setProperty("--la-dam", M.laDam); root.setProperty("--lua", M.lua); root.setProperty("--nen", M.nen);

  /* ---------- hình minh họa tạm: đồng sen (SVG tự vẽ) ---------- */
  var THEMES = {
    mo:        { sky: ["#FFFFFF", "#FDEAF1", "#FFF0DC"], sun: "#FFD9A0", bank: ["#BFDDB0", "#8FC27A"], water: ["#E3F2E8", "#C6E5D3"] },
    binhminh:  { sky: ["#FFF5F8", "#FCD9E6", "#FFE3CC"], sun: "#FFC6A8", bank: ["#C9DDB6", "#97C381"], water: ["#F3E6EC", "#D9E9DC"] },
    chieuvang: { sky: ["#FFF8E8", "#FFE6B8", "#FFD39A"], sun: "#FFB65C", bank: ["#C8D79A", "#9DBB62"], water: ["#F6EBC9", "#E2E2B4"] },
    sangxanh:  { sky: ["#F2FAFF", "#DDF0F7", "#EEF8E4"], sun: "#FFF1B8", bank: ["#B5DAA4", "#7CB866"], water: ["#DDF1EA", "#BFE2D2"] }
  };
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var U = "";
  function lotus(x, y, s, r) {
    var g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
    g += '<path d="M0 0 C 3 40 -4 80 2 130" stroke="#5E9B33" stroke-width="5" fill="none"/>';
    var back = [-64, -34, 0, 34, 64], front = [-42, -14, 14, 42];
    back.forEach(function (a) { g += '<path transform="rotate(' + a + ')" d="M0 0 C-24 -20 -22 -66 0 -92 C22 -66 24 -20 0 0Z" fill="url(#' + U + 'pl)"/>'; });
    front.forEach(function (a) { g += '<path transform="rotate(' + a + ')" d="M0 4 C-20 -14 -18 -54 0 -74 C18 -54 20 -14 0 4Z" fill="url(#' + U + 'pd)"/>'; });
    g += '<ellipse cx="0" cy="-8" rx="13" ry="7" fill="#F8C94A"/></g>';
    return g;
  }
  function bud(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 C 3 50 -3 100 1 160" stroke="#5E9B33" stroke-width="4" fill="none"/>' +
      '<path d="M0 0 C-20 -14 -18 -52 0 -78 C18 -52 20 -14 0 0Z" fill="url(#' + U + 'pd)"/><path d="M0 -2 C-8 -16 -6 -46 0 -70" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/></g>';
  }
  function leaf(x, y, rx, ry, rot) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><ellipse rx="' + rx + '" ry="' + ry + '" fill="url(#' + U + 'lf)"/>' +
      '<ellipse rx="' + (rx * .55) + '" ry="' + (ry * .5) + '" fill="#fff" fill-opacity=".12"/>' +
      '<path d="M0 0 L' + (rx * .9) + ' ' + (-ry * .25) + ' M0 0 L' + (-rx * .9) + ' ' + (-ry * .2) + ' M0 0 L' + (rx * .5) + ' ' + (ry * .8) + ' M0 0 L' + (-rx * .5) + ' ' + (ry * .8) + '" stroke="#3F7D25" stroke-opacity=".35" stroke-width="2"/></g>';
  }
  function scene(theme, seed) {
    var T = THEMES[theme] || THEMES.mo, R = rng(seed || 7), W = 1600, H = 1000, s = "";
    U = "s" + theme + (seed || 7) + "-" + (scene.n = (scene.n || 0) + 1) + "-";
    s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax slice"><defs>' +
      '<linearGradient id="' + U + 'sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + T.sky[0] + '"/><stop offset=".55" stop-color="' + T.sky[1] + '"/><stop offset="1" stop-color="' + T.sky[2] + '"/></linearGradient>' +
      '<linearGradient id="' + U + 'wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + T.water[0] + '"/><stop offset="1" stop-color="' + T.water[1] + '"/></linearGradient>' +
      '<radialGradient id="' + U + 'sn"><stop offset="0" stop-color="' + T.sun + '"/><stop offset="1" stop-color="' + T.sun + '" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + U + 'pl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FBD3E3"/><stop offset="1" stop-color="#F48CB6"/></linearGradient>' +
      '<linearGradient id="' + U + 'pd" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F9B7D1"/><stop offset="1" stop-color="#E8548F"/></linearGradient>' +
      '<linearGradient id="' + U + 'lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8CC753"/><stop offset="1" stop-color="#4F9A2C"/></linearGradient>' +
      '</defs>';
    s += '<rect width="' + W + '" height="' + H + '" fill="url(#' + U + 'sk)"/>';
    s += '<circle cx="1180" cy="430" r="260" fill="url(#' + U + 'sn)"/><circle cx="1180" cy="430" r="90" fill="' + T.sun + '" fill-opacity=".85"/>';
    // bờ xa và hàng cây
    var p = "M0 600 ";
    for (var x = 0; x < W; x += 80) { var h1 = 600 - Math.round(R() * 30 + 6); p += "Q" + (x + 40) + " " + (h1 - 22) + " " + (x + 80) + " " + h1 + " "; }
    s += '<path d="' + p + 'L' + W + ' 640 L0 640Z" fill="' + T.bank[0] + '"/>';
    s += '<path d="M0 640 C 300 612 600 628 900 616 C 1200 604 1400 626 1600 614 L1600 660 L0 660Z" fill="' + T.bank[1] + '"/>';
    s += '<rect y="652" width="' + W + '" height="' + (H - 652) + '" fill="url(#' + U + 'wt)"/>';
    for (var i = 0; i < 14; i++) { var yy = 680 + R() * 300, xx = R() * W; s += '<path d="M' + xx + ' ' + yy + ' h' + (60 + R() * 140) + '" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>'; }
    // lá và hoa, xa trước gần sau
    var items = [];
    for (var j = 0; j < 30; j++) { var ly = 690 + Math.pow(R(), .8) * 310, k = (ly - 650) / 350; items.push({ y: ly, t: "l", x: R() * W, rx: 40 + k * 120, ry: 10 + k * 30, rot: R() * 10 - 5 }); }
    var spots = [[160, .9], [420, .7], [700, 1.1], [980, .6], [1300, 1], [1500, .75], [560, .5], [1120, .85]];
    spots.forEach(function (sp, n) { var fy = 700 + sp[1] * 170 + R() * 30; items.push({ y: fy - 1, t: n % 3 === 2 ? "b" : "f", x: sp[0] + R() * 60, s: sp[1] }); });
    items.sort(function (a, b) { return a.y - b.y; });
    items.forEach(function (it) {
      if (it.t === "l") s += leaf(it.x, it.y, it.rx, it.ry, it.rot);
      else if (it.t === "f") s += lotus(it.x, it.y - 60 * it.s, it.s);
      else s += bud(it.x, it.y - 80 * it.s, it.s);
    });
    return s + "</svg>";
  }
  function svgUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }

  /* ---------- tách chữ từng từ ---------- */
  function splitWords(node, text) {
    node.innerHTML = "";
    var idx = 0;
    String(text).split("\n").forEach(function (line, li) {
      if (li) node.appendChild(document.createElement("br"));
      var wrap = el("span", li ? "line2" : "line1");
      line.split(" ").forEach(function (w, wi) {
        if (wi) wrap.appendChild(document.createTextNode(" "));
        var s = el("span", "w"); s.textContent = w; s.style.setProperty("--i", idx++); wrap.appendChild(s);
      });
      node.appendChild(wrap);
    });
  }

  /* ---------- gõ chữ trong bong bóng ---------- */
  var typing = new WeakMap();
  function type(node, text) {
    var token = {}; typing.set(node, token);
    if (reduce) { node.textContent = text; return Promise.resolve(); }
    var chars = Array.from(String(text).normalize("NFC")), i = 0;
    // ba chấm "Sen đang gõ…" khoảng 0,6–0,9 giây rồi mới gõ chữ
    node.innerHTML = '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    return new Promise(function (res) {
      setTimeout(function () {
        if (typing.get(node) !== token) return res();
        node.innerHTML = '<span></span><span class="caret"></span>';
        var out = node.firstChild;
        (function step() {
          if (typing.get(node) !== token) return res();
          out.textContent = chars.slice(0, ++i).join("");
          if (i < chars.length) setTimeout(step, chars[i - 1] === "," || chars[i - 1] === "." ? 160 : 24);
          else { if (node.lastChild) node.lastChild.remove(); res(); }
        })();
      }, 600 + Math.round(Math.random() * 300));
    });
  }
  function sayLines(node, lines) {
    var p = Promise.resolve();
    lines.forEach(function (l, i) { p = p.then(function () { return i ? new Promise(function (r) { setTimeout(r, 1300); }) : 0; }).then(function () { return type(node, l); }); });
    return p;
  }
  function popImg(img, key) { img.src = src(key); img.classList.remove("pop"); void img.offsetWidth; img.classList.add("pop"); }

  /* ---------- Bé Sen nhắc nhỏ ---------- */
  var guide = $("#guide"), guideOff = false;
  $("#guideImg").src = src(C.nhacNho.hinh);
  $("#guideX").addEventListener("click", function () { guideOff = true; guideHide(); });
  var guideTimer, guidePrio = 0;
  function guideHide() { guide.classList.add("is-off"); document.body.classList.remove("guide-on"); guidePrio = 0; }
  // prio: lời chúc mừng (2) không bị lời nhắc thường (0) đè lên khi đang hiện
  function say(text, img, prio) {
    prio = prio || 0;
    if (guideOff) return;
    if (!$("#stampPanel").hidden) return;          // đang mở sổ tem thì không nhắc
    if (prio < guidePrio && !guide.classList.contains("is-off")) return;
    guidePrio = prio;
    guide.hidden = false; guide.classList.remove("is-off"); document.body.classList.add("guide-on");
    if (img) popImg($("#guideImg"), img);
    type($("#guideText"), text);
    clearTimeout(guideTimer);                       // tự ẩn sau vài giây để không che nội dung
    guideTimer = setTimeout(function () { guideHide(); }, 7000);
  }

  /* ---------- đổ nội dung tĩnh ---------- */
  $("#logoTop").src = $("#logoFoot").src = src("logo-dong-thap");
  $("#logoUeh").src = $("#footUeh").src = src("logo-ueh");
  $("#logoSmd").src = $("#footSmd").src = src("logo-smd");
  $("#brandName").textContent = C.moDau.nhanLogo;
  splitWords($("#heroTitle"), C.moDau.tieuDe);
  $("#heroSub").textContent = C.moDau.moTa;
  $("#heroBtn").textContent = C.moDau.nut;
  $("#heroSen").src = src(C.moDau.hinh);
  var heroSvg = scene("mo", 11);
  $("#heroScene").innerHTML = heroSvg;
  $("#backdrop").style.backgroundImage = 'url("' + svgUri(heroSvg) + '")';
  splitWords($("#moodTitle"), C.chonTamTrang.tieuDe);
  $("#moodLead").textContent = C.chonTamTrang.moTa;
  $("#toSecrets").textContent = C.batMi.nutXemThem;
  $("#secTitle").textContent = C.batMi.tieuDe;
  $("#secLead").textContent = C.batMi.moTa;
  $("#toPostcard").textContent = C.batMi.nutTiep;
  var P = C.postcard;
  $("#pcTitle").textContent = P.tieuDe; $("#pcLead").textContent = P.moTa;
  $("#pcNameLabel").textContent = P.nhanTen; $("#pcName").placeholder = P.goiYTen;
  $("#pcPoseLabel").textContent = P.nhanDang; $("#pcMsgLabel").textContent = P.nhanLoiNhan;
  $("#pcDownload").textContent = P.nutTai; $("#pcNote").textContent = P.riengTu;
  $("#againSen").src = src(C.ketThuc.hinh);
  $("#againTitle").textContent = C.ketThuc.tieuDe;
  var H = C.hoiTen, ST = C.soTem, D = C.postcardDacBiet;
  $("#nameSen").src = src(H.hinh);
  $("#nameInput").maxLength = H.toiDa; $("#nameInput").placeholder = H.goiY; $("#nameInput").setAttribute("aria-label", H.cauHoi);
  $("#nameOk").textContent = H.nutXong; $("#nameSkip").textContent = H.nutBoQua; $("#nameNote").textContent = H.riengTu;
  $("#secretLabel").textContent = C.biMatChung.nhan;
  $("#stampTitle").textContent = ST.tieuDe; $("#stampDesc").textContent = ST.moTa; $("#stampClose").setAttribute("aria-label", ST.dong);
  $("#pcTplLabel").textContent = D.nhanMau; $("#pcEnd").textContent = C.ketThuc.nutKetThuc;
  $("#footNote").textContent = C.chanTrang.ghiChu; $("#footSrc").textContent = C.chanTrang.nguon;

  // ô kính mờ và cánh sen rơi ở phần mở đầu
  var mobile = innerWidth <= 760;
  [[4, 66], [4, 73], [7.6, 73], [4, 80], [44, 82], [47.6, 82], [47.6, 86], [88, 18], [91.6, 18], [88, 25], [62, 12]].forEach(function (p, i) {
    if (mobile && i % 2) return;
    var g = el("span", "glass"); g.style.left = p[0] + "%"; g.style.top = p[1] + "%";
    g.style.width = "clamp(30px,3.6vw,54px)"; g.style.setProperty("--dl", (Math.random() * 5).toFixed(2) + "s");
    $("#heroGlass").appendChild(g);
  });
  if (!reduce) for (var k = 0; k < 16; k++) {
    var pt = el("span", "petal");
    pt.style.left = (Math.random() * 100) + "%";
    pt.style.setProperty("--dx", (Math.random() * 160 - 80).toFixed(0) + "px");
    pt.style.animationDuration = (9 + Math.random() * 9).toFixed(1) + "s";
    pt.style.animationDelay = (-Math.random() * 15).toFixed(1) + "s";
    pt.style.transform = "scale(" + (.6 + Math.random() * .8).toFixed(2) + ")";
    $("#petals").appendChild(pt);
  }

  /* ---------- hỏi tên sau khi bấm "Đi cùng Sen" ---------- */
  var dlg = $("#nameDlg"), asked = false, closing = false;
  $("#heroBtn").addEventListener("click", function () { if (asked) go("mood"); else openName(); });
  function openName() {
    asked = true; closing = false; dlg.hidden = false;
    requestAnimationFrame(function () { dlg.classList.add("is-open"); });
    type($("#nameQ"), H.cauHoi);
    setTimeout(function () { $("#nameInput").focus(); }, reduce ? 0 : 250);
  }
  function closeName() {
    dlg.classList.remove("is-open");
    setTimeout(function () { dlg.hidden = true; go("mood"); }, reduce ? 0 : 300);
  }
  $("#nameForm").addEventListener("submit", function (e) {
    e.preventDefault(); if (closing) return;
    var v = $("#nameInput").value.replace(/\s+/g, " ").trim();
    if (!v) return skipName();
    closing = true; ten = v;
    if (!$("#pcName").value.trim()) $("#pcName").value = v;           // điền sẵn ô tên của postcard
    closeName();
  });
  function skipName() {
    if (closing) return; closing = true; ten = "";
    type($("#nameQ"), H.loiBoQua).then(function () { setTimeout(closeName, reduce ? 700 : 800); });
  }
  $("#nameSkip").addEventListener("click", skipName);
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); skipName(); }
    if (e.key === "Tab") {                                              // giữ phím Tab trong hộp thoại
      var f = [$("#nameInput"), $("#nameOk"), $("#nameSkip")], i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    }
  });

  /* ---------- ba tâm trạng ---------- */
  var track = $("#track");
  C.nhanh.forEach(function (n, i) {
    var p = el("div", "panel" + (i === 0 ? " is-active" : ""));
    p.tabIndex = 0; p.dataset.id = n.id;
    p.style.setProperty("--p", n.mauNhanh); p.style.setProperty("--p-soft", n.mauNhat);
    p.setAttribute("aria-label", n.tamTrang);
    p.innerHTML =
      '<div class="panel-mini" aria-hidden="true"><span>' + esc(n.nhanNgan) + '</span><img src="' + src(n.hinhChon) + '" alt=""></div>' +
      '<div class="panel-full"><img src="' + src(n.hinhChon) + '" alt=""><div class="txt">' +
      '<span class="tag">' + esc(n.ten) + '</span><h3>' + esc(n.tamTrang) + '</h3><p>' + esc(n.goiY) + '</p>' +
      '<button class="btn" data-choose="' + n.id + '">' + esc(C.chonTamTrang.nutChon) + '</button></div></div>';
    track.appendChild(p);
  });
  function activate(p) { track.querySelectorAll(".panel").forEach(function (x) { x.classList.toggle("is-active", x === p); }); }
  track.querySelectorAll(".panel").forEach(function (p) {
    p.addEventListener("mouseenter", function () { if (innerWidth > 760) activate(p); });
    p.addEventListener("focusin", function () { if (innerWidth > 760) activate(p); });
    p.addEventListener("click", function () { if (innerWidth > 760) activate(p); });
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-choose]"); if (b) { e.stopPropagation(); choose(b.dataset.choose); return; }
    var g = e.target.closest("[data-go]"); if (g) go(g.dataset.go);
  });
  function go(id) {
    var t = document.getElementById(id); if (!t) return;
    t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  /* ---------- chọn một nhánh ---------- */
  function current() { return C.nhanh.filter(function (n) { return n.id === state.nhanh; })[0]; }
  function choose(id) {
    state.nhanh = id; state.msg = 0;
    var n = current(), J = $("#journey");
    if (S.visited.indexOf(id) < 0) S.visited.push(id);
    if (!S.flips[id]) S.flips[id] = [];
    state.flipped = S.flips[id].length;                                // giữ tiến độ khi quay lại nhánh
    closeStamps(); $("#stampFab").hidden = false; $("#reward").hidden = true;
    if (ten && !$("#pcName").value.trim()) $("#pcName").value = ten;
    J.hidden = false;
    J.style.setProperty("--c", n.mauNhanh); J.style.setProperty("--c-soft", n.mauNhat);
    // câu chuyện
    $("#storyPill").textContent = n.ten;
    $("#storyTitle").textContent = n.tieuDeChuyen;
    $("#storySen").alt = "Bé Sen";
    var ph = $("#storyPhoto");
    ph.innerHTML = n.anh
      ? '<img src="' + src(n.anh) + '" alt="' + esc(n.chuThichAnh || n.tieuDeChuyen) + '">' + (n.chuThichAnh ? '<figcaption>' + esc(n.chuThichAnh) + '</figcaption>' : "")
      : scene(n.canh, n.id.length * 13) + '<figcaption>' + esc(n.moTaAnh) + '</figcaption>';
    $("#storyText").innerHTML = n.doanChuyen.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    // thẻ bật mí
    var tk = $("#tickets"); tk.innerHTML = "";
    n.batMi.forEach(function (b, bi) {
      var t = el("button", "ticket"), ok = hasImg(b.anh);
      t.setAttribute("aria-pressed", "false");
      t.innerHTML = '<span class="ticket-in"><span class="face face-front' + (ok ? ' has-photo' : '') + '">' +
        (ok ? '' : '<span class="ph-note">' + esc(phText(b)) + '</span>') +
        '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40C14 34 10 24 12 14c6 2 10 6 12 12 2-6 6-10 12-12 2 10-2 20-12 26Z" fill="#fff" fill-opacity=".9"/><path d="M24 40c-4-6-5-14-0-24 5 10 4 18 0 24Z" fill="#fff"/></svg>' +
        '<b>' + esc(b.tieuDe) + '</b><small>' + esc(C.batMi.nhacLat) + '</small></span>' +
        '<span class="face face-back"><b>' + esc(b.tieuDe) + '</b><p>' + esc(b.noiDung) + '</p>' + (ok ? '<span class="back-photo"></span>' : '') + '</span></span>';
      if (ok) t.querySelector(".face-front").style.backgroundImage =
        'linear-gradient(to top, rgba(20,30,20,.78), rgba(20,30,20,.05) 62%), url("' + src(b.anh) + '")';
      if (ok) t.querySelector(".back-photo").style.backgroundImage = 'url("' + src(b.anh) + '")';
      t.addEventListener("click", function () {
        var on = !t.classList.contains("is-flipped");
        t.classList.toggle("is-flipped", on); t.setAttribute("aria-pressed", on);
        if (on && !t.dataset.seen) {
          t.dataset.seen = 1; state.flipped++;
          if (S.flips[n.id].indexOf(bi) < 0) S.flips[n.id].push(bi);   // nhớ thẻ đã lật để tổng kết
          updateFlips(true);
        }
      });
      if (S.flips[n.id].indexOf(bi) >= 0) {                              // thẻ đã lật ở lần trước
        t.dataset.seen = 1; t.classList.add("is-flipped"); t.setAttribute("aria-pressed", "true");
      }
      tk.appendChild(t);
    });
    updateFlips(false);
    // postcard
    buildTpls(); buildPostcardChoices(); drawPostcard();
    $("#again").hidden = true;
    $("#pcFallback").hidden = true; $("#pcCanvas").hidden = false;
    // Bé Sen phản hồi
    requestAnimationFrame(function () {
      go("story");
      setTimeout(function () {
        popImg($("#storySen"), n.hinhPhanHoi);
        sayLines($("#storyBubble"), n.loiSen.map(function (l) { return T(l); }));
      }, reduce ? 0 : 450);
    });
  }
  function updateFlips(fromClick) {
    var n = current(), total = n.batMi.length, left = total - state.flipped;
    var t = state.flipped ? (C.batMi.daLat || "Đã lật") + " " + state.flipped + "/" + total : "";
    if (state.flipped && left > 0 && !S.stamps[n.id] && C.batMi.conLai) t += " · " + T(C.batMi.conLai, { n: left, tem: n.nhanNgan });
    $("#flipCount").textContent = t;
    if (state.flipped === total) complete(fromClick);
  }

  /* ---------- lật hết thẻ: nhận tem + bí mật nhỏ ---------- */
  function complete(fromClick) {
    var n = current(), first = !S.stamps[n.id];
    if (first) S.stamps[n.id] = true;                                  // không nhận tem trùng
    $("#reward").hidden = false;
    var box = $("#rewardStamp"), st = stampEl(n, true);
    box.innerHTML = ""; if (first) st.classList.add("is-new"); box.appendChild(st);
    $("#rewardNote").textContent = T(first ? ST.vuaNhan : ST.daCo, { tem: n.nhanNgan });
    popImg($("#secretImg"), n.biMat.hinh);
    typing.set($("#secretText"), {}); $("#secretText").textContent = "";   // dừng lần gõ trước
    setTimeout(function () { type($("#secretText"), T(n.biMat.loi)); }, reduce ? 0 : 900);
    updateStamps(first);
    $("#rewardGo").hidden = !allStamps(); $("#rewardGo").textContent = C.ketThuc.nutDacBiet;
    if (first && allStamps()) state.tpl = "dacbiet";                   // vừa đủ 3 tem: chọn sẵn mẫu đặc biệt
    if (!first) { buildTpls(); buildPostcardChoices(); drawPostcard(); if (fromClick) say(C.nhacNho.latHet, "sen-trieu-like"); return; }
    if (allStamps()) say(T(ST.duTem), ST.hinhDuTem, 2);
    else say(T(ST.nhanTem, { tem: n.nhanNgan }), ST.hinhNhanTem, 2);
    buildTpls(); buildPostcardChoices(); drawPostcard();
  }
  function goSpecial() { closeStamps(); setTpl("dacbiet"); go("postcard"); }
  $("#rewardGo").addEventListener("click", goSpecial);
  $("#stampGo").addEventListener("click", goSpecial);

  /* ---------- sổ tem ---------- */
  function stampEl(n, earned) {
    var d = el("div", "stamp" + (earned ? " is-earned" : ""));
    d.style.setProperty("--p", n.mauNhanh); d.style.setProperty("--p-soft", n.mauNhat);
    d.setAttribute("role", "img");
    d.setAttribute("aria-label", "Tem " + n.nhanNgan + ": " + (earned ? ST.daNhan : ST.chuaNhan));
    d.innerHTML = '<span class="stamp-face"><img src="' + src(n.hinhChon) + '" alt=""><b>' + esc(n.nhanNgan) + '</b></span>';
    return d;
  }
  function renderBook(box, withButtons) {
    box.innerHTML = "";
    C.nhanh.forEach(function (n) {
      var on = !!S.stamps[n.id], it = el("div", "stamp-item");
      it.appendChild(stampEl(n, on));
      it.appendChild(el("small", "", esc(on ? ST.daNhan : ST.chuaNhan)));
      if (!on && withButtons) {
        var b = el("button", "btn btn-ghost btn-sm"); b.dataset.choose = n.id; b.textContent = ST.diToi;
        b.style.setProperty("--c", n.mauNhanh); it.appendChild(b);
      }
      box.appendChild(it);
    });
  }
  var fab = $("#stampFab"), panel = $("#stampPanel");
  function updateStamps(bump) {
    $("#stampFabText").textContent = ST.nut + " " + stampCount() + "/" + C.nhanh.length;
    renderBook($("#stampList"), true);
    $("#stampGo").hidden = !allStamps() || !state.nhanh; $("#stampGo").textContent = C.ketThuc.nutDacBiet;
    if (bump && !reduce) { fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump"); }
  }
  function openStamps() {
    renderBook($("#stampList"), true); guideHide();
    panel.hidden = false; fab.setAttribute("aria-expanded", "true"); $("#stampClose").focus();
  }
  function closeStamps() { if (panel.hidden) return; panel.hidden = true; fab.setAttribute("aria-expanded", "false"); }
  fab.addEventListener("click", function (e) { e.stopPropagation(); if (panel.hidden) openStamps(); else { closeStamps(); fab.focus(); } });
  $("#stampClose").addEventListener("click", function () { closeStamps(); fab.focus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { closeStamps(); fab.focus(); } });
  document.addEventListener("click", function (e) { if (!panel.hidden && !panel.contains(e.target)) closeStamps(); });
  updateStamps(false);
  // ẩn nút sổ tem khi phần kết hoặc chân trang đang hiện trên màn hình
  var away = {};
  var fabIo = new IntersectionObserver(function (es) {
    es.forEach(function (e) { away[e.target.id || "foot"] = e.isIntersecting; });
    document.body.classList.toggle("fab-away", !!(away.again || away.foot));
  }, { threshold: .15 });
  fabIo.observe($("#again")); fabIo.observe($(".footer"));

  /* ---------- postcard ---------- */
  function special() { return state.tpl === "dacbiet" && allStamps(); }
  function messages() { return special() ? D.loiNhan : current().loiNhan; }
  function buildTpls() {
    var box = $("#pcTpls"), ok = allStamps();
    if (!ok) state.tpl = "thuong";
    box.innerHTML = "";
    [["thuong", D.mauThuong], ["dacbiet", D.mauDacBiet]].forEach(function (t) {
      var locked = t[0] === "dacbiet" && !ok, b = el("button", "tpl" + (t[0] === "dacbiet" ? " tpl-special" : ""));
      b.setAttribute("role", "radio"); b.setAttribute("aria-checked", state.tpl === t[0]);
      b.innerHTML = '<span>' + esc(t[1]) + '</span>' + (locked ? '<small>' + esc(D.khoa) + '</small>' : '');
      if (locked) b.disabled = true;
      b.addEventListener("click", function () { setTpl(t[0]); });
      box.appendChild(b);
    });
  }
  function setTpl(t) { state.tpl = t; state.msg = 0; buildTpls(); buildPostcardChoices(); drawPostcard(); }
  function buildPostcardChoices() {
    var n = current(), poses = $("#pcPoses"), msgs = $("#pcMsgs");
    $("#pcPoseBox").hidden = special();                                 // mẫu đặc biệt: Sen đã có trong 3 con tem
    poses.innerHTML = ""; msgs.innerHTML = "";
    P.dangSen.forEach(function (key, i) {
      var b = el("button", "pose"); b.setAttribute("role", "radio"); b.setAttribute("aria-checked", i === state.pose);
      b.setAttribute("aria-label", "Dáng " + (i + 1)); b.innerHTML = '<img src="' + src(key) + '" alt="">';
      b.addEventListener("click", function () { state.pose = i; mark(poses, i); drawPostcard(); });
      poses.appendChild(b);
    });
    messages().forEach(function (m, i) {
      var b = el("button", "msg"); b.setAttribute("role", "radio"); b.setAttribute("aria-checked", i === state.msg); b.textContent = m;
      b.addEventListener("click", function () { state.msg = i; mark(msgs, i); drawPostcard(); });
      msgs.appendChild(b);
    });
  }
  function mark(box, i) { Array.prototype.forEach.call(box.children, function (c, j) { c.setAttribute("aria-checked", i === j); }); }

  var imgCache = {};
  function loadImg(s) {
    if (imgCache[s]) return imgCache[s];
    imgCache[s] = new Promise(function (res, rej) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = rej; im.src = s; });
    return imgCache[s];
  }
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function cover(ctx, im, x, y, w, h, fy) { var s = Math.max(w / im.width, h / im.height), iw = im.width * s, ih = im.height * s; ctx.drawImage(im, x + (w - iw) / 2, y + (h - ih) * (fy == null ? .5 : fy), iw, ih); }
  function wrap(ctx, text, maxW) {
    var words = text.split(" "), lines = [], line = "";
    words.forEach(function (w) { var t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line); return lines;
  }
  var drawSeq = 0, fontsReady = document.fonts ? Promise.all([
    document.fonts.load('400 60px "Pangolin"', "Gửi bạn ơi"), document.fonts.load('800 40px "Baloo 2"', "Đồng Tháp"),
    document.fonts.load('600 26px "Be Vietnam Pro"', "Có Bé Sen dẫn đường")]).catch(function () {}) : Promise.resolve();

  function drawPostcard() {
    var n = current(); if (!n) return Promise.resolve();
    if (special()) return drawSpecial();
    var my = ++drawSeq, cv = $("#pcCanvas"), ctx = cv.getContext("2d"), W = 1080, H = 1350;
    var pic = n.anhPostcard || null;
    var photoSrc = pic ? src(pic) : svgUri(scene(n.canh, n.id.length * 13));
    return Promise.all([fontsReady, loadImg(photoSrc), loadImg(src(P.dangSen[state.pose])), loadImg(src("logo-dong-thap"))]).then(function (r) {
      if (my !== drawSeq) return;
      var photo = r[1], sen = r[2], logo = r[3];
      var name = ($("#pcName").value || "").trim() || P.goiMacDinh;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#FFFDFB"; ctx.fillRect(0, 0, W, H);
      // ảnh
      var px = 56, py = 56, pw = W - 112, ph = 760;
      ctx.save(); rr(ctx, px, py, pw, ph, 36); ctx.clip(); cover(ctx, photo, px, py, pw, ph, pic ? .5 : .85);
      var gr = ctx.createLinearGradient(0, py + ph * .55, 0, py + ph); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(1, "rgba(255,255,255,.3)");
      ctx.fillStyle = gr; ctx.fillRect(px, py, pw, ph); ctx.restore();
      // logo góc trên trái
      ctx.save(); ctx.shadowColor = "rgba(0,0,0,.12)"; ctx.shadowBlur = 18; ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(px + 96, py + 96, 64, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.drawImage(logo, px + 96 - 56, py + 96 - 56, 112, 112);
      // tem góc trên phải
      var tx = W - px - 106, ty = py + 106;
      ctx.save(); ctx.translate(tx, ty); ctx.rotate(.12);
      ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.beginPath(); ctx.arc(0, 0, 80, 0, Math.PI * 2); ctx.fill();
      ctx.setLineDash([8, 7]); ctx.lineWidth = 3; ctx.strokeStyle = n.mauNhanh; ctx.beginPath(); ctx.arc(0, 0, 68, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = n.mauNhanh; ctx.textAlign = "center";
      ctx.font = '600 22px "Be Vietnam Pro", sans-serif'; ctx.fillText(P.tem[0], 0, -6);
      ctx.font = '800 27px "Baloo 2", sans-serif'; ctx.fillText(P.tem[1], 0, 26); ctx.restore();
      // Bé Sen, chồm lên mép dưới ảnh
      var sh = 360, sw = sen.width * sh / sen.height; if (sw > 400) { sw = 400; sh = sen.height * sw / sen.width; }
      var senBottom = py + ph + 96;
      ctx.save(); ctx.shadowColor = "rgba(30,74,43,.25)"; ctx.shadowBlur = 24; ctx.shadowOffsetY = 12;
      ctx.drawImage(sen, W - 70 - sw, senBottom - sh, sw, sh); ctx.restore();
      // lời chào (bên trái Bé Sen)
      var left = 96, y = py + ph + 92;
      ctx.textAlign = "left"; ctx.fillStyle = M.laDam;
      var greet = P.gui + " " + name + ",", maxGreet = W - left - sw - 90, fs = 60;
      ctx.font = '400 ' + fs + 'px "Pangolin", cursive';
      while (ctx.measureText(greet).width > maxGreet && fs > 30) { fs -= 2; ctx.font = '400 ' + fs + 'px "Pangolin", cursive'; }
      // tên rất dài: cắt bớt và thêm "…" để không đè lên Bé Sen
      if (ctx.measureText(greet).width > maxGreet) {
        var cut = Array.from(name);
        while (cut.length > 1 && ctx.measureText(P.gui + " " + cut.join("") + "…,").width > maxGreet) cut.pop();
        greet = P.gui + " " + cut.join("").trim() + "…,";
      }
      ctx.fillText(greet, left, y);
      // lời nhắn: nằm dưới Bé Sen nên dùng hết bề ngang, tự thu nhỏ chữ nếu dài
      var msgW = W - left * 2, ms = 48, lines, lh;
      do { ctx.font = '400 ' + ms + 'px "Pangolin", cursive'; lines = wrap(ctx, messages()[state.msg], msgW); lh = Math.round(ms * 1.32); ms -= 2; }
      while (lines.length * lh > 200 && ms > 30);
      ctx.fillStyle = "#35553C";
      var my0 = Math.max(y + 74, senBottom + 50);
      lines.forEach(function (l, i) { ctx.fillText(l, left, my0 + i * lh); });
      ctx.font = '400 40px "Pangolin", cursive'; ctx.fillStyle = n.mauNhanh;
      ctx.fillText(P.chuKy, left, my0 + (lines.length - 1) * lh + 72);
      // chân postcard
      ctx.strokeStyle = "#F0E2E8"; ctx.lineWidth = 2; ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(56, H - 104); ctx.lineTo(W - 56, H - 104); ctx.stroke();
      ctx.font = '600 26px "Be Vietnam Pro", sans-serif'; ctx.fillStyle = M.laDam; ctx.fillText(P.chanTrai, left, H - 56);
      ctx.textAlign = "right"; ctx.fillStyle = n.mauNhanh; ctx.font = '800 32px "Baloo 2", sans-serif'; ctx.fillText(P.chanPhai, W - left, H - 54);
    });
  }
  // con tem vẽ trên canvas: giấy trắng có răng cưa, khung màu nhánh, sticker Bé Sen và tên nhánh
  function drawStamp(ctx, cx, cy, w, h, rot, n, img) {
    var pad = 12, oc = document.createElement("canvas"), o = oc.getContext("2d");
    oc.width = w + pad * 2; oc.height = h + pad * 2; o.translate(pad, pad);
    o.fillStyle = "#FFFFFF"; o.fillRect(0, 0, w, h);
    o.globalCompositeOperation = "destination-out";                   // đục lỗ răng cưa
    var r = 8, k, nx = Math.round(w / 24), ny = Math.round(h / 24);
    for (k = 0; k <= nx; k++) { o.beginPath(); o.arc(k * w / nx, 0, r, 0, 7); o.arc(k * w / nx, h, r, 0, 7); o.fill(); }
    for (k = 0; k <= ny; k++) { o.beginPath(); o.arc(0, k * h / ny, r, 0, 7); o.arc(w, k * h / ny, r, 0, 7); o.fill(); }
    o.globalCompositeOperation = "source-over";
    var ix = 16, iy = 16, iw = w - 32, ih = h - 32, band = 52;
    o.fillStyle = n.mauNhat; rr(o, ix, iy, iw, ih, 10); o.fill();
    o.fillStyle = n.mauNhanh; rr(o, ix, iy + ih - band, iw, band, 10); o.fill(); o.fillRect(ix, iy + ih - band, iw, 12);
    var sh = ih - band - 20, sw = img.width * sh / img.height; if (sw > iw - 20) { sw = iw - 20; sh = img.height * sw / img.width; }
    o.drawImage(img, ix + (iw - sw) / 2, iy + 10 + (ih - band - 20 - sh) / 2, sw, sh);
    o.fillStyle = "#FFFFFF"; o.textAlign = "center"; var fs = 30;
    o.font = '800 ' + fs + 'px "Baloo 2", sans-serif';
    while (o.measureText(n.nhanNgan).width > iw - 16 && fs > 18) { fs -= 2; o.font = '800 ' + fs + 'px "Baloo 2", sans-serif'; }
    o.fillText(n.nhanNgan, ix + iw / 2, iy + ih - band / 2 + fs * .36);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
    ctx.shadowColor = "rgba(30,74,43,.28)"; ctx.shadowBlur = 22; ctx.shadowOffsetY = 10;
    ctx.drawImage(oc, -oc.width / 2, -oc.height / 2); ctx.restore();
  }
  // postcard đặc biệt (đủ 3 tem): ảnh đồng sen, tiêu đề, 3 con tem, lời nhắn riêng
  function drawSpecial() {
    var my = ++drawSeq, cv = $("#pcCanvas"), ctx = cv.getContext("2d"), W = 1080, H = 1350;
    var keys = [src(D.anh), src("logo-dong-thap")].concat(C.nhanh.map(function (n) { return src(n.hinhChon); }));
    return Promise.all([fontsReady].concat(keys.map(loadImg))).then(function (r) {
      if (my !== drawSeq) return;
      var photo = r[1], logo = r[2], stickers = r.slice(3);
      var name = ($("#pcName").value || "").trim() || P.goiMacDinh;
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#FFFDFB"; ctx.fillRect(0, 0, W, H);
      var px = 56, py = 56, pw = W - 112, ph = 640;
      ctx.save(); rr(ctx, px, py, pw, ph, 36); ctx.clip(); cover(ctx, photo, px, py, pw, ph, .5);
      var gr = ctx.createLinearGradient(0, py + ph * .3, 0, py + ph);
      gr.addColorStop(0, "rgba(20,45,28,0)"); gr.addColorStop(1, "rgba(20,45,28,.72)");
      ctx.fillStyle = gr; ctx.fillRect(px, py, pw, ph); ctx.restore();
      ctx.save(); ctx.shadowColor = "rgba(0,0,0,.12)"; ctx.shadowBlur = 18; ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(px + 96, py + 96, 64, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.drawImage(logo, px + 96 - 56, py + 96 - 56, 112, 112);
      // tiêu đề trên ảnh, phía trên hàng tem
      var tfs = 66, tl;
      do { ctx.font = '800 ' + tfs + 'px "Baloo 2", sans-serif'; tl = wrap(ctx, D.tieuDe, pw - 120); tfs -= 2; } while (tl.length > 2 && tfs > 40);
      ctx.save(); ctx.fillStyle = "#FFFFFF"; ctx.textAlign = "center"; ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 16;
      var tlh = Math.round((tfs + 2) * 1.02), tBase = py + ph - 150;
      tl.forEach(function (l, i) { ctx.fillText(l, W / 2, tBase - (tl.length - 1 - i) * tlh); });
      ctx.restore();
      // 3 con tem đè lên mép dưới ảnh
      var sw = 206, sh = 244, rots = [-.09, .03, .08];
      C.nhanh.forEach(function (n, i) { drawStamp(ctx, W / 2 + (i - 1) * 262, py + ph + 18, sw, sh, rots[i], n, stickers[i]); });
      // lời chào + lời nhắn
      var left = 96, maxW = W - left * 2, y = py + ph + 18 + sh / 2 + 88;
      ctx.textAlign = "left"; ctx.fillStyle = M.laDam;
      var greet = P.gui + " " + name + ",", fs = 58;
      ctx.font = '400 ' + fs + 'px "Pangolin", cursive';
      while (ctx.measureText(greet).width > maxW && fs > 34) { fs -= 2; ctx.font = '400 ' + fs + 'px "Pangolin", cursive'; }
      ctx.fillText(greet, left, y);
      var ms = 46, lines, lh;
      do { ctx.font = '400 ' + ms + 'px "Pangolin", cursive'; lines = wrap(ctx, messages()[state.msg], maxW); lh = Math.round(ms * 1.3); ms -= 2; }
      while (lines.length * lh > 180 && ms > 30);
      ctx.fillStyle = "#35553C";
      var m0 = y + 68;
      lines.forEach(function (l, i) { ctx.fillText(l, left, m0 + i * lh); });
      ctx.font = '400 40px "Pangolin", cursive'; ctx.fillStyle = M.sen;
      ctx.fillText(P.chuKy, left, m0 + (lines.length - 1) * lh + 66);
      ctx.strokeStyle = "#F0E2E8"; ctx.lineWidth = 2; ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(56, H - 104); ctx.lineTo(W - 56, H - 104); ctx.stroke();
      ctx.font = '600 26px "Be Vietnam Pro", sans-serif'; ctx.fillStyle = M.laDam; ctx.fillText(P.chanTrai, left, H - 56);
      ctx.textAlign = "right"; ctx.fillStyle = M.sen; ctx.font = '800 32px "Baloo 2", sans-serif'; ctx.fillText(P.chanPhai, W - left, H - 54);
    });
  }
  var t0; $("#pcName").addEventListener("input", function () { clearTimeout(t0); t0 = setTimeout(drawPostcard, 120); });
  $("#pcName").addEventListener("focus", function () { say(ten && $("#pcName").value.trim() ? C.nhacNho.postcardCoTen : C.nhacNho.postcard); }, { once: true });

  function slug(s) { return (s || "ban").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "ban"; }
  $("#pcDownload").addEventListener("click", function () {
    drawPostcard().then(function () {
      var cv = $("#pcCanvas"), name = (special() ? "postcard-dac-biet-be-sen-" : "postcard-be-sen-") + slug($("#pcName").value.trim()) + ".png";
      try {
        cv.toBlob(function (blob) {
          if (!blob) return fail();
          var url = URL.createObjectURL(blob), a = document.createElement("a");
          a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          done();
        }, "image/png");
      } catch (e) { fail(); }
    });
  });
  function fail() {
    try { var fb = $("#pcFallback"); fb.src = $("#pcCanvas").toDataURL("image/png"); fb.hidden = false; $("#pcCanvas").hidden = true; } catch (e) {}
    $("#pcNote").textContent = P.loiTai;
  }
  function done() {
    S.postcards++;
    say(C.nhacNho.taiXong, "sen-trieu-like");
    showEnd(reduce ? 0 : 900);
  }
  $("#pcEnd").addEventListener("click", function () { showEnd(0); });
  // câu tổng kết lấy từ dữ liệu thật của phiên: nhánh đã đi, thẻ đã lật, có tải postcard hay không
  function summary() {
    var G = C.tongKet;
    var lists = S.visited.map(function (id) {
      var n = byId(id), f = S.flips[id] || [];
      return f.length ? f.map(function (i) { return n.batMi[i].cumTu || n.batMi[i].tieuDe; }) : [n.cumTuGhe];
    });
    var total = lists.reduce(function (a, l) { return a + l.length; }, 0), pick = [], round = 0, max = Math.min(G.toiDa, total);
    while (pick.length < max) {                                          // lấy xen kẽ giữa các nhánh
      lists.forEach(function (l) { if (round < l.length && pick.length < max) pick.push(l[round]); });
      round++;
    }
    var rest = total - pick.length, phrase;
    if (rest > 0) phrase = pick.join(G.phay) + T(G.conLai, { n: rest });
    else if (pick.length === 1) phrase = pick[0];
    else phrase = pick.slice(0, -1).join(G.phay) + G.va + pick[pick.length - 1];
    var c = stampCount(), all = C.nhanh.length;
    return [T(G.moDau, { cacCumTu: phrase }),
            S.postcards ? G.coPostcard : G.chuaPostcard,
            c === all ? G.duTem : c ? T(G.thieuTem, { x: c, y: all - c }) : G.chuaTem].join(" ");
  }
  function showEnd(delay) {
    var K = C.ketThuc, c = stampCount(), left = C.nhanh.length - c;
    $("#againLead").textContent = left === 0 ? K.moTaDuTem : left === 1 ? K.moTaCon1 : left === 2 ? K.moTaCon2 : K.moTaChuaTem;
    $("#againSum").textContent = summary();
    renderBook($("#againStamps"), false);
    var box = $("#againChoices"); box.innerHTML = "";
    if (left === 0) {
      var sp = el("button", "btn btn-sen"); sp.textContent = K.nutDacBiet;
      sp.addEventListener("click", goSpecial);
      box.appendChild(sp);
    }
    C.nhanh.forEach(function (n) {                                       // nút sang các nhánh chưa có tem
      if (S.stamps[n.id]) return;
      var b = el("button", "btn btn-ghost"); b.dataset.choose = n.id; b.textContent = n.tamTrang; box.appendChild(b);
    });
    var r = el("button", left === 0 ? "btn btn-ghost" : "btn btn-sen"); r.dataset.go = "mood"; r.textContent = K.nutTuDau; box.appendChild(r);
    $("#again").hidden = false;
    setTimeout(function () { go("again"); }, delay);
  }

  /* ---------- hiện dần khi cuộn tới, và lời nhắc theo phần ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target;
      if (t.classList.contains("split")) { t.classList.add("is-in"); io.unobserve(t); }
      if (t.id === "mood" && dlg.hidden) say(T(C.nhacNho.tamTrang), C.nhacNho.hinh);
      if (t.id === "secrets" && state.flipped === 0) say(C.nhacNho.batMi, "sen-liu-liu");
      if (t.id === "story" && state.nhanh) setTimeout(function () { say(C.nhacNho.cauChuyen, C.nhacNho.hinh); }, 4000);
    });
  }, { threshold: .35 });
  io.observe($("#moodTitle")); io.observe($("#mood")); io.observe($("#secrets")); io.observe($("#story"));
  // ẩn lời nhắc khi về đầu trang
  new IntersectionObserver(function (es) { if (es[0].isIntersecting && !guide.hidden) guideHide(); }, { threshold: .6 }).observe($("#hero"));

  /* ---------- mở màn ---------- */
  function startIntro() {
    if (reduce) { document.body.classList.remove("intro"); $("#heroTitle").classList.add("is-in"); $("#backdrop").remove(); sayLines($("#heroBubble"), C.moDau.loiChao); return; }
    setTimeout(function () {
      document.body.classList.add("play");
      $("#heroTitle").classList.add("is-in");
      setTimeout(function () {
        document.body.classList.remove("intro", "play");
        $("#backdrop").remove();
        sayLines($("#heroBubble"), C.moDau.loiChao);
      }, 1700);
    }, 250);
  }
  // giữ hiệu ứng intro: chỉ bật class transition sau khi có class intro
  window.addEventListener("load", startIntro);
  window.__senDebug = { choose: choose, drawPostcard: drawPostcard, state: state, session: S, T: T, summary: summary, setName: function (v) { ten = v; } };
})();
