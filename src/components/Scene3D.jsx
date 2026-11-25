import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ---------- Floating particles field ---------- */
export function ParticleField({ count = 1800 }) {
  const points = useRef(null);
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#7c5cff');
    const c2 = new THREE.Color('#00e5c3');
    const c3 = new THREE.Color('#eaeaf2');
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 4;
      const t = Math.random();
      const c = t < 0.4 ? c1 : t < 0.7 ? c2 : c3;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    points.current.rotation.y = t * 0.02 + pointer.x * 0.1;
    points.current.rotation.x = pointer.y * 0.05;
    points.current.position.y = Math.sin(t * 0.3) * 0.4;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ---------- Organic blob with custom vertex-noise shader ---------- */
const blobVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPos;

  // Simplex-ish noise (classic 3D noise by Ashima)
  vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main(){
    vNormal = normalize(normalMatrix * normal);
    float noise = snoise(position * 1.2 + uTime * 0.35);
    float noise2 = snoise(position * 2.5 - uTime * 0.2);
    vec3 newPos = position + normal * (noise * 0.32 + noise2 * 0.12);
    vPos = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const blobFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main(){
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);
    float mixer = sin(vPos.y * 2.0 + uTime * 0.6) * 0.5 + 0.5;
    vec3 base = mix(uColorA, uColorB, mixer);
    vec3 color = mix(base * 0.25, base, fresnel);
    color += fresnel * uColorB * 0.6;
    gl_FragColor = vec4(color, 0.92);
  }
`;

export function Blob({ position = [0, 0, 0], scale = 1, speed = 1 }) {
  const mesh = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#7c5cff') },
      uColorB: { value: new THREE.Color('#00e5c3') },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    uniforms.uTime.value = clock.getElapsedTime() * speed;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.12 * speed;
    mesh.current.position.x = position[0] + pointer.x * 0.6;
    mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.25 - pointer.y * 0.3;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1.6, 48]} />
      <shaderMaterial vertexShader={blobVertex} fragmentShader={blobFragment} uniforms={uniforms} transparent />
    </mesh>
  );
}

/* ---------- Torus knot wireframe accent ---------- */
export function FloatingKnot({ position = [4, 1, -3] }) {
  const mesh = useRef(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.2;
    mesh.current.position.y = position[1] + Math.sin(t * 0.6) * 0.4;
  });
  return (
    <mesh ref={mesh} position={position}>
      <torusKnotGeometry args={[0.9, 0.28, 180, 24]} />
      <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.28} />
    </mesh>
  );
}

/* ---------- Small floating glass shards ---------- */
export function Shards({ count = 14 }) {
  const group = useRef(null);
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: [(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, -2 - Math.random() * 8],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.12 + Math.random() * 0.35,
        speed: 0.3 + Math.random() * 0.8,
        geo: Math.floor(Math.random() * 3),
      });
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const item = items[i];
      child.rotation.x = item.rot[0] + t * 0.2 * item.speed;
      child.rotation.y = item.rot[1] + t * 0.15 * item.speed;
      child.position.y = item.pos[1] + Math.sin(t * item.speed + i) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <mesh key={i} position={item.pos} scale={item.scale}>
          {item.geo === 0 && <octahedronGeometry />}
          {item.geo === 1 && <tetrahedronGeometry />}
          {item.geo === 2 && <boxGeometry args={[1, 1, 1]} />}
          <meshStandardMaterial
            color={i % 2 ? '#00e5c3' : '#a06bff'}
            metalness={0.9}
            roughness={0.15}
            emissive={i % 2 ? '#003d34' : '#241050'}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Camera rig reacting to scroll & mouse ---------- */
export function ScrollRig({ scrollRef }) {
  useFrame(({ camera, pointer }) => {
    const s = scrollRef.current; // 0..1 progress of page
    const targetX = pointer.x * 0.7;
    const targetY = -pointer.y * 0.5 - s * 3.5;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z = 8 - s * 2.5;
    camera.lookAt(0, -s * 3.5, 0);
  });
  return null;
}
