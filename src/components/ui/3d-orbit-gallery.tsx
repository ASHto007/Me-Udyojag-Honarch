"use client"

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const AI_GENERATED_IMAGES = [
  "/assets/orbit-1.jpg",
  "/assets/orbit-2.jpg",
  "/assets/orbit-3.jpg",
  "/assets/orbit-4.jpg",
  "/assets/hero-workshop.jpg",
  "/assets/gallery-1.jpg",
  "/assets/gallery-2.jpg",
  "/assets/gallery-3.jpg",
  "/assets/gallery-4.jpg",
  "/assets/gallery-5.jpg",
]

// Procedural fallback gradient texture generator so it never fails even without network
function createProceduralTexture(index: number, title: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 384
  const ctx = canvas.getContext("2d")!

  // Background Gradient
  const hue1 = (index * 47) % 360
  const hue2 = (hue1 + 40) % 360
  const grad = ctx.createLinearGradient(0, 0, 512, 384)
  grad.addColorStop(0, `hsl(${hue1}, 75%, 28%)`)
  grad.addColorStop(1, `hsl(${hue2}, 85%, 16%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 384)

  // Subtle grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
  ctx.lineWidth = 2
  for (let x = 0; x < 512; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 384)
    ctx.stroke()
  }

  // Border
  ctx.strokeStyle = "rgba(255, 183, 131, 0.4)"
  ctx.lineWidth = 8
  ctx.strokeRect(4, 4, 504, 376)

  // Badge
  ctx.fillStyle = "rgba(226, 117, 0, 0.85)"
  ctx.beginPath()
  ctx.roundRect(24, 24, 180, 42, 21)
  ctx.fill()
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 18px sans-serif"
  ctx.fillText("ARCHIVE #" + (index + 1), 40, 51)

  // Title
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 26px sans-serif"
  ctx.fillText(title || `Moment ${index + 1}`, 24, 330)

  // Brand tag
  ctx.fillStyle = "rgba(255, 183, 131, 0.9)"
  ctx.font = "16px sans-serif"
  ctx.fillText("Mi Udyojak Honarach", 24, 356)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

export interface ParticleSphereProps {
  images?: string[]
  particleCount?: number
  sphereRadius?: number
  imageCount?: number
  imageSize?: number
  rotationSpeedY?: number
  rotationSpeedX?: number
  onSelectImage?: (index: number) => void
}

export function ParticleSphere({
  images = AI_GENERATED_IMAGES,
  particleCount = 1200,
  sphereRadius = 9,
  imageCount = 20,
  imageSize = 1.6,
  rotationSpeedY = 0.0007,
  rotationSpeedX = 0.0,
  onSelectImage,
}: ParticleSphereProps) {
  const PARTICLE_COUNT = particleCount
  const PARTICLE_SIZE_MIN = 0.006
  const PARTICLE_SIZE_MAX = 0.014
  const SPHERE_RADIUS = sphereRadius
  const POSITION_RANDOMNESS = 4
  const PARTICLE_OPACITY = 0.95

  const IMAGE_COUNT = imageCount
  const IMAGE_SIZE = imageSize

  const groupRef = useRef<THREE.Group>(null)
  const [textures, setTextures] = useState<THREE.Texture[]>([])

  // Load textures safely with fallback
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const loaded: THREE.Texture[] = []

    const imageList = images && images.length > 0 ? images : AI_GENERATED_IMAGES

    imageList.forEach((url, i) => {
      loader.load(
        url,
        (tex) => {
          tex.wrapS = THREE.ClampToEdgeWrapping
          tex.wrapT = THREE.ClampToEdgeWrapping
          tex.colorSpace = THREE.SRGBColorSpace
          loaded[i] = tex
          setTextures([...loaded])
        },
        undefined,
        () => {
          // Fallback procedural texture on load failure
          loaded[i] = createProceduralTexture(i, `Moment ${i + 1}`)
          setTextures([...loaded])
        }
      )
    })

    // Initial fallback while loading
    if (loaded.length === 0) {
      const initial = imageList.map((_, i) => createProceduralTexture(i, `Moment ${i + 1}`))
      setTextures(initial)
    }
  }, [images])

  const particles = useMemo(() => {
    const arr = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi

      const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

      arr.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color().setHSL(
          Math.random() * 0.12 + 0.07, // Warm golden & amber stars
          0.9,
          0.65 + Math.random() * 0.35,
        ),
      })
    }

    return arr
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  const orbitingImages = useMemo(() => {
    const arr = []

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)
      const outwardDirection = position.clone().sub(center).normalize()

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      euler.z += Math.PI

      arr.push({
        position: [x, y, z] as [number, number, number],
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        textureIndex: i % (images.length || 1),
      })
    }

    return arr
  }, [IMAGE_COUNT, SPHERE_RADIUS, images.length])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeedY
      groupRef.current.rotation.x += rotationSpeedX
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={`p-${index}`} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {orbitingImages.map((image, index) => {
        const tex = textures[image.textureIndex]
        return (
          <mesh
            key={`image-${index}`}
            position={image.position}
            rotation={image.rotation}
            onClick={(e) => {
              e.stopPropagation()
              onSelectImage?.(image.textureIndex)
            }}
            onPointerOver={() => {
              document.body.style.cursor = "pointer"
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto"
            }}
          >
            <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE * 0.75]} />
            {tex ? (
              <meshBasicMaterial map={tex} opacity={1} side={THREE.DoubleSide} />
            ) : (
              <meshBasicMaterial color="#E27500" opacity={0.8} side={THREE.DoubleSide} />
            )}
          </mesh>
        )
      })}
    </group>
  )
}

export interface OrbitGalleryCanvasProps {
  images?: string[]
  className?: string
  onSelectImage?: (index: number) => void
  cameraPosition?: [number, number, number]
  fov?: number
}

// Error boundary to protect against WebGL / R3F context loss
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-amber-200">
          <p className="text-sm font-semibold">WebGL 3D canvas could not load on this device.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export function OrbitGalleryCanvas({
  images = AI_GENERATED_IMAGES,
  className = "w-full h-[520px] bg-[#070D18] relative rounded-3xl overflow-hidden border border-[#E27500]/30 shadow-2xl",
  onSelectImage,
  cameraPosition = [-10, 2, 10],
  fov = 50,
}: OrbitGalleryCanvasProps) {
  return (
    <div className={className}>
      <CanvasErrorBoundary>
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center text-amber-300 gap-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
                INITIALIZING 3D PARTICLE SPACE...
              </span>
            </div>
          }
        >
          <Canvas
            camera={{ position: cameraPosition, fov }}
            style={{ background: "#070D18" }}
            gl={{ alpha: false, antialias: true }}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.6} color="#E27500" />
            <ParticleSphere images={images} onSelectImage={onSelectImage} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2 + 0.3}
              minPolarAngle={Math.PI / 2 - 0.3}
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      {/* Floating Drag Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-[11px] font-medium text-amber-300 tracking-wide shadow-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Drag to rotate 3D sphere • Click image to preview</span>
      </div>
    </div>
  )
}

export default OrbitGalleryCanvas
