(() => {
  const hero = document.querySelector("main.hero");
  const cursor = document.getElementById("saltCursor");

  const setYear = (id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(new Date().getFullYear());
  };

  const highlightActiveNav = () => {
    const links = document.querySelectorAll(".main-nav a");
    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const isIndex = location.pathname === "/" && href === "index.html";
      const matches = location.pathname.endsWith(href);
      if (matches || isIndex) a.classList.add("active");
    });
  };

  const initFooterAndNav = () => {
    setYear("year");
    setYear("year-contact");
    highlightActiveNav();
  };

  const initHeroCursor = () => {
    if (!hero || !cursor) return;

    const offset = 24;
    let pending = false;
    let lastX = 0;
    let lastY = 0;

    const setCursorPosition = (x, y) => {
      const tx = x - offset;
      const ty = y - offset;
      cursor.style.setProperty("--x", `${tx}px`);
      cursor.style.setProperty("--y", `${ty}px`);
      cursor.style.transform = `translate(${tx}px, ${ty}px)`;
    };

    const startShake = () => {
      cursor.classList.remove("shake");
      void cursor.offsetWidth;
      cursor.classList.add("shake");
    };

    hero.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    hero.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));

    hero.addEventListener("mousemove", (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        setCursorPosition(lastX, lastY);
        pending = false;
      });
    });

    hero.addEventListener("mousedown", (e) => {
      setCursorPosition(e.clientX, e.clientY);
      startShake();
    });

    cursor.addEventListener("animationend", () => cursor.classList.remove("shake"));
  };

  const isLandingPage = () => {
    const path = location.pathname || "";
    return (
      path === "/salt-web/" ||
      path.endsWith("/salt-web/index.html") ||
      path === "/" ||
      path.endsWith("index.html")
    );
  };

  const initSprinkle = () => {
    if (!document.body || !isLandingPage()) return;

    const pile = document.createElement("div");
    pile.id = "salt-pile";
    document.body.appendChild(pile);

    const bucketCounts = Object.create(null);
    const bucketWidth = 8;

    const addGrainAtX = (finalX) => {
      const bucket = Math.floor(finalX / bucketWidth);
      const stackIndex = bucketCounts[bucket] || 0;

      const grain = document.createElement("div");
      grain.className = "salt-grain";
      grain.style.left = `${finalX - 3}px`;
      grain.style.bottom = `${stackIndex * 4}px`;

      pile.appendChild(grain);
      bucketCounts[bucket] = stackIndex + 1;
    };

    const createParticle = (startX, startY) => {
      const p = document.createElement("div");
      p.className = "salt-particle";

      const dxNum = Math.random() * 260 - 130;
      const dx = `${dxNum}px`;
      const dy = `${Math.random() * 900 + 600}px`;
      const rot = `${Math.round(Math.random() * 80 - 40)}deg`;
      const duration = 5000 + Math.random() * 6000;

      p.style.setProperty("--dx", dx);
      p.style.setProperty("--dy", dy);
      p.style.setProperty("--rot", rot);
      p.style.left = `${startX}px`;
      p.style.top = `${startY}px`;
      p.style.animationDuration = `${duration}ms`;
      p.style.animationTimingFunction = "cubic-bezier(.02,.6,.2,1)";

      document.body.appendChild(p);

      const finalX = startX + dxNum;
      const earlyTime = Math.max(300, Math.round(duration * 0.25));
      let appended = false;

      const earlyTimer = setTimeout(() => {
        if (appended) return;
        addGrainAtX(finalX);
        appended = true;
      }, earlyTime);

      p.addEventListener("animationend", () => {
        clearTimeout(earlyTimer);
        if (!appended) addGrainAtX(finalX);
        p.remove();
      });
    };

    const sprinkle = (x, y) => {
      for (let i = 0; i < 12; i++) createParticle(x, y);
    };

    document.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".site-header")) return;
      if (!e.target.closest("main.hero")) return;
      sprinkle(e.clientX, e.clientY);
    });
  };

  const initGallery = () => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    const imageLists = {
      anime: [
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.00 (1).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.00.jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (1).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (2).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (3).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (4).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (5).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (6).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (7).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (8).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01 (9).jpeg",
        "public/pics/anime/WhatsApp Image 2026-01-02 at 13.36.01.jpeg"
      ],
      base: [
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.57 (1).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.57 (2).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.57 (3).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.57 (4).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.57.jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (1).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (10).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (11).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (12).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (13).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (14).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (15).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (16).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (17).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (18).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (2).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (3).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (4).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (5).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (6).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (7).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (8).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58 (9).jpeg",
        "public/pics/base/WhatsApp Image 2026-01-01 at 19.49.58.jpeg"
      ],
      crypto: [
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_25_06.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_26_30.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_27_57.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_32_39.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_34_17.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_35_35.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_36_57.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_37_57.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_52_21.png",
        "public/pics/crypto/ChatGPT Image 10. sij 2026. 15_54_06.png",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (1).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (2).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (3).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (4).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (5).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (6).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (7).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (8).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11 (9).jpeg",
        "public/pics/crypto/WhatsApp Image 2026-01-01 at 19.47.11.jpeg"
      ],
      fantasy: [
        "public/pics/fantasy/a.png",
        "public/pics/fantasy/b.png",
        "public/pics/fantasy/c.png",
        "public/pics/fantasy/d.png",
        "public/pics/fantasy/e.png",
        "public/pics/fantasy/f.png",
        "public/pics/fantasy/g.png",
        "public/pics/fantasy/h.png",
        "public/pics/fantasy/i.png",
        "public/pics/fantasy/j.png",
        "public/pics/fantasy/k.png",
        "public/pics/fantasy/l.png",
        "public/pics/fantasy/o.png",
        "public/pics/fantasy/p.png",
        "public/pics/fantasy/r.png",
        "public/pics/fantasy/s.png"
      ]
    };

    const buttons = document.querySelectorAll('.map-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const map = btn.dataset.map;
        gallery.innerHTML = '';
        imageLists[map].forEach(src => {
          const container = document.createElement('div');
          container.className = 'image-container';
          const img = document.createElement('img');
          img.src = src;
          img.alt = map + ' image';
          const download = document.createElement('a');
          download.href = src;
          download.download = src.split('/').pop();
          download.className = 'download-btn';
          download.textContent = 'Download';
          container.appendChild(img);
          container.appendChild(download);
          gallery.appendChild(container);
        });
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initFooterAndNav();
    initHeroCursor();
    initSprinkle();
    initGallery();
  });
})();
