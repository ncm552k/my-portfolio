'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Cartoon boy typing on a laptop in an armchair — built from primitives. */
export default function CodingBoy3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);

    camera.position.set(0, 1.35, 7.0);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setClearColor(0x000000, 0); // fully transparent background
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.insertBefore(renderer.domElement, container.firstChild);

    const group = new THREE.Group();

    group.rotation.y = -0.42; // 3/4 view
    group.position.y = -0.25;
    scene.add(group);

    // palette
    const SHIRT = 0x3e82f7,
      PANTS = 0x3c3a38,
      SHOE = 0x6b4226,
      HAIR1 = 0x5f3e26,
      HAIR2 = 0x6f4b2e,
      HAIR3 = 0x523322,
      SKIN = 0xf6c9a0,
      CHAIR = 0xbfb2a0,
      CUSHION = 0xcfc3b1,
      WOOD = 0x6e4e32,
      SILVER = 0xb9bec7,
      DECK = 0x8e939c,
      DARK = 0x1d1d1f;

    const mat = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.88, metalness: 0 });

    const ball = (
      r: number,
      c: number,
      x: number,
      y: number,
      z: number,
      sx = 1,
      sy = 1,
      sz = 1,
      parent: THREE.Object3D = group,
    ) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 18), mat(c));

      m.position.set(x, y, z);
      m.scale.set(sx, sy, sz);
      parent.add(m);

      return m;
    };

    const box = (
      w: number,
      h: number,
      d: number,
      c: number,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D = group,
    ) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));

      m.position.set(x, y, z);
      parent.add(m);

      return m;
    };

    // cylinder between two points (for limbs)
    const limb = (
      ax: number,
      ay: number,
      az: number,
      bx: number,
      by: number,
      bz: number,
      r: number,
      c: number,
      parent: THREE.Object3D = group,
    ) => {
      const dir = new THREE.Vector3(bx - ax, by - ay, bz - az);
      const len = dir.length();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 14), mat(c));

      m.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      parent.add(m);

      return m;
    };

    // ---- armchair ----
    box(2.2, 1.55, 0.5, CHAIR, 0, 0.42, -0.78);
    const backTop = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2.2, 20), mat(CHAIR));

    backTop.rotation.z = Math.PI / 2;
    backTop.position.set(0, 1.2, -0.78);
    group.add(backTop);
    box(2.2, 0.45, 1.6, CUSHION, 0, -0.4, 0.1);
    [-1, 1].forEach((s) => {
      box(0.45, 1.0, 1.85, CHAIR, s * 1.32, 0.02, -0.05);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.225, 0.225, 1.85, 20), mat(CHAIR));

      top.rotation.x = Math.PI / 2;
      top.position.set(s * 1.32, 0.52, -0.05);
      group.add(top);
    });
    box(2.0, 0.18, 1.45, WOOD, 0, -0.71, 0.02);
    (
      [
        [-0.9, -0.55],
        [0.9, -0.55],
        [-0.9, 0.55],
        [0.9, 0.55],
      ] as const
    ).forEach((p) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.5, 12), mat(WOOD));

      leg.position.set(p[0], -1.02, p[1]);
      group.add(leg);
    });

    // ---- boy ----
    ball(0.5, SHIRT, 0, 0.3, 0.12, 1.05, 1.18, 0.8); // torso
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.18, 14), mat(SKIN));

    collar.position.set(0, 0.92, 0.12);
    group.add(collar);

    ball(0.52, SKIN, 0, 1.32, 0.15, 1, 0.95, 0.9); // head
    ball(0.1, SKIN, -0.52, 1.3, 0.12, 0.55, 1, 0.8); // ears
    ball(0.1, SKIN, 0.52, 1.3, 0.12, 0.55, 1, 0.8);

    // eyes + brows
    ball(0.085, 0xffffff, -0.19, 1.34, 0.56);
    ball(0.085, 0xffffff, 0.19, 1.34, 0.56);
    ball(0.042, 0x2a1b12, -0.19, 1.34, 0.625);
    ball(0.042, 0x2a1b12, 0.19, 1.34, 0.625);
    const browL = box(0.17, 0.035, 0.03, 0x4a3120, -0.2, 1.53, 0.55);

    browL.rotation.z = 0.12;
    const browR = box(0.17, 0.035, 0.03, 0x4a3120, 0.2, 1.53, 0.55);

    browR.rotation.z = -0.12;

    // smile
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.016, 8, 20, Math.PI * 0.85), mat(0xb4633e));

    smile.position.set(0, 1.14, 0.57);
    smile.rotation.z = Math.PI * 1.08;
    smile.rotation.x = -0.2;
    group.add(smile);

    // round glasses
    [-0.21, 0.21].forEach((x) => {
      const lens = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.022, 10, 28), mat(DARK));

      lens.position.set(x, 1.34, 0.63);
      group.add(lens);
    });
    box(0.12, 0.028, 0.028, DARK, 0, 1.36, 0.64);
    limb(-0.36, 1.36, 0.6, -0.52, 1.38, 0.16, 0.014, DARK);
    limb(0.36, 1.36, 0.6, 0.52, 1.38, 0.16, 0.014, DARK);

    // fluffy hair — clustered tufts
    ball(0.5, HAIR1, 0, 1.62, 0.02, 1.1, 0.72, 1.02);
    const tufts: [number, number, number, number, number][] = [
      [-0.35, 1.78, 0.22, 0.21, HAIR2],
      [0.3, 1.83, 0.18, 0.2, HAIR3],
      [0, 1.88, 0, 0.23, HAIR1],
      [-0.15, 1.82, -0.25, 0.2, HAIR2],
      [0.35, 1.72, -0.2, 0.19, HAIR3],
      [-0.42, 1.66, -0.08, 0.18, HAIR1],
      [0.44, 1.64, 0.08, 0.17, HAIR2],
      [0.12, 1.84, 0.3, 0.18, HAIR3],
      [-0.2, 1.75, 0.36, 0.17, HAIR1],
      [0.05, 1.7, -0.4, 0.19, HAIR2],
      [-0.28, 1.56, 0.42, 0.14, HAIR3],
      [0.05, 1.6, 0.46, 0.13, HAIR1],
      [0.3, 1.57, 0.4, 0.14, HAIR2],
      [-0.46, 1.44, 0.12, 0.12, HAIR3],
      [0.46, 1.44, 0.12, 0.12, HAIR1],
    ];

    tufts.forEach((t) => ball(t[3], t[4], t[0], t[1], t[2], 1.25, 0.8, 1.1));

    // legs + shoes
    limb(-0.22, -0.08, 0.2, -0.27, 0.0, 0.78, 0.17, PANTS);
    limb(0.22, -0.08, 0.2, 0.27, 0.0, 0.78, 0.17, PANTS);
    limb(-0.27, 0.0, 0.8, -0.3, -1.0, 0.88, 0.14, PANTS);
    limb(0.27, 0.0, 0.8, 0.3, -1.0, 0.88, 0.14, PANTS);
    ball(0.16, SHOE, -0.3, -1.1, 1.0, 1, 0.72, 1.75);
    ball(0.16, SHOE, 0.3, -1.1, 1.0, 1, 0.72, 1.75);

    // ---- laptop on lap ----
    box(1.15, 0.06, 0.7, SILVER, 0, 0.21, 0.55);
    box(1.02, 0.022, 0.55, DECK, 0, 0.245, 0.53);
    const screenPivot = new THREE.Group();

    screenPivot.position.set(0, 0.22, 0.9);
    screenPivot.rotation.x = 0.42;
    group.add(screenPivot);
    box(1.15, 0.8, 0.05, SILVER, 0, 0.4, 0, screenPivot);
    const logo = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.014, 24), mat(0xf2f2f2));

    logo.rotation.x = Math.PI / 2;
    logo.position.set(0, 0.44, 0.035);
    screenPivot.add(logo);
    const glow = new THREE.PointLight(0x9db8ff, 0.7, 3);

    glow.position.set(0, 0.7, 0.45);
    group.add(glow);

    // ---- arms (forearm + hand pivot at elbow for typing) ----
    ball(0.16, SHIRT, -0.52, 0.58, 0.18);
    ball(0.16, SHIRT, 0.52, 0.58, 0.18);
    limb(-0.52, 0.58, 0.18, -0.6, 0.16, 0.4, 0.13, SHIRT);
    limb(0.52, 0.58, 0.18, 0.6, 0.16, 0.4, 0.13, SHIRT);
    const forearm = (sx: number) => {
      const elbow = new THREE.Group();

      elbow.position.set(sx * 0.6, 0.16, 0.4);
      group.add(elbow);
      const rel = { x: -sx * 0.38, y: 0.12, z: 0.1 };

      limb(0, 0, 0, rel.x, rel.y, rel.z, 0.095, SKIN, elbow);
      ball(0.125, SKIN, rel.x, rel.y, rel.z, 1, 0.85, 1.1, elbow);

      return elbow;
    };
    const elbowL = forearm(-1);
    const elbowR = forearm(1);

    // ---- lights ----
    scene.add(new THREE.HemisphereLight(0xffffff, 0x9a97a0, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 0.65);

    key.position.set(4, 7, 6);
    scene.add(key);

    // ---- drag to rotate + idle spin ----
    let dragging = false,
      px = 0,
      py = 0,
      tx = group.rotation.y,
      ty = 0;
    const onDown = (x: number, y: number) => {
      dragging = true;
      px = x;
      py = y;
    };
    const onMove = (x: number, y: number) => {
      if (!dragging) return;
      tx += (x - px) * 0.008;
      ty = Math.max(-0.2, Math.min(0.35, ty + (y - py) * 0.005));
      px = x;
      py = y;
    };
    const onUp = () => {
      dragging = false;
    };

    const mouseDown = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const mouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const touchStart = (e: TouchEvent) => {
      const t = e.touches[0];

      onDown(t.clientX, t.clientY);
    };
    const touchMove = (e: TouchEvent) => {
      const t = e.touches[0];

      onMove(t.clientX, t.clientY);
    };

    container.addEventListener('mousedown', mouseDown);
    addEventListener('mousemove', mouseMove);
    addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', touchStart, { passive: true });
    container.addEventListener('touchmove', touchMove, { passive: true });
    addEventListener('touchend', onUp);

    const onResize = () => {
      const w = container.clientWidth,
        h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    addEventListener('resize', onResize);

    // ---- animation: alternating typing hands + idle sway ----
    let raf = 0;
    const render = (now: number) => {
      if (!reduced) {
        if (!dragging) tx += 0.0018;
        const t = now * 0.011;

        elbowL.rotation.x = Math.sin(t) * 0.12;
        elbowR.rotation.x = Math.sin(t + Math.PI) * 0.12;
      }
      group.rotation.y += (tx - group.rotation.y) * 0.08;
      group.rotation.x += (ty - group.rotation.x) * 0.08;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    // ---- cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('mousedown', mouseDown);
      removeEventListener('mousemove', mouseMove);
      removeEventListener('mouseup', onUp);
      container.removeEventListener('touchstart', touchStart);
      container.removeEventListener('touchmove', touchMove);
      removeEventListener('touchend', onUp);
      removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="hero-3d" ref={containerRef} aria-hidden="true">
      <span className="hint">drag to rotate</span>
    </div>
  );
}
