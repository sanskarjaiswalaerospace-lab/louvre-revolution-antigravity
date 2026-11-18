/**
 * APP.JS
 * Master Coordinator for Money Heist (La Casa de Papel) x Louvre Revolution Webtoy
 * - 100% Natural Fluid Vertical Scrolling Across All 8 Wings
 * - Money Heist Interactive Mini-Games Arcade (Vault, Barricade Run, Professor's Quiz)
 * - French Revolution Animations (Barricades, Tricolour flags, Red smoke, Cannons, Bella Ciao Synth)
 * - 100% Verbatim Data Presentation on Louvre Museum Walls
 * - Whole Complete Images (Zero cropping)
 * - Instant Bilingual Toggle (FR / EN)
 * - Professor's Tactical Master File Modal & Audio Speech Briefing
 */


const WING_QUOTES = [
  {
    quote: "L'histoire est une galerie de tableaux où il y a peu d'originaux et beaucoup de copies.",
    author: "Alexis de Tocqueville",
    source: "De la Démocratie en Amérique (1835)",
    translation: "History is a picture gallery containing few originals and many copies."
  },
  {
    quote: "Ceux qui vivent, ce sont ceux qui luttent.",
    author: "Victor Hugo",
    source: "Les Châtiments (1853)",
    translation: "Those who live, are those who fight."
  },
  {
    quote: "L'homme est né libre, et partout il est dans les fers.",
    author: "Jean-Jacques Rousseau",
    source: "Du Contrat Social (1762)",
    translation: "Man is born free, and everywhere he is in chains."
  },
  {
    quote: "Même la nuit la plus sombre prendra fin et le soleil se lèvera.",
    author: "Victor Hugo",
    source: "Les Contemplations (1856)",
    translation: "Even the darkest night will end and the sun will rise."
  },
  {
    quote: "Le doute n'est pas une condition agréable, mais la certitude est une absurdité.",
    author: "Voltaire",
    source: "Lettres Philosophiques (1734)",
    translation: "Doubt is not a pleasant condition, but certainty is an absurdity."
  },
  {
    quote: "Aux grands hommes, la patrie reconnaissante.",
    author: "Fronton du Panthéon de Paris",
    source: "Hommage National (1791)",
    translation: "To great men, the grateful homeland."
  },
  {
    quote: "Je ne suis pas d'accord avec ce que vous dites, mais je me battrai jusqu'à la mort pour que vous ayez le droit de le dire.",
    author: "Voltaire",
    source: "Traité sur la Tolérance (1763)",
    translation: "I disagree with what you say, but I will defend to the death your right to say it."
  },
  {
    quote: "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible.",
    author: "Albert Camus",
    source: "Retour à Tipasa (1952)",
    translation: "In the depth of winter, I finally learned that within me lay an invincible summer."
  }
];

class LouvreApp {
  constructor() {
    this.lang = 'fr';
    this.audioActive = false;
    this.isSpeaking = false;
    this.activeModalData = null;
    window.louvreApp = this;

    this.container = document.getElementById('webtoy-container');

    // UI Elements
    this.langBtn = document.getElementById('lang-toggle-btn');
    this.langText = document.getElementById('lang-btn-text');
    this.audioBtn = document.getElementById('audio-toggle-btn');
    this.audioIcon = document.getElementById('audio-icon');
    this.audioLabel = document.getElementById('audio-label');
    this.trackPills = document.querySelectorAll('.track-pill');
    this.oversimplifiedBtn = document.getElementById('oversimplified-btn');
    this.arcadeBtn = document.getElementById('arcade-open-btn');
    this.cannonBtn = document.getElementById('cannon-blast-btn');
    this.lyricsBtn = document.getElementById('lyrics-toggle-btn');
    this.prevBtn = document.getElementById('prev-wing-btn');
    this.nextBtn = document.getElementById('next-wing-btn');
    this.carousel = document.getElementById('wings-carousel');

    // Auto-Play Slideshow Controls
    this.autoplayBtn = document.getElementById('autoplay-toggle-btn');
    this.autoplayIcon = document.getElementById('autoplay-icon');
    this.autoplayLabel = document.getElementById('autoplay-label');
    this.autoplayProgressBar = document.getElementById('autoplay-progress-bar');
    this.autoplayActive = true;
    this.autoplayDuration = 9000;
    this.autoplayElapsed = 0;
    this.autoplayTimer = null;
    this.isHoveringContent = false;

    // Modal Elements
    this.modal = document.getElementById('curator-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalTitle = document.getElementById('modal-title');
    this.modalWingTag = document.getElementById('modal-wing-tag');
    this.modalImage = document.getElementById('modal-image');
    this.modalCaption = document.getElementById('modal-caption');
    this.modalText = document.getElementById('modal-text-content');
    this.modalSpeechBtn = document.getElementById('modal-speech-btn');
    this.modalSpeechLabel = document.getElementById('modal-speech-label');

    // Lyrics Modal Elements
    this.lyricsModal = document.getElementById('lyrics-modal');
    this.lyricsCloseBtn = document.getElementById('lyrics-close-btn');
    this.lyricsContent = document.getElementById('lyrics-content');
    this.lyricsTitle = document.getElementById('lyrics-modal-title');
    this.lyricsTabs = document.querySelectorAll('.lyrics-tab-btn');

    this.initSubsystems();
    this.renderWingsNav();
    this.bindEvents();
    this.setupScrollSpy();
    this.updateLanguageUI();
    this.startLoop();
    this.initAutoPlay();
    this.updateActiveQuote(0);
  }

  initSubsystems() {
    // 1. Spatial Louvre Museum Gallery Walls (Continuous Vertical Scroll)
    this.louvre = new LouvreScene(
      null,
      PRESENTATION_DATA,
      (data, title) => this.openModal(data, title)
    );

    // 2. Revolution Atmospheric Effects & Bella Ciao Synth
    this.revolution = new RevolutionFX(
      this.container,
      null,
      null
    );

    // 3. Money Heist Mini-Games Arcade (Vault, Barricade Catch, Trivia Quiz)
    this.arcade = new HeistArcade(this);
  }

  bindEvents() {
    // Language Toggle
    if (this.langBtn) {
      this.langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    // Audio Toggle
    if (this.audioBtn) {
      this.audioBtn.addEventListener('click', () => this.toggleAudio());
    }

    // Jukebox Track Pills (Bella Ciao / Napoléon / OverSimplified)
    if (this.trackPills) {
      this.trackPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.trackPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const track = pill.getAttribute('data-track');
          this.revolution.setTrack(track);
          if (!this.audioActive) {
            this.toggleAudio();
          } else {
            this.updateAudioLabel();
          }
        });
      });
    }

    // OverSimplified Speech Quips Trigger
    if (this.oversimplifiedBtn) {
      this.oversimplifiedBtn.addEventListener('click', () => {
        if (this.revolution) {
          this.revolution.spawnSpeechBubble();
        }
      });
    }

    // Open Mini-Games Arcade
    if (this.arcadeBtn) {
      this.arcadeBtn.addEventListener('click', () => {
        this.arcade.open('artillery');
      });
    }

    // Napoleonic Cannon Artillery Trigger (with screen shake & audio)
    if (this.cannonBtn) {
      this.cannonBtn.addEventListener('click', () => {
        if (this.revolution) {
          this.revolution.triggerCannon();
        }
      });
    }

    // Auto-Play Slideshow Toggle
    if (this.autoplayBtn) {
      this.autoplayBtn.addEventListener('click', () => this.toggleAutoPlay());
    }

    // Pause Auto-Play on hover over presentation cards so reading is effortless
    const galleryContainer = document.getElementById('gallery-wings-container');
    if (galleryContainer) {
      galleryContainer.addEventListener('mouseenter', () => {
        this.isHoveringContent = true;
      });
      galleryContainer.addEventListener('mouseleave', () => {
        this.isHoveringContent = false;
      });
    }

    // Carousel Navigation
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.louvre.prevWing();
        this.updateActiveWingTab();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.louvre.nextWing();
        this.updateActiveWingTab();
      });
    }

    // Keyboard Arrow Full-Window Smooth Navigation
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (this.modal && this.modal.classList.contains('active')) return;
      if (this.arcade && this.arcade.modal && this.arcade.modal.classList.contains('active')) return;
      if (this.lyricsModal && this.lyricsModal.classList.contains('active')) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.louvre.nextWing();
        this.updateActiveWingTab();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.louvre.prevWing();
        this.updateActiveWingTab();
      }
    });

    // Lyrics Modal Events
    if (this.lyricsBtn) {
      this.lyricsBtn.addEventListener('click', () => this.openLyricsModal('bella_ciao'));
    }
    if (this.lyricsCloseBtn) {
      this.lyricsCloseBtn.addEventListener('click', () => this.closeLyricsModal());
    }
    if (this.lyricsModal) {
      this.lyricsModal.addEventListener('click', (e) => {
        if (e.target === this.lyricsModal) this.closeLyricsModal();
      });
    }
    if (this.lyricsTabs) {
      this.lyricsTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          this.lyricsTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const lyricId = tab.getAttribute('data-lyric');
          this.renderLyrics(lyricId);
        });
      });
    }

    // Modal Events
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        if (this.arcade) this.arcade.close();
        if (this.lyricsModal) this.closeLyricsModal();
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        this.louvre.nextWing();
        this.updateActiveWingTab();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        this.louvre.prevWing();
        this.updateActiveWingTab();
      }
    });

    // Professor Speech Briefing
    if (this.modalSpeechBtn) {
      this.modalSpeechBtn.addEventListener('click', () => this.toggleSpeech());
    }
  }

  // Active scroll-spying to highlight the current wing as user scrolls
  setupScrollSpy() {
    const handleScroll = () => {
      const wings = document.querySelectorAll('.gallery-wing-section');
      let currentIdx = 0;
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      wings.forEach((w, idx) => {
        if (w.offsetTop <= scrollPos) {
          currentIdx = idx;
        }
      });

      if (this.louvre.currentWingIndex !== currentIdx) {
        this.louvre.currentWingIndex = currentIdx;
        this.updateActiveWingTab();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  toggleLanguage() {
    this.lang = this.lang === 'fr' ? 'en' : 'fr';
    this.updateLanguageUI();
    this.updateAutoPlayUI();
    this.updateActiveQuote(this.louvre ? this.louvre.currentWingIndex : 0);
    this.renderWingsNav();
    if (this.louvre) {
      this.louvre.renderSpatialWings(PRESENTATION_DATA, this.lang);
      this.louvre.navigateToWing(this.louvre.currentWingIndex);
    }
    if (this.activeModalData) {
      this.populateModalContent(this.activeModalData);
    }
    if (this.arcade && this.arcade.modal && this.arcade.modal.classList.contains('active')) {
      this.arcade.switchGame(this.arcade.activeGame);
    }
  }

  updateLanguageUI() {
    const isFr = this.lang === 'fr';

    const brandTitle = document.getElementById('hud-brand-title');
    if (brandTitle) brandTitle.textContent = isFr ? "Opération Louvre : La Résistance" : "Operation Louvre: The Resistance";

    const brandSubtitle = document.getElementById('hud-brand-subtitle');
    if (brandSubtitle) brandSubtitle.textContent = isFr ? "Le Professeur // Cas de Papel : Révolution" : "The Professor // Money Heist: Revolution";

    const arcadeLabel = document.getElementById('arcade-btn-label');
    if (arcadeLabel) arcadeLabel.textContent = isFr ? "Mini-Jeux" : "Mini-Games";

    const cannonLabel = document.getElementById('cannon-label');
    if (cannonLabel) cannonLabel.textContent = isFr ? "Canon" : "Artillery";

    const overLabel = document.getElementById('oversimplified-btn-label');
    if (overLabel) overLabel.textContent = isFr ? "OverSimplified" : "OverSimplified";

    const lyricsLabel = document.getElementById('lyrics-btn-label');
    if (lyricsLabel) lyricsLabel.textContent = isFr ? "Paroles" : "Lyrics";

    if (this.autoplayLabel) {
      this.autoplayLabel.textContent = this.autoplayActive ? (isFr ? "Auto : ON" : "Auto: ON") : (isFr ? "Auto : PAUSE" : "Auto: PAUSE");
    }

    const quoteBadge = document.getElementById('quote-badge-text');
    if (quoteBadge) {
      quoteBadge.textContent = isFr ? "RÉPUBLIQUE DES LETTRES // CITATION DU PLAN" : "REPUBLIC OF LETTERS // ILLUSTRIOUS QUOTE";
    }

    if (this.langText) this.langText.textContent = isFr ? "FR | EN" : "EN | FR";
    this.updateAudioLabel();

    if (this.modalSpeechLabel) {
      this.modalSpeechLabel.textContent = isFr ? "Briefing du Professeur" : "Professor's Briefing";
    }

    // Arcade tabs in modal
    const tabQuiz = document.getElementById('tab-quiz');
    if (tabQuiz) tabQuiz.textContent = isFr ? "🧠 Quiz du Professeur" : "🧠 Professor's Quiz";
    const tabVault = document.getElementById('tab-vault');
    if (tabVault) tabVault.textContent = isFr ? "🔓 Coffre-Fort du Louvre" : "🔓 Louvre Royal Vault";
    const tabArcade = document.getElementById('tab-arcade');
    if (tabArcade) tabArcade.textContent = isFr ? "🎮 Course des Barricades" : "🎮 Barricade Run";
    const tabArtillery = document.getElementById('tab-artillery');
    if (tabArtillery) tabArtillery.textContent = isFr ? "⚔️ Artillerie de Napoléon" : "⚔️ Napoleon's Artillery";
  }

  updateAudioLabel() {
    if (!this.audioLabel) return;
    const isFr = this.lang === 'fr';
    if (!this.audioActive) {
      this.audioLabel.textContent = isFr ? "Musique OFF" : "Music OFF";
      return;
    }
    const track = this.revolution ? this.revolution.currentTrack : 'bella_ciao';
    if (track === 'napoleon') {
      this.audioLabel.textContent = isFr ? "Napoléon" : "Napoleon";
    } else if (track === 'oversimplified') {
      this.audioLabel.textContent = "OverSimplified";
    } else {
      this.audioLabel.textContent = "Bella Ciao";
    }
  }

  toggleAudio() {
    this.audioActive = !this.audioActive;
    this.revolution.toggleAudio(this.audioActive);
    if (this.audioIcon) this.audioIcon.textContent = this.audioActive ? "🔊" : "🔇";
    this.updateAudioLabel();
  }

  renderWingsNav() {
    if (!this.carousel) return;
    this.carousel.innerHTML = '';
    const isFr = this.lang === 'fr';

    PRESENTATION_DATA.wings.forEach((w, idx) => {
      const btn = document.createElement('button');
      btn.className = `wing-tab-btn ${idx === this.louvre.currentWingIndex ? 'active' : ''}`;
      btn.innerHTML = `<span class="wing-roman">DOSSIER ${w.num}.</span> <span>${isFr ? w.title.fr : w.title.en}</span>`;
      btn.addEventListener('click', () => {
        this.louvre.navigateToWing(idx);
        this.updateActiveWingTab();
      });
      this.carousel.appendChild(btn);
    });
  }

  updateActiveWingTab() {
    this.updateActiveQuote(this.louvre ? this.louvre.currentWingIndex : 0);
    this.autoplayElapsed = 0;
    if (this.autoplayProgressBar) this.autoplayProgressBar.style.width = '0%';
    if (!this.carousel) return;
    const tabs = this.carousel.querySelectorAll('.wing-tab-btn');
    tabs.forEach((tab, idx) => {
      if (idx === this.louvre.currentWingIndex) {
        tab.classList.add('active');
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        tab.classList.remove('active');
      }
    });
  }

  initAutoPlay() {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);

    const stepMs = 50;
    this.autoplayTimer = setInterval(() => {
      if (!this.autoplayActive) return;

      // Check if any modal is currently active or user is hovering
      const isCuratorOpen = this.modal && this.modal.classList.contains('active');
      const isLyricsOpen = this.lyricsModal && this.lyricsModal.classList.contains('active');
      const isArcadeOpen = this.arcade && this.arcade.modal && this.arcade.modal.classList.contains('active');

      if (isCuratorOpen || isLyricsOpen || isArcadeOpen || this.isHoveringContent) {
        return;
      }

      this.autoplayElapsed += stepMs;
      const pct = Math.min(100, (this.autoplayElapsed / this.autoplayDuration) * 100);
      if (this.autoplayProgressBar) {
        this.autoplayProgressBar.style.width = `${pct}%`;
      }

      if (this.autoplayElapsed >= this.autoplayDuration) {
        this.autoplayElapsed = 0;
        if (this.autoplayProgressBar) {
          this.autoplayProgressBar.style.width = '0%';
        }
        if (this.louvre) {
          this.louvre.nextWing();
          this.updateActiveWingTab();
        }
      }
    }, stepMs);

    this.updateAutoPlayUI();
  }

  toggleAutoPlay() {
    this.autoplayActive = !this.autoplayActive;
    this.autoplayElapsed = 0;
    if (this.autoplayProgressBar) {
      this.autoplayProgressBar.style.width = '0%';
    }
    this.updateAutoPlayUI();
  }

  updateAutoPlayUI() {
    const isFr = this.lang === 'fr';
    if (this.autoplayBtn) {
      this.autoplayBtn.classList.toggle('active', this.autoplayActive);
    }
    if (this.autoplayIcon) {
      this.autoplayIcon.textContent = this.autoplayActive ? '⏸' : '▶';
    }
    if (this.autoplayLabel) {
      this.autoplayLabel.textContent = this.autoplayActive
        ? (isFr ? "Auto : ON" : "Auto: ON")
        : (isFr ? "Auto : PAUSE" : "Auto: PAUSE");
    }
  }

  updateActiveQuote(wingIdx = 0) {
    if (!WING_QUOTES || WING_QUOTES.length === 0) return;
    const q = WING_QUOTES[wingIdx % WING_QUOTES.length];
    const isFr = this.lang === 'fr';

    const quoteDisplay = document.getElementById('active-quote-display');
    const quoteText = document.getElementById('active-quote-text');
    const quoteAuthor = document.getElementById('active-quote-author');
    const quoteSource = document.getElementById('active-quote-source');
    const quoteTranslation = document.getElementById('active-quote-translation');
    const quoteBadge = document.getElementById('quote-badge-text');

    if (quoteDisplay) {
      quoteDisplay.style.opacity = '0.2';
      setTimeout(() => {
        if (quoteText) quoteText.textContent = `« ${q.quote} »`;
        if (quoteAuthor) quoteAuthor.textContent = `— ${q.author}`;
        if (quoteSource) quoteSource.textContent = q.source || '';
        if (quoteTranslation) {
          quoteTranslation.textContent = isFr
            ? `« ${q.translation} » [Traduction anglaise]`
            : `"${q.translation}" [English Translation]`;
        }
        if (quoteBadge) {
          quoteBadge.textContent = isFr
            ? `RÉPUBLIQUE DES LETTRES // CITATION SALLE ${wingIdx + 1}`
            : `REPUBLIC OF LETTERS // WING ${wingIdx + 1} MOTTO`;
        }
        quoteDisplay.style.opacity = '0.92';
      }, 150);
    }
  }

  // =========================================================================
  // PROFESSOR'S MASTER DOSSIER MODAL (100% WHOLE IMAGES & VERBATIM DATA)
  // =========================================================================
  openModal(data, fallbackTitle) {
    this.activeModalData = data;
    this.populateModalContent(data, fallbackTitle);
    if (this.modal) this.modal.classList.add('active');
  }

  closeModal() {
    if (this.modal) this.modal.classList.remove('active');
    this.activeModalData = null;
    this.stopSpeech();
  }

  populateModalContent(item, fallbackTitle = "") {
    const isFr = this.lang === 'fr';
    const currentWing = PRESENTATION_DATA.wings[this.louvre.currentWingIndex];
    if (this.modalWingTag) this.modalWingTag.textContent = `DOSSIER #${currentWing.num}`;

    if (!this.modalText) return;
    this.modalText.innerHTML = '';

    // 1. Full Poster (Histoire de France / Frise Chronologique)
    if (item.type === 'full-poster') {
      this.modalTitle.textContent = isFr ? item.title.fr : item.title.en;
      this.modalImage.src = item.image; // WHOLE UNCROPPED IMAGE
      this.modalCaption.textContent = isFr ? item.caption.fr : item.caption.en;

      if (item.details) {
        const details = isFr ? item.details.fr : item.details.en;
        const list = document.createElement('ul');
        list.className = 'verbatim-list';
        details.forEach(d => {
          const li = document.createElement('li');
          li.textContent = d;
          list.appendChild(li);
        });
        this.modalText.appendChild(list);
      }

      if (item.movements) {
        const movTitle = document.createElement('h3');
        movTitle.className = 'verbatim-lead';
        movTitle.textContent = isFr ? "Courants Littéraires & Figures Clés (XVe–XXe Siècle) :" : "Literary Movements & Key Figures (15th–20th Century):";
        this.modalText.appendChild(movTitle);

        const list = document.createElement('ul');
        list.className = 'verbatim-list';
        item.movements.forEach(m => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${isFr ? m.name.fr : m.name.en} :</strong> ${m.authors}`;
          list.appendChild(li);
        });
        this.modalText.appendChild(list);
      }
      return;
    }

    // 2. Period Card (Period 1, 2, 3)
    if (item.periodNum) {
      this.modalTitle.textContent = `${item.periodNum} – ${isFr ? item.title.fr : item.title.en}`;
      this.modalImage.src = item.image; // WHOLE UNCROPPED IMAGE
      this.modalCaption.textContent = `${isFr ? item.title.fr : item.title.en} (1600–2000)`;

      const focusCard = document.createElement('div');
      focusCard.className = 'quote-highlight-card';
      focusCard.innerHTML = `<strong>${isFr ? "AXE STRATÉGIQUE :" : "CORE FOCUS:"}</strong> ${isFr ? item.focus.fr : item.focus.en}`;
      this.modalText.appendChild(focusCard);

      const authHeader = document.createElement('div');
      authHeader.className = 'verbatim-lead';
      authHeader.style.whiteSpace = 'pre-line';
      authHeader.textContent = isFr ? item.authorHeader.fr : item.authorHeader.en;
      this.modalText.appendChild(authHeader);

      if (item.authors) {
        const list = document.createElement('ul');
        list.className = 'verbatim-list';
        item.authors.forEach(a => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${a.name}</strong> – ${isFr ? a.desc.fr : a.desc.en}`;
          list.appendChild(li);
        });
        this.modalText.appendChild(list);
      }
      return;
    }

    // 3. Core Profile (Hugo, Daniélou, Tocqueville)
    if (item.number && item.phrase) {
      this.modalTitle.textContent = item.number;
      this.modalImage.src = item.image || item.portrait; // WHOLE UNCROPPED IMAGE
      this.modalCaption.textContent = `${item.author} — ${isFr ? item.phrase.fr : item.phrase.en}`;

      const phraseCard = document.createElement('div');
      phraseCard.className = 'quote-highlight-card';
      phraseCard.innerHTML = `<strong>${isFr ? item.phrase.fr : item.phrase.en}</strong>`;
      this.modalText.appendChild(phraseCard);

      const whyHeader = document.createElement('h3');
      whyHeader.className = 'verbatim-lead';
      whyHeader.textContent = isFr ? item.whyHeader.fr : item.whyHeader.en;
      this.modalText.appendChild(whyHeader);

      const ratP = document.createElement('p');
      ratP.className = 'verbatim-block';
      ratP.textContent = isFr ? item.rationale.fr : item.rationale.en;
      this.modalText.appendChild(ratP);
      return;
    }

    // 4. Behind the Authors (Family, Childhood and Personal Life)
    if (item.familyPoints) {
      this.modalTitle.textContent = item.number;
      this.modalImage.src = item.cardImage || item.portrait; // WHOLE UNCROPPED IMAGE
      this.modalCaption.textContent = `${item.fullName} – ${isFr ? "Dossier Familial & Personnel" : "Family, Childhood and Personal Life"}`;

      const grid = document.createElement('div');
      grid.className = 'author-meta-grid';
      grid.innerHTML = `
        <div>
          <div class="meta-field-label">${isFr ? "Nom Complet" : "Full Name"}</div>
          <div class="meta-field-value">${item.fullName}</div>
        </div>
        <div>
          <div class="meta-field-label">${isFr ? "Naissance" : "Born"}</div>
          <div class="meta-field-value">${item.born}</div>
        </div>
        <div>
          <div class="meta-field-label">${isFr ? "Lieu de Naissance" : "Birthplace"}</div>
          <div class="meta-field-value">${item.birthplace}</div>
        </div>
        <div>
          <div class="meta-field-label">${isFr ? "Célèbre Pour" : "Known For"}</div>
          <div class="meta-field-value">${isFr ? item.knownFor.fr : item.knownFor.en}</div>
        </div>
      `;
      this.modalText.appendChild(grid);

      const bgTitle = document.createElement('h3');
      bgTitle.className = 'verbatim-lead';
      bgTitle.textContent = isFr ? "Contexte Familial :" : "Family Background:";
      this.modalText.appendChild(bgTitle);

      const introP = document.createElement('p');
      introP.className = 'verbatim-block';
      introP.textContent = isFr ? item.familyBackgroundIntro.fr : item.familyBackgroundIntro.en;
      this.modalText.appendChild(introP);

      const ptsList = document.createElement('ul');
      ptsList.className = 'verbatim-list';
      item.familyPoints.forEach(fp => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${isFr ? fp.role.fr : fp.role.en}</strong> ${isFr ? fp.desc.fr : fp.desc.en}`;
        ptsList.appendChild(li);
      });
      this.modalText.appendChild(ptsList);

      if (item.interestingFamilyFacts) {
        const factsTitle = document.createElement('h3');
        factsTitle.className = 'verbatim-lead';
        factsTitle.style.marginTop = '20px';
        factsTitle.textContent = isFr ? "Faits Familiaux Marquants :" : "Interesting Family Facts:";
        this.modalText.appendChild(factsTitle);

        const factsList = document.createElement('ul');
        factsList.className = 'verbatim-list';
        item.interestingFamilyFacts.forEach(ff => {
          const li = document.createElement('li');
          li.textContent = isFr ? ff.fr : ff.en;
          factsList.appendChild(li);
        });
        this.modalText.appendChild(factsList);
      }
      return;
    }

    // 5. Personal Incidents / Poem / Comparison Table
    if (item.poemSection || item.comparisonTable || item.originalFrench || item.headers) {
      if (item.originalFrench) {
        this.modalTitle.textContent = item.title;
        this.modalImage.src = item.manuscriptImage;
        this.modalCaption.textContent = "Victor Hugo, Les Contemplations (1856) - Manuscrit Autographe";

        const poemDiv = document.createElement('div');
        poemDiv.className = 'poem-stanza';
        poemDiv.textContent = isFr ? item.originalFrench : item.englishTranslation;
        this.modalText.appendChild(poemDiv);
        return;
      }

      if (item.headers && item.rows) {
        this.modalTitle.textContent = isFr ? item.title.fr : item.title.en;
        this.modalImage.src = item.image;
        this.modalCaption.textContent = isFr ? "Matrice Comparative : Victor Hugo vs. Voltaire" : "Comparative Analysis Matrix: Victor Hugo vs. Voltaire";

        const wrapper = document.createElement('div');
        wrapper.className = 'comparison-table-wrapper';
        const table = document.createElement('table');
        table.className = 'comparison-matrix';

        table.innerHTML = `
          <thead>
            <tr>
              <th>${isFr ? item.headers.col1.fr : item.headers.col1.en}</th>
              <th>${isFr ? item.headers.col2.fr : item.headers.col2.en}</th>
              <th>${isFr ? item.headers.col3.fr : item.headers.col3.en}</th>
            </tr>
          </thead>
          <tbody>
            ${item.rows.map(r => `
              <tr>
                <td><strong>${isFr ? r.category.fr : r.category.en}</strong></td>
                <td>${isFr ? r.hugo.fr : r.hugo.en}</td>
                <td>${isFr ? r.voltaire.fr : r.voltaire.en}</td>
              </tr>
            `).join('')}
          </tbody>
        `;
        wrapper.appendChild(table);
        this.modalText.appendChild(wrapper);
        return;
      }

      this.modalTitle.textContent = isFr ? item.title.fr : item.title.en;
      this.modalImage.src = item.overviewImage;
      this.modalCaption.textContent = isFr ? item.tagline.fr : item.tagline.en;

      if (item.authors) {
        item.authors.forEach(a => {
          const card = document.createElement('div');
          card.className = 'quote-highlight-card';
          card.innerHTML = `
            <h4>${a.author}</h4>
            <p>${isFr ? a.focus.fr : a.focus.en}</p>
            <p style="white-space: pre-line; margin-top: 6px;">${isFr ? a.mainWorks.fr : a.mainWorks.en}</p>
          `;
          this.modalText.appendChild(card);
        });
      }

      if (item.connectionCard) {
        const connTitle = document.createElement('h3');
        connTitle.className = 'verbatim-lead';
        connTitle.textContent = isFr ? item.connectionCard.title.fr : item.connectionCard.title.en;
        this.modalText.appendChild(connTitle);

        const connP = document.createElement('p');
        connP.className = 'verbatim-block';
        connP.textContent = isFr ? item.connectionCard.text.fr : item.connectionCard.text.en;
        this.modalText.appendChild(connP);
      }

      if (item.contemplationsBreakdown) {
        const cTitle = document.createElement('h3');
        cTitle.className = 'verbatim-lead';
        cTitle.style.marginTop = '16px';
        cTitle.textContent = item.contemplationsBreakdown.title;
        this.modalText.appendChild(cTitle);

        const figsList = document.createElement('ul');
        figsList.className = 'verbatim-list';
        item.contemplationsBreakdown.centralFigures.forEach(cf => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${isFr ? cf.title.fr : cf.title.en}</strong> ${isFr ? cf.desc.fr : cf.desc.en}`;
          figsList.appendChild(li);
        });
        this.modalText.appendChild(figsList);
      }
      return;
    }

    // 6. Works and Recognition
    if (item.field && item.legacy) {
      this.modalTitle.textContent = item.number;
      this.modalImage.src = item.cardImage;
      this.modalCaption.textContent = `${item.number} – ${isFr ? item.field.fr : item.field.en}`;

      const fCard = document.createElement('div');
      fCard.className = 'quote-highlight-card';
      fCard.innerHTML = `
        <p><strong>${isFr ? item.field.fr : item.field.en}</strong></p>
        <p style="margin-top: 8px;">${isFr ? item.legacy.fr : item.legacy.en}</p>
      `;
      this.modalText.appendChild(fCard);

      const recTitle = document.createElement('h3');
      recTitle.className = 'verbatim-lead';
      recTitle.textContent = isFr ? "Reconnaissance et Honneurs :" : "Recognition and Honours:";
      this.modalText.appendChild(recTitle);

      const recList = document.createElement('ul');
      recList.className = 'verbatim-list';
      item.recognitionAndHonours.forEach(rh => {
        const li = document.createElement('li');
        li.textContent = isFr ? rh.fr : rh.en;
        recList.appendChild(li);
      });
      this.modalText.appendChild(recList);

      const mems = item.memorialsAndInstitutions || item.memorialsAndMonuments;
      if (mems) {
        const memTitle = document.createElement('h3');
        memTitle.className = 'verbatim-lead';
        memTitle.style.marginTop = '16px';
        memTitle.textContent = isFr ? "Mémoriaux et Institutions :" : "Memorials and Institutions:";
        this.modalText.appendChild(memTitle);

        const memList = document.createElement('ul');
        memList.className = 'verbatim-list';
        mems.forEach(m => {
          const li = document.createElement('li');
          li.textContent = isFr ? m.fr : m.en;
          memList.appendChild(li);
        });
        this.modalText.appendChild(memList);
      }

      const studyPoints = item.whyPeopleStillRead || item.whyPeopleStillStudy;
      if (studyPoints) {
        const sTitle = document.createElement('h3');
        sTitle.className = 'verbatim-lead';
        sTitle.style.marginTop = '16px';
        sTitle.textContent = isFr ? "Pourquoi on lit encore ses œuvres aujourd'hui :" : "Why people still read his works:";
        this.modalText.appendChild(sTitle);

        const sList = document.createElement('ul');
        sList.className = 'verbatim-list';
        studyPoints.forEach(sp => {
          const li = document.createElement('li');
          li.textContent = isFr ? sp.fr : sp.en;
          sList.appendChild(li);
        });
        this.modalText.appendChild(sList);
      }
      return;
    }

    // 7. Recent Mentions
    if (item.whatHappened) {
      this.modalTitle.textContent = isFr ? item.title.fr : item.title.en;
      this.modalImage.src = item.images ? item.images[0] : "assets/images/img_141.jpg";
      this.modalCaption.textContent = isFr ? item.tag.fr : item.tag.en;

      const whTitle = document.createElement('h3');
      whTitle.className = 'verbatim-lead';
      whTitle.textContent = isFr ? "Que s'est-il passé ?" : "What happened?";
      this.modalText.appendChild(whTitle);

      const whList = document.createElement('ul');
      whList.className = 'verbatim-list';
      item.whatHappened[isFr ? 'fr' : 'en'].forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        whList.appendChild(li);
      });
      this.modalText.appendChild(whList);

      if (item.recent2026Example) {
        const recDiv = document.createElement('div');
        recDiv.className = 'quote-highlight-card';
        recDiv.textContent = isFr ? item.recent2026Example.fr : item.recent2026Example.en;
        this.modalText.appendChild(recDiv);
      }

      if (item.anotherRecognition2025) {
        const recDiv = document.createElement('div');
        recDiv.className = 'quote-highlight-card';
        recDiv.textContent = isFr ? item.anotherRecognition2025.fr : item.anotherRecognition2025.en;
        this.modalText.appendChild(recDiv);
      }

      if (item.fullDetailText) {
        const fdt = document.createElement('p');
        fdt.className = 'verbatim-block';
        fdt.style.fontStyle = 'italic';
        fdt.textContent = isFr ? item.fullDetailText.fr : item.fullDetailText.en;
        this.modalText.appendChild(fdt);
      }

      const wmTitle = document.createElement('h3');
      wmTitle.className = 'verbatim-lead';
      wmTitle.style.marginTop = '16px';
      wmTitle.textContent = isFr ? "Pourquoi son nom a-t-il été mentionné ?" : "Why was his name mentioned?";
      this.modalText.appendChild(wmTitle);

      const wmP = document.createElement('p');
      wmP.className = 'verbatim-block';
      wmP.style.whiteSpace = 'pre-line';
      wmP.textContent = isFr ? item.whyMentioned.fr : item.whyMentioned.en;
      this.modalText.appendChild(wmP);

      if (item.projectSignificance) {
        const psTitle = document.createElement('h3');
        psTitle.className = 'verbatim-lead';
        psTitle.style.marginTop = '16px';
        psTitle.textContent = isFr ? "Portée et Signification :" : "Project Significance:";
        this.modalText.appendChild(psTitle);

        const psP = document.createElement('p');
        psP.className = 'verbatim-block';
        psP.textContent = isFr ? item.projectSignificance.fr : item.projectSignificance.en;
        this.modalText.appendChild(psP);
      }

      if (item.source) {
        const srcP = document.createElement('p');
        srcP.className = 'modal-caption';
        srcP.style.textAlign = 'left';
        srcP.textContent = isFr ? item.source.fr : item.source.en;
        this.modalText.appendChild(srcP);
      }
      return;
    }

    // 8. "If These Authors Were Alive Today…"
    if (item.dialogues) {
      this.modalTitle.textContent = isFr ? item.title.fr : item.title.en;
      this.modalImage.src = item.headerCardImage;
      this.modalCaption.textContent = isFr ? item.tagline.fr : item.tagline.en;

      const introP = document.createElement('p');
      introP.className = 'verbatim-lead';
      introP.textContent = isFr ? item.intro.fr : item.intro.en;
      this.modalText.appendChild(introP);

      item.dialogues.forEach(d => {
        const qCard = document.createElement('div');
        qCard.className = 'quote-highlight-card';
        qCard.innerHTML = `
          <h4>✦ ${isFr ? d.question.fr : d.question.en}</h4>
          <p style="margin-top: 8px; font-size: 16px; font-style: normal; color: #f0ece1;">
            <strong>${d.author} :</strong> ${isFr ? d.reflection.fr : d.reflection.en}
          </p>
        `;
        this.modalText.appendChild(qCard);
      });
      return;
    }

    // Fallback
    this.modalTitle.textContent = fallbackTitle || "Dossier Louvre";
    this.modalImage.src = "assets/images/frise_chronologique.png";
  }

  // =========================================================================
  // PROFESSOR'S BRIEFING READ-ALOUD (SPEECH SYNTHESIS)
  // =========================================================================
  toggleSpeech() {
    if (this.isSpeaking) {
      this.stopSpeech();
    } else {
      this.startSpeech();
    }
  }

  startSpeech() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToRead = (this.modalTitle ? this.modalTitle.textContent : '') + '. ' + (this.modalText ? this.modalText.innerText : '');
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = this.lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.modalSpeechLabel) {
        this.modalSpeechLabel.textContent = this.lang === 'fr' ? "Briefing du Professeur" : "Professor's Briefing";
      }
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (this.modalSpeechLabel) {
        this.modalSpeechLabel.textContent = this.lang === 'fr' ? "Briefing du Professeur" : "Professor's Briefing";
      }
    };

    window.speechSynthesis.speak(utterance);
    this.isSpeaking = true;
    if (this.modalSpeechLabel) {
      this.modalSpeechLabel.textContent = this.lang === 'fr' ? "Arrêter le Briefing" : "Stop Briefing";
    }
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    if (this.modalSpeechLabel) {
      this.modalSpeechLabel.textContent = this.lang === 'fr' ? "Briefing du Professeur" : "Professor's Briefing";
    }
  }

  // =========================================================================
  // WHOLE SONG LYRICS & RESISTANCE CHANTS VIEWER
  // =========================================================================
  openLyricsModal(lyricId = 'bella_ciao') {
    if (!this.lyricsModal) return;
    this.lyricsModal.classList.add('active');
    this.renderLyrics(lyricId);
  }

  closeLyricsModal() {
    if (!this.lyricsModal) return;
    this.lyricsModal.classList.remove('active');
  }

  renderLyrics(songId) {
    if (!this.lyricsContent) return;
    const isFr = this.lang === 'fr';

    if (songId === 'napoleon') {
      if (this.lyricsTitle) this.lyricsTitle.textContent = isFr ? "Le Chant du Départ (Hymne de Napoléon)" : "Le Chant du Départ (Napoleon's Imperial Anthem)";
      this.lyricsContent.innerHTML = `
        <div class="heist-quote-box" style="margin-bottom:16px;">
          <strong style="color:#ffd700;">HYMNE IMPÉRIAL DE NAPOLÉON BONAPARTE (1794 / 1804)</strong>
          <p style="font-size:13px; color:#c8c5bc; margin-top:4px;">Paroles de Marie-Joseph Chénier / Musique d'Étienne Méhul. Interprété par la Musique de la Garde Républicaine.</p>
        </div>

        <div class="lyrics-stanza-card">
          <div class="lyrics-stanza-title">COUPLET 1 (UN DÉPUTÉ DU PEUPLE)</div>
          <div class="lyrics-text-original">
            La victoire en chantant nous ouvre la barrière,<br>
            La République nous appelle !<br>
            Sachons vaincre ou sachons périr :<br>
            Un Français doit vivre pour elle !
          </div>
          <div class="lyrics-text-translation">
            ${isFr ? "La victoire triomphale nous ouvre la route, la nation nous appelle au combat pour la souveraineté !" : "Victory singing opens the barrier for us, the Republic calls to us! Let us conquer or perish: a Frenchman must live for her!"}
          </div>
        </div>

        <div class="lyrics-stanza-card" style="border-left-color:#ffd700;">
          <div class="lyrics-stanza-title">REFRAIN TRIOMPHAL (LE CHŒUR DES GUERRIERS)</div>
          <div class="lyrics-text-original">
            La République nous appelle,<br>
            Sachons vaincre ou sachons périr !<br>
            Un Français doit vivre pour elle,<br>
            Pour elle un Français doit mourir !
          </div>
          <div class="lyrics-text-translation">
            ${isFr ? "Hymne sacré des armées révolutionnaires et de la Grande Armée de Napoléon à Austerlitz." : "Sacred anthem of the revolutionary armies and Napoleon's Grande Armée at Austerlitz."}
          </div>
        </div>

        <div class="lyrics-stanza-card">
          <div class="lyrics-stanza-title">COUPLET 2 (LES GUERRIERS)</div>
          <div class="lyrics-text-original">
            De nos yeux souverains la France a chassé les rois :<br>
            Guerriers, le fer en main, marchez pour sa défense !<br>
            Tremblez, ennemis de la France,<br>
            Rois ivres de sang et d'orgueil !
          </div>
          <div class="lyrics-text-translation">
            ${isFr ? "Les soldats marchent d'un pas fier pour briser les chaînes de l'oppression." : "Warriors, weapons in hand, march for her defense! Tremble, enemies of France, kings drunk on blood and pride!"}
          </div>
        </div>
      `;
      return;
    }

    if (songId === 'marseillaise') {
      if (this.lyricsTitle) this.lyricsTitle.textContent = isFr ? "La Marseillaise (Hymne National Français, 1792)" : "La Marseillaise (French National Anthem, 1792)";
      this.lyricsContent.innerHTML = `
        <div class="heist-quote-box" style="margin-bottom:16px;">
          <strong style="color:#e50914;">HYMNE DE LA RÉVOLUTION FRANÇAISE (1792)</strong>
          <p style="font-size:13px; color:#c8c5bc; margin-top:4px;">Composé par Claude Joseph Rouget de Lisle à Strasbourg en 1792.</p>
        </div>

        <div class="lyrics-stanza-card">
          <div class="lyrics-stanza-title">PREMIER COUPLET</div>
          <div class="lyrics-text-original">
            Allons enfants de la Patrie,<br>
            Le jour de gloire est arrivé !<br>
            Contre nous de la tyrannie,<br>
            L'étendard sanglant est levé !<br>
            Entendez-vous dans les campagnes<br>
            Mugir ces féroces soldats ?<br>
            Ils viennent jusque dans vos bras<br>
            Égorger vos fils, vos compagnes !
          </div>
          <div class="lyrics-text-translation">
            ${isFr ? "L'appel vibrant du peuple français aux armes pour repousser les armées coalisées." : "Arise, children of the Fatherland, the day of glory has arrived! Against us, tyranny's bloody standard is raised! Do you hear the roar of those ferocious soldiers?"}
          </div>
        </div>

        <div class="lyrics-stanza-card" style="border-left-color:#002395;">
          <div class="lyrics-stanza-title">REFRAIN FÉDÉRATEUR</div>
          <div class="lyrics-text-original">
            Aux armes, citoyens !<br>
            Formez vos bataillons !<br>
            Marchons, marchons !<br>
            Qu'un sang impur abreuve nos sillons !
          </div>
          <div class="lyrics-text-translation">
            ${isFr ? "Le grand refrain révolutionnaire qui a résonné sur les barricades de Paris !" : "The great revolutionary refrain that resonated across the barricades of Paris!"}
          </div>
        </div>
      `;
      return;
    }

    // Default: Bella Ciao (Whole Song / 6 Complete Verses)
    if (this.lyricsTitle) this.lyricsTitle.textContent = isFr ? "Bella Ciao — Chanson Complète (6 Couplets)" : "Bella Ciao — Complete Song (All 6 Verses)";
    this.lyricsContent.innerHTML = `
      <div class="heist-quote-box" style="margin-bottom:16px;">
        <strong style="color:#ffd700;">HYMNE MONDIAL DE LA RÉSISTANCE & DE LA CASA DE PAPEL</strong>
        <p style="font-size:13px; color:#c8c5bc; margin-top:4px;">Chant traditionnel des partisans antifascistes italiens, devenu le symbole planétaire de la liberté et de la rébellion du Professeur.</p>
      </div>

      <div class="lyrics-stanza-card">
        <div class="lyrics-stanza-title">COUPLET 1 — LE RÉVEIL DU COMBATTANT</div>
        <div class="lyrics-text-original">
          Una mattina mi son svegliato,<br>
          O bella ciao, bella ciao, bella ciao ciao ciao !<br>
          Una mattina mi son svegliato,<br>
          E ho trovato l'invasor.
        </div>
        <div class="lyrics-text-translation">
          ${isFr ? "Un matin, je me suis réveillé, ô ma belle au revoir... un matin je me suis réveillé, et j'ai trouvé l'envahisseur." : "One morning I woke up, goodbye beautiful... one morning I woke up, and I found the invader."}
        </div>
      </div>

      <div class="lyrics-stanza-card">
        <div class="lyrics-stanza-title">COUPLET 2 — L'APPEL DU MAQUIS</div>
        <div class="lyrics-text-original">
          O partigiano, portami via,<br>
          O bella ciao, bella ciao, bella ciao ciao ciao !<br>
          O partigiano, portami via,<br>
          Ché mi sento di morir.
        </div>
        <div class="lyrics-text-translation">
          ${isFr ? "Ô partisan, emmène-moi avec toi... car je sens que je vais mourir." : "Oh partisan, take me away... because I feel ready to die."}
        </div>
      </div>

      <div class="lyrics-stanza-card">
        <div class="lyrics-stanza-title">COUPLET 3 — LE TESTAMENT DU RÉSISTANT</div>
        <div class="lyrics-text-original">
          E se io muoio da partigiano,<br>
          O bella ciao, bella ciao, bella ciao ciao ciao !<br>
          E se io muoio da partigiano,<br>
          Tu mi devi seppellir.
        </div>
        <div class="lyrics-text-translation">
          ${isFr ? "Et si je meurs en partisan... tu devras m'enterrer." : "And if I die as a partisan... you must bury me."}
        </div>
      </div>

      <div class="lyrics-stanza-card">
        <div class="lyrics-stanza-title">COUPLET 4 — LA MONTAGNE & LA FLEUR</div>
        <div class="lyrics-text-original">
          E seppellire lassù in montagna,<br>
          O bella ciao, bella ciao, bella ciao ciao ciao !<br>
          E seppellire lassù in montagna,<br>
          Sotto l'ombra di un bel fior.
        </div>
        <div class="lyrics-text-translation">
          ${isFr ? "Et m'enterrer là-haut sur la montagne... à l'ombre d'une belle fleur." : "And bury me up on the mountain... under the shade of a beautiful flower."}
        </div>
      </div>

      <div class="lyrics-stanza-card">
        <div class="lyrics-stanza-title">COUPLET 5 — LA MÉMOIRE DES GENS</div>
        <div class="lyrics-text-original">
          Tutte le genti che passeranno,<br>
          O bella ciao, bella ciao, bella ciao ciao ciao !<br>
          Tutte le genti che passeranno,<br>
          Mi diranno « Che bel fior ! »
        </div>
        <div class="lyrics-text-translation">
          ${isFr ? "Et tous les passants qui chemineront... me diront « Quelle belle fleur ! »" : "And all the people passing by... will tell me 'What a beautiful flower!'" }
        </div>
      </div>

      <div class="lyrics-stanza-card" style="border-left-color:#ffd700;">
        <div class="lyrics-stanza-title">COUPLET 6 — LA LIBERTÉ ÉTERNELLE</div>
        <div class="lyrics-text-original">
          « È questo il fiore del partigiano,<br>
          O bella ciao, bella ciao, bella ciao ciao ciao !<br>
          È questo il fiore del partigiano,<br>
          Morto per la libertà ! »
        </div>
        <div class="lyrics-text-translation">
          ${isFr ? "« C'est la fleur du résistant, mort pour la liberté ! »" : " 'This is the flower of the partisan, who died for liberty!' "}
        </div>
      </div>
    `;
  }

  startLoop() {
    let lastTime = performance.now();

    const animate = (time) => {
      requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (this.revolution) {
        this.revolution.update(delta);
      }
    };

    requestAnimationFrame(animate);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new LouvreApp();
});
