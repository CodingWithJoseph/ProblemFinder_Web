# ProblemFinder Hero Section - Complete Build Guide

## 🎯 Project Overview

**Concept:** "The Discovery Engine"  
**Purpose:** Visual metaphor for AI-powered problem detection across multiple platforms  
**Build Time:** 2-3 days  
**Difficulty:** Medium (with Blender experience)

---

## 🎨 Design Concept

### Visual Elements

1. **Central Geometric Core** - Low-poly icosahedron (AI brain/processor)
2. **Scanning Rings** - 2-3 orbital rings (multi-platform scanning)
3. **Data Nodes** - Small floating shapes (discovered problems)
4. **Connecting Lines** - Subtle connections between nodes and core

### What Each Element Represents

| Element | Symbolism |
|---------|-----------|
| Icosphere Core | The AI brain processing data |
| Scanning Rings | Multi-platform scanning (Reddit, Twitter, GitHub) |
| Orbiting Nodes | Problems/opportunities being discovered |
| Pulsing Effect | Real-time detection happening |
| Mouse Follow | Interactive, responsive intelligence |
| Glowing Lines | Connections between data points |

---

## 🎨 Color Palette Options

### Option 1: Intelligence/Tech
```
Background: Deep blue-black (#0a0e27)
Core: Bright cyan/electric blue (#00d4ff)
Rings: Purple to blue gradient (#8b5cf6 → #00d4ff)
Nodes: White with blue glow
Accent: Neon pink for "discovered" state (#ff006e)
```

### Option 2: Minimal/Professional
```
Background: Pure black (#000000)
Core: White with subtle blue tint (#e0f4ff)
Rings: Cool gray gradient (#334155 → #64748b)
Nodes: White
Accent: Bright green for discovery (#00ff88)
```

### Option 3: Modern/Bold ⭐ **RECOMMENDED**
```
Background: Dark navy (#0f172a)
Core: Holographic white/cyan (#ffffff with iridescent effect)
Rings: Gradient purple-blue-cyan (#a855f7 → #3b82f6 → #06b6d4)
Nodes: White, pulse to cyan when "discovered"
Accent: Neon yellow for insights (#fbbf24)
```

---

## 📐 Part 1: Blender Modeling

### Setup (2 minutes)

1. Open Blender
2. Delete default cube: `X` → Delete
3. Save file as `hero-discovery-engine.blend`

### The Core - Icosphere (15 minutes)

```markdown
1. Add Icosphere
   - Shift + A → Mesh → Icosphere
   - Subdivisions: 2 (in the operator panel)
   - This keeps it low-poly and modern

2. Scale
   - Press S → 2 → Enter
   - Makes it bigger and more prominent

3. Add Depth to Edges (Optional but looks cool)
   - Tab → Edit Mode
   - Alt + E → Extrude Edges
   - Scale inward slightly (S → 0.95)
   - Creates beveled, defined edges

4. Create Material
   - Switch to Shading workspace
   - Select icosphere
   - Click "New" in Shader Editor
   
   Material Settings:
   - Base Color: Pure White (1, 1, 1)
   - Metallic: 0.9
   - Roughness: 0.2
   - Emission: Slight cyan glow
     * Add Emission shader (Shift + A → Shader → Emission)
     * Color: Light cyan (#00d4ff)
     * Strength: 0.1
     * Mix with Principled BSDF using Mix Shader
```

### Scanning Ring 1 - Outer Ring (10 minutes)

```markdown
1. Add Torus
   - Shift + A → Mesh → Torus
   - Major Radius: 4
   - Minor Radius: 0.08
   - Major Segments: 48
   - Minor Segments: 12

2. Create Scanning Arc Effect
   - Tab → Edit Mode
   - Press 3 (face select mode)
   - Select and delete approximately 75% of faces
   - Leave only a 90° arc (quarter circle)
   - This creates the "scanning" look

3. Array Modifier (Optional - for full ring)
   - Add Modifier → Array
   - Count: 4
   - Relative Offset: Uncheck X
   - Object Offset: Check, select Empty
   - Create Empty (Shift + A → Empty → Plain Axes)
   - Rotate empty 90° on Z axis
   - This creates 4 arcs evenly spaced

4. Material
   - New material: "Ring_Outer"
   - Delete Principled BSDF
   - Add Emission shader
   - Color: Gradient from cyan to purple
     * Add ColorRamp node
     * Connect Texture Coordinate → Gradient Texture → ColorRamp → Emission
   - Strength: 2.0
```

