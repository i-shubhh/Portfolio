import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowLeft, ArrowRight, Maximize2, MoveHorizontal } from "lucide-react";

export interface FilmFrameItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  imagePath: string;
  description: string;
  tagline: string;
  tech: string[];
}

interface A24SpatialFilmFlowProps {
  frames: FilmFrameItem[];
  onSelectFrame: (frame: FilmFrameItem) => void;
}

export const A24SpatialFilmFlow: React.FC<A24SpatialFilmFlowProps> = ({
  frames,
  onSelectFrame
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // References to keep animation loop stable without React re-renders tearing down canvas
  const stateRef = useRef({
    targetScroll: 0,
    currentScroll: 0,
    isDragging: false,
    startX: 0,
    lastX: 0,
    activeIdx: 0,
    mousePos: new THREE.Vector2(0, 0),
    raycaster: new THREE.Raycaster(),
    mouseNDC: new THREE.Vector2(-100, -100),
    frameMeshes: [] as THREE.Mesh[]
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement("canvas").getContext("webgl2");
      if (!gl) return true;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7799cc, 1.0);
    rimLight.position.set(-6, -3, -2);
    scene.add(rimLight);

    // 3. Floating 3D Cinematic Dust Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 24;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.35
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // 4. Construct 3D Film Frames
    const textureLoader = new THREE.TextureLoader();
    const frameGroup = new THREE.Group();
    scene.add(frameGroup);

    const cardWidth = 4.2;
    const cardHeight = 2.45;
    const frameSpacing = 5.2;

    const frameMeshes: THREE.Mesh[] = [];

    // Shared plane geometry
    const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 32);

    frames.forEach((item, index) => {
      // Create procedural fallback or load image texture
      const texture = textureLoader.load(item.imagePath, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
      });

      // Frame Border Group
      const singleFrameGroup = new THREE.Group();
      singleFrameGroup.position.x = index * frameSpacing;

      // Outer bezel (A24 minimalist matte black frame)
      const borderGeo = new THREE.PlaneGeometry(cardWidth + 0.16, cardHeight + 0.16);
      const borderMat = new THREE.MeshBasicMaterial({
        color: 0x141418,
        side: THREE.DoubleSide
      });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.z = -0.01;
      singleFrameGroup.add(borderMesh);

      // Inner image mesh
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.1,
        side: THREE.FrontSide
      });

      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.userData = { frameIndex: index, frameData: item };
      singleFrameGroup.add(cardMesh);
      frameMeshes.push(cardMesh);

      frameGroup.add(singleFrameGroup);
    });

    stateRef.current.frameMeshes = frameMeshes;

    // 5. Interaction Handlers
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.lastX = e.clientX;
      setIsInteracting(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      stateRef.current.mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!stateRef.current.isDragging) return;
      const deltaX = e.clientX - stateRef.current.lastX;
      stateRef.current.lastX = e.clientX;
      stateRef.current.targetScroll -= deltaX * 0.012;

      // Clamp target scroll
      const maxScroll = (frames.length - 1) * frameSpacing;
      stateRef.current.targetScroll = Math.max(0, Math.min(maxScroll, stateRef.current.targetScroll));
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;
      setIsInteracting(false);

      // If it was a quick click without significant drag, raycast to select
      if (Math.abs(e.clientX - stateRef.current.startX) < 6) {
        stateRef.current.raycaster.setFromCamera(stateRef.current.mouseNDC, camera);
        const intersects = stateRef.current.raycaster.intersectObjects(frameMeshes);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const hitIdx = hit.userData.frameIndex;
          if (hitIdx !== undefined) {
            stateRef.current.targetScroll = hitIdx * frameSpacing;
            if (hitIdx === stateRef.current.activeIdx) {
              onSelectFrame(hit.userData.frameData);
            }
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Scrub 3D reel on horizontal scroll (trackpad) or if shift key is pressed
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const delta = e.shiftKey ? e.deltaY : e.deltaX;
        stateRef.current.targetScroll += delta * 0.006;
        const maxScroll = (frames.length - 1) * frameSpacing;
        stateRef.current.targetScroll = Math.max(0, Math.min(maxScroll, stateRef.current.targetScroll));
      }
    };

    // Touch Handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        stateRef.current.isDragging = true;
        stateRef.current.startX = e.touches[0].clientX;
        stateRef.current.lastX = e.touches[0].clientX;
        setIsInteracting(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - stateRef.current.lastX;
      stateRef.current.lastX = e.touches[0].clientX;
      stateRef.current.targetScroll -= deltaX * 0.015;

      const maxScroll = (frames.length - 1) * frameSpacing;
      stateRef.current.targetScroll = Math.max(0, Math.min(maxScroll, stateRef.current.targetScroll));
    };

    const onTouchEnd = () => {
      stateRef.current.isDragging = false;
      setIsInteracting(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("wheel", onWheel, { passive: false });
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // 6. Animation Loop with Exponential Damping & Curving
    let frameId = 0;
    let clock = new THREE.Clock();

    function tick() {
      const dt = clock.getDelta();

      // Exponential damping toward target scroll
      stateRef.current.currentScroll = THREE.MathUtils.damp(
        stateRef.current.currentScroll,
        stateRef.current.targetScroll,
        7.5,
        dt
      );

      // Compute which frame is currently closest to center
      const exactIndex = stateRef.current.currentScroll / frameSpacing;
      const nearestIdx = Math.max(0, Math.min(frames.length - 1, Math.round(exactIndex)));

      if (nearestIdx !== stateRef.current.activeIdx) {
        stateRef.current.activeIdx = nearestIdx;
        setActiveIdx(nearestIdx);
      }

      // Position each frame along a gentle 3D spatial curve
      frameGroup.children.forEach((child, i) => {
        const offset = i * frameSpacing - stateRef.current.currentScroll;
        child.position.x = offset;

        // Subtle parabolic Z-curve (center cards come closer, side cards curve backward in depth)
        const distFromCenter = Math.abs(offset);
        child.position.z = -Math.pow(distFromCenter * 0.22, 1.85);

        // Gentle Y rotation toward center
        child.rotation.y = -offset * 0.045;

        // Subtle parallax tilt from cursor on active card
        if (Math.abs(offset) < 2.5) {
          child.rotation.x = -stateRef.current.mouseNDC.y * 0.08;
          child.rotation.y += stateRef.current.mouseNDC.x * 0.08;
        } else {
          child.rotation.x = 0;
        }
      });

      // Slowly rotate dust particles
      particleCloud.rotation.y += 0.0008;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("wheel", onWheel);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      cardGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [frames, onSelectFrame]);

  // Jump to specific frame
  const jumpTo = (index: number) => {
    const frameSpacing = 5.2;
    stateRef.current.targetScroll = index * frameSpacing;
    setActiveIdx(index);
  };

  const activeFrame = frames[activeIdx] || frames[0];

  return (
    <div className="relative w-full h-[520px] sm:h-[640px] bg-[#050507] overflow-hidden select-none border-y border-white/10">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left A24 Editorial Tag */}
      <div className="absolute top-6 left-6 sm:left-10 z-10 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 block">
          3D SPATIAL EXHIBITION REEL
        </span>
        <span className="text-xs text-white font-mono mt-0.5 block">
          FRAME {activeFrame.number} / 0{frames.length}
        </span>
      </div>

      {/* Top Right Drag/Scroll Indicator */}
      <div className="absolute top-6 right-6 sm:right-10 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
        <MoveHorizontal className="w-3.5 h-3.5 text-zinc-400" />
        <span>Drag or scroll to flow through 3D space</span>
      </div>

      {/* Minimalist Bottom Control Dock (Consolidated, Zero Viewport Occlusion) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 pointer-events-auto">
        <div className="bg-[#09090d]/90 border border-white/15 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          {/* Active Frame Title & Category */}
          <div className="text-left w-full sm:w-auto">
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="text-white font-semibold">FRAME {activeFrame.number}</span>
              <span aria-hidden="true">·</span>
              <span className="uppercase">{activeFrame.category}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight mt-0.5 truncate max-w-sm">
              {activeFrame.title}
            </h3>
          </div>

          {/* Stepper Controls & Action */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => jumpTo(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-zinc-800 transition-colors"
                aria-label="Previous 3D frame"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => jumpTo(Math.min(frames.length - 1, activeIdx + 1))}
                disabled={activeIdx === frames.length - 1}
                className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 rounded hover:bg-zinc-800 transition-colors"
                aria-label="Next 3D frame"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onSelectFrame(activeFrame)}
              className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded font-display flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>Inspect Works</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
