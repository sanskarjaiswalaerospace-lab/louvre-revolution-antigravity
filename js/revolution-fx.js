/**
 * REVOLUTION-FX.JS
 * Money Heist (La Casa de Papel) x French Revolution x OverSimplified x Napoléon
 * 
 * Features:
 * - Continuous, looping Web Audio Synthesizer with 3 selectable historical tracks:
 *   1. 🎵 "BELLA CIAO" (Extended Money Heist Resistance Suite with melody, bassline, and accordion groove)
 *   2. ⚔️ "NAPOLÉON" (Imperial Military March & Austerlitz Fanfare with military snares, brass horns & timpani)
 *   3. 🥖 "OVERSIMPLIFIED" (Jaunty French Revolution Comedy March with harpsichord plucks & bouncy bass)
 * - The music PLAYS CONTINUOUSLY until the user explicitly turns it off!
 * - OverSimplified Animated Speech Bubbles popping up above revolutionaries on the barricades!
 * - Napoléon Bonaparte silhouette with bicorne hat and imperial coat observing the Louvre battlefield!
 * - Peasant silhouette waving a giant French baguette 🥖!
 * - Napoleonic Artillery Cannonades with deep sub-bass thunder and physical screen rumble!
 * - Dynamic Tricolour flags, Red Dalí banners, red smoke puffs, and flying golden sparks.
 */