### Scanning Ring 2 - Middle Ring (10 minutes)

```markdown
1. Duplicate Ring 1
   - Select outer ring
   - Shift + D → Enter (duplicate in place)
   - S → 0.75 → Enter (scale to 75%)

2. Rotate for Visual Interest
   - R → X → 45 → Enter (rotate 45° on X axis)

3. Adjust Material
   - Duplicate material
   - Change gradient colors to blue to pink
   - Adjust emission strength: 1.8
```

### Scanning Ring 3 - Inner Ring (Optional, 10 minutes)

```markdown
1. Duplicate Ring 2
   - Shift + D → Enter
   - S → 0.6 → Enter (scale to 60% of original)

2. Rotate Differently
   - R → Y → 30 → Enter

3. Material
   - Subtle white glow
   - Emission strength: 1.5
```

### Data Nodes (5 minutes)

```markdown
1. Create Base Node
   - Shift + A → Mesh → UV Sphere
   - S → 0.15 → Enter (make very small)
   - Material:
     * Emission shader only
     * Color: White
     * Strength: 3.0

2. Duplicate Around Scene
   - Select sphere
   - Duplicate (Shift + D) 10-15 times
   - Position randomly around core
   - Vary distances from center (2-6 units)
   - Some above, some below, create depth

3. Name Collection
   - In Outliner, select all nodes
   - M → New Collection → "DataNodes"
```

### Connecting Lines (Optional, 10 minutes)

```markdown
1. Add Bezier Curve
   - Shift + A → Curve → Bezier
   - Tab → Edit Mode
   - Position one end at node, other at core
   - Adjust handles for smooth curve

2. Curve Settings
   - Properties Panel → Curve Properties
   - Bevel → Depth: 0.005 (very thin)
   - Resolution: 12

3. Material
   - Emission shader
   - Color: Cyan with low opacity
   - Strength: 0.5

4. Duplicate for Other Nodes
   - Create 5-8 connections total
   - Don't connect every node (looks cleaner)
```

### Lighting Setup (5 minutes)

```markdown
1. Add Three Point Lighting
   
   Key Light:
   - Shift + A → Light → Area Light
   - Position: (5, -5, 7)
   - Power: 100W
   - Color: Slight blue tint

   Fill Light:
   - Area Light
   - Position: (-5, 5, 5)
   - Power: 50W
   - Color: Neutral white

   Rim Light:
   - Area Light
   - Position: (0, -8, 2)
   - Power: 80W
   - Color: Slight purple

2. Environment Lighting
   - World Properties
   - Surface → Background
   - Strength: 0.1
   - Color: Dark blue-black (#0a0e27)
```

### Camera Setup for Preview (3 minutes)

```markdown
1. Position Camera
   - Select default camera
   - Press N → View → Camera to View
   - Position yourself at good angle (slightly above, 45°)
   - Ctrl + Alt + Numpad 0 (set camera to current view)

2. Camera Settings
   - Focal Length: 50mm (in Camera Properties)
   - Gives nice perspective without distortion
```

### Export Settings (3 minutes)

```markdown
1. Select All Objects to Export
   - Select core, all rings, all nodes
   - (Optional: Select connecting lines)

2. Export
   - File → Export → glTF 2.0 (.glb)
   
   Critical Settings:
   ✅ Format: glTF Binary (.glb)
   ✅ Include: Selected Objects (if you selected specific items)
   ✅ Transform: +Y Up
   ✅ Geometry:
      - Apply Modifiers: ON
      - UVs: ON
      - Normals: ON
      - Tangents: ON
   ✅ Materials: Export
   ✅ Compression: None (for first test)
   
3. Save Location
   - Save to: `public/models/discovery-engine.glb`
   - In your Next.js project folder
```

---

## 💻 Part 2: Three.js Integration

### Install Dependencies

```bash
npm install three
# or
yarn add three
```

### File Structure

```
your-project/
├── public/
│   └── models/
│       └── discovery-engine.glb
├── components/
│   └── ui/
│       └── HeroSection.tsx
```

### Component Code

