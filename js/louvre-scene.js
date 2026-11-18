/**
 * LOUVRE-SCENE.JS
 * Money Heist (La Casa de Papel) x Musée du Louvre Spatial Presentation Walls
 * 
 * Key Features:
 * - Shows the WHOLE, complete uncropped images (object-fit: contain, full aspect ratio)
 * - Money Heist tactical dossier aesthetics (The Professor's blueprint board, red evidence tags, classified stamps)
 * - 100% verbatim presentation text displayed directly on the walls
 * - Natural fluid vertical scrolling across all 8 wings with smooth anchor navigation
 */

class LouvreScene {
  constructor(canvasContainer, presentationData, onCanvasClick) {
    this.canvasContainer = canvasContainer;
    this.data = presentationData;
    this.onCanvasClick = onCanvasClick;

    this.currentWingIndex = 0;
    this.wingsContainer = document.getElementById('gallery-wings-container');

    this.renderSpatialWings(this.data, 'fr');
  }

  // Render the 8 Heist Wings on the Louvre walls showing the WHOLE images
  renderSpatialWings(data, lang) {
    if (!this.wingsContainer) return;
    this.wingsContainer.innerHTML = '';
    const isFr = lang === 'fr';

    data.wings.forEach((wing, wIdx) => {
      const wingSec = document.createElement('section');
      wingSec.className = `gallery-wing-section ${wIdx === 0 ? 'is-active in-view' : ''}`;
      wingSec.id = `gallery-wing-${wIdx}`;
      wingSec.setAttribute('data-wing-index', wIdx);

      // Money Heist Tactical Header Banner
      const header = document.createElement('div');
      header.className = 'wing-header-banner';
      header.innerHTML = `
        <div class="heist-badge-row">
          <span class="heist-tag-pill">DOSSIER #${wing.num}</span>
          <span class="heist-status-pill">● TOP SECRET // PLAN LOUVRE</span>
        </div>
        <h1 class="wing-header-title">${isFr ? wing.title.fr : wing.title.en}</h1>
        <p class="wing-header-tagline">${isFr ? wing.tagline.fr : wing.tagline.en}</p>
      `;
      wingSec.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'wing-grid';

      // WING 1: Timeline & France History (Full Panorama)
      if (wing.id === 'wing-timeline') {
        grid.classList.add('wing-grid-wide');
        wing.canvases.forEach(cv => {
          const card = this.createCanvasCard({
            image: cv.image,
            fullWidth: true,
            title: isFr ? cv.title.fr : cv.title.en,
            lead: isFr ? cv.caption.fr : cv.caption.en,
            body: cv.details ? `
              <ul class="dossier-checklist">
                ${(isFr ? cv.details.fr : cv.details.en).map(d => `<li><strong>[ÉPOQUE]</strong> ${d}</li>`).join('')}
              </ul>
              <div class="napoleon-callout" style="margin-top:14px;">
                <span class="napoleon-tag">👑 LE LOUVRE DE NAPOLÉON</span>
                <div>${isFr ? "<strong>1803 :</strong> Napoléon Bonaparte baptise officiellement ce palais « Musée Napoléon » et y rassemble les plus grands chefs-d'œuvre de l'Empire." : "<strong>1803:</strong> Napoleon Bonaparte officially renames this palace the 'Musée Napoléon', assembling the greatest masterpieces of the Empire."}</div>
              </div>` : `
              <ul class="dossier-checklist">
                ${cv.movements.map(m => `<li><strong>[COURANT] ${isFr ? m.name.fr : m.name.en} :</strong> ${m.authors}</li>`).join('')}
              </ul>`,
            placard: isFr ? "🔍 EXAMINER LE PLAN EN HAUTE RÉSOLUTION (PLEIN ÉCRAN)" : "🔍 INSPECT FULL BLUEPRINT (FULLSCREEN)",
            onClick: () => this.onCanvasClick(cv, isFr ? cv.title.fr : cv.title.en)
          });
          grid.appendChild(card);
        });
      }

      // WING 2: Three Epochs (1600–2000)
      else if (wing.id === 'wing-periods') {
        wing.periods.forEach(p => {
          const card = this.createCanvasCard({
            image: p.image,
            subImage: p.subImage,
            title: `${p.periodNum} – ${isFr ? p.title.fr : p.title.en}`,
            lead: `<strong>${isFr ? "AXE STRATÉGIQUE :" : "CORE FOCUS:"}</strong> ${isFr ? p.focus.fr : p.focus.en}`,
            body: `<div style="margin-bottom: 10px; color: #ffdf78;"><strong>${isFr ? p.authorHeader.fr : p.authorHeader.en}</strong></div>
                   <ul class="dossier-checklist">
                     ${p.authors.map(a => `<li><strong>${a.name}</strong> – ${isFr ? a.desc.fr : a.desc.en}</li>`).join('')}
                   </ul>`,
            placard: isFr ? "📄 DOSSIER COMPLET DE LA PÉRIODE" : "📄 VIEW COMPLETE PERIOD DOSSIER",
            onClick: () => this.onCanvasClick(p, isFr ? p.title.fr : p.title.en)
          });
          grid.appendChild(card);
        });
      }

      // WING 3: The Three Colossi Profiles
      else if (wing.id === 'wing-profiles') {
        wing.profiles.forEach(prof => {
          const card = this.createCanvasCard({
            image: prof.image,
            title: prof.number,
            lead: isFr ? prof.phrase.fr : prof.phrase.en,
            body: `<div class="heist-quote-box">${isFr ? prof.phrase.fr : prof.phrase.en}</div>
                   <p style="margin-top: 10px; font-weight: 700; color: #ffdf78;">${isFr ? prof.whyHeader.fr : prof.whyHeader.en}</p>
                   <p style="margin-top: 6px; font-size: 15px; line-height: 1.6;">${isFr ? prof.rationale.fr : prof.rationale.en}</p>`,
            placard: isFr ? "🎯 PROFIL CIBLE & ANALYSE" : "🎯 TARGET PROFILE & ANALYSIS",
            onClick: () => this.onCanvasClick(prof, prof.number)
          });
          grid.appendChild(card);
        });
      }

      // WING 4: Behind the Authors (Family, Childhood & Personal Life)
      else if (wing.id === 'wing-behind') {
        wing.authors.forEach(auth => {
          const card = this.createCanvasCard({
            image: auth.cardImage || auth.portrait,
            title: auth.number,
            lead: `${auth.fullName} — ${auth.born}, ${auth.birthplace}`,
            body: `<p style="font-style: italic; color: #ffdf78; margin-bottom: 8px;">${isFr ? auth.knownFor.fr : auth.knownFor.en}</p>
                   <p style="margin-bottom: 8px;"><strong>${isFr ? "Contexte Familial :" : "Family Origins:"}</strong> ${isFr ? auth.familyBackgroundIntro.fr : auth.familyBackgroundIntro.en}</p>
                   <ul class="dossier-checklist">
                     ${auth.familyPoints.map(fp => `<li><strong>${isFr ? fp.role.fr : fp.role.en}</strong> ${isFr ? fp.desc.fr : fp.desc.en}</li>`).join('')}
                   </ul>
                   <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed rgba(229,9,20,0.5);">
                     <strong style="color: #ff5252;">${isFr ? "Faits Marquants :" : "Interesting Facts:"}</strong>
                     <ul class="dossier-checklist" style="margin-top: 6px;">
                       ${auth.interestingFamilyFacts.map(ff => `<li>${isFr ? ff.fr : ff.en}</li>`).join('')}
                     </ul>
                     ${auth.fullName && auth.fullName.includes('Voltaire') ? `
                       <div class="oversimplified-callout" style="margin-top:10px;">
                         <span class="oversimplified-tag">🥖 OVERSIMPLIFIED NOTE</span>
                         <div>${isFr ? "Voltaire a été envoyé deux fois à la Bastille par le Roi. Son crime impardonnable ? Être beaucoup trop sarcastique !" : "Voltaire was thrown into the Bastille twice by the King. His unforgivable crime? Being way too sarcastic!"}</div>
                       </div>` : ''}
                     ${auth.fullName && auth.fullName.includes('Tocqueville') ? `
                       <div class="oversimplified-callout" style="margin-top:10px;">
                         <span class="oversimplified-tag">🥖 OVERSIMPLIFIED NOTE</span>
                         <div>${isFr ? "Tocqueville a prédit la rivalité entre les États-Unis et la Russie 110 ans avant la Guerre Froide ! Totalement visionnaire !" : "Tocqueville predicted the superpower rivalry between America and Russia 110 years early! Mind = blown!"}</div>
                       </div>` : ''}
                     ${auth.fullName && auth.fullName.includes('Hugo') ? `
                       <div class="napoleon-callout" style="margin-top:10px;">
                         <span class="napoleon-tag">👑 HISTOIRE NATIONALE</span>
                         <div>${isFr ? "2 millions de citoyens ont accompagné le cercueil de Victor Hugo jusqu'au Panthéon, un record absolu dans l'histoire de France !" : "2 million citizens accompanied Victor Hugo's coffin to the Panthéon, an all-time record in French history!"}</div>
                       </div>` : ''}
                   </div>`,
            placard: isFr ? "🧬 FICHE BIOGRAPHIQUE COMPLÈTE" : "🧬 FULL BIOGRAPHICAL FILE",
            onClick: () => this.onCanvasClick(auth, auth.number)
          });
          grid.appendChild(card);
        });
      }

      // WING 5: Personal Incidents & Literature
      else if (wing.id === 'wing-personal-incidents') {
        // Card 1: Overview
        const cardOverview = this.createCanvasCard({
          image: wing.overviewImage,
          title: isFr ? wing.title.fr : wing.title.en,
          lead: isFr ? wing.tagline.fr : wing.tagline.en,
          body: `<p style="margin-bottom: 12px; font-size: 15.5px; line-height: 1.6;">${isFr ? wing.connectionCard.text.fr : wing.connectionCard.text.en}</p>
                 <div style="background: rgba(0,0,0,0.4); padding: 12px; border-left: 3px solid #e50914; border-radius: 4px;">
                   <strong style="color: #ffdf78;">${wing.contemplationsBreakdown.title}</strong>
                   <ul class="dossier-checklist" style="margin-top: 6px;">
                     ${wing.contemplationsBreakdown.centralFigures.map(cf => `<li><strong>${isFr ? cf.title.fr : cf.title.en}</strong> ${isFr ? cf.desc.fr : cf.desc.en}</li>`).join('')}
                   </ul>
                   <div style="margin-top: 8px;">
                     <strong style="color: #e50914;">${isFr ? "Thèmes Majeurs :" : "Major Themes:"}</strong>
                     <ul class="dossier-checklist">
                       ${wing.contemplationsBreakdown.majorThemes.map(mt => `<li>${isFr ? mt.fr : mt.en}</li>`).join('')}
                     </ul>
                   </div>
                 </div>`,
          placard: isFr ? "📖 EXAMINER LA VUE D'ENSEMBLE" : "📖 EXAMINE FULL OVERVIEW",
          onClick: () => this.onCanvasClick(wing, isFr ? wing.title.fr : wing.title.en)
        });
        grid.appendChild(cardOverview);

        // Cards 2 & 3: Author Personal Incidents (Hugo & Voltaire)
        if (wing.authors && wing.authors.length > 0) {
          wing.authors.forEach(auth => {
            const cardAuth = this.createCanvasCard({
              image: auth.portrait,
              title: auth.author,
              lead: isFr ? auth.focus.fr : auth.focus.en,
              body: `<div style="margin-bottom: 10px;">
                       <strong style="color: #ff5252;">${isFr ? "AXES MAJEURS :" : "CORE FOCUS:"}</strong>
                       <p style="margin-top: 4px; font-size: 14.5px; line-height: 1.6;">${isFr ? auth.focus.fr : auth.focus.en}</p>
                     </div>
                     <div style="background: rgba(0,0,0,0.35); padding: 10px; border-left: 3px solid #ffdf78; border-radius: 4px;">
                       <strong style="color: #ffdf78;">${isFr ? "ŒUVRES MAJEURES LIÉES :" : "LINKED MASTERWORKS:"}</strong>
                       <p style="margin-top: 4px; font-size: 14.5px; white-space: pre-line;">${isFr ? auth.mainWorks.fr : auth.mainWorks.en}</p>
                     </div>`,
              placard: isFr ? "🎯 VOIR LE DOSSIER DE L'AUTEUR" : "🎯 VIEW AUTHOR DOSSIER",
              onClick: () => this.onCanvasClick(auth, auth.author)
            });
            grid.appendChild(cardAuth);
          });
        }

        // Card 4: Poem Demain dès l'aube (Manuscript in full)
        const poem = wing.poemSection;
        const cardPoem = this.createCanvasCard({
          image: poem.manuscriptImage,
          title: poem.title,
          lead: "Victor Hugo – Les Contemplations (1856)",
          body: `<div style="font-family: serif; font-style: italic; white-space: pre-line; font-size: 15px; line-height: 1.8; background: rgba(0,0,0,0.5); padding: 14px; border-left: 4px solid #002395; border-radius: 4px; color: #ffffff;">
                   ${isFr ? poem.originalFrench : poem.englishTranslation}
                 </div>`,
          placard: isFr ? "📜 POÈME COMPLET & MANUSCRIT" : "📜 COMPLETE POEM & MANUSCRIPT",
          onClick: () => this.onCanvasClick(poem, poem.title)
        });
        grid.appendChild(cardPoem);

        // Card 5: Comparison Table
        const table = wing.comparisonTable;
        const cardTable = this.createCanvasCard({
          image: table.image,
          title: isFr ? table.title.fr : table.title.en,
          lead: isFr ? "Tableau de synthèse comparative : Victor Hugo vs. Voltaire" : "Comparative synthesis matrix: Victor Hugo vs. Voltaire",
          body: `
            <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
              <table class="heist-matrix-mini">
                <thead>
                  <tr>
                    <th>${isFr ? table.headers.col1.fr : table.headers.col1.en}</th>
                    <th>${isFr ? table.headers.col2.fr : table.headers.col2.en}</th>
                    <th>${isFr ? table.headers.col3.fr : table.headers.col3.en}</th>
                  </tr>
                </thead>
                <tbody>
                  ${table.rows.map(r => `
                    <tr>
                      <td><strong>${isFr ? r.category.fr : r.category.en}</strong></td>
                      <td style="color: #68c283;">${isFr ? r.hugo.fr : r.hugo.en}</td>
                      <td style="color: #ffdf78;">${isFr ? r.voltaire.fr : r.voltaire.en}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`,
          placard: isFr ? "📊 MATRICE STRATÉGIQUE COMPLÈTE" : "📊 FULL STRATEGIC MATRIX",
          onClick: () => this.onCanvasClick(table, isFr ? table.title.fr : table.title.en)
        });
        grid.appendChild(cardTable);
      }

      // WING 6: Works, Memorials & Recognition
      else if (wing.id === 'wing-works-recognition') {
        wing.authors.forEach(auth => {
          const card = this.createCanvasCard({
            image: auth.cardImage,
            subImage: auth.memorialImage,
            title: auth.number,
            lead: isFr ? auth.field.fr : auth.field.en,
            body: `<p style="margin-bottom: 8px; font-size: 15px;"><strong>${isFr ? "Héritage Historique :" : "Historical Legacy:"}</strong> ${isFr ? auth.legacy.fr : auth.legacy.en}</p>
                   <div style="margin-bottom: 8px;">
                     <strong style="color: #ffdf78;">${isFr ? "Honneurs & Distinctions :" : "Honours & Recognition:"}</strong>
                     <ul class="dossier-checklist">
                       ${auth.recognitionAndHonours.map(rh => `<li>${isFr ? rh.fr : rh.en}</li>`).join('')}
                     </ul>
                   </div>
                   <div>
                     <strong style="color: #e50914;">${isFr ? "Pourquoi on le lit encore :" : "Why Still Read His Works:"}</strong>
                     <ul class="dossier-checklist">
                       ${(auth.whyPeopleStillRead || auth.whyPeopleStillStudy).map(pt => `<li>${isFr ? pt.fr : pt.en}</li>`).join('')}
                     </ul>
                   </div>`,
            placard: isFr ? "🏛️ PANTHÉON, MÉMORIAUX & POSTÉRITÉ" : "🏛️ PANTHÉON, MEMORIALS & LEGACY",
            onClick: () => this.onCanvasClick(auth, auth.number)
          });
          grid.appendChild(card);
        });
      }

      // WING 7: Recent Mentions & Contemporary Case Studies
      else if (wing.id === 'wing-recent-mentions') {
        wing.cases.forEach(c => {
          const card = this.createCanvasCard({
            image: c.images[0],
            subImage: c.images[1] || null,
            title: isFr ? c.title.fr : c.title.en,
            lead: isFr ? c.tag.fr : c.tag.en,
            body: `
              <div style="margin-bottom: 8px;">
                <strong style="color: #ff5252;">${isFr ? "LES FAITS :" : "THE FACTS:"}</strong>
                <ul class="dossier-checklist" style="margin-top: 4px;">
                  ${c.whatHappened[isFr ? 'fr' : 'en'].map(wh => `<li>${wh}</li>`).join('')}
                </ul>
              </div>
              ${c.fullDetailText ? `<div style="font-style: italic; background: rgba(0,0,0,0.4); padding: 8px; border-left: 3px solid #ffdf78; margin-bottom: 8px; font-size: 14px;">${isFr ? c.fullDetailText.fr : c.fullDetailText.en}</div>` : ''}
              ${c.recent2026Example ? `<p style="color: #68c283; font-size: 14px; margin-bottom: 8px;">${isFr ? c.recent2026Example.fr : c.recent2026Example.en}</p>` : ''}
              ${c.anotherRecognition2025 ? `<p style="color: #68c283; font-size: 14px; margin-bottom: 8px;">${isFr ? c.anotherRecognition2025.fr : c.anotherRecognition2025.en}</p>` : ''}
              <div>
                <strong style="color: #ffdf78;">${isFr ? "Pourquoi son nom est-il revenu ?" : "Why was his name invoked?"}</strong>
                <p style="margin-top: 4px; font-size: 14.5px; white-space: pre-line;">${isFr ? c.whyMentioned.fr : c.whyMentioned.en}</p>
              </div>`,
            placard: isFr ? "🚨 ENQUÊTE MÉDIATIQUE & PIÈCES À CONVICTION" : "🚨 MEDIA DOSSIER & EVIDENCE",
            onClick: () => this.onCanvasClick(c, isFr ? c.title.fr : c.title.en)
          });
          grid.appendChild(card);
        });
      }

      // WING 8: Final Feature – "If These Authors Were Alive Today…"
      else if (wing.id === 'wing-alive-today') {
        wing.dialogues.forEach(d => {
          const card = this.createCanvasCard({
            image: wing.headerCardImage,
            title: `🎭 ${d.author}`,
            lead: isFr ? d.question.fr : d.question.en,
            body: `
              <div class="heist-quote-box" style="border-color: #e50914;">
                <p style="font-size: 16px; font-weight: 700; color: #ffdf78; margin-bottom: 6px;">« ${isFr ? d.question.fr : d.question.en} »</p>
                <p style="font-size: 15px; line-height: 1.65; color: #ffffff; font-style: normal;">
                  <strong>${d.author} :</strong> ${isFr ? d.reflection.fr : d.reflection.en}
                </p>
              </div>`,
            placard: isFr ? "🧠 DIALOGUE PHILOSOPHIQUE 2.0" : "🧠 PHILOSOPHICAL DEBATE 2.0",
            onClick: () => this.onCanvasClick(wing, isFr ? wing.title.fr : wing.title.en)
          });
          grid.appendChild(card);
        });
      }

      wingSec.appendChild(grid);

      // Tactical Window Transition Laser Divider
      const nextIdx = (wIdx + 1) % data.wings.length;
      const transitionBar = document.createElement('div');
      transitionBar.className = 'window-transition-bar';
      transitionBar.title = isFr ? `Glisser vers Dossier #${nextIdx + 1}` : `Scroll to Dossier #${nextIdx + 1}`;
      transitionBar.innerHTML = `
        <div class="transition-laser-line"></div>
        <div class="transition-wing-indicator">
          <span>↓</span>
          <span>${isFr ? `SUIVANT : DOSSIER #${nextIdx + 1}` : `NEXT : DOSSIER #${nextIdx + 1}`}</span>
          <span>↓</span>
        </div>
        <div class="transition-laser-line"></div>
      `;
      transitionBar.addEventListener('click', (e) => {
        e.stopPropagation();
        this.navigateToWing(nextIdx);
      });
      wingSec.appendChild(transitionBar);

      this.wingsContainer.appendChild(wingSec);
    });

    // Initialize Intersection Observer for Cinematic Scroll Transitions
    this.setupIntersectionObserver();
  }

  // Setup Intersection Observer to monitor full-window scrolling and transitions
  setupIntersectionObserver() {
    if (this._observer) {
      this._observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '-10% 0px -50% 0px',
      threshold: [0, 0.1, 0.2]
    };

    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-wing-index'), 10);
          if (!isNaN(idx)) {
            document.querySelectorAll('.gallery-wing-section').forEach(s => s.classList.remove('is-active'));
            entry.target.classList.add('is-active');
            entry.target.classList.add('in-view');
            this.currentWingIndex = idx;
            if (window.louvreApp && typeof window.louvreApp.updateActiveWingTab === 'function') {
              window.louvreApp.updateActiveWingTab();
            }
          }
        }
      });
    }, options);

    document.querySelectorAll('.gallery-wing-section').forEach(sec => {
      this._observer.observe(sec);
    });
  }

  // Create individual museum canvas card that SHOWS THE WHOLE IMAGE
  createCanvasCard({ image, subImage, fullWidth, title, lead, body, placard, onClick }) {
    const card = document.createElement('div');
    card.className = `museum-canvas-card ${fullWidth ? 'card-full-width' : ''}`;

    card.innerHTML = `
      <div class="canvas-image-wrapper ${fullWidth ? 'wrapper-panorama' : ''}">
        <img src="${image}" alt="${title}" class="whole-image" loading="lazy">
        ${subImage ? `<img src="${subImage}" alt="${title}" class="whole-image sub-image" loading="lazy">` : ''}
        <div class="canvas-inspect-badge">
          <span>🎭</span> <span>PLEIN ÉCRAN</span>
        </div>
      </div>
      <div class="canvas-content-pane">
        <h3 class="canvas-card-title">${title}</h3>
        <div class="canvas-card-lead">${lead}</div>
        <div class="canvas-card-body">${body}</div>
        <div class="canvas-brass-placard">${placard}</div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onClick) onClick();
    });

    return card;
  }

  // Smooth scroll into any wing
  navigateToWing(index) {
    if (index < 0 || index >= this.data.wings.length) return;
    this.currentWingIndex = index;
    const targetSec = document.getElementById(`gallery-wing-${index}`);
    if (targetSec) {
      document.querySelectorAll('.gallery-wing-section').forEach(s => s.classList.remove('is-active'));
      targetSec.classList.add('is-active');
      targetSec.classList.add('in-view');
      targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  nextWing() {
    this.navigateToWing((this.currentWingIndex + 1) % this.data.wings.length);
  }

  prevWing() {
    this.navigateToWing((this.currentWingIndex - 1 + this.data.wings.length) % this.data.wings.length);
  }

  update(delta) {
    // Pure DOM presentation - highly performant, zero GPU clutter
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LouvreScene;
}
