import { useRef, useEffect } from "react";
import * as THREE from "three";

interface CivilizationPortalProps {
  skyboxUrl: string;
  civilizationName: string;
}

const CivilizationPortal = ({ skyboxUrl, civilizationName }: CivilizationPortalProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skyboxUrl || !mountRef.current) return;
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 64, 48);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load(skyboxUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    let isDragging = false;
    let previousMouseX = 0;
    let theta = 0;

    const onStart = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      previousMouseX = clientX || 0;
    };
    const onEnd = () => { isDragging = false; };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      if (clientX !== undefined) {
        theta -= (clientX - previousMouseX) * 0.004;
        previousMouseX = clientX;
      }
    };

    mount.addEventListener("mousedown", onStart);
    mount.addEventListener("mouseup", onEnd);
    mount.addEventListener("mousemove", onMove);
    mount.addEventListener("touchstart", onStart);
    mount.addEventListener("touchend", onEnd);
    mount.addEventListener("touchmove", onMove);

    const animate = () => {
      requestAnimationFrame(animate);
      if (!isDragging) theta += 0.0006;
      camera.lookAt(
        Math.sin(theta) * 100,
        -10,
        Math.cos(theta) * 100
      );
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousedown", onStart);
      mount.removeEventListener("mouseup", onEnd);
      mount.removeEventListener("mousemove", onMove);
      mount.removeEventListener("touchstart", onStart);
      mount.removeEventListener("touchend", onEnd);
      mount.removeEventListener("touchmove", onMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [skyboxUrl]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden" style={{ height: "420px" }}>
      <div className="absolute inset-0 rounded-3xl z-10 pointer-events-none portal-frame" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <span className="inline-block px-6 py-2 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase text-teal-bright"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(93,202,165,0.3)",
          }}
        >
          DRAG TO EXPLORE {civilizationName.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default CivilizationPortal;