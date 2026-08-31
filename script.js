async function loadData() {
  const res = await fetch("data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load data.json");
  return res.json();
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  return node;
}

function render(data) {
  // Hero
  document.getElementById("hero-name").textContent = data.name || "";
  document.getElementById("hero-location").textContent = data.location || "";
  document.getElementById("hero-tagline").textContent = data.tagline || "";
  document.getElementById("footer-name").textContent = data.name || "";
  document.title = (data.name || "Portfolio") + " — Portfolio";

  const cvLink = document.getElementById("cv-link");
  if (data.cvFile) {
    cvLink.href = data.cvFile;
    cvLink.setAttribute("download", data.cvFile.split("/").pop());
  } else {
    cvLink.style.display = "none";
  }

  // About
  document.getElementById("summary-text").textContent = data.summary || "";
  const skillsList = document.getElementById("skills-list");
  (data.skills || []).forEach(skill => {
    skillsList.appendChild(el("li", { text: skill }));
  });

  // Projects
  const projectsList = document.getElementById("projects-list");
  (data.projects || []).forEach(p => {
    const card = el("div", { className: "project-card" });

    const top = el("div", { className: "project-top" });
    top.appendChild(el("h3", { className: "project-title", text: p.title || "" }));
    if (p.year) top.appendChild(el("span", { className: "project-year", text: p.year }));
    card.appendChild(top);

    if (p.tag) card.appendChild(el("p", { className: "project-tag", text: p.tag }));
    if (p.description) card.appendChild(el("p", { className: "project-desc", text: p.description }));

    if (p.link) {
      const a = el("a", {
        className: "project-link",
        text: (p.linkLabel || "View project") + " →"
      });
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      card.appendChild(a);
    }

    projectsList.appendChild(card);
  });
  if (!(data.projects || []).length) {
    projectsList.appendChild(el("p", {
      className: "lede",
      text: "No projects added yet — add entries to the \"projects\" array in data.json."
    }));
  }

  // Experience
  const expList = document.getElementById("experience-list");
  (data.experience || []).forEach(e => {
    const item = el("div", { className: "timeline-item" });
    item.appendChild(el("div", { className: "timeline-period", text: e.period || "" }));

    const right = el("div");
    right.appendChild(el("h3", { className: "timeline-role", text: e.role || "" }));
    if (e.org) right.appendChild(el("p", { className: "timeline-org", text: e.org }));
    if (e.points && e.points.length) {
      const ul = el("ul", { className: "timeline-points" });
      e.points.forEach(pt => ul.appendChild(el("li", { text: pt })));
      right.appendChild(ul);
    }
    item.appendChild(right);
    expList.appendChild(item);
  });

  // Awards
  const awardsList = document.getElementById("awards-list");
  (data.awards || []).forEach(a => {
    const li = el("li");
    const left = el("span");
    left.appendChild(el("span", { className: "award-title", text: a.title || "" }));
    if (a.detail) left.appendChild(el("span", { className: "award-detail", text: a.detail }));
    li.appendChild(left);
    if (a.year) li.appendChild(el("span", { className: "award-year", text: a.year }));
    awardsList.appendChild(li);
  });

  // Certifications
  const certsList = document.getElementById("certs-list");
  (data.certifications || []).forEach(c => {
    const li = el("li");
    li.appendChild(document.createTextNode(c.name || ""));
    if (c.org) li.appendChild(el("span", { className: "meta", text: c.org }));
    certsList.appendChild(li);
  });

  // Languages
  const langList = document.getElementById("languages-list");
  (data.languages || []).forEach(l => {
    const li = el("li");
    li.appendChild(document.createTextNode(l.name || ""));
    if (l.level) li.appendChild(el("span", { className: "meta", text: l.level }));
    langList.appendChild(li);
  });

  // Hobbies
  document.getElementById("hobbies-text").textContent = (data.hobbies || []).join(", ");

  // Contact links
  const contactLinks = document.getElementById("contact-links");
  const links = data.links || {};
  if (data.email) {
    const a = el("a", { text: "Email" });
    a.href = links.email || ("mailto:" + data.email);
    contactLinks.appendChild(a);
  }
  if (links.github) {
    const a = el("a", { text: "GitHub" });
    a.href = links.github; a.target = "_blank"; a.rel = "noopener noreferrer";
    contactLinks.appendChild(a);
  }
  if (links.linkedin) {
    const a = el("a", { text: "LinkedIn" });
    a.href = links.linkedin; a.target = "_blank"; a.rel = "noopener noreferrer";
    contactLinks.appendChild(a);
  }
  if (links.instagram) {
    const a = el("a", { text: "Instagram" });
    a.href = links.instagram; a.target = "_blank"; a.rel = "noopener noreferrer";
    contactLinks.appendChild(a);
  }
  if (data.cvFile) {
    const a = el("a", { text: "Download CV" });
    a.href = data.cvFile; a.setAttribute("download", data.cvFile.split("/").pop());
    contactLinks.appendChild(a);
  }
}

loadData()
  .then(render)
  .catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p style="padding:2rem;font-family:sans-serif;color:#C1440E;">Could not load data.json. Make sure it is in the same folder as index.html.</p>'
    );
  });
