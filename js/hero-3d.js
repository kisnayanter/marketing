/* ─────────────────────────────────────────────
 * Hero 3D scene — Three.js
 *
 * Centerpiece: a glowing earth-toned sphere (the field)
 * Orbits: textured equipment image planes circling at 2 radii
 * Particles: warm dust motes floating across z-space
 *
 * Falls back gracefully — if WebGL is unavailable, the
 * CSS .hero__orbit ring underneath remains visible.
 * ─────────────────────────────────────────────*/

import * as THREE from 'three';

const stage = document.getElementById('hero-stage');
if (stage && WebGLAvailable()) {
  initScene(stage);
}

function WebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch (e) { return false; }
}

function initScene(mount) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  // Transparent background; the section gradient shows through
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.5, 9);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  const sizes = { w: 0, h: 0 };
  const resize = () => {
    const r = mount.getBoundingClientRect();
    sizes.w = r.width; sizes.h = r.height;
    if (sizes.w === 0 || sizes.h === 0) return;
    camera.aspect = sizes.w / sizes.h;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.w, sizes.h, false);
  };
  resize();
  window.addEventListener('resize', resize);

  /* ─── Lighting ─── */
  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0xff8a2b, 2.4, 25);
  keyLight.position.set(4, 4, 4);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x2ea055, 1.6, 25);
  fillLight.position.set(-5, -3, 3);
  scene.add(fillLight);

  /* ─── Center "field" sphere ─── */
  const sphereGeo = new THREE.IcosahedronGeometry(1.25, 1);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xFFE4D1,
    roughness: 0.55,
    metalness: 0.15,
    flatShading: true,
    emissive: 0xFF6B00,
    emissiveIntensity: 0.18,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);

  // Glow ring around the sphere (additive)
  const glowGeo = new THREE.RingGeometry(1.6, 1.95, 64);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xFF6B00,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const glowRing = new THREE.Mesh(glowGeo, glowMat);
  glowRing.rotation.x = Math.PI * 0.5;
  scene.add(glowRing);

  /* ─── Orbiting equipment image planes ─── */
  const equipmentFiles = [
    'tractor.png', 'harvester.png', 'sprayer.png',
    'rotavator.png', 'pump.png', 'drone.png',
    'thresher.png', 'plough.png',
  ];

  const loader = new THREE.TextureLoader();
  const orbiters = [];

  equipmentFiles.forEach((file, i) => {
    const tex = loader.load(`assets/equipment/${file}`);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      transparent: true,
      side: THREE.DoubleSide,
      alphaTest: 0.05,
      roughness: 0.8,
    });
    const geo = new THREE.PlaneGeometry(0.95, 0.95);
    const plane = new THREE.Mesh(geo, mat);
    // Distribute on two rings
    const ring = i < 4 ? 0 : 1;
    const inRingIndex = ring === 0 ? i : i - 4;
    const inRingCount = ring === 0 ? 4 : 4;
    const radius = ring === 0 ? 2.6 : 3.4;
    const yOffset = ring === 0 ? 0.4 : -0.6;
    const phase = (inRingIndex / inRingCount) * Math.PI * 2 + (ring === 1 ? Math.PI / 4 : 0);

    plane.userData = { radius, yOffset, phase, ring, baseScale: 1 };
    scene.add(plane);
    orbiters.push(plane);
  });

  /* ─── Background dust particles ─── */
  const dustCount = 220;
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  const dustSpeeds    = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3 + 0] = (Math.random() - 0.5) * 18;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    dustSpeeds[i] = 0.08 + Math.random() * 0.18;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xFF9B5C,
    size: 0.045,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* ─── Mouse parallax ─── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  mount.addEventListener('mousemove', (e) => {
    const r = mount.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    mouse.ty = ((e.clientY - r.top)  / r.height - 0.5) * 2;
  });
  mount.addEventListener('mouseleave', () => { mouse.tx = 0; mouse.ty = 0; });

  /* ─── Animate ─── */
  const clock = new THREE.Clock();
  let raf = 0;
  let running = true;

  // Pause when off-screen
  const visIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => { running = e.isIntersecting; }),
    { threshold: 0 }
  );
  visIO.observe(mount);

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!running) return;

    const t = clock.getElapsedTime();
    const speed = reduced ? 0.05 : 0.25;

    sphere.rotation.y += 0.003 * (reduced ? 0.2 : 1);
    sphere.rotation.x = Math.sin(t * 0.4) * 0.08;
    glowRing.rotation.z += 0.001;

    orbiters.forEach((p) => {
      const { radius, yOffset, phase, ring } = p.userData;
      const angle = phase + t * speed * (ring === 0 ? 1 : -0.7);
      p.position.x = Math.cos(angle) * radius;
      p.position.z = Math.sin(angle) * radius - 1;
      p.position.y = yOffset + Math.sin(t * 1.4 + phase) * 0.08;
      // Always face camera
      p.lookAt(camera.position);
      // Slight pulse
      const s = 1 + Math.sin(t * 1.6 + phase) * 0.04;
      p.scale.set(s, s, s);
    });

    // Dust drift
    const pos = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3 + 0] += dustSpeeds[i] * 0.005;
      pos[i * 3 + 1] += Math.sin(t + i) * 0.0015;
      if (pos[i * 3 + 0] > 9) pos[i * 3 + 0] = -9;
    }
    dustGeo.attributes.position.needsUpdate = true;

    // Camera mouse parallax
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    camera.position.x = mouse.x * 0.6;
    camera.position.y = 0.5 + mouse.y * -0.4;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  tick();

  // Tear-down (e.g. live-reload)
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(raf);
    renderer.dispose();
  });
}
