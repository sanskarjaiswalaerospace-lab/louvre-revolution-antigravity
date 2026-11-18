/**
 * ANTIGRAVITY-ENGINE.JS
 * Money Heist (La Casa de Papel) x French Revolution Zero-G Physics Webtoy
 * 
 * Floating 3D Artifacts:
 * - 🎭 Salvador Dalí Heist Masks
 * - 💶 Floating Banknotes (Euro / Franc bills fluttering in zero-g)
 * - 🪙 Gold Bullion Bars & Ingot Bricks (999.9 Gold)
 * - 🕊️ Red Origami Resistance Cranes (The Professor's signature)
 * - 🏵️ Revolutionary Tricolour Cockades (Cocardes Tricolores)
 * - 🪙 Louis d'Or Napoleonic Gold Coins
 * 
 * Interactive Mechanics:
 * - Click, drag and throw with spring physics and release velocity
 * - Zero-G drift, bouncing collisions with room boundaries
 * - Multiple gravity modes: Zero-G, Anti-G, Moon, Earth, Vortex
 * - Impulse shockwave ("Déclencher le Casse / Heist Impulse")
 */

class AntigravityEngine {
  constructor(scene, camera, domElement) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;

    this.artifacts = [];
    this.mode = 'zero-g';
    this.bounds = {
      minX: -24, maxX: 24,
      minY: 1.0,  maxY: 16,
      minZ: -40, maxZ: 14
    };

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.draggedArtifact = null;
    this.dragPlane = new THREE.Plane();
    this.planeIntersect = new THREE.Vector3();
    this.prevDragPos = new THREE.Vector3();
    this.dragVelocity = new THREE.Vector3();
    this.isDragging = false;
    this.hoveredArtifact = null;

