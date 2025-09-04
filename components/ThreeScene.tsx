

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
// Text imports removed as no 3D text is rendered
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();
        scene.background = null;
        scene.fog = new THREE.Fog(0x000000, 1, 15);
        
        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 100);
        camera.position.set(0, 1.5, 5);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        (renderer as any).physicallyCorrectLights = true;
        currentMount.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2;

        // Lighting (photorealistic setup)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x1f2022, 0.3);
        hemiLight.position.set(0, 6, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.1);
        dirLight.position.set(6, 8, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.radius = 4;
        dirLight.shadow.bias = -0.00015;
        const cam = dirLight.shadow.camera as THREE.OrthographicCamera;
        cam.near = 0.1; cam.far = 30; cam.left = -10; cam.right = 10; cam.top = 10; cam.bottom = -10;
        scene.add(dirLight);

        // Second directional light (fill sun) from opposite side
        const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        dirLight2.position.set(-6, 7, -5);
        dirLight2.castShadow = false;
        scene.add(dirLight2);

        const fillRect = new THREE.RectAreaLight(0xffffff, 1.6, 6, 6);
        fillRect.position.set(-4, 4, 4);
        fillRect.lookAt(0, 1.2, 0);
        scene.add(fillRect);

        // Physically-based environment lighting for overall daylight ambience
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envTex = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;
        scene.environment = envTex;

        const rimLight = new THREE.DirectionalLight(0x4dabf7, 0.25);
        rimLight.position.set(-3, 6, -4);
        scene.add(rimLight);

     
        const cornerFill1 = new THREE.PointLight(0xffffff, 0.25, 8);
        cornerFill1.position.set(4, 3.5, 4);
        scene.add(cornerFill1);
        const cornerFill2 = new THREE.PointLight(0xffffff, 0.25, 8);
        cornerFill2.position.set(-4, 3.5, -4);
        scene.add(cornerFill2);


        // Room
        const roomMaterial = new THREE.MeshBasicMaterial({ color: '#adb5bd', side: THREE.BackSide, toneMapped: true });
        const roomGeometry = new THREE.BoxGeometry(10, 8, 10);
        const room = new THREE.Mesh(roomGeometry, roomMaterial);
        room.position.y = 3.9;
        room.castShadow = false;
        room.receiveShadow = false;
        scene.add(room);
        
        const floorMaterial = new THREE.MeshStandardMaterial({ color: '#e9ecef', metalness: 0.05, roughness: 0.35 });
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        
        // 3D Text via canvas texture on a plane (no TextGeometry)
        let textTexture: THREE.Texture | null = null;
        let textMesh: THREE.Mesh | null = null;
        let loadedModel: THREE.Object3D | null = null;

        const createTextPlane = (text: string) => {
            const dpi = Math.min(2, window.devicePixelRatio || 1);
            const padding = 40 * dpi;
            const fontSize = 120 * dpi;
            const fontFamily = '700 120px "JetBrains Mono", "Inter", Arial, sans-serif';

            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            // Measure text
            ctx.font = fontFamily;
            const metrics = ctx.measureText(text);
            const textWidth = Math.ceil(metrics.width);
            const textHeight = Math.ceil(fontSize * 1.3);

            canvas.width = textWidth + padding * 2;
            canvas.height = textHeight + padding * 2;

            // Draw background transparent; draw glow and text
            ctx.font = fontFamily;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Outer glow
            ctx.shadowColor = '#4dabf7';
            ctx.shadowBlur = 40 * dpi;
            ctx.fillStyle = '#4dabf7';
            ctx.fillText(text, cx, cy);

            // Solid text on top (brighter)
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#b3d8ff';
            ctx.fillText(text, cx, cy);

            // Create texture
            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
            texture.needsUpdate = true;

            const aspect = canvas.width / canvas.height;
            const planeHeight = 1.2; // world units
            const planeWidth = planeHeight * aspect;

            const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 2, 0);
            mesh.renderOrder = 1;
            return { mesh, texture };
        };

        const textResult = createTextPlane('Stay Tuned!');
        if (textResult) {
            textMesh = textResult.mesh;
            textTexture = textResult.texture;
            scene.add(textMesh);
        }

        // Load OBJ/MTL model from /models and keep it alongside text
        const basePath = '/models/';
        const mtlLoader = new MTLLoader();
        mtlLoader.setResourcePath(basePath);
        mtlLoader.setPath(basePath);
        mtlLoader.load('model.mtl', (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(basePath);
            objLoader.load('model.obj', (obj) => {
                // Fit model to room scale
                const box = new THREE.Box3().setFromObject(obj);
                const sphere = box.getBoundingSphere(new THREE.Sphere());
                const targetRadius = 2.2;
                if (sphere.radius > 0) {
                    const s = targetRadius / sphere.radius;
                    obj.scale.setScalar(s);
                }

                // Place model on floor (y=0)
                const newBox = new THREE.Box3().setFromObject(obj);
                obj.position.y -= newBox.min.y;

                // Offset model so text remains visible in center
                obj.position.x = -1.8;
                obj.position.z = -0.3;

                // Enable shadows and ensure front side rendering
                obj.traverse((child) => {
                    const mesh = child as THREE.Mesh;
                    if ((mesh as any).isMesh) {
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        if (Array.isArray(mesh.material)) {
                            mesh.material.forEach((m) => ((m as any).side = THREE.FrontSide));
                        } else if (mesh.material) {
                            (mesh.material as any).side = THREE.FrontSide;
                        }
                    }
                });

                loadedModel = obj;
                scene.add(obj);
            });
        });
        
        // Handle Resize
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        let rafId: number | null = null;
        const animate = () => {
            rafId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafId !== null) cancelAnimationFrame(rafId);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            controls.dispose();
            pmremGenerator.dispose();
            if (textTexture) textTexture.dispose();
            if (textMesh) {
                (textMesh.material as THREE.Material).dispose();
                textMesh.geometry.dispose();
            }
            if (loadedModel && loadedModel.parent) {
                loadedModel.parent.remove(loadedModel);
            }
            scene.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    if(object.geometry) object.geometry.dispose();
                    if(object.material) {
                         if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            })
        };
    }, []);

    return (
        <div className="animate-content-fade-in">
            <div className="w-full h-[70vh] rounded-lg overflow-hidden shadow-2xl" ref={mountRef}></div>
        </div>
    );
};