// ==========================================
// ===== مخزن بيانات القوالب (عدل هنا) =====
// ==========================================
const isEnglish = window.location.pathname.includes('index-en.html') || document.documentElement.lang === 'en';
const templatesData = window.templatesData || [];
// if (typeof templatesData === 'undefined') {
//   var templatesData = [];
// }
(function () {
  "use strict";

  // ===== Sticky header shadow =====
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Favorites toggle =====
  document.querySelectorAll(".favorite").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");
    });
  });
  // ==========================================
  // ===== توليد الكروت والفلترة =====
  // ==========================================
  const templateGrid = document.getElementById("templateGrid");
  const tabs = document.querySelectorAll(".category-tabs button");
  const searchInput = document.getElementById("searchInput");
  const resultsCount = document.getElementById("resultsCount");
  let activeFilter = "all";

  // دالة رسم الكروت في الصفحة
  function renderTemplates() {
    templateGrid.innerHTML = ""; // نفضي المكان الأول

    templatesData.forEach((tpl) => {
      // تجهيز الشارة (Badge)
      let badgeHTML = "";
      if (tpl.badge) {
        const badgeClass = tpl.badgeType === "new" ? "badge-new" : "";
        badgeHTML = `<span class="card-badge ${badgeClass}">${tpl.badge}</span>`;
      }

      // تجهيز السعر القديم لو موجود
      const oldPriceHTML = tpl.oldPrice ? `<del>${tpl.oldPrice}</del>` : "";

      // تجهيز المميزات
      const featuresHTML = tpl.features
        .map(
          (f) => `
        <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${f}</span>
      `,
        )
        .join("");

      // بناء شكل الكارت بالكامل
      const cardHTML = `
        <article class="template-card" data-category="${tpl.category}" data-name="${tpl.name} ${tpl.subtitle}" data-id="${tpl.id}">
          <div class="card-visual">
                       <div class="template-preview ${tpl.previewClass}" aria-label="معاينة تصميم ${tpl.name}" style="position:relative; overflow:hidden; padding:0;">

              ${
                tpl.imageUrl
                  ? `
                <!-- لو في صورة -->
                <img src="${tpl.imageUrl}" alt="${tpl.name}" style="width:100%; height:100%; object-fit:cover; object-position:top; position:absolute; inset:0; z-index:10;" loading="lazy" />
              `
                  : `
                <!-- لو مفيش صورة (التصميم الافتراضي) -->
                <div style="padding:16px; position:absolute; inset:0; display:flex; flex-direction:column; z-index:1;">
                  <div class="preview-top">
                    <span class="preview-brand"><span class="preview-mark">✳</span>${tpl.name}</span>
                    <span class="preview-menu"><i></i><i></i><i></i></span>
                  </div>
                  <div class="preview-content">
                    <span class="preview-kicker">عيادة متخصصة · رعاية تثق بها</span>
                    <strong>${tpl.title}</strong>
                    <span class="preview-sub">خبرة طبية، واهتمام يبدأ من أول زيارة</span>
                    <span class="preview-button">احجز موعدك <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></span>
                  </div>
                  <div class="preview-art"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-dot"></div><div class="art-leaf">✳</div></div>
                  <div class="preview-bottom"><span>الرئيسية　 الخدمات　 الأطباء</span><span class="preview-star">★★★★★</span></div>
                </div>
              `
              }
            </div>

            ${badgeHTML}

            <button class="favorite" aria-label="إضافة ${tpl.name} للمفضلة">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
            </button>

            <button class="preview-action" onclick="showQuickView(this)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                ${isEnglish ? 'Live Preview' : 'معاينة مباشرة'}
            </button>
          </div>

          <div class="card-body">
            <div class="card-category">${tpl.categoryLabel}<span class="rating">★ ${tpl.rating}</span></div>
            <div class="card-title-row">
              <div><h3>${tpl.name}</h3><p>${tpl.subtitle}</p></div>
              <div class="price">${tpl.price}<small> ر.س</small>${oldPriceHTML}</div>
            </div>
            <div class="feature-list">
              ${featuresHTML}
            </div>
            <div class="card-footer">
              <a href="details.html?id=${tpl.id}" class="button button-dark" style="text-decoration:none;">${isEnglish ? 'View Details' : 'عرض التفاصيل'}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></a>
              <a href="${tpl.link}" target="_blank" rel="noreferrer" class="demo-link">${isEnglish ? 'Live Preview' : 'معاينة مباشرة'}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></a>
            </div>
          </div>
        </article>
      `;

      templateGrid.insertAdjacentHTML("beforeend", cardHTML);
    });

    // إعادة ربط أزرار المفضلة الجديدة
    document.querySelectorAll(".favorite").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.classList.toggle("active");
      });
    });

    applyFilters(); // نطبق الفلتر لو في كلمة بحث
  }

  // دالة الفلترة والبحث (محدثة)
  function applyFilters() {
    const cards = document.querySelectorAll(".template-card");
    const q = (searchInput.value || "").trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const cat = card.dataset.category;
      const name = (card.dataset.name || "").toLowerCase();
      const categoryLabel = (
        card.querySelector(".card-category")?.textContent || ""
      ).toLowerCase();

      const matchCat = activeFilter === "all" || cat === activeFilter;
      const matchSearch = !q || name.includes(q) || categoryLabel.includes(q);

      if (matchCat && matchSearch) {
        card.classList.remove("hiding");
        visibleCount++;
        setTimeout(() => {
          card.style.display = "";
        }, 10);
      } else {
        card.classList.add("hiding");
        setTimeout(() => {
          if (card.classList.contains("hiding")) card.style.display = "none";
        }, 300);
      }
    });

    resultsCount.textContent =
      visibleCount + " " + (visibleCount === 1 ? "قالب" : "قوالب");

    let empty = document.getElementById("emptyState");
    if (!empty) {
      empty = document.createElement("div");
      empty.id = "emptyState";
      empty.style.cssText =
        "grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--muted);font-size:15px;";
      empty.textContent =
        "لا توجد قوالب مطابقة. جرّب كلمة بحث أخرى أو تخصصاً مختلفاً.";
      templateGrid.appendChild(empty);
    }
    empty.style.display = visibleCount === 0 ? "" : "none";
  }

  // تفعيل الفلاتر
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("tab-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("tab-active");
      tab.setAttribute("aria-selected", "true");
      activeFilter = tab.dataset.filter;
      applyFilters();
    });
  });

  // تفعيل البحث
  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 120);
  });

  // دالة اختيار قالب (لزر عرض التفاصيل)
  window.selectTemplate = function (name) {
    alert(
      "تم اختيار قالب " +
        name +
        " بنجاح! (تقدر هنا توديه لصفحة الدفع أو الطلب)",
    );
  };

  // تشغيل رسم الكروت أول ما الصفحة تفتح
  renderTemplates();
  // ⌘K / Ctrl+K focus search
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // ===== Smooth reveal on scroll =====
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    document
      .querySelectorAll(
        ".template-card, .benefits-grid article, .section-heading, .closing-cta",
      )
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
        io.observe(el);
      });
  }

  // ===== Mobile menu =====
  const mobileBtn = document.querySelector(".mobile-menu");
  const nav = document.querySelector(".main-nav");
  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = nav.style.display === "flex";
      if (isOpen) {
        nav.style.display = "";
      } else {
        nav.style.cssText =
          "display:flex;position:absolute;top:70px;right:16px;left:16px;flex-direction:column;gap:0;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:8px;box-shadow:0 20px 40px -20px rgba(30,91,74,.2);z-index:200;";
        nav.querySelectorAll("a").forEach((a) => {
          a.style.padding = "12px 16px";
          a.style.borderRadius = "10px";
        });
      }
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 820) nav.style.display = "";
      });
    });
  }

  // ===== Demo links =====
  document.querySelectorAll('a[href="#demo"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      if (!document.getElementById("demo")) {
        e.preventDefault();
        a.style.opacity = ".6";
        setTimeout(() => (a.style.opacity = ""), 220);
      }
    });
  });

  // ===== Feedback for details button =====
  document.querySelectorAll(".template-card .button-dark").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".template-card");
      const title = card.querySelector("h3")?.textContent || "القالب";
      const original = btn.innerHTML;
      btn.innerHTML = "تم اختيار " + title + " ✓";
      btn.style.background = "#154335";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
      }, 1400);
    });
  });

  // ===== "Add template" feedback =====
  document
    .querySelector(".add-template")
    ?.addEventListener("click", function () {
      const original = this.innerHTML;
      this.innerHTML = "قريباً ✓";
      this.style.borderColor = "#1e5b4a";
      this.style.color = "#1e5b4a";
      setTimeout(() => {
        this.innerHTML = original;
        this.style.borderColor = "";
        this.style.color = "";
      }, 1400);
    });
})();
// ===== إضافة تفاعل زر لوحة الإدارة =====
const adminBtn = document.getElementById("adminBtn");
if (adminBtn) {
  adminBtn.addEventListener("click", () => {
    alert("لوحة الإدارة قادمة قريباً في التحديث القادم!");
  });
}