class RevolutionFX {
  constructor(container, threeScene = null, threeCamera = null) {
    this.container = container;
    this.scene = threeScene;
    this.camera = threeCamera;

    this.audioContext = null;
    this.audioEnabled = false;
    this.currentTrack = 'bella_ciao'; // 'bella_ciao', 'napoleon', 'oversimplified'
    this.activeNodes = [];
    this.loopTimeout = null;
    this.nextCannonTime = 0;
    this.flashLight = null;

    // Canvas
    this.canvas = document.getElementById('revolution-canvas') || document.createElement('canvas');
    if (!this.canvas.parentNode && this.container) {
      this.canvas.className = 'revolution-backdrop-canvas';
      this.container.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');

    this.time = 0;
    this.revolutionaries = [];
    this.flags = [];
    this.smokePuffs = [];
    this.embers = [];
    this.cannonFlashes = [];
    this.speechBubbles = [];
    this.nextSpeechTime = 2.5;

    // OverSimplified Witty Quotes (Bilingual)
    this.quotes = [
      { en: "Dude, uncool!", fr: "Mec, pas cool !" },
      { en: "There's a tax for that!", fr: "Y a une taxe pour ça !" },
      { en: "Bread? In this economy?!", fr: "Du pain ? Dans cette économie ?!" },
      { en: "To the guillotine!", fr: "À la guillotine !" },
      { en: "Let them eat cake... wait, she never said that!", fr: "Qu'ils mangent de la brioche... attendez, elle n'a jamais dit ça !" },
      { en: "Robespierre: Chop chop chop chop chop!", fr: "Robespierre : Coupez, coupez, coupez !" },
      { en: "Napoleon: I found the crown in the gutter!", fr: "Napoléon : J'ai trouvé la couronne dans le caniveau !" },
      { en: "Storm the Bastille! We need gunpowder!", fr: "Prenez la Bastille ! Il nous faut de la poudre !" },
      { en: "Who wants to overthrow the monarchy? EVERYONE!", fr: "Qui veut renverser la monarchie ? TOUT LE MONDE !" },
      { en: "King Louis: I'm sure everything is fine.", fr: "Louis XVI : Je suis sûr que tout va très bien se passer." },
      { en: "Voltaire was too sarcastic for prison!", fr: "Voltaire était trop sarcastique pour la prison !" },
      { en: "2 million people at Hugo's funeral?!", fr: "2 millions de personnes aux obsèques de Hugo ?!" }
    ];

    this.initLighting();
    this.initSilhouettes();
    this.initParticles();
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  initLighting() {
    if (!this.scene) return;
    try {
      this.flashLight = new THREE.PointLight(0xff2200, 0, 60, 1.8);
      this.flashLight.position.set(0, 12, -20);
      this.scene.add(this.flashLight);
    } catch (e) {}
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initSilhouettes() {
    const count = Math.floor(window.innerWidth / 42);
    this.revolutionaries = [];

    for (let i = 0; i < count; i++) {
      const isNapoleon = (i === Math.floor(count * 0.78)); // Napoleon on the right outcrop
      const isBaguette = (i === Math.floor(count * 0.25)); // OverSimplified peasant with baguette

      this.revolutionaries.push({
        x: (i / count) * window.innerWidth + (Math.random() * 20 - 10),
        y: window.innerHeight * 0.75 + (Math.random() * 25 - 12),
        height: isNapoleon ? 62 : (48 + Math.random() * 24),
        type: isNapoleon ? 'napoleon' : (isBaguette ? 'baguette' : Math.floor(Math.random() * 4)), // 0: bayonet, 1: fist, 2: flag, 3: megaphone
        bobSpeed: 1.6 + Math.random() * 1.5,
        bobPhase: Math.random() * Math.PI * 2,
        isNapoleon: isNapoleon,
        isBaguette: isBaguette
      });
    }

    // Waving Flags: French Tricolours and Red Dalí Resistance Banners
    this.flags = [
      { x: window.innerWidth * 0.14, y: window.innerHeight * 0.65, scale: 1.3, phase: 0, isRed: false },
      { x: window.innerWidth * 0.38, y: window.innerHeight * 0.62, scale: 1.5, phase: 1.8, isRed: true },
      { x: window.innerWidth * 0.65, y: window.innerHeight * 0.67, scale: 1.2, phase: 3.5, isRed: false },
      { x: window.innerWidth * 0.88, y: window.innerHeight * 0.63, scale: 1.4, phase: 4.8, isRed: true }
    ];
  }

  initParticles() {
    this.embers = [];
    for (let i = 0; i < 70; i++) {
      this.embers.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -1.2 - Math.random() * 2.8,
        size: 1.5 + Math.random() * 2.5,
        alpha: Math.random(),
        hue: Math.random() > 0.4 ? 0 : 45 // Crimson red or golden sparks
      });
    }
  }

  // =========================================================================
  // OVER-SIMPLIFIED SPEECH BUBBLES
  // =========================================================================
  spawnSpeechBubble(customText = null) {
    if (this.revolutionaries.length === 0) return;

    // Pick a revolutionary
    const rev = this.revolutionaries[Math.floor(Math.random() * this.revolutionaries.length)];
    const quote = customText || this.quotes[Math.floor(Math.random() * this.quotes.length)];

    const lang = (window.app && window.app.lang) ? window.app.lang : 'fr';
    const text = typeof quote === 'string' ? quote : (lang === 'fr' ? quote.fr : quote.en);

    this.speechBubbles.push({
      x: rev.x,
      y: rev.y - rev.height - 25,
      text: text,
      alpha: 1.0,
      life: 3.8, // seconds
      maxLife: 3.8
    });

    // Play a quick, comedic OverSimplified pop sound if audio enabled
    if (this.audioEnabled) {
      this.playCartoonPop();
    }
  }

  playCartoonPop() {
    if (!this.audioEnabled || !this.audioContext) return;
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // =========================================================================
  // CONTINUOUS LOOPING AUDIO ENGINE (BELLA CIAO / NAPOLEON / OVERSIMPLIFIED)
  // =========================================================================
  initAudio() {
    if (this.audioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  toggleAudio(enabled) {
    this.audioEnabled = enabled;
    if (this.audioEnabled) {
      this.initAudio();
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      this.startContinuousMusic();
    } else {
      this.stopAllAudio();
    }
  }

  setTrack(trackId) {
    this.currentTrack = trackId;
    if (this.audioEnabled) {
      this.stopAllAudio();
      this.startContinuousMusic();
    }
  }

  stopAllAudio() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        const bestStartTimes = {
          'bella_ciao': 17.0,
          'napoleon': 5.5,
          'oversimplified': 8.5,
          'marseillaise': 8.5
        };
        this.audioElement.currentTime = bestStartTimes[this.currentTrack] || 0;
      } catch (e) {}
    }
    if (this.loopTimeout) {
      clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
    if (this.activeNodes) {
      const now = this.audioContext ? this.audioContext.currentTime : 0;
      this.activeNodes.forEach(node => {
        try {
          if (node.gain && this.audioContext) {
            node.gain.gain.setValueAtTime(0, now);
          }
          if (node.osc) {
            node.osc.stop();
          }
        } catch (e) {}
      });
      this.activeNodes = [];
    }
  }

  startContinuousMusic() {
    if (!this.audioEnabled) return;
    this.stopAllAudio();

    // Actual Full Audio Files from disk
    const trackPaths = {
      'bella_ciao': 'assets/audio/bella-ciao.ogg',
      'napoleon': 'assets/audio/napoleon-march.ogg',
      'oversimplified': 'assets/audio/marseillaise.ogg',
      'marseillaise': 'assets/audio/marseillaise.ogg'
    };

    // Best iconic start times: Skip quiet acoustic/snare intros and jump straight to the drop!
    const bestStartTimes = {
      'bella_ciao': 17.0,     // Drops right into the driving percussion & full resistance anthem chorus
      'napoleon': 5.5,        // Drops right into the glorious Napoleonic Imperial brass fanfare
      'oversimplified': 8.5,  // Drops right into the famous French Revolutionary anthem chorus
      'marseillaise': 8.5
    };

    const filePath = trackPaths[this.currentTrack];
    const bestStartTime = bestStartTimes[this.currentTrack] || 0;

    if (filePath) {
      if (!this.audioElement) {
        this.audioElement = new Audio();
      }

      // Detach any previous listeners to prevent multiple triggers
      if (this._onAudioLoaded) {
        this.audioElement.removeEventListener('loadedmetadata', this._onAudioLoaded);
        this.audioElement.removeEventListener('canplay', this._onAudioLoaded);
      }
      if (this._onAudioEnded) {
        this.audioElement.removeEventListener('ended', this._onAudioEnded);
      }

      let hasSeeked = false;
      const applyBestStartTime = () => {
        if (!hasSeeked && this.audioElement) {
          try {
            if (this.audioElement.duration && bestStartTime < this.audioElement.duration) {
              this.audioElement.currentTime = bestStartTime;
              hasSeeked = true;
            }
          } catch (e) {}
        }
      };

      this._onAudioLoaded = () => applyBestStartTime();
      this.audioElement.addEventListener('loadedmetadata', this._onAudioLoaded);
      this.audioElement.addEventListener('canplay', this._onAudioLoaded);

      // Continuous loop: When the song reaches the end, loop back to the best part!
      this.audioElement.loop = false;
      this._onAudioEnded = () => {
        if (this.audioEnabled && this.audioElement) {
          try {
            this.audioElement.currentTime = bestStartTime;
            const rep = this.audioElement.play();
            if (rep !== undefined) rep.catch(() => {});
          } catch (e) {}
        }
      };
      this.audioElement.addEventListener('ended', this._onAudioEnded);

      // Only change src if switching tracks or uninitialized
      if (this.audioElement.src !== new URL(filePath, window.location.href).href) {
        this.audioElement.src = filePath;
      }
      this.audioElement.volume = 0.88;

      // If already buffered, seek immediately
      applyBestStartTime();

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          applyBestStartTime();
        }).catch(err => {
          console.warn("Audio file play fallback to Web Audio synth:", err);
          this.playSynthFallback();
        });
      }
    } else {
      this.playSynthFallback();
    }
  }

  playSynthFallback() {
    if (!this.audioEnabled || !this.audioContext) return;
    if (this.currentTrack === 'napoleon') {
      this.playNapoleonLoop();
    } else if (this.currentTrack === 'oversimplified') {
      this.playOverSimplifiedLoop();
    } else {
      this.playBellaCiaoExtendedLoop();
    }
  }

  // =========================================================================
  // TRACK 1: EXTENDED BELLA CIAO (MONEY HEIST FULL LOOPING RESISTANCE ANTHEM)
  // =========================================================================
  playBellaCiaoExtendedLoop() {
    if (!this.audioEnabled || !this.audioContext) return;

    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      this.activeNodes = [];

      // Notes (A minor): E4(329.6), A4(440), B4(493.9), C5(523.3), D5(587.3), E5(659.3), F5(698.5)
      // Extended arrangement with Part 1, Part 2, and Refrain (~24 seconds total loop)
      const melody = [
        // Measure 1-2: "Una mattina mi son svegliato"
        { note: 329.63, time: 0.0, dur: 0.22 },
        { note: 440.00, time: 0.25, dur: 0.22 },
        { note: 493.88, time: 0.50, dur: 0.22 },
        { note: 523.25, time: 0.75, dur: 0.40 },
        { note: 440.00, time: 1.20, dur: 0.35 },

        { note: 329.63, time: 1.65, dur: 0.22 },
        { note: 440.00, time: 1.90, dur: 0.22 },
        { note: 493.88, time: 2.15, dur: 0.22 },
        { note: 523.25, time: 2.40, dur: 0.40 },
        { note: 440.00, time: 2.85, dur: 0.35 },

        // Measure 3-4: "O bella ciao, bella ciao, bella ciao ciao ciao"
        { note: 329.63, time: 3.30, dur: 0.22 },
        { note: 440.00, time: 3.55, dur: 0.22 },
        { note: 493.88, time: 3.80, dur: 0.22 },
        { note: 523.25, time: 4.05, dur: 0.25 },
        { note: 523.25, time: 4.35, dur: 0.25 },
        { note: 493.88, time: 4.65, dur: 0.22 },
        { note: 440.00, time: 4.90, dur: 0.22 },
        { note: 523.25, time: 5.15, dur: 0.45 },
        { note: 493.88, time: 5.65, dur: 0.25 },
        { note: 440.00, time: 5.95, dur: 0.55 },

        // Measure 5-6: "Una mattina mi son svegliato, e ho trovato l'invasor"
        { note: 329.63, time: 6.60, dur: 0.22 },
        { note: 440.00, time: 6.85, dur: 0.22 },
        { note: 493.88, time: 7.10, dur: 0.22 },
        { note: 523.25, time: 7.35, dur: 0.35 },
        { note: 440.00, time: 7.75, dur: 0.35 },

        { note: 523.25, time: 8.20, dur: 0.22 },
        { note: 587.33, time: 8.45, dur: 0.22 },
        { note: 659.25, time: 8.70, dur: 0.65 }, // High E5
        { note: 659.25, time: 9.40, dur: 0.25 },
        { note: 587.33, time: 9.70, dur: 0.22 },
        { note: 523.25, time: 9.95, dur: 0.22 },
        { note: 587.33, time: 10.20, dur: 0.45 },
        { note: 659.25, time: 10.70, dur: 0.45 },

        // Measure 7-8: "O partigiano portami via... ché mi sento di morir"
        { note: 587.33, time: 11.25, dur: 0.22 },
        { note: 523.25, time: 11.50, dur: 0.22 },
        { note: 493.88, time: 11.75, dur: 0.45 },
        { note: 659.25, time: 12.25, dur: 0.45 },
        { note: 587.33, time: 12.75, dur: 0.22 },
        { note: 523.25, time: 13.00, dur: 0.22 },
        { note: 493.88, time: 13.25, dur: 0.40 },
        { note: 440.00, time: 13.70, dur: 0.90 }, // Resolve to A4

        // Part 2 Refrain Harmony (Higher energy climax):
        { note: 440.00, time: 14.80, dur: 0.22 },
        { note: 493.88, time: 15.05, dur: 0.22 },
        { note: 523.25, time: 15.30, dur: 0.40 },
        { note: 523.25, time: 15.75, dur: 0.25 },
        { note: 493.88, time: 16.05, dur: 0.22 },
        { note: 440.00, time: 16.30, dur: 0.22 },
        { note: 523.25, time: 16.55, dur: 0.45 },
        { note: 493.88, time: 17.05, dur: 0.25 },
        { note: 440.00, time: 17.35, dur: 0.55 },

        { note: 659.25, time: 18.00, dur: 0.40 },
        { note: 587.33, time: 18.45, dur: 0.25 },
        { note: 523.25, time: 18.75, dur: 0.25 },
        { note: 493.88, time: 19.05, dur: 0.45 },
        { note: 440.00, time: 19.55, dur: 1.10 } // Grand conclusion of the phrase
      ];

      // Bassline (A2, E2, D2, E2)
      const bassline = [
        { note: 110.00, time: 0.0, dur: 0.4 }, // A2
        { note: 164.81, time: 0.8, dur: 0.4 }, // E3
        { note: 110.00, time: 1.6, dur: 0.4 },
        { note: 164.81, time: 2.4, dur: 0.4 },
        { note: 110.00, time: 3.3, dur: 0.4 },
        { note: 164.81, time: 4.1, dur: 0.4 },
        { note: 146.83, time: 4.9, dur: 0.4 }, // D3
        { note: 164.81, time: 5.7, dur: 0.4 },
        { note: 110.00, time: 6.6, dur: 0.4 },
        { note: 164.81, time: 7.4, dur: 0.4 },
        { note: 110.00, time: 8.2, dur: 0.4 },
        { note: 164.81, time: 9.0, dur: 0.4 },
        { note: 146.83, time: 9.9, dur: 0.4 },
        { note: 164.81, time: 10.7, dur: 0.4 },
        { note: 110.00, time: 11.5, dur: 0.4 },
        { note: 164.81, time: 12.3, dur: 0.4 },
        { note: 110.00, time: 13.7, dur: 0.8 },
        { note: 110.00, time: 15.3, dur: 0.4 },
        { note: 146.83, time: 16.5, dur: 0.4 },
        { note: 164.81, time: 17.5, dur: 0.4 },
        { note: 110.00, time: 18.5, dur: 0.8 },
        { note: 110.00, time: 19.5, dur: 1.2 }
      ];

      // Schedule Melody (Brassy accordion timbre)
      melody.forEach(m => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(m.note, now + m.time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1500, now + m.time);

        gain.gain.setValueAtTime(0.001, now + m.time);
        gain.gain.linearRampToValueAtTime(0.16, now + m.time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + m.time + m.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + m.time);
        osc.stop(now + m.time + m.dur + 0.1);
        this.activeNodes.push({ osc, gain });
      });

      // Schedule Bassline (Deep warm triangle bass)
      bassline.forEach(b => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(b.note, now + b.time);

        gain.gain.setValueAtTime(0.001, now + b.time);
        gain.gain.linearRampToValueAtTime(0.18, now + b.time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + b.time + b.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + b.time);
        osc.stop(now + b.time + b.dur + 0.05);
        this.activeNodes.push({ osc, gain });
      });

      // Total loop length ~21.5 seconds. Re-trigger loop seamlessly!
      const loopDurationMs = 21500;
      this.loopTimeout = setTimeout(() => {
        if (this.audioEnabled && this.currentTrack === 'bella_ciao') {
          this.playBellaCiaoExtendedLoop();
        }
      }, loopDurationMs);

    } catch (e) {}
  }

  // =========================================================================
  // TRACK 2: NAPOLÉON IMPERIAL MARCH & AUSTERLITZ FANFARE (CINEMATIC)
  // =========================================================================
  playNapoleonLoop() {
    if (!this.audioEnabled || !this.audioContext) return;

    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      this.activeNodes = [];

      // Epic French Revolutionary / Imperial Anthem motif (D minor / D major)
      // Notes: D4(293.66), F4(349.23), G4(392), A4(440), Bb4(466.16), C5(523.25), D5(587.33)
      const marchMelody = [
        // Opening Heroic Call (Le Chant du Départ motif)
        { note: 293.66, time: 0.0, dur: 0.45 }, // D4
        { note: 349.23, time: 0.5, dur: 0.35 }, // F4
        { note: 440.00, time: 0.9, dur: 0.75 }, // A4
        { note: 587.33, time: 1.8, dur: 0.50 }, // D5
        { note: 440.00, time: 2.35, dur: 0.30 }, // A4
        { note: 349.23, time: 2.70, dur: 0.30 }, // F4
        { note: 293.66, time: 3.05, dur: 0.85 }, // D4

        // Measure 2: The March Advances
        { note: 349.23, time: 4.0, dur: 0.30 },
        { note: 392.00, time: 4.35, dur: 0.30 },
        { note: 440.00, time: 4.70, dur: 0.55 },
        { note: 466.16, time: 5.30, dur: 0.45 }, // Bb4
        { note: 440.00, time: 5.80, dur: 0.45 }, // A4
        { note: 392.00, time: 6.30, dur: 0.30 }, // G4
        { note: 349.23, time: 6.65, dur: 0.30 }, // F4
        { note: 329.63, time: 7.00, dur: 0.85 }, // E4

        // Measure 3: Austerlitz Triumphal Ascent
        { note: 220.00, time: 8.0, dur: 0.35 },  // A3
        { note: 293.66, time: 8.4, dur: 0.45 },  // D4
        { note: 329.63, time: 8.9, dur: 0.30 },  // E4
        { note: 349.23, time: 9.25, dur: 0.45 }, // F4
        { note: 392.00, time: 9.75, dur: 0.45 }, // G4
        { note: 440.00, time: 10.25, dur: 0.85 }, // A4

        // Grand Climax: Imperial Fanfare
        { note: 587.33, time: 11.2, dur: 0.55 }, // D5
        { note: 554.37, time: 11.8, dur: 0.30 }, // C#5
        { note: 587.33, time: 12.15, dur: 0.70 }, // D5
        { note: 659.25, time: 12.9, dur: 0.50 },  // E5
        { note: 587.33, time: 13.45, dur: 1.30 }  // D5 Long Resolve
      ];

      // Schedule Brass Horns (Dual Sawtooth + Resonance)
      marchMelody.forEach(m => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(m.note, now + m.time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1100, now + m.time);
        filter.Q.setValueAtTime(3.5, now + m.time); // Horn resonance

        gain.gain.setValueAtTime(0.001, now + m.time);
        gain.gain.linearRampToValueAtTime(0.19, now + m.time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + m.time + m.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + m.time);
        osc.stop(now + m.time + m.dur + 0.1);
        this.activeNodes.push({ osc, gain });
      });

      // Military Snare Drum Roll & Timpani cadence
      const snareTimes = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.25, 2.5, 3.0, 4.0, 4.25, 4.5, 5.0, 6.0, 6.25, 7.0, 8.0, 8.25, 8.5, 9.0, 10.0, 11.0, 11.25, 12.0, 13.0, 13.5];
      snareTimes.forEach(st => {
        if (st >= 15) return;
        this.synthesizeSnareHit(now + st);
      });

      // Booming Timpani on Key Downbeats
      const timpaniTimes = [0, 1.8, 4.0, 7.0, 8.0, 11.2, 13.45];
      timpaniTimes.forEach(tt => {
        this.synthesizeTimpaniHit(now + tt);
      });

      // Loop duration: 15.5 seconds
      this.loopTimeout = setTimeout(() => {
        if (this.audioEnabled && this.currentTrack === 'napoleon') {
          this.playNapoleonLoop();
        }
      }, 15500);

    } catch (e) {}
  }

  synthesizeSnareHit(time) {
    if (!this.audioContext) return;
    try {
      const ctx = this.audioContext;
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.07, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(time);
      this.activeNodes.push({ osc: noise, gain });
    } catch (e) {}
  }

  synthesizeTimpaniHit(time) {
    if (!this.audioContext) return;
    try {
      const ctx = this.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.4);

      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.55);
      this.activeNodes.push({ osc, gain });
    } catch (e) {}
  }

  // =========================================================================
  // TRACK 3: OVERSIMPLIFIED FRENCH REVOLUTION (JAUNTY COMEDY MARCH)
  // =========================================================================
  playOverSimplifiedLoop() {
    if (!this.audioEnabled || !this.audioContext) return;

    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      this.activeNodes = [];

      // Upbeat, jaunty classical French revolution harpsichord march ("Ah! Ça Ira" / OverSimplified theme)
      // BPM ~136 (Lighthearted, comedic, bouncy)
      const tunes = [
        { note: 392.00, time: 0.0, dur: 0.20 }, // G4
        { note: 392.00, time: 0.22, dur: 0.20 },
        { note: 392.00, time: 0.44, dur: 0.38 },
        { note: 329.63, time: 0.85, dur: 0.20 }, // E4
        { note: 261.63, time: 1.10, dur: 0.40 }, // C4

        { note: 440.00, time: 1.60, dur: 0.20 }, // A4
        { note: 440.00, time: 1.82, dur: 0.20 },
        { note: 440.00, time: 2.04, dur: 0.38 },
        { note: 349.23, time: 2.45, dur: 0.20 }, // F4
        { note: 293.66, time: 2.70, dur: 0.40 }, // D4

        { note: 493.88, time: 3.20, dur: 0.20 }, // B4
        { note: 523.25, time: 3.42, dur: 0.20 }, // C5
        { note: 587.33, time: 3.64, dur: 0.38 }, // D5
        { note: 659.25, time: 4.05, dur: 0.20 }, // E5
        { note: 523.25, time: 4.30, dur: 0.45 }, // C5

        // Comedic staccato flourish
        { note: 392.00, time: 4.85, dur: 0.16 }, // G4
        { note: 440.00, time: 5.05, dur: 0.16 }, // A4
        { note: 493.88, time: 5.25, dur: 0.16 }, // B4
        { note: 523.25, time: 5.45, dur: 0.55 }, // C5

        // Second Phrase (Bouncy Guillotine March)
        { note: 523.25, time: 6.20, dur: 0.20 },
        { note: 587.33, time: 6.42, dur: 0.20 },
        { note: 659.25, time: 6.64, dur: 0.35 },
        { note: 587.33, time: 7.05, dur: 0.20 },
        { note: 523.25, time: 7.30, dur: 0.35 },

        { note: 493.88, time: 7.80, dur: 0.20 },
        { note: 440.00, time: 8.02, dur: 0.20 },
        { note: 392.00, time: 8.24, dur: 0.35 },
        { note: 440.00, time: 8.65, dur: 0.20 },
        { note: 523.25, time: 8.90, dur: 0.70 }  // Big comedic resolve
      ];

      // Schedule Crisp Harpsichord/Pluck timbre (Square/Triangle with snappy decay)
      tunes.forEach(t => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(t.note, now + t.time);

        gain.gain.setValueAtTime(0.001, now + t.time);
        gain.gain.linearRampToValueAtTime(0.18, now + t.time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t.time + t.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + t.time);
        osc.stop(now + t.time + t.dur + 0.05);
        this.activeNodes.push({ osc, gain });
      });

      // Bouncy walking bass
      const bouncyBass = [
        { note: 130.81, time: 0.0, dur: 0.25 }, // C3
        { note: 196.00, time: 0.44, dur: 0.25 }, // G3
        { note: 130.81, time: 0.85, dur: 0.25 },
        { note: 146.83, time: 1.60, dur: 0.25 }, // D3
        { note: 220.00, time: 2.04, dur: 0.25 }, // A3
        { note: 146.83, time: 2.45, dur: 0.25 },
        { note: 196.00, time: 3.20, dur: 0.25 }, // G3
        { note: 130.81, time: 4.05, dur: 0.25 },
        { note: 130.81, time: 5.45, dur: 0.45 },
        { note: 130.81, time: 6.20, dur: 0.25 },
        { note: 174.61, time: 7.05, dur: 0.25 }, // F3
        { note: 196.00, time: 7.80, dur: 0.25 }, // G3
        { note: 130.81, time: 8.90, dur: 0.60 }
      ];

      bouncyBass.forEach(b => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(b.note, now + b.time);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now + b.time);

        gain.gain.setValueAtTime(0.001, now + b.time);
        gain.gain.linearRampToValueAtTime(0.14, now + b.time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + b.time + b.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + b.time);
        osc.stop(now + b.time + b.dur + 0.05);
        this.activeNodes.push({ osc, gain });
      });

      // Loop duration: 10.2 seconds
      this.loopTimeout = setTimeout(() => {
        if (this.audioEnabled && this.currentTrack === 'oversimplified') {
          this.playOverSimplifiedLoop();
        }
      }, 10200);

    } catch (e) {}
  }

  // =========================================================================
  // NAPOLEONIC CANNON ARTILLERY BLAST WITH SCREEN RUMBLE
  // =========================================================================
  triggerCannon(x = null, y = null) {
    const cx = x !== null ? x : window.innerWidth * (0.2 + Math.random() * 0.6);
    const cy = y !== null ? y : window.innerHeight * (0.68 + Math.random() * 0.08);

    this.cannonFlashes.push({
      x: cx,
      y: cy,
      radius: 110 + Math.random() * 70,
      alpha: 1.0,
      decay: 0.04
    });

    // Money Heist Red & Battlefield Grey Smoke Puffs
    for (let i = 0; i < 18; i++) {
      this.smokePuffs.push({
        x: cx + (Math.random() * 60 - 30),
        y: cy + (Math.random() * 30 - 15),
        vx: (Math.random() - 0.5) * 2.8,
        vy: -1.2 - Math.random() * 2.2,
        radius: 25 + Math.random() * 35,
        maxRadius: 100 + Math.random() * 60,
        alpha: 0.85,
        growth: 0.7 + Math.random() * 0.6,
        isRed: Math.random() > 0.4
      });
    }

    if (this.flashLight) {
      this.flashLight.intensity = 4.0;
      this.flashLight.color.setHex(0xe50914);
    }

    // Play Deep Thunderous Explosion Sound
    this.playExplosionSound();

    // Trigger physical screen rumble
    const viewport = document.getElementById('louvre-viewport') || document.body;
    viewport.classList.remove('screen-shaking');
    void viewport.offsetWidth; // Force CSS reflow
    viewport.classList.add('screen-shaking');
    setTimeout(() => viewport.classList.remove('screen-shaking'), 480);
  }

  playExplosionSound() {
    if (!this.audioEnabled || !this.audioContext) return;
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 1.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.38));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);
      filter.frequency.exponentialRampToValueAtTime(35, now + 1.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      this.activeNodes.push({ osc: noise, gain });

      // Sub-bass thump (38Hz cannon vibration)
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(55, now);
      sub.frequency.exponentialRampToValueAtTime(25, now + 0.6);

      subGain.gain.setValueAtTime(0.35, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      sub.connect(subGain);
      subGain.connect(ctx.destination);

      sub.start(now);
      sub.stop(now + 0.7);
      this.activeNodes.push({ osc: sub, gain: subGain });

    } catch (e) {}
  }

  // =========================================================================
  // MAIN ANIMATION LOOP
  // =========================================================================
  update(delta) {
    this.time += delta;

    if (this.flashLight && this.flashLight.intensity > 0) {
      this.flashLight.intensity = Math.max(0, this.flashLight.intensity - delta * 4);
    }

    // Auto cannon fire on interval
    if (this.time > this.nextCannonTime) {
      this.triggerCannon();
      this.nextCannonTime = this.time + 6.0 + Math.random() * 6.5;
    }

    // Auto OverSimplified speech bubbles
    if (this.time > this.nextSpeechTime) {
      this.spawnSpeechBubble();
      this.nextSpeechTime = this.time + 4.8 + Math.random() * 4.0;
    }

    // Update Speech Bubbles life
    for (let i = this.speechBubbles.length - 1; i >= 0; i--) {
      const b = this.speechBubbles[i];
      b.life -= delta;
      if (b.life < 0.6) {
        b.alpha = b.life / 0.6;
      }
      if (b.life <= 0) {
        this.speechBubbles.splice(i, 1);
      }
    }

    this.renderBackdrop();
  }

  renderBackdrop() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Barricade Ground Silhouette
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.77);
    for (let x = 0; x <= w; x += 40) {
      const ny = h * 0.76 + Math.sin(x * 0.015 + this.time * 0.3) * 10 + Math.cos(x * 0.035) * 8;
      ctx.lineTo(x, ny);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(10, 8, 14, 0.88)';
    ctx.fill();

    // 2. Barricade Revolutionaries Silhouettes (Including Napoléon & Baguette Peasant)
    this.revolutionaries.forEach(r => {
      const bob = Math.sin(this.time * r.bobSpeed + r.bobPhase) * 3.5;
      const baseH = r.height + bob;
      const px = r.x;
      const py = r.y + bob;

      ctx.fillStyle = '#08060a';

      // SPECIAL SILHOUETTE: NAPOLÉON BONAPARTE (Bicorne Hat, Folded Arms in Coat)
      if (r.isNapoleon) {
        // Head
        ctx.beginPath();
        ctx.arc(px, py - baseH, 8, 0, Math.PI * 2);
        ctx.fill();

        // Iconic Napoleonic Bicorne Hat (Cocked sideways)
        ctx.fillStyle = '#060408';
        ctx.beginPath();
        ctx.moveTo(px - 18, py - baseH - 2);
        ctx.quadraticCurveTo(px, py - baseH - 18, px + 18, py - baseH - 2);
        ctx.quadraticCurveTo(px, py - baseH - 8, px - 18, py - baseH - 2);
        ctx.closePath();
        ctx.fill();

        // Golden Cockade on Hat
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(px - 4, py - baseH - 8, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Torso in Imperial Longcoat
        ctx.fillStyle = '#08060a';
        ctx.beginPath();
        ctx.moveTo(px - 9, py - baseH + 6);
        ctx.lineTo(px + 9, py - baseH + 6);
        ctx.lineTo(px + 12, py);
        ctx.lineTo(px - 12, py);
        ctx.closePath();
        ctx.fill();

        // Sword Scabbard on side
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(px - 6, py - baseH + 16);
        ctx.lineTo(px - 16, py + 4);
        ctx.stroke();

        // "NAPOLÉON" subtle caption badge
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 9px "Comfortaa", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NAPOLÉON', px, py + 12);
        return;
      }

      // SPECIAL SILHOUETTE: OVERSIMPLIFIED PEASANT WAVING GIANT BAGUETTE 🥖
      if (r.isBaguette) {
        ctx.beginPath();
        ctx.arc(px, py - baseH, 7.5, 0, Math.PI * 2);
        ctx.fill();

        // Phrygian Cap (Bonnet Phrygien)
        ctx.fillStyle = '#e50914';
        ctx.beginPath();
        ctx.moveTo(px - 6, py - baseH - 3);
        ctx.lineTo(px + 6, py - baseH - 3);
        ctx.quadraticCurveTo(px + 8, py - baseH - 15, px - 4, py - baseH - 12);
        ctx.closePath();
        ctx.fill();

        // Body
        ctx.fillStyle = '#08060a';
        ctx.beginPath();
        ctx.moveTo(px - 5, py - baseH + 6);
        ctx.lineTo(px + 5, py - baseH + 6);
        ctx.lineTo(px + 4, py);
        ctx.lineTo(px - 4, py);
        ctx.closePath();
        ctx.fill();

        // Arm waving giant French Baguette
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#08060a';
        ctx.beginPath();
        ctx.moveTo(px + 2, py - baseH + 10);
        ctx.lineTo(px + 12, py - baseH - 10);
        ctx.stroke();

        // Baguette 🥖
        ctx.fillStyle = '#d4a373';
        ctx.beginPath();
        ctx.ellipse(px + 16, py - baseH - 16, 5, 14, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#8d5b2c';
        ctx.lineWidth = 1;
        ctx.stroke();
        return;
      }

      // STANDARD REVOLUTIONARY SILHOUETTES
      ctx.beginPath();
      ctx.arc(px, py - baseH, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(px - 5, py - baseH + 6);
      ctx.lineTo(px + 5, py - baseH + 6);
      ctx.lineTo(px + 4, py);
      ctx.lineTo(px - 4, py);
      ctx.closePath();
      ctx.fill();

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#08060a';
      ctx.beginPath();
      if (r.type === 0) {
        // Bayonet
        ctx.moveTo(px + 2, py - baseH + 12);
        ctx.lineTo(px + 15, py - baseH - 25);
      } else if (r.type === 1) {
        // Raised Fist
        ctx.moveTo(px, py - baseH + 12);
        ctx.lineTo(px - 6, py - baseH - 14);
        ctx.arc(px - 6, py - baseH - 15, 2.5, 0, Math.PI * 2);
      } else {
        // Cheering Arms
        ctx.moveTo(px - 4, py - baseH + 12);
        ctx.lineTo(px - 10, py - baseH - 12);
        ctx.moveTo(px + 4, py - baseH + 12);
        ctx.lineTo(px + 10, py - baseH - 12);
      }
      ctx.stroke();
    });

    // 3. Flags (French Tricolours & Red Resistance Banners)
    this.flags.forEach(f => {
      this.drawFlag(ctx, f.x, f.y, f.scale, this.time * 3 + f.phase, f.isRed);
    });

    // 4. Cannon / Grenade Flashes
    for (let i = this.cannonFlashes.length - 1; i >= 0; i--) {
      const cf = this.cannonFlashes[i];
      const grad = ctx.createRadialGradient(cf.x, cf.y, 0, cf.x, cf.y, cf.radius);
      grad.addColorStop(0, `rgba(255, 245, 200, ${cf.alpha})`);
      grad.addColorStop(0.35, `rgba(229, 9, 20, ${cf.alpha * 0.85})`);
      grad.addColorStop(1, 'rgba(150, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cf.x, cf.y, cf.radius, 0, Math.PI * 2);
      ctx.fill();

      cf.alpha -= cf.decay;
      cf.radius += 2.8;
      if (cf.alpha <= 0) this.cannonFlashes.splice(i, 1);
    }

    // 5. Smoke Puffs (Red Resistance Smoke & Battlefield Cannon Haze)
    for (let i = this.smokePuffs.length - 1; i >= 0; i--) {
      const sp = this.smokePuffs[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.radius += sp.growth;
      sp.alpha -= 0.005;

      const sGrad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.radius);
      if (sp.isRed) {
        sGrad.addColorStop(0, `rgba(229, 9, 20, ${sp.alpha * 0.55})`);
        sGrad.addColorStop(0.6, `rgba(180, 20, 20, ${sp.alpha * 0.25})`);
        sGrad.addColorStop(1, 'rgba(100, 0, 0, 0)');
      } else {
        sGrad.addColorStop(0, `rgba(190, 195, 210, ${sp.alpha * 0.45})`);
        sGrad.addColorStop(1, 'rgba(60, 60, 75, 0)');
      }

      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
      ctx.fill();

      if (sp.alpha <= 0 || sp.radius >= sp.maxRadius) {
        this.smokePuffs.splice(i, 1);
      }
    }

    // 6. Glowing Embers & Floating Golden Sparks
    this.embers.forEach(e => {
      e.x += e.vx + Math.sin(this.time * 2 + e.y * 0.05) * 0.8;
      e.y += e.vy;
      e.alpha += (Math.random() - 0.5) * 0.1;
      if (e.alpha < 0.2) e.alpha = 0.8;
      if (e.alpha > 1) e.alpha = 1;

      if (e.y < 0) {
        e.y = h + 10;
        e.x = Math.random() * w;
      }

      ctx.fillStyle = e.hue === 0 ? `rgba(229, 9, 20, ${e.alpha})` : `rgba(255, 215, 0, ${e.alpha})`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7. OverSimplified Animated Speech Bubbles
    this.speechBubbles.forEach(b => {
      this.drawSpeechBubble(ctx, b.x, b.y, b.text, b.alpha);
    });
  }

  drawSpeechBubble(ctx, x, y, text, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = 'bold 13px "Comfortaa", sans-serif';

    const metrics = ctx.measureText(text);
    const textW = metrics.width;
    const paddingX = 12;
    const paddingY = 8;
    const bw = textW + paddingX * 2;
    const bh = 28;
    const bx = Math.max(15, Math.min(this.width - bw - 15, x - bw / 2));
    const by = y - bh;

    // White comic bubble with dark outline
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.strokeStyle = '#08060a';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.stroke();

    // Comic pointer triangle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.beginPath();
    ctx.moveTo(x - 5, by + bh - 1);
    ctx.lineTo(x + 5, by + bh - 1);
    ctx.lineTo(x, by + bh + 8);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#08060a';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(x - 5, by + bh);
    ctx.lineTo(x, by + bh + 8);
    ctx.lineTo(x + 5, by + bh);
    ctx.stroke();

    // Text inside bubble
    ctx.fillStyle = '#08060a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, bx + bw / 2, by + bh / 2 + 1);

    ctx.restore();
  }

  drawFlag(ctx, x, y, scale, wave, isRed) {
    const w = 55 * scale;
    const h = 34 * scale;

    ctx.save();
    ctx.translate(x, y);

    // Flagpole
    ctx.strokeStyle = '#4a3b2c';
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 55 * scale);
    ctx.stroke();

    if (isRed) {
      // Money Heist Red Resistance Banner
      ctx.fillStyle = '#e50914';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let s = 0; s <= w; s += 5) {
        ctx.lineTo(s, Math.sin(wave + s * 0.1) * 4 * scale);
      }
      ctx.lineTo(w, h + Math.sin(wave + w * 0.1) * 4 * scale);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${9 * scale}px "Comfortaa", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('LA RESISTENCIA', 6 * scale, (h / 2 + 3) * scale);
    } else {
      // French Tricolour
      const stripeW = w / 3;
      const colors = ['#002395', '#FFFFFF', '#ED2939'];
      for (let s = 0; s < 3; s++) {
        ctx.fillStyle = colors[s];
        ctx.beginPath();
        const sx = s * stripeW;
        const ex = (s + 1) * stripeW;
        const y0 = Math.sin(wave + s * 0.8) * 4 * scale;
        const y1 = Math.sin(wave + (s + 1) * 0.8) * 4 * scale;
        ctx.moveTo(sx, y0);
        ctx.lineTo(ex, y1);
        ctx.lineTo(ex, y1 + h);
        ctx.lineTo(sx, y0 + h);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RevolutionFX;
}