```typescript
"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Store references to specific parts
  const coreRef = useRef<THREE.Object3D | null>(null);
  const ringsRef = useRef<THREE.Object3D[]>([]);
  const nodesRef = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    camera.position.y = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0f172a, 1); // Dark navy background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8, 100);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x3b82f6, 0.6, 100);
    pointLight3.position.set(0, -5, -5);
    scene.add(pointLight3);

    // Load GLTF Model
    const loader = new GLTFLoader();
    
    loader.load(
      '/models/discovery-engine.glb',
      (gltf) => {
        const model = gltf.scene;
        
        // Scale and position
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        
        // Traverse and store references
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;

            // Identify and store references based on name
            if (child.name.toLowerCase().includes('icosphere')) {
              coreRef.current = child;
            } else if (child.name.toLowerCase().includes('torus')) {
              ringsRef.current.push(child);
            } else if (child.name.toLowerCase().includes('sphere')) {
              nodesRef.current.push(child);
            }
          }
        });
        
        scene.add(model);
        modelRef.current = model;
        setLoaded(true);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        setLoadProgress(Math.round(percent));
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001; // Convert to seconds

      if (modelRef.current) {
        // Subtle base rotation
        modelRef.current.rotation.y += 0.001;

        // Mouse-influenced rotation (smooth lerp)
        targetRotationRef.current.x = mouseRef.current.y * 0.3;
        targetRotationRef.current.y = mouseRef.current.x * 0.3;

        modelRef.current.rotation.x += (targetRotationRef.current.x - modelRef.current.rotation.x) * 0.05;
        modelRef.current.rotation.y += (targetRotationRef.current.y - modelRef.current.rotation.y) * 0.05;
      }

      // Animate core (if found)
      if (coreRef.current) {
        coreRef.current.rotation.y += 0.002;
      }

      // Animate rings at different speeds
      ringsRef.current.forEach((ring, i) => {
        if (ring) {
          const speed = 0.003 + (i * 0.002);
          ring.rotation.z += speed;
        }
      });

      // Animate nodes (pulsing effect)
      nodesRef.current.forEach((node, i) => {
        if (node && node instanceof THREE.Mesh) {
          const pulse = Math.sin(time * 2 + i) * 0.5 + 0.5;
          const baseScale = 0.15;
          node.scale.setScalar(baseScale + pulse * 0.05);
          
          // Pulse emissive intensity if material supports it
          if (node.material && 'emissiveIntensity' in node.material) {
            (node.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 3;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <div className="text-white text-2xl font-bold tracking-wider">
          ProblemFinder
        </div>
        <div className="flex gap-12 text-white/80 text-sm tracking-widest">
          <button className="hover:text-white transition-colors">PROBLEMS</button>
          <button className="hover:text-white transition-colors">ABOUT</button>
          <button className="hover:text-white transition-colors">DOCS</button>
        </div>
      </nav>

      {/* Loading indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">
            Loading... {loadProgress}%
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center max-w-4xl px-8">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Turn Frustrations Into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Opportunities
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8">
            AI-powered discovery engine that finds real problems to solve
          </p>
          <button className="pointer-events-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            Explore Problems →
          </button>
        </div>

        {/* Platform indicators */}
        <div className="absolute bottom-12 flex items-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            Reddit
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            Twitter
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            GitHub
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎬 Animation Details

### Core Rotation
```javascript
// Slow, deliberate rotation
core.rotation.y += 0.002;
```

### Ring Orbits (Different Speeds)
```javascript
ring1.rotation.z += 0.003; // Outer - slowest
ring2.rotation.x += 0.005; // Middle - medium
ring3.rotation.y += 0.008; // Inner - fastest (if using)
```

### Node Pulsing (Discovery Effect)
```javascript
nodes.forEach((node, i) => {
  const time = Date.now() * 0.001;
  const pulse = Math.sin(time * 2 + i) * 0.5 + 0.5;
  
  // Scale pulse
  node.scale.setScalar(0.15 + pulse * 0.05);
  
  // Emission intensity pulse
  node.material.emissiveIntensity = pulse * 3;
});
```

### Mouse Interaction (Smooth Follow)
```javascript
// Convert mouse position to rotation
const targetX = mouse.x * 0.3;
const targetY = mouse.y * 0.3;

// Smooth lerp (linear interpolation)
model.rotation.x += (targetY - model.rotation.x) * 0.05;
model.rotation.y += (targetX - model.rotation.y) * 0.05;
```

---

## 📱 Responsive Considerations

### Mobile Optimization
```javascript
if (window.innerWidth < 768) {
  // Simplify for mobile
  ring3.visible = false; // Remove third ring
  nodes = nodes.slice(0, 8); // Fewer nodes
  animationSpeed *= 0.5; // Slower animations
  camera.position.z = 10; // Pull camera back
}
```

### Performance Tips
```markdown
1. Use Draco compression for smaller file size
   - In Blender export: Check "Draco mesh compression"
   - Reduces file size by 60-90%