    this.initArtifacts();
    this.bindEvents();
  }

  initArtifacts() {
    // 1. Salvador Dalí Heist Masks (6 masks)
    for (let i = 0; i < 6; i++) {
      this.createDaliMask();
    }

    // 2. Floating Banknotes (12 fluttering bills)
    for (let i = 0; i < 12; i++) {
      this.createBanknote();
    }

    // 3. Gold Bullion Bars (6 heavy ingots)
    for (let i = 0; i < 6; i++) {
      this.createGoldBar();
    }

    // 4. Red Origami Resistance Birds (6 cranes)
    for (let i = 0; i < 6; i++) {
      this.createOrigamiBird();
    }

    // 5. Revolutionary Cockades (5 rosettes)
    for (let i = 0; i < 5; i++) {
      this.createCockade();
    }

    // 6. Napoleonic Gold Coins (8 coins)
    for (let i = 0; i < 8; i++) {
      this.createGoldCoin();
    }
  }

  getSpawnState() {
    return {
      x: (Math.random() - 0.5) * 32,
      y: 2.5 + Math.random() * 9,
      z: -32 + Math.random() * 38,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.9,
      rotVx: (Math.random() - 0.5) * 1.5,
      rotVy: (Math.random() - 0.5) * 1.8,
      rotVz: (Math.random() - 0.5) * 1.5
    };
  }

  registerArtifact(mesh, typeName, mass = 1.0, radius = 0.8) {
    const s = this.getSpawnState();
    mesh.position.set(s.x, s.y, s.z);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    const artifactData = {
      mesh: mesh,
      type: typeName,
      mass: mass,
      radius: radius,
      vx: s.vx,
      vy: s.vy,
      vz: s.vz,
      rotVx: s.rotVx,
      rotVy: s.rotVy,
      rotVz: s.rotVz,
      initialScale: mesh.scale.clone(),
      flutterTime: Math.random() * 10
    };

    mesh.userData.artifact = artifactData;
    this.scene.add(mesh);
    this.artifacts.push(artifactData);
    return artifactData;
  }

  // 1. Salvador Dalí Heist Mask
  createDaliMask() {
    const group = new THREE.Group();

    // Red Hood Collar behind mask
    const hoodGeom = new THREE.SphereGeometry(0.72, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xd11919,
      roughness: 0.5,
      side: THREE.DoubleSide
    });
    const hood = new THREE.Mesh(hoodGeom, redMat);
    hood.rotation.x = Math.PI;
    hood.position.set(0, 0, -0.25);
    group.add(hood);

    // White Mask Face Shell
    const faceGeom = new THREE.SphereGeometry(0.65, 24, 24);
    faceGeom.scale(0.85, 1.25, 0.5);
    const maskMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.25,
      metalness: 0.1
    });
    const face = new THREE.Mesh(faceGeom, maskMat);
    group.add(face);

    // Distinctive Dalí Pointed Mustache (Curling Upwards)
    const stacheMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 });
    const stacheGeomLeft = new THREE.CylinderGeometry(0.015, 0.045, 0.45, 8);
    const stacheL = new THREE.Mesh(stacheGeomLeft, stacheMat);
    stacheL.position.set(-0.2, -0.15, 0.32);
    stacheL.rotation.z = Math.PI / 3;
    group.add(stacheL);

    const stacheR = new THREE.Mesh(stacheGeomLeft, stacheMat);
    stacheR.position.set(0.2, -0.15, 0.32);
    stacheR.rotation.z = -Math.PI / 3;
    group.add(stacheR);

    // Arched Dramatic Eyebrows
    const browGeom = new THREE.BoxGeometry(0.22, 0.04, 0.05);
    const browL = new THREE.Mesh(browGeom, stacheMat);
    browL.position.set(-0.24, 0.3, 0.3);
    browL.rotation.z = 0.25;
    group.add(browL);

    const browR = new THREE.Mesh(browGeom, stacheMat);
    browR.position.set(0.24, 0.3, 0.3);
    browR.rotation.z = -0.25;
    group.add(browR);

    // Eye sockets
    const eyeGeom = new THREE.SphereGeometry(0.08, 12, 12);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0e, roughness: 0.9 });
    const eyeL = new THREE.Mesh(eyeGeom, eyeMat);
    eyeL.position.set(-0.22, 0.18, 0.28);
    group.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeom, eyeMat);
    eyeR.position.set(0.22, 0.18, 0.28);
    group.add(eyeR);

    return this.registerArtifact(group, 'Dalí Mask', 1.0, 0.85);
  }

  // 2. Floating Banknote (Fluttering in Zero-G)
  createBanknote() {
    const group = new THREE.Group();
    const w = 1.3;
    const h = 0.7;

    // Canvas procedural banknote texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');

    // Emerald banknote tone
    ctx.fillStyle = '#1c4a2a';
    ctx.fillRect(0, 0, 256, 140);
    ctx.strokeStyle = '#68c283';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 244, 128);

    ctx.fillStyle = '#a9e5bc';
    ctx.font = 'bold 26px "Comfortaa", sans-serif';
    ctx.fillText('100 €', 18, 40);
    ctx.fillText('100 €', 170, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Comfortaa", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RÉVOLUTION', 128, 70);
    ctx.font = 'bold 11px "Comfortaa", sans-serif';
    ctx.fillText('LA CASA DE PAPEL', 128, 90);

    const tex = new THREE.CanvasTexture(canvas);
    const billGeom = new THREE.PlaneGeometry(w, h, 6, 4);
    const billMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.6,
      side: THREE.DoubleSide
    });
    const bill = new THREE.Mesh(billGeom, billMat);
    group.add(bill);

    const art = this.registerArtifact(group, 'Banknote', 0.15, 0.65);
    art.isFluttering = true;
    return art;
  }

  // 3. Gold Bullion Bar (999.9 Gold Ingot)
  createGoldBar() {
    const group = new THREE.Group();
    const w = 1.2, h = 0.45, d = 0.55;

    const barGeom = new THREE.BoxGeometry(w, h, d);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.92,
      roughness: 0.22,
      emissive: 0x443300
    });
    const bar = new THREE.Mesh(barGeom, goldMat);
    group.add(bar);

    // Beveled top stamping plane
    const stampCanvas = document.createElement('canvas');
    stampCanvas.width = 256;
    stampCanvas.height = 128;
    const ctx = stampCanvas.getContext('2d');
    ctx.fillStyle = '#e6b800';
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = '#7a5a00';
    ctx.font = 'bold 24px "Comfortaa", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LOUVRE 999.9', 128, 55);
    ctx.font = 'bold 18px "Comfortaa", sans-serif';
    ctx.fillText('FINE GOLD', 128, 85);

    const stampTex = new THREE.CanvasTexture(stampCanvas);
    const stampGeom = new THREE.PlaneGeometry(w * 0.85, d * 0.85);
    const stampMat = new THREE.MeshStandardMaterial({
      map: stampTex,
      metalness: 0.9,
      roughness: 0.25
    });
    const stamp = new THREE.Mesh(stampGeom, stampMat);
    stamp.rotation.x = -Math.PI / 2;
    stamp.position.y = h / 2 + 0.005;
    group.add(stamp);

    return this.registerArtifact(group, 'Gold Bullion', 2.5, 0.7);
  }

  // 4. Red Origami Resistance Bird (Crane)
  createOrigamiBird() {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xe50914,
      roughness: 0.5,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    // Body triangle
    const bodyGeom = new THREE.ConeGeometry(0.35, 0.9, 4);
    const body = new THREE.Mesh(bodyGeom, mat);
    body.rotation.z = Math.PI / 2;
    group.add(body);

    // Wings
    const wingGeom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, 0,
      -0.6, 0.4, 0.8,
      0.6, 0, 0,

      0, 0, 0,
      -0.6, 0.4, -0.8,
      0.6, 0, 0
    ]);
    wingGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    wingGeom.computeVertexNormals();

    const wings = new THREE.Mesh(wingGeom, mat);
    wings.position.y = 0.1;
    group.add(wings);

    return this.registerArtifact(group, 'Origami Bird', 0.2, 0.6);
  }

  // 5. Revolutionary Tricolour Cockade
  createCockade() {
    const group = new THREE.Group();
    const rOuter = 0.72;

    const blueGeom = new THREE.RingGeometry(0.48, rOuter, 28);
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x002395, side: THREE.DoubleSide, roughness: 0.6 });
    const blueRing = new THREE.Mesh(blueGeom, blueMat);
    group.add(blueRing);

    const whiteGeom = new THREE.RingGeometry(0.26, 0.48, 28);
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f5fa, side: THREE.DoubleSide, roughness: 0.5 });
    const whiteRing = new THREE.Mesh(whiteGeom, whiteMat);
    whiteRing.position.z = 0.01;
    group.add(whiteRing);

    const redGeom = new THREE.CircleGeometry(0.26, 28);
    const redMat = new THREE.MeshStandardMaterial({ color: 0xed2939, side: THREE.DoubleSide, roughness: 0.5 });
    const redCenter = new THREE.Mesh(redGeom, redMat);
    redCenter.position.z = 0.02;
    group.add(redCenter);

    const ribbonGeom = new THREE.PlaneGeometry(0.2, 0.85);
    const ribbon1 = new THREE.Mesh(ribbonGeom, redMat);
    ribbon1.position.set(-0.15, -0.65, -0.02);
    ribbon1.rotation.z = 0.2;
    group.add(ribbon1);

    const ribbon2 = new THREE.Mesh(ribbonGeom, blueMat);
    ribbon2.position.set(0.15, -0.65, -0.02);
    ribbon2.rotation.z = -0.2;
    group.add(ribbon2);

    return this.registerArtifact(group, 'Cockade', 0.4, rOuter);
  }

  // 6. Gold Louis d'Or Coin
  createGoldCoin() {
    const group = new THREE.Group();
    const r = 0.55 + Math.random() * 0.2;
    const geom = new THREE.CylinderGeometry(r, r, 0.1, 32);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x332200
    });
    const coin = new THREE.Mesh(geom, goldMat);
    coin.rotation.x = Math.PI / 2;
    group.add(coin);

    return this.registerArtifact(group, 'Gold Coin', 0.8, r);
  }

  bindEvents() {
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
  }

  updateMouseCoords(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onPointerMove(e) {
    this.updateMouseCoords(e);

    if (this.isDragging && this.draggedArtifact) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      if (this.raycaster.ray.intersectPlane(this.dragPlane, this.planeIntersect)) {
        this.dragVelocity.subVectors(this.planeIntersect, this.draggedArtifact.mesh.position).multiplyScalar(0.45);
        this.draggedArtifact.mesh.position.copy(this.planeIntersect);
      }
      return;
    }

    // Hover detection
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.artifacts.map(a => a.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let top = intersects[0].object;
      while (top.parent && top.parent !== this.scene) {
        top = top.parent;
      }
      if (top.userData && top.userData.artifact) {
        if (this.hoveredArtifact !== top.userData.artifact) {
          if (this.hoveredArtifact) this.setArtifactHighlight(this.hoveredArtifact, false);
          this.hoveredArtifact = top.userData.artifact;
          this.setArtifactHighlight(this.hoveredArtifact, true);
          document.body.style.cursor = 'grab';
        }
        return;
      }
    }

    if (this.hoveredArtifact) {
      this.setArtifactHighlight(this.hoveredArtifact, false);
      this.hoveredArtifact = null;
      document.body.style.cursor = 'default';
    }
  }

  setArtifactHighlight(artifact, highlight) {
    if (!artifact || !artifact.mesh) return;
    if (highlight) {
      artifact.mesh.scale.copy(artifact.initialScale).multiplyScalar(1.25);
    } else {
      artifact.mesh.scale.copy(artifact.initialScale);
    }
  }

  onPointerDown(e) {
    if (e.button !== 0) return;
    this.updateMouseCoords(e);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const meshes = this.artifacts.map(a => a.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let top = intersects[0].object;
      while (top.parent && top.parent !== this.scene) {
        top = top.parent;
      }
      if (top.userData && top.userData.artifact) {
        this.isDragging = true;
        this.draggedArtifact = top.userData.artifact;
        document.body.style.cursor = 'grabbing';

        const camDir = new THREE.Vector3();
        this.camera.getWorldDirection(camDir);
        this.dragPlane.setFromNormalAndCoplanarPoint(camDir.negate(), top.position);

        this.prevDragPos.copy(top.position);
        this.dragVelocity.set(0, 0, 0);

        this.draggedArtifact.rotVx += (Math.random() - 0.5) * 4;
        this.draggedArtifact.rotVy += (Math.random() - 0.5) * 4;
      }
    }
  }

  onPointerUp(e) {
    if (this.isDragging && this.draggedArtifact) {
      this.draggedArtifact.vx = this.dragVelocity.x * 1.6;
      this.draggedArtifact.vy = this.dragVelocity.y * 1.6;
      this.draggedArtifact.vz = this.dragVelocity.z * 1.6;

      this.isDragging = false;
      this.draggedArtifact = null;
      document.body.style.cursor = this.hoveredArtifact ? 'grab' : 'default';
    }
  }

  disturbScene(force = 5.0) {
    this.artifacts.forEach(a => {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2.2 + 0.6,
        (Math.random() - 0.5) * 2
      ).normalize();

      a.vx += dir.x * (force / a.mass);
      a.vy += dir.y * (force / a.mass);
      a.vz += dir.z * (force / a.mass);

      a.rotVx += (Math.random() - 0.5) * 6;
      a.rotVy += (Math.random() - 0.5) * 7;
      a.rotVz += (Math.random() - 0.5) * 6;
    });
  }

  setGravityMode(mode) {
    this.mode = mode;
  }

  spawnRandomArtifact() {
    const creators = [
      () => this.createDaliMask(),
      () => this.createBanknote(),
      () => this.createGoldBar(),
      () => this.createOrigamiBird(),
      () => this.createCockade(),
      () => this.createGoldCoin()
    ];
    const pick = creators[Math.floor(Math.random() * creators.length)];
    const art = pick();

    const camPos = this.camera.position;
    const camDir = new THREE.Vector3();
    this.camera.getWorldDirection(camDir);
    art.mesh.position.copy(camPos).add(camDir.multiplyScalar(6));
    art.vx = (Math.random() - 0.5) * 2.5;
    art.vy = Math.random() * 2.0;
    art.vz = (Math.random() - 0.5) * 2.5;
    return art;
  }

  update(delta) {
    const dt = Math.min(delta, 0.1);

    let gx = 0, gy = 0, gz = 0;
    if (this.mode === 'anti-g') {
      gy = 2.2;
    } else if (this.mode === 'moon') {
      gy = -1.6;
    } else if (this.mode === 'earth') {
      gy = -9.8;
    } else if (this.mode === 'vortex') {
      // Swirl
    } else {
      gy = Math.sin(Date.now() * 0.0015) * 0.18;
    }

    const b = this.bounds;
    const damping = 0.985;
    const rotDamping = 0.99;

    this.artifacts.forEach(a => {
      if (this.isDragging && this.draggedArtifact === a) return;

      if (this.mode === 'vortex') {
        const cx = 0, cz = -15;
        const dx = a.mesh.position.x - cx;
        const dz = a.mesh.position.z - cz;
        const angle = Math.atan2(dz, dx) + Math.PI / 2;
        a.vx += Math.cos(angle) * 4.0 * dt;
        a.vz += Math.sin(angle) * 4.0 * dt;
        a.vx -= dx * 0.9 * dt;
        a.vz -= dz * 0.9 * dt;
        a.vy += (5 - a.mesh.position.y) * 0.8 * dt;
      } else {
        a.vx += gx * dt;
        a.vy += gy * dt;
        a.vz += gz * dt;
      }

      // Banknote fluttering
      if (a.isFluttering) {
        a.flutterTime += dt * 4;
        a.mesh.position.x += Math.sin(a.flutterTime) * 0.04;
        a.mesh.rotation.z += Math.cos(a.flutterTime) * 0.05;
      }

      a.vx *= damping;
      a.vy *= damping;
      a.vz *= damping;

      a.rotVx *= rotDamping;
      a.rotVy *= rotDamping;
      a.rotVz *= rotDamping;

      a.mesh.position.x += a.vx * dt * 8;
      a.mesh.position.y += a.vy * dt * 8;
      a.mesh.position.z += a.vz * dt * 8;

      a.mesh.rotation.x += a.rotVx * dt;
      a.mesh.rotation.y += a.rotVy * dt;
      a.mesh.rotation.z += a.rotVz * dt;

      // Boundary bouncing
      const r = a.radius;
      if (a.mesh.position.x < b.minX + r) { a.mesh.position.x = b.minX + r; a.vx = Math.abs(a.vx) * 0.75; }
      else if (a.mesh.position.x > b.maxX - r) { a.mesh.position.x = b.maxX - r; a.vx = -Math.abs(a.vx) * 0.75; }

      if (a.mesh.position.y < b.minY + r) { a.mesh.position.y = b.minY + r; a.vy = Math.abs(a.vy) * 0.75; }
      else if (a.mesh.position.y > b.maxY - r) { a.mesh.position.y = b.maxY - r; a.vy = -Math.abs(a.vy) * 0.75; }

      if (a.mesh.position.z < b.minZ + r) { a.mesh.position.z = b.minZ + r; a.vz = Math.abs(a.vz) * 0.75; }
      else if (a.mesh.position.z > b.maxZ - r) { a.mesh.position.z = b.maxZ - r; a.vz = -Math.abs(a.vz) * 0.75; }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AntigravityEngine;
}
