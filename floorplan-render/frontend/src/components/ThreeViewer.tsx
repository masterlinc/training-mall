import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { getFileUrl } from '../api/client';

interface ThreeViewerProps {
  textureUrl: string | null;
  visible: boolean;
  onClose: () => void;
}

const Room: React.FC<{ textureUrl: string | null }> = ({ textureUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureLoader = new THREE.TextureLoader();
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (textureUrl) {
      const url = getFileUrl(textureUrl.split('/').pop() || '');
      textureLoader.load(url, (loadedTexture) => {
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.repeat.set(1, 1);
        setTexture(loadedTexture);
      });
    }
  }, [textureUrl]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial 
          map={texture || undefined}
          color={texture ? '#ffffff' : '#e0e0e0'}
          roughness={0.8}
        />
      </mesh>

      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[8, 2.8, 6]} />
        <meshStandardMaterial color="#f5f5f5" transparent opacity={0.3} wireframe />
      </mesh>

      <mesh position={[-4, 1.4, 0]} castShadow>
        <boxGeometry args={[0.1, 2.8, 6]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      <mesh position={[4, 1.4, 0]} castShadow>
        <boxGeometry args={[0.1, 2.8, 6]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      <mesh position={[0, 2.8, -3]} castShadow>
        <boxGeometry args={[8, 0.1, 0.1]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      <mesh position={[0, 2.8, 3]} castShadow>
        <boxGeometry args={[8, 0.1, 0.1]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>

      <mesh position={[0, 0.01, -2.9]} receiveShadow>
        <planeGeometry args={[3, 2.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0.01, -2.9]}>
        <planeGeometry args={[3, 2.1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
};

const Furniture: React.FC = () => {
  return (
    <group>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[2, 0.8, 1.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[2, 0.1, 1.2]} />
        <meshStandardMaterial color="#A0522D" roughness={0.5} />
      </mesh>

      <mesh position={[2.5, 0.25, 1.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.5]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[3.2, 0.25, 1.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.5]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.5, 0.6, 1.5]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.1]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[-2.5, 0.4, -1.5]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#556B2F" roughness={0.8} />
      </mesh>
      <mesh position={[-2.5, 0.85, -1.5]}>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#6B8E23" roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.15, 2.4]} castShadow>
        <boxGeometry args={[1.5, 0.3, 0.8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>
    </group>
  );
};

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-3, 2.5, 0]} intensity={0.5} color="#fff5e6" />
    </>
  );
};

const CameraSetup: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(6, 4, 6);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
};

const ThreeViewer: React.FC<ThreeViewerProps> = ({ textureUrl, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="three-d-section">
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <span>🎲</span>
            3D 房间预览
          </span>
          <button 
            className="btn-secondary" 
            onClick={onClose}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            关闭
          </button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="three-d-container">
            <Canvas shadows camera={{ position: [6, 4, 6], fov: 50 }}>
              <CameraSetup />
              <Lights />
              <Suspense fallback={null}>
                <Room textureUrl={textureUrl} />
                <Furniture />
                <ContactShadows
                  position={[0, 0, 0]}
                  opacity={0.4}
                  scale={12}
                  blur={2}
                  far={4}
                />
                <Environment preset="apartment" />
              </Suspense>
              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2 - 0.1}
              />
            </Canvas>
          </div>
          <div className="three-d-controls">
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              🖱️ 拖拽旋转 | 滚轮缩放 | 右键平移
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeViewer;