2. Limit particle count on mobile
   - Detect device and reduce node count

3. Use requestAnimationFrame properly
   - Always clean up with cancelAnimationFrame

4. Dispose of geometries and materials
   - Prevent memory leaks on cleanup
```

---

## 🚀 3-Day Implementation Plan

### Day 1: Blender Modeling (4-5 hours)
- [ ] Morning: Create core icosphere (30 min)
- [ ] Morning: Create scanning rings (1 hour)
- [ ] Afternoon: Add data nodes (30 min)
- [ ] Afternoon: Setup materials and lighting (1.5 hours)
- [ ] Evening: Test render and export GLB (30 min)

### Day 2: Three.js Integration (4-5 hours)
- [ ] Morning: Setup Three.js scene (1 hour)
- [ ] Morning: Load GLB model (30 min)
- [ ] Afternoon: Add basic animations (1.5 hours)
- [ ] Afternoon: Implement mouse interaction (1 hour)
- [ ] Evening: Test and debug (1 hour)

### Day 3: Polish & Deploy (3-4 hours)
- [ ] Morning: Add node pulsing effects (1 hour)
- [ ] Morning: Fine-tune colors and speeds (1 hour)
- [ ] Afternoon: Mobile optimization (1 hour)
- [ ] Afternoon: Final testing and deploy (1 hour)

---

## 🎯 Success Checklist

### Blender Export
- [ ] Model exports without errors
- [ ] File size < 5MB (< 1MB with Draco ideal)
- [ ] Materials export correctly
- [ ] All objects are properly named

### Three.js Integration
- [ ] Model loads successfully
- [ ] Animations are smooth (60fps)
- [ ] Mouse interaction works
- [ ] No console errors
- [ ] Works on mobile

### Visual Polish
- [ ] Colors match design system
- [ ] Lighting looks professional
- [ ] Animations feel natural
- [ ] Loading state displays properly
- [ ] Responsive on all screen sizes

---

## 🐛 Troubleshooting

### Model doesn't load
```
1. Check file path: /public/models/discovery-engine.glb
2. Check browser console for errors
3. Verify GLB file opens in online viewer (gltf-viewer.donmccurdy.com)
4. Check export settings (glTF Binary format)
```

### Materials look wrong
```
1. Use Principled BSDF in Blender
2. Avoid custom shader nodes
3. Check material export is enabled
4. Verify emission settings
```

### Performance issues
```
1. Reduce polygon count (use Decimate modifier)
2. Limit number of lights
3. Use Draco compression
4. Reduce node count on mobile
```

### Animation stuttering
```
1. Check frame rate in browser DevTools
2. Simplify animations for mobile
3. Use requestAnimationFrame properly
4. Dispose unused resources
```

---

## 💡 Alternative Quick Wins

### If Short on Time: Simplified Version

**Single Rotating Icosphere (1 day)**
- Just the core icosphere
- Wireframe edges that glow
- Simple rotation
- Mouse interaction
- Still looks professional

**Code Example:**
```javascript
// Simplified - just rotating wireframe
const geometry = new THREE.IcosahedronGeometry(2, 1);
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ 
    color: 0x00d4ff,
    linewidth: 2
  })
);
scene.add(line);

// Animation
function animate() {
  line.rotation.y += 0.003;
  line.rotation.x += 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

---

## 📚 Additional Resources

### Learning Three.js
- Three.js Fundamentals: https://threejsfundamentals.org/
- Three.js Journey: https://threejs-journey.com/
- Three.js Examples: https://threejs.org/examples/

### Blender Resources
- Blender Guru (YouTube)
- Blender Documentation: https://docs.blender.org/
- CG Cookie Blender Courses

### Inspiration
- Awwwards.com (web design inspiration)
- CodePen (Three.js examples)
- Dribbble (UI/UX inspiration)

---

## 🎊 Final Notes

This hero section should:
- ✅ Load in < 3 seconds
- ✅ Run at 60fps on modern devices
- ✅ Be under 5MB total (< 1MB ideal)
- ✅ Work on mobile (simplified version)
- ✅ Tell your product story visually
- ✅ Be memorable and unique

**Good luck building!** 🚀

---

## 📧 Need Help?

If you get stuck:
1. Check browser console for errors
2. Test GLB file in online viewer
3. Start with simplified version
4. Ask in Three.js Discord community

**You've got this!** 💪