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

  document.addEventListener("DOMContentLoaded", () => {
    initFooterAndNav();
    initHeroCursor();
    initSprinkle();
  });
})();
