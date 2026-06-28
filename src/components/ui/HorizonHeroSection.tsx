"use client";

/**
 * Warm, calm reinterpretation of the "Horizon" WebGL hero.
 *
 * The original was a dark, space-themed scroll-jacking experience (starfield,
 * nebula, bloom). This version keeps the spirit — a living, animated canvas with
 * gentle parallax and a split-text title reveal — but re-themed to the site's
 * cream / sage / clay palette so it suits a counselling brand:
 *
 *   - soft floating "motes" instead of stars
 *   - a layered horizon of warm hills instead of cosmic mountains
 *   - a gentle warm glow instead of a nebula, and no harsh bloom
 *   - a single, contained full-screen hero (no scroll takeover)
 *   - honours prefers-reduced-motion
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

// --- Brand palette (linear-ish hex used directly by three) ---
const PALETTE = {
  cream: 0xfbf8f2,
  sand: 0xe7dccb,
  sage: 0x7ba08c,
  sageDeep: 0x4f6e60,
  clay: 0xc28e6d,
  claySoft: 0xe7c9b3,
};

const MOTE_COLORS = [PALETTE.sage, PALETTE.sageDeep, PALETTE.clay, PALETTE.sand];

type HorizonHeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export const Component = ({
  eyebrow = "BACP Registered Member · Sparsholt, Winchester",
  title = "You don't have to figure it all out alone.",
  subtitle = "Warm, confidential counselling in Winchester for when life feels heavy, anxious or hard to make sense of — a calm, unhurried space to feel genuinely heard.",
}: HorizonHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable three.js world (kept off React state on purpose).
  const refs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    motes: THREE.Points[];
    hills: THREE.Mesh[];
    glow?: THREE.Mesh;
    animationId?: number;
    pointer: { x: number; y: number };
    smooth: { x: number; y: number };
    reduced: boolean;
  }>({ motes: [], hills: [], pointer: { x: 0, y: 0 }, smooth: { x: 0, y: 0 }, reduced: false });

  // --- Three.js scene ---
  useEffect(() => {
    const r = refs.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    r.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Lighter scene on phones / touch devices to save battery + GPU.
    const lowPower =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    // Size from the container, not the window, so mobile browser-chrome height
    // changes don't stretch or over-render the scene.
    const sizeOf = () => {
      const el = containerRef.current;
      return {
        w: el?.clientWidth || window.innerWidth,
        h: el?.clientHeight || window.innerHeight,
      };
    };
    const initial = sizeOf();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PALETTE.cream, 0.0016);
    r.scene = scene;

    const camera = new THREE.PerspectiveCamera(70, initial.w / initial.h, 0.1, 2000);
    camera.position.set(0, 8, 100);
    camera.lookAt(0, 20, -300);
    r.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lowPower,
      alpha: true, // let the CSS warm gradient show through
      powerPreference: "low-power",
    });
    renderer.setSize(initial.w, initial.h, false);
    renderer.setPixelRatio(lowPower ? 1 : Math.min(window.devicePixelRatio, 2));
    r.renderer = renderer;

    // ---- Soft floating motes ----
    const makeMotes = (count: number, spread: number, depth: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const color = new THREE.Color();

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6 + 10;
        positions[i * 3 + 2] = -Math.random() * 400 - depth;

        color.setHex(MOTE_COLORS[Math.floor(Math.random() * MOTE_COLORS.length)]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 2.5 + 0.8;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, uOpacity: { value: 0.55 } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.y += sin(time * 0.4 + pos.x * 0.02) * 2.5;
            pos.x += cos(time * 0.3 + pos.z * 0.02) * 2.0;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform float uOpacity;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float a = (1.0 - smoothstep(0.0, 0.5, d)) * uOpacity;
            gl_FragColor = vec4(vColor, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      r.motes.push(points);
    };

    makeMotes(lowPower ? 320 : 900, 700, 60);
    makeMotes(lowPower ? 160 : 500, 1100, 240);

    // ---- Warm layered horizon ----
    const layers = [
      { z: -60, height: 42, color: PALETTE.sageDeep, opacity: 1, y: -74 },
      { z: -120, height: 58, color: PALETTE.sage, opacity: 0.85, y: -66 },
      { z: -200, height: 78, color: PALETTE.claySoft, opacity: 0.6, y: -56 },
      { z: -300, height: 100, color: PALETTE.sand, opacity: 0.4, y: -44 },
    ];

    layers.forEach((layer, index) => {
      const pts: THREE.Vector2[] = [];
      const segments = 60;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1600;
        const y =
          Math.sin(i * 0.12 + index) * layer.height +
          Math.sin(i * 0.05 + index * 2) * layer.height * 0.5 +
          layer.y;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(8000, -400));
      pts.push(new THREE.Vector2(-8000, -400));

      const shape = new THREE.Shape(pts);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      });
      const hill = new THREE.Mesh(geometry, material);
      hill.position.z = layer.z;
      hill.userData = { baseX: 0, factor: 1 + index * 0.6 };
      scene.add(hill);
      r.hills.push(hill);
    });

    // ---- Gentle warm glow (sun-like) ----
    const glowGeo = new THREE.PlaneGeometry(900, 900);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uColor: { value: new THREE.Color(PALETTE.claySoft) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float time;
        void main() {
          float d = length(vUv - vec2(0.5));
          float glow = smoothstep(0.5, 0.0, d);
          float pulse = 0.85 + sin(time * 0.6) * 0.15;
          gl_FragColor = vec4(uColor, glow * 0.5 * pulse);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(160, 90, -360);
    scene.add(glow);
    r.glow = glow;

    // ---- Animation loop ----
    const start =
      typeof performance !== "undefined" ? performance.now() : 0;
    const renderFrame = () => {
      const t = (performance.now() - start) / 1000;

      r.motes.forEach((m) => {
        const mat = m.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = t;
      });
      if (r.glow) {
        const gm = r.glow.material as THREE.ShaderMaterial;
        if (gm.uniforms?.time) gm.uniforms.time.value = t;
      }

      // Smooth pointer parallax
      r.smooth.x += (r.pointer.x - r.smooth.x) * 0.04;
      r.smooth.y += (r.pointer.y - r.smooth.y) * 0.04;

      if (r.camera) {
        const floatX = Math.sin(t * 0.1) * 1.5;
        const floatY = Math.cos(t * 0.13) * 1.0;
        r.camera.position.x = r.smooth.x * 12 + floatX;
        r.camera.position.y = 8 + r.smooth.y * 6 + floatY;
        r.camera.lookAt(0, 20, -300);
      }

      r.hills.forEach((h) => {
        h.position.x = -r.smooth.x * 10 * h.userData.factor;
      });

      renderer.render(scene, camera);
    };

    let running = false;
    const loop = () => {
      if (!running) return;
      r.animationId = requestAnimationFrame(loop);
      renderFrame();
    };
    const startLoop = () => {
      if (running) return;
      running = true;
      loop();
    };
    const stopLoop = () => {
      running = false;
      if (r.animationId) cancelAnimationFrame(r.animationId);
    };

    if (r.reduced) {
      renderFrame(); // single static frame, no loop
    } else {
      startLoop();
    }

    // Pause the render loop when the tab is hidden (saves battery on phones).
    const onVisibility = () => {
      if (r.reduced) return;
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ---- Pointer + resize ----
    const onPointer = (e: PointerEvent) => {
      r.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      r.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onResize = () => {
      if (!r.camera || !r.renderer) return;
      const { w, h } = sizeOf();
      r.camera.aspect = w / h;
      r.camera.updateProjectionMatrix();
      r.renderer.setSize(w, h, false);
      if (r.reduced) renderFrame(); // keep the static frame correct after resize
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      r.motes.forEach((m) => {
        scene.remove(m);
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      r.hills.forEach((h) => {
        scene.remove(h);
        h.geometry.dispose();
        (h.material as THREE.Material).dispose();
      });
      if (r.glow) {
        scene.remove(r.glow);
        r.glow.geometry.dispose();
        (r.glow.material as THREE.Material).dispose();
      }
      renderer.dispose();
      // Drop references so stale objects can't linger across StrictMode remounts.
      r.motes = [];
      r.hills = [];
      r.glow = undefined;
      r.scene = undefined;
      r.camera = undefined;
      r.renderer = undefined;
      r.animationId = undefined;
    };
  }, []);

  // --- Title / subtitle reveal ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hh-logo", { y: 16, opacity: 0, duration: 0.8 })
          .from(".hh-eyebrow", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
          .from(
            ".hh-char",
            { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.018, ease: "power4.out" },
            "-=0.3"
          )
          .from(".hh-sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(".hh-cta", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
          .from(".hh-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");
      });
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const words = title.split(" ");

  return (
    <section ref={containerRef} className="hh-hero bg-calm-gradient">
      <canvas ref={canvasRef} className="hh-canvas" aria-hidden="true" />
      {/* legibility veil */}
      <div className="hh-veil" aria-hidden="true" />

      <div className="hh-content mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
        <Image
          src="/images/logo-trans.png"
          alt="Ivan Hall Counselling logo"
          width={320}
          height={160}
          priority
          className="hh-logo mb-3 h-auto w-36 sm:w-44"
        />
        <span className="hh-eyebrow inline-flex items-center gap-2 rounded-full bg-white-warm/80 px-4 py-1.5 text-sm font-semibold text-sage-deep shadow-soft ring-1 ring-sage/20 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-sage" aria-hidden />
          {eyebrow}
        </span>

        <h1 className="hh-title mt-4 text-[2.6rem] leading-[1.08] sm:text-6xl">
          {words.map((word, wi) => (
            <span key={`${wi}-${word}`} className="hh-word">
              {word.split("").map((ch, ci) => (
                <span key={`${wi}-${ci}-${ch}`} className="hh-char">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hh-sub mt-4 max-w-xl text-lg leading-relaxed text-stone sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="hh-cta">
            <ButtonLink href="/free-consultation" size="lg">
              Book a free consultation
            </ButtonLink>
          </span>
          <span className="hh-cta">
            <ButtonLink href="/availability" variant="secondary" size="lg">
              View availability
            </ButtonLink>
          </span>
        </div>

        <p className="hh-cta mt-4 text-sm text-white-warm">
          Free 20-minute chat · Phone or video · No obligation
        </p>
      </div>

      <div className="hh-scroll" aria-hidden="true">
        <span className="hh-scroll-text">Scroll</span>
        <span className="hh-scroll-line" />
      </div>
    </section>
  );
};

export const HorizonHero = Component;
export default Component;