// ===== إضافة نافذة "نظرة سريعة" للقوالب =====
window.showQuickView = function (btn) {
  // بنجيب بيانات الكارت اللي اتضغط عليه
  const card = btn.closest(".template-card");
  const title = card.querySelector("h3").textContent;
  const desc = card.querySelector(".card-title-row p").textContent;
  const price = card.querySelector(".price").textContent;
  const features = Array.from(card.querySelectorAll(".feature-list span")).map(
    (span) => span.textContent,
  );
  const previewClass = card.querySelector(".template-preview").className;

  // إنشاء نافذة منبثقة (Popup)
  const modalHTML = `
      <div id="quickViewModal" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;backdrop-filter:blur(4px);">
        <div class="modal-content" style="border-radius:20px;max-width:500px;width:100%;overflow:hidden;position:relative;text-align:right;" dir="rtl">

          <button onclick="document.getElementById('quickViewModal').remove()" style="position:absolute;top:15px;left:15px;background:#f3f4f6;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-weight:bold;font-size:18px;z-index:10;">✕</button>

          ${
            card.querySelector("img")
              ? `<div style="height:200px; width:100%; position:relative;">
     <img src="${card.querySelector("img").src}" style="width:100%; height:100%; object-fit:cover; object-position:top;" />
   </div>`
              : `<div class="${previewClass}" style="height:180px;position:relative;padding:20px;color:var(--primary);">
     <div style="position:absolute;top:20px;right:20px;font-weight:800;font-size:18px;">${title}</div>
   </div>`
          }
             <div style="position:absolute;top:20px;right:20px;font-weight:800;font-size:18px;">${title}</div>
          </div>

          <div style="padding:24px;">
            <h3 style="font-size:22px;font-weight:800;margin-bottom:8px;color:var(--primary)">${title}</h3>
            <p style="color:var(--ink-soft);margin-bottom:16px;">${desc}</p>

            <div style="background:#f7f9f8;padding:16px;border-radius:12px;margin-bottom:20px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <span style="font-weight:600;">السعر:</span>
                <span style="font-weight:800;color:var(--primary);">${price}</span>
              </div>
              <div style="font-weight:600;margin-bottom:8px;">المميزات:</div>
              <ul style="list-style:inside;color:var(--ink-soft);font-size:14px;">
                ${features.map((f) => `<li>${f}</li>`).join("")}
              </ul>
            </div>

            <button class="button button-primary" style="width:100%;justify-content:center;" onclick="document.getElementById('quickViewModal').remove()">إغلاق المعاينة</button>
          </div>
        </div>
      </div>
    `;

  // بنضيف النافذة للصفحة
  document.body.insertAdjacentHTML("beforeend", modalHTML);
};
// ===== FAQ Accordion =====
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    // لو السؤال مفتوح، اقفله
    if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
      answer.style.maxHeight = "0px";
      answer.style.paddingTop = "0";
      answer.style.paddingBottom = "0";
      icon.style.transform = "rotate(0deg)";
      item.style.borderColor = "var(--line)";
    } else {
      // اقفل باقي الأسئلة الأول
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.style.maxHeight = "0px";
        ans.style.paddingTop = "0";
        ans.style.paddingBottom = "0";
      });
      document.querySelectorAll(".faq-icon").forEach((ic) => {
        ic.style.transform = "rotate(0deg)";
      });
      document.querySelectorAll(".faq-item").forEach((it) => {
        it.style.borderColor = "var(--line)";
      });

      // افتح السؤال اللي اتضغط عليه
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.paddingTop = "0";
      answer.style.paddingBottom = "24px";
      icon.style.transform = "rotate(180deg)";
      item.style.borderColor = "var(--primary)";
    }
  });
});
function applyFilters() {
  const q = (searchInput.value || "").trim().toLowerCase();
  let visibleCount = 0;

  // 1. نضيف كلاس hiding للكروت اللي هتختفي
  cards.forEach((card) => {
    const cat = card.dataset.category;
    const name = (card.dataset.name || "").toLowerCase();
    const categoryLabel = (
      card.querySelector(".card-category")?.textContent || ""
    ).toLowerCase();

    const matchCat = activeFilter === "all" || cat === activeFilter;
    const matchSearch = !q || name.includes(q) || categoryLabel.includes(q);

    if (matchCat && matchSearch) {
      card.classList.remove("hiding");
      visibleCount++;
      setTimeout(() => {
        card.style.display = "";
      }, 10); // نظهرها بعد لحظة عشان الأنيميشن
    } else {
      card.classList.add("hiding");
      setTimeout(() => {
        if (card.classList.contains("hiding")) card.style.display = "none";
      }, 300); // نخفيها بعد ما الأنيميشن يخلص
    }
  });

  resultsCount.textContent =
    visibleCount + " " + (visibleCount === 1 ? "قالب" : "قوالب");

  // Empty state
  let empty = document.getElementById("emptyState");
  if (!empty) {
    empty = document.createElement("div");
    empty.id = "emptyState";
    empty.style.cssText =
      "grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--muted);font-size:15px;";
    empty.textContent =
      "لا توجد قوالب مطابقة. جرّب كلمة بحث أخرى أو تخصصاً مختلفاً.";
    document.getElementById("templateGrid").appendChild(empty);
  }
  empty.style.display = visibleCount === 0 ? "" : "none";
}
// ==========================================
// ===== الإضافات الجديدة (الخرافية) =====
// ==========================================

// 1. شاشة التحميل وأنيميشن الهيرو
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
    document.body.classList.add("loaded");
  }, 800); // ثانية إلا ربع
});

// 2. زر العودة للأعلى
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 3. الوضع الليلي (Dark Mode)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const htmlEl = document.documentElement;

// التحقق من الوضع المحفوظ
if (localStorage.getItem("theme") === "dark") {
  htmlEl.setAttribute("data-theme", "dark");
  themeIcon.innerHTML =
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
}

themeToggle.addEventListener("click", () => {
  const isDark = htmlEl.getAttribute("data-theme") === "dark";
  if (isDark) {
    htmlEl.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeIcon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  } else {
    htmlEl.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeIcon.innerHTML =
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
  }
});
  // 4. النظرة السريعة الاحترافية (Modal)
  window.showQuickView = function(btn) {
    const card = btn.closest('.template-card');
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('.card-title-row p').textContent;

    // إصلاح شكل السعر عشان ميبقاش ملخبط
    const priceElement = card.querySelector('.price');
    const mainPrice = priceElement.childNodes[0].textContent.trim(); // بيجيب 890
    const oldPriceEl = priceElement.querySelector('del');
    const oldPrice = oldPriceEl ? oldPriceEl.textContent : '';

    const features = Array.from(card.querySelectorAll('.feature-list span')).map(span => span.textContent);
    const previewClass = card.querySelector('.template-preview').className;

    // بنشوف لو في صورة ولا لأ
    const imgElement = card.querySelector('img');

    const modalHTML = `
      <div class="modal-overlay" id="quickViewModal" onclick="if(event.target === this) this.classList.remove('show'); setTimeout(()=>this.remove(), 300)">
        <div class="modal-content">
          <button onclick="document.getElementById('quickViewModal').classList.remove('show'); setTimeout(()=>document.getElementById('quickViewModal').remove(), 300)" style="position:absolute;top:15px;left:15px;background:var(--line-soft);border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-weight:bold;font-size:18px;z-index:10;color:var(--ink);box-shadow:0 2px 5px rgba(0,0,0,0.2);">✕</button>

          <!-- الجزء العلوي: صورة القالب -->
          ${imgElement ?
            `<div style="height:250px; width:100%; position:relative; background:#f3f4f6;">
               <img src="${imgElement.src}" style="width:100%; height:100%; object-fit:cover; object-position:top;" />
             </div>` :
            `<div class="${previewClass}" style="height:180px;position:relative;padding:20px;color:var(--primary);">
               <div style="position:absolute;top:20px;right:20px;font-weight:800;font-size:18px;">${title}</div>
             </div>`
          }

          <!-- الجزء السفلي: التفاصيل -->
          <div style="padding:24px;">
            <h3 style="font-size:22px;font-weight:800;margin-bottom:8px;color:var(--primary)">${title}</h3>
            <p style="color:var(--ink-soft);margin-bottom:16px;">${desc}</p>

            <div style="background:var(--section-bg);padding:16px;border-radius:12px;margin-bottom:20px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line-soft);">
                <span style="font-weight:700;color:var(--ink);">السعر:</span>
                <div style="text-align:left;">
                  <span style="font-weight:800;color:var(--primary);font-size:20px;font-family:var(--font-display);">${mainPrice}</span>
                  <small style="color:var(--muted);font-size:12px;"> ر.س</small>
                  ${oldPrice ? `<del style="color:var(--muted);font-size:12px;margin-right:8px;opacity:0.7;">${oldPrice} ر.س</del>` : ''}
                </div>
              </div>

              <div style="font-weight:700;margin-bottom:8px;color:var(--ink);">المميزات:</div>
              <ul style="list-style:none;padding:0;margin:0;color:var(--ink-soft);font-size:13px;display:flex;flex-direction:column;gap:6px;">
                ${features.map(f => `<li style="display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${f}</li>`).join('')}
              </ul>
            </div>

            <button class="button button-primary" style="width:100%;justify-content:center;" onclick="document.getElementById('quickViewModal').classList.remove('show'); setTimeout(()=>document.getElementById('quickViewModal').remove(), 300)">إغلاق المعاينة</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // نظهر المودال بأنيميشن
    setTimeout(() => {
      document.getElementById('quickViewModal').classList.add('show');
    }, 10);
  };
// دعم زر Esc لقفل النافذة
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("quickViewModal");
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 300);
    }
  }
});
  // ==========================================
  // ===== 1. حفظ الوضع الليلي واللغة =====
  // ==========================================

  // حفظ الوضع الليلي
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if(document.getElementById('themeIcon')) {
      document.getElementById('themeIcon').innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
    }
  }

  // حفظ اللغة (لو إنت في الصفحة الرئيسية)
  const currentLang = localStorage.getItem('lang');
  if (currentLang === 'en' && window.location.pathname.includes('index.html')) {
    window.location.href = 'index-en.html';
  } else if (currentLang === 'ar' && window.location.pathname.includes('index-en.html')) {
    window.location.href = 'index.html';
  }

  // تعديل زر اللغة عشان يحفظ الاختيار
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isEn = document.documentElement.lang === 'en';
      localStorage.setItem('lang', isEn ? 'ar' : 'en');
      window.location.href = isEn ? 'index.html' : 'index-en.html';
    });
  }