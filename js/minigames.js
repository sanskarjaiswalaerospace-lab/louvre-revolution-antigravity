/**
 * MINIGAMES.JS
 * Money Heist (La Casa de Papel) x French Revolution Mini-Games Arcade
 * 
 * Includes 3 Complete Interactive Games:
 * 1. 🔓 "Le Coffre du Louvre" (Louvre Vault Safe Cracker)
 *    - Rotate the dial or enter the secret code (Revolutionary dates: 1789, 1848, 1885, etc.)
 *    - Unlocks secret historical dossiers and gold bullion!
 * 
 * 2. 🎮 "La Résistance des Barricades" (Barricade Catch Arcade)
 *    - Canvas arcade mini-game: Move the Dalí resistance operative left/right
 *    - Catch falling banknotes (€100 bills), gold bars, and resistance leaflets
 *    - Dodge royal cannonballs! High score tracking!
 * 
 * 3. 🧠 "Le Quiz du Professeur" (The Professor's Heist Trivia)
 *    - Interactive 5-question trivia directly from the PDF data (Hugo, Voltaire, Tocqueville, Daniélou, Flaubert)
 *    - Dynamic score, instant feedback, and assigns a Heist City Codename ("Paris", "Marseille", "Tokyo", "Berlin")!
 */

class HeistArcade {
  constructor(app) {
    this.app = app;
    this.activeGame = 'quiz'; // 'vault', 'arcade', 'quiz'
    this.score = 0;
    this.arcadeAnimationId = null;
    this.arcadeRunning = false;

    // Quiz State
    this.quizIndex = 0;
    this.quizScore = 0;

    // Vault State
    this.vaultCode = "1789";
    this.enteredCode = "";

    this.initDOM();
  }

  initDOM() {
    this.modal = document.getElementById('arcade-modal');
    this.container = document.getElementById('arcade-game-container');
    this.gameTabs = document.querySelectorAll('.arcade-tab-btn');
    this.closeBtn = document.getElementById('arcade-close-btn');

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.gameTabs) {
      this.gameTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          this.gameTabs.forEach(t => t.classList.remove('active'));
          e.target.classList.add('active');
          const gameId = e.target.getAttribute('data-game');
          this.switchGame(gameId);
        });
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }
  }

  open(gameId = 'quiz') {
    if (!this.modal) return;
    this.modal.classList.add('active');
    this.switchGame(gameId);
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.stopArcade();
  }

  switchGame(gameId) {
    this.activeGame = gameId;
    this.stopArcade();

    if (this.gameTabs) {
      this.gameTabs.forEach(t => {
        if (t.getAttribute('data-game') === gameId) t.classList.add('active');
        else t.classList.remove('active');
      });
    }

    if (gameId === 'vault') {
      this.renderVaultGame();
    } else if (gameId === 'arcade') {
      this.renderBarricadeArcade();
    } else if (gameId === 'artillery') {
      this.renderNapoleonArtillery();
    } else {
      this.renderQuizGame();
    }
  }

  // =========================================================================
  // MINI-GAME 1: VAULT CRACKER (LE COFFRE ROYAL DU LOUVRE)
  // =========================================================================
  renderVaultGame() {
    const isFr = this.app.lang === 'fr';
    this.enteredCode = "";

    this.container.innerHTML = `
      <div class="vault-game-view">
        <div class="heist-arcade-header">
          <span class="heist-tag-pill">MINI-JEU 1</span>
          <h2>${isFr ? "🔓 Le Coffre-Fort du Louvre" : "🔓 The Louvre Royal Vault"}</h2>
          <p>${isFr ? "Trouvez la combinaison historique à 4 chiffres (Indice : L'année de la prise de la Bastille et de la Révolution française !)" : "Crack the 4-digit historical code (Hint: The year of the Storming of the Bastille and French Revolution!)"}</p>
        </div>

        <div class="vault-door-ui">
          <div class="vault-dial-frame">
            <div class="vault-screen-display" id="vault-display">_ _ _ _</div>
          </div>

          <div class="vault-keypad">
            ${[1,2,3,4,5,6,7,8,9,0].map(n => `<button class="keypad-btn" data-val="${n}">${n}</button>`).join('')}
            <button class="keypad-btn btn-clear" id="keypad-clear">${isFr ? "EFFACER" : "CLEAR"}</button>
            <button class="keypad-btn btn-enter" id="keypad-enter">${isFr ? "OUVRIR" : "CRACK"}</button>
          </div>
        </div>

        <div id="vault-result" class="vault-feedback-box"></div>
      </div>
    `;

    const display = document.getElementById('vault-display');
    const resultBox = document.getElementById('vault-result');

    this.container.querySelectorAll('.keypad-btn[data-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.enteredCode.length < 4) {
          this.enteredCode += btn.getAttribute('data-val');
          this.updateVaultDisplay(display);
        }
      });
    });

    document.getElementById('keypad-clear').addEventListener('click', () => {
      this.enteredCode = "";
      this.updateVaultDisplay(display);
      resultBox.innerHTML = "";
    });

    document.getElementById('keypad-enter').addEventListener('click', () => {
      if (this.enteredCode === "1789") {
        resultBox.innerHTML = `
          <div class="success-message">
            <h3>🎉 ${isFr ? "COFFRE DÉVERROUILLÉ !" : "VAULT CRACKED!"}</h3>
            <p>${isFr ? "1789 — Début de la Révolution Française & Prise de la Bastille ! Vous remportez 10 lingots d'or du Louvre et le dossier secret de Voltaire !" : "1789 — Start of the French Revolution & Storming of the Bastille! You earned 10 Louvre Gold Ingots and Voltaire's secret file!"}</p>
            <div style="font-size: 32px; margin-top: 8px;">🪙 🪙 🪙 📜 🎭</div>
          </div>
        `;
        if (this.app.revolution) this.app.revolution.triggerCannon();
      } else {
        resultBox.innerHTML = `
          <div class="error-message">
            <p>🚨 ${isFr ? "CODE INCORRECT ! Indice : Révolution Française (17--)" : "INCORRECT CODE! Hint: French Revolution (17--)"}</p>
          </div>
        `;
      }
    });
  }

  updateVaultDisplay(el) {
    let txt = "";
    for (let i = 0; i < 4; i++) {
      txt += (this.enteredCode[i] || "_") + " ";
    }
    el.textContent = txt.trim();
  }

  // =========================================================================
  // MINI-GAME 2: BARRICADE RESISTANCE ARCADE (CANVAS CATCH GAME)
  // =========================================================================
  renderBarricadeArcade() {
    const isFr = this.app.lang === 'fr';
    this.score = 0;
    this.arcadeRunning = true;

    this.container.innerHTML = `
      <div class="arcade-game-view">
        <div class="heist-arcade-header">
          <span class="heist-tag-pill">MINI-JEU 2</span>
          <h2>${isFr ? "🎮 La Course des Barricades" : "🎮 Barricade Resistance Run"}</h2>
          <p>${isFr ? "Déplacez le résistant avec la souris ou les flèches (← / →). Attrapez les billets (€) et lingots, évitez les boulets de canon !" : "Move the resistance fighter using mouse or arrow keys (← / →). Catch banknotes (€) and gold bars, avoid royal cannonballs!"}</p>
        </div>

        <div class="arcade-canvas-wrapper">
          <div class="arcade-hud">
            <span>${isFr ? "SCORE HEIST :" : "HEIST SCORE:"} <strong id="arcade-score-val">0</strong></span>
            <span>${isFr ? "VIES :" : "LIVES:"} <strong id="arcade-lives-val">❤️❤️❤️</strong></span>
          </div>
          <canvas id="heist-runner-canvas" width="600" height="380"></canvas>
          <div id="arcade-game-over-overlay" class="arcade-overlay" style="display: none;">
            <h3 id="arcade-over-title">GAME OVER</h3>
            <button class="hud-btn" id="arcade-restart-btn">🔄 ${isFr ? "REJOUER" : "PLAY AGAIN"}</button>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('heist-runner-canvas');
    const ctx = canvas.getContext('2d');
    const scoreVal = document.getElementById('arcade-score-val');
    const livesVal = document.getElementById('arcade-lives-val');
    const overOverlay = document.getElementById('arcade-game-over-overlay');
    const restartBtn = document.getElementById('arcade-restart-btn');

    let playerX = canvas.width / 2;
    const playerY = canvas.height - 40;
    const playerW = 50;
    let lives = 3;
    let items = [];
    let spawnTimer = 0;

    // Mouse / touch tracking
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      playerX = (e.clientX - rect.left) * (canvas.width / rect.width);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') playerX = Math.max(25, playerX - 30);
      if (e.key === 'ArrowRight') playerX = Math.min(canvas.width - 25, playerX + 30);
    });

    restartBtn.addEventListener('click', () => {
      lives = 3;
      this.score = 0;
      items = [];
      overOverlay.style.display = 'none';
      this.arcadeRunning = true;
      scoreVal.textContent = '0';
      livesVal.textContent = '❤️❤️❤️';
      loop();
    });

    const loop = () => {
      if (!this.arcadeRunning) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Barricade Floor
      ctx.fillStyle = '#11121a';
      ctx.fillRect(0, canvas.height - 15, canvas.width, 15);
      ctx.strokeStyle = '#e50914';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 15);
      ctx.lineTo(canvas.width, canvas.height - 15);
      ctx.stroke();

      // Spawn falling items
      spawnTimer++;
      if (spawnTimer > 35) {
        spawnTimer = 0;
        const isCannonball = Math.random() < 0.35;
        items.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          vy: 2.5 + Math.random() * 2.5,
          isBad: isCannonball,
          type: isCannonball ? '💣' : (Math.random() > 0.5 ? '💶' : '🪙')
        });
      }

      // Update & Draw Items
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.vy;

        ctx.font = 'bold 24px "Comfortaa", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.type, item.x, item.y);

        // Catch collision
        if (Math.abs(item.x - playerX) < playerW / 2 + 15 && Math.abs(item.y - playerY) < 25) {
          if (item.isBad) {
            lives--;
            livesVal.textContent = '❤️'.repeat(Math.max(0, lives));
            if (lives <= 0) {
              this.arcadeRunning = false;
              overOverlay.style.display = 'flex';
              document.getElementById('arcade-over-title').textContent = isFr ? `FIN DE PARTIE ! SCORE : ${this.score}` : `HEIST TERMINATED! SCORE: ${this.score}`;
            }
          } else {
            this.score += item.type === '🪙' ? 200 : 100;
            scoreVal.textContent = this.score;
          }
          items.splice(i, 1);
          continue;
        }

        // Offscreen
        if (item.y > canvas.height + 20) {
          items.splice(i, 1);
        }
      }

      // Draw Player (Dalí Mask & Red Jumpsuit)
      ctx.fillStyle = '#e50914';
      ctx.beginPath();
      ctx.arc(playerX, playerY - 10, 16, 0, Math.PI * 2);
      ctx.fill();

      // Dalí Face & Mustache
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(playerX, playerY - 10, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px "Comfortaa", sans-serif';
      ctx.fillText('🎭', playerX, playerY - 6);

      // Resistance Basket / Bag
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(playerX - 25, playerY + 5, 50, 10);

      this.arcadeAnimationId = requestAnimationFrame(loop);
    };

    loop();
  }

  stopArcade() {
    this.arcadeRunning = false;
    if (this.arcadeAnimationId) {
      cancelAnimationFrame(this.arcadeAnimationId);
      this.arcadeAnimationId = null;
    }
  }

  // =========================================================================
  // MINI-GAME 3: PROFESSOR'S LITERARY HEIST QUIZ (100% FROM PDF DATA)
  // =========================================================================
  renderQuizGame() {
    const isFr = this.app.lang === 'fr';
    this.quizIndex = 0;
    this.quizScore = 0;

    const questions = [
      {
        q: {
          en: "Which French author was referred to as 'A literary colossus' and lost his daughter Léopoldine in 1843?",
          fr: "Quel auteur français est qualifié de « colosse littéraire » et a perdu sa fille Léopoldine noyée en 1843 ?"
        },
        opts: ["Victor Hugo", "Voltaire", "Gustave Flaubert", "Alexis de Tocqueville"],
        correct: 0,
        expl: {
          en: "Victor Hugo authored Les Misérables and wrote 'Demain, dès l'aube...' in memory of Léopoldine in Les Contemplations.",
          fr: "Victor Hugo a écrit Les Misérables et a composé « Demain, dès l'aube... » en mémoire de sa fille Léopoldine dans Les Contemplations."
        }
      },
      {
        q: {
          en: "In May 2023, Elon Musk tweeted a controversial quote about 'who you are not allowed to criticize' wrongly attributed to which author?",
          fr: "En mai 2023, Elon Musk a tweeté une citation controversée (« Pour savoir qui vous gouverne... ») attribuée à tort à quel auteur ?"
        },
        opts: ["Voltaire", "Honoré de Balzac", "Marcel Proust", "Alexis de Tocqueville"],
        correct: 0,
        expl: {
          en: "Fact-checkers proved the quote was not from Voltaire, but from a 1993 neo-Nazi text.",
          fr: "Les vérificateurs de faits ont prouvé que la citation n'était pas de Voltaire, mais d'un texte néonazi de 1993."
        }
      },
      {
        q: {
          en: "Which French thinker wrote 'Democracy in America' and foresaw the superpower rivalry between America and Russia?",
          fr: "Quel penseur français a écrit « De la démocratie en Amérique » et anticipé la rivalité entre les États-Unis et la Russie ?"
        },
        opts: ["Alexis de Tocqueville", "Alain Daniélou", "Jean-Paul Sartre", "Émile Zola"],
        correct: 0,
        expl: {
          en: "Alexis de Tocqueville is revered as 'A visionary before his time' for his landmark 1835 analysis.",
          fr: "Alexis de Tocqueville est célébré comme « Un visionnaire avant l'heure » pour son ouvrage magistral de 1835."
        }
      },
      {
        q: {
          en: "Which scholar spent decades living in India studying classical Hindu music and philosophy, called 'A bridge between East and West'?",
          fr: "Quel érudit français a passé des décennies en Inde pour étudier la musique classique et la philosophie hindoue, appelé « Un pont entre l'Orient et l'Occident » ?"
        },
        opts: ["Alain Daniélou", "Albert Camus", "Gustave Flaubert", "Pierre Corneille"],
        correct: 0,
        expl: {
          en: "Alain Daniélou was a French Indologist, musicologist, and translator who lived in Varanasi.",
          fr: "Alain Daniélou était un indianiste, musicologue et traducteur français qui a vécu à Bénarès."
        }
      },
      {
        q: {
          en: "At which global event was Victor Hugo's 'Les Misérables' featured dramatically at the Conciergerie?",
          fr: "Lors de quel événement planétaire l'œuvre de Victor Hugo « Les Misérables » a-t-elle été célébrée de façon spectaculaire à la Conciergerie ?"
        },
        opts: ["2024 Paris Olympics Opening Ceremony", "1998 World Cup", "2020 Expo Dubai", "2022 Cannes Festival"],
        correct: 0,
        expl: {
          en: "On 26 July 2024, the Paris Olympic Games opening ceremony paid an iconic homage to Les Misérables with red flares and torchlight.",
          fr: "Le 26 juillet 2024, la cérémonie d'ouverture des JO de Paris a rendu un hommage grandiose aux Misérables à la Conciergerie."
        }
      }
    ];

    const showQuestion = (idx) => {
      if (idx >= questions.length) {
        // Quiz Complete Screen
        let codename = "PARIS";
        if (this.quizScore >= 5) codename = "LE PROFESSEUR";
        else if (this.quizScore >= 4) codename = "BERLIN";
        else if (this.quizScore >= 3) codename = "MARSEILLE";
        else codename = "DENVER";

        this.container.innerHTML = `
          <div class="quiz-final-view">
            <span class="heist-tag-pill">MISSION ACCOMPLIE</span>
            <h2 style="font-size: 32px; color: #ffd700; margin: 12px 0;">SCORE : ${this.quizScore} / ${questions.length}</h2>
            <div class="heist-quote-box" style="border-color: #ffd700; text-align: center;">
              <p style="font-size: 14px; color: #c8c5bc; text-transform: uppercase;">${isFr ? "VOTRE NOM DE CODE DE BRAQUEUR :" : "YOUR HEIST CODENAME:"}</p>
              <h1 style="font-size: 38px; color: #e50914; letter-spacing: 3px; font-family: var(--font-heist-title); margin-top: 4px;">🎭 ${codename}</h1>
            </div>
            <p style="margin: 16px 0; font-size: 16px;">
              ${isFr ? "Vous avez maîtrisé les secrets intellectuels du Louvre et de la Révolution française !" : "You have mastered the intellectual secrets of the Louvre and the French Revolution!"}
            </p>
            <button class="hud-btn" id="quiz-retry-btn" style="margin: 0 auto;">🔄 ${isFr ? "RECOMMENCER LE QUIZ" : "RETRY QUIZ"}</button>
          </div>
        `;

        document.getElementById('quiz-retry-btn').addEventListener('click', () => {
          this.quizIndex = 0;
          this.quizScore = 0;
          showQuestion(0);
        });
        return;
      }

      const qObj = questions[idx];
      this.container.innerHTML = `
        <div class="quiz-question-view">
          <div class="heist-arcade-header">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="heist-tag-pill">QUESTION ${idx + 1} / ${questions.length}</span>
              <span style="font-family: var(--font-mono); color: #ffd700;">SCORE: ${this.quizScore}</span>
            </div>
            <h3 style="margin-top: 10px; font-size: 20px; line-height: 1.4;">${isFr ? qObj.q.fr : qObj.q.en}</h3>
          </div>

          <div class="quiz-options-list">
            ${qObj.opts.map((opt, oIdx) => `
              <button class="quiz-opt-btn" data-oidx="${oIdx}">
                <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback" class="quiz-feedback-box" style="display:none;"></div>
        </div>
      `;

      const fb = document.getElementById('quiz-feedback');
      const optBtns = this.container.querySelectorAll('.quiz-opt-btn');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          optBtns.forEach(b => b.disabled = true);
          const chosen = parseInt(btn.getAttribute('data-oidx'));
          if (chosen === qObj.correct) {
            btn.classList.add('correct');
            this.quizScore++;
            fb.innerHTML = `
              <div class="quiz-correct-msg">
                <strong>✔ ${isFr ? "EXCELLENT !" : "CORRECT!"}</strong>
                <p>${isFr ? qObj.expl.fr : qObj.expl.en}</p>
              </div>
            `;
          } else {
            btn.classList.add('wrong');
            optBtns[qObj.correct].classList.add('correct');
            fb.innerHTML = `
              <div class="quiz-wrong-msg">
                <strong>✖ ${isFr ? "INCORRECT !" : "WRONG!"}</strong>
                <p>${isFr ? qObj.expl.fr : qObj.expl.en}</p>
              </div>
            `;
          }
          fb.style.display = 'block';

          setTimeout(() => {
            this.quizIndex++;
            showQuestion(this.quizIndex);
          }, 2400);
        });
      });
    };

    showQuestion(0);
  }

  // =========================================================================
  // MINI-GAME 4: NAPOLÉON'S AUSTERLITZ ARTILLERY & OVERSIMPLIFIED SOUNDBOARD
  // =========================================================================
  renderNapoleonArtillery() {
    const isFr = this.app.lang === 'fr';
    let targetDist = Math.floor(250 + Math.random() * 220); // meters
    let artilleryScore = 0;

    this.container.innerHTML = `
      <div class="artillery-game-view">
        <div class="heist-arcade-header">
          <span class="heist-tag-pill" style="background:#002395; border:1px solid #ffd700; color:#ffd700;">NAPOLÉON x OVERSIMPLIFIED</span>
          <h2>${isFr ? "⚔️ L'Artillerie de Napoléon (Bataille d'Austerlitz)" : "⚔️ Napoleon's Artillery (Battle of Austerlitz)"}</h2>
          <p>${isFr ? "Ajustez l'angle du canon Gribeauval et la poudre pour abattre la forteresse ennemie !" : "Calibrate Napoleon's Gribeauval cannon angle and powder charge to demolish the fortress!"}</p>
        </div>

        <div class="artillery-controls-bar">
          <div class="artillery-slider-group">
            <label>${isFr ? "ANGLE DE TIR :" : "FIRE ANGLE:"} <span id="artillery-angle-val" class="artillery-val-display">45°</span></label>
            <input type="range" id="artillery-angle" min="20" max="80" value="45">
          </div>

          <div class="artillery-slider-group">
            <label>${isFr ? "POUDRE (BARILS) :" : "POWDER (BARRELS):"} <span id="artillery-powder-val" class="artillery-val-display">3</span></label>
            <input type="range" id="artillery-powder" min="1" max="5" value="3" step="0.5">
          </div>

          <div class="artillery-slider-group">
            <span style="font-size:12px; color:#ffd700; font-family:var(--font-heist-title);">${isFr ? "CIBLE ÉLOIGNÉE :" : "TARGET DISTANCE:"}</span>
            <span id="target-dist-display" class="artillery-val-display" style="font-size:18px; color:#68c283;">${targetDist} m</span>
          </div>

          <button class="artillery-fire-btn" id="artillery-fire-btn">💥 ${isFr ? "FEU ! (TIRER)" : "FIRE CANNON!"}</button>
        </div>

        <canvas id="artillery-canvas" class="artillery-battle-canvas" width="620" height="260"></canvas>

        <div id="artillery-feedback-box" class="vault-feedback-box" style="margin-top:10px;"></div>

        <!-- OverSimplified Quick Soundboard -->
        <div style="width:100%; max-width:650px; margin-top:12px; padding:12px; background:rgba(230,126,34,0.12); border:1px solid #e67e22; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:#f39c12; font-family:var(--font-heist-title); font-size:13px;">🥖 OVERSIMPLIFIED SOUNDBOARD & CITATIONS :</strong>
            <span style="font-size:11px; color:#c8c5bc;">(Cliquez pour écouter et afficher sur les barricades !)</span>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <button class="keypad-btn over-sound-btn" data-quote="Dude, uncool!" style="font-size:12px; padding:6px 10px; width:auto;">👑 "Dude, uncool!"</button>
            <button class="keypad-btn over-sound-btn" data-quote="There's a tax for that!" style="font-size:12px; padding:6px 10px; width:auto;">⚖️ "There's a tax for that!"</button>
            <button class="keypad-btn over-sound-btn" data-quote="Bread? In this economy?!" style="font-size:12px; padding:6px 10px; width:auto;">🥖 "Bread in this economy?!"</button>
            <button class="keypad-btn over-sound-btn" data-quote="To the guillotine!" style="font-size:12px; padding:6px 10px; width:auto;">⚔️ "To the guillotine!"</button>
            <button class="keypad-btn over-sound-btn" data-quote="Let them eat cake... wait, no!" style="font-size:12px; padding:6px 10px; width:auto;">🍰 "Let them eat cake... wait!"</button>
            <button class="keypad-btn over-sound-btn" data-quote="Chop chop chop chop chop!" style="font-size:12px; padding:6px 10px; width:auto;">🪓 "Chop chop chop chop!"</button>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('artillery-canvas');
    const ctx = canvas.getContext('2d');
    const angleSlider = document.getElementById('artillery-angle');
    const powderSlider = document.getElementById('artillery-powder');
    const angleVal = document.getElementById('artillery-angle-val');
    const powderVal = document.getElementById('artillery-powder-val');
    const fireBtn = document.getElementById('artillery-fire-btn');
    const fbBox = document.getElementById('artillery-feedback-box');

    angleSlider.addEventListener('input', () => {
      angleVal.textContent = angleSlider.value + '°';
      drawScene();
    });

    powderSlider.addEventListener('input', () => {
      powderVal.textContent = powderSlider.value;
      drawScene();
    });

    // Soundboard buttons
    this.container.querySelectorAll('.over-sound-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quote = btn.getAttribute('data-quote');
        if (this.app.revolution) {
          this.app.revolution.spawnSpeechBubble(quote);
        }
      });
    });

    const drawScene = (ballX = null, ballY = null) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient with stars & battle smoke
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#0a0d1e');
      skyGrad.addColorStop(0.7, '#151a30');
      skyGrad.addColorStop(1, '#2c334d');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Snowy Ground / Austerlitz Frozen Lake
      ctx.fillStyle = '#dbe4ee';
      ctx.fillRect(0, canvas.height - 35, canvas.width, 35);
      ctx.strokeStyle = '#8da4be';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, canvas.height - 35, canvas.width, 35);

      // Distant Fortress at targetDist position
      const fortX = 100 + (targetDist / 500) * (canvas.width - 180);
      const fortY = canvas.height - 85;

      // Draw Fortress Bastion
      ctx.fillStyle = '#4a4f5f';
      ctx.fillRect(fortX - 25, fortY, 50, 50);
      for (let c = 0; c < 4; c++) {
        ctx.fillRect(fortX - 25 + c * 14, fortY - 8, 8, 8);
      }

      // Fortress Royalist Flag
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fortX + 8, fortY - 24, 18, 12);
      ctx.strokeStyle = '#ffd700';
      ctx.strokeRect(fortX + 8, fortY - 24, 18, 12);
      ctx.strokeStyle = '#222';
      ctx.beginPath();
      ctx.moveTo(fortX + 8, fortY - 24);
      ctx.lineTo(fortX + 8, fortY);
      ctx.stroke();

      // Draw Napoleon beside the Cannon
      const napX = 35;
      const napY = canvas.height - 35;

      // Napoleon Body & Bicorne
      ctx.fillStyle = '#0a0c16';
      ctx.beginPath();
      ctx.arc(napX, napY - 44, 7, 0, Math.PI * 2);
      ctx.fill();

      // Bicorne hat
      ctx.beginPath();
      ctx.moveTo(napX - 14, napY - 45);
      ctx.quadraticCurveTo(napX, napY - 58, napX + 14, napY - 45);
      ctx.closePath();
      ctx.fill();

      // Golden cockade
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(napX - 3, napY - 50, 2, 0, Math.PI * 2);
      ctx.fill();

      // Napoleon Coat
      ctx.fillStyle = '#0a0c16';
      ctx.fillRect(napX - 6, napY - 37, 12, 22);

      // Cannon Barrel (Oriented by angle)
      const cannonX = 65;
      const cannonY = canvas.height - 45;
      const angleRad = (parseInt(angleSlider.value) * Math.PI) / 180;
      const barrelLen = 32;
      const endX = cannonX + Math.cos(angleRad) * barrelLen;
      const endY = cannonY - Math.sin(angleRad) * barrelLen;

      ctx.strokeStyle = '#c5a059'; // Gribeauval brass
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(cannonX, cannonY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Cannon Wheel
      ctx.fillStyle = '#5c4033';
      ctx.beginPath();
      ctx.arc(cannonX, cannonY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Cannonball if in flight
      if (ballX !== null && ballY !== null) {
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 100, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(ballX - Math.cos(angleRad) * 6, ballY + Math.sin(angleRad) * 4, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawScene();

    fireBtn.addEventListener('click', () => {
      fireBtn.disabled = true;
      const angle = parseFloat(angleSlider.value);
      const powder = parseFloat(powderSlider.value);

      const v0 = powder * 24.5;
      const rad = (angle * Math.PI) / 180;
      const vx = v0 * Math.cos(rad);
      let vy = -v0 * Math.sin(rad);
      const g = 9.8;

      let bx = 65;
      let by = canvas.height - 45;
      const fortX = 100 + (targetDist / 500) * (canvas.width - 180);

      if (this.app.revolution) {
        this.app.revolution.triggerCannon();
      }

      let animId;
      const sim = () => {
        bx += vx * 0.16;
        vy += g * 0.16;
        by += vy * 0.16;

        drawScene(bx, by);

        if (by >= canvas.height - 35 || bx >= canvas.width) {
          cancelAnimationFrame(animId);
          fireBtn.disabled = false;

          const distHit = Math.abs(bx - fortX);

          if (distHit < 32) {
            artilleryScore += 500;
            if (this.app.revolution) {
              this.app.revolution.spawnSpeechBubble(isFr ? "Coup au but ! Bravo soldat !" : "Direct hit! Dude, cool!");
            }
            fbBox.innerHTML = `
              <div class="success-message">
                <h3>👑 ${isFr ? "IMPACT DIRECT ! VICTOIRE D'AUSTERLITZ !" : "DIRECT HIT! VICTORY AT AUSTERLITZ!"}</h3>
                <p>${isFr ? "Napoléon vous décerne la Grand-Croix de la Légion d'Honneur ! La forteresse ennemie est anéantie !" : "Napoleon awards you the Legion of Honour! The enemy fortress has been demolished!"}</p>
                <div style="font-size: 28px; margin-top: 6px;">🎖️ 🦅 ⚔️ 💥</div>
              </div>
            `;
            setTimeout(() => {
              targetDist = Math.floor(220 + Math.random() * 260);
              const td = document.getElementById('target-dist-display');
              if (td) td.textContent = targetDist + ' m';
              drawScene();
            }, 3000);

          } else if (bx < fortX) {
            if (this.app.revolution) {
              this.app.revolution.spawnSpeechBubble(isFr ? "Trop court ! Plus de poudre !" : "Dude, uncool! Too short!");
            }
            fbBox.innerHTML = `
              <div class="error-message">
                <p>❄️ ${isFr ? "TROP COURT ! Le boulet a coulé dans le lac gelé ! Augmentez la poudre ou ajustez l'angle !" : "TOO SHORT! The cannonball sank in the frozen lake! Increase powder or angle!"}</p>
              </div>
            `;
          } else {
            if (this.app.revolution) {
              this.app.revolution.spawnSpeechBubble(isFr ? "Trop loin ! À la guillotine !" : "To the guillotine! Overshot!");
            }
            fbBox.innerHTML = `
              <div class="error-message">
                <p>💨 ${isFr ? "TROP LOIN ! Le tir a survolé la forteresse ! Baissez l'angle !" : "OVERSHOT! The cannonball flew past the fortress! Lower the angle!"}</p>
              </div>
            `;
          }
          return;
        }

        animId = requestAnimationFrame(sim);
      };

      animId = requestAnimationFrame(sim);
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeistArcade;
}
