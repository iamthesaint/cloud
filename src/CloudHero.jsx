import * as THREE from 'three'
import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { Clouds, Cloud, Sky as SkyImpl } from '@react-three/drei'
import gsap from 'gsap'
import LightningOverlay from './LightningOverlay.jsx'

export default function CloudHero() {
  const [stormProgress, setStormProgress] = useState(0)
  const [isStormy, setIsStormy] = useState(false)

  // lightning > stormy on mount
  useEffect(() => {
    const triggerLightningAndStorm = () => {
      const flash = document.querySelector('.lightning-overlay')
      const obj = { value: 0 }

      const timeline = gsap.timeline()

      timeline
        .to(flash, {
          opacity: 1,
          duration: 0.1,
          ease: 'power4.out',
        })
        .to(flash, {
          opacity: 0,
          duration: 0.01,
          ease: 'power4.in',
        })
        .to(flash, {
          opacity: 0.8,
          duration: 0.05,
        })
        .to(flash, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
     
            gsap.to(obj, {
              value: 1,
              duration: 6,
              ease: 'power1.inOut',
              onUpdate: () => {
                setStormProgress(obj.value)
              },
              onComplete: () => {
                setIsStormy(true)
              },
            })
          },
        })
    }

    triggerLightningAndStorm()
  }, [])

  // toggle stormy
  useEffect(() => {
    const obj = { value: stormProgress }
    gsap.to(obj, {
      value: isStormy ? 1 : 0,
      duration: 3,
      ease: 'power1.inOut',
      onUpdate: () => {
        setStormProgress(obj.value)
      },
    })
  }, [isStormy])


  return (
    <div className="cloud-hero" style={{ position: 'relative', height: '200vh', width: '100vw' }}>
      <LightningOverlay />
      <button
        onClick={() => setIsStormy((prev) => !prev)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
          padding: '10px 20px',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '20px',
          fontFamily: 'Bebas Neue, sans-serif',
        }}
      >
        {isStormy ? 'Switch to Sunny' : 'Switch to Stormy'}
      </button>

      <Canvas
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      shadows
      camera={{ position: [20, 10, 20], fov: 100 }} >
        <Sky stormProgress={stormProgress} />
        <ambientLight intensity={1 - stormProgress * 0.5} />
        <spotLight position={[0, 10, 0]} decay={0} distance={45} penumbra={-1} intensity={10} />
        <spotLight position={[-50, 0, 10]} color="red" angle={0.15} decay={0} penumbra={-5} intensity={20} />
        <spotLight position={[50, -10, 10]} color="red" angle={0.4} decay={0} penumbra={-1} intensity={30} />
        {/* <CameraControls /> */}
      </Canvas>
    </div>
  )
}

function Sky({ stormProgress }) {
  const ref = useRef()
  const cloud0 = useRef()
  const config = {
    seed: 1,
    segments: 20,
    volume: 6,
    opacity: 0,
    fade: 1,
    growth: 4,
    speed: 0.1,
  }

  const sunPosition = useMemo(() => {
    const azimuth = 0.3
    const inclination = 0.45
    const theta = Math.PI * inclination
    const phi = 2 * Math.PI * azimuth
    return [Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi)]
  }, [])

  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 4) / 8
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) / 8
    cloud0.current.rotation.y -= delta * 0.0025
  })

  return (
    <>
      <SkyImpl
        sunPosition={sunPosition}
        turbidity={15 + stormProgress * 10}
        rayleigh={Math.max(0.05, 1 - stormProgress * 0.5)}
        mieCoefficient={0.01 + stormProgress * 0.05}
        mieDirectionalG={1}
        brightness={1 + stormProgress * 0.8}
      />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={100} opacity={0.5 + stormProgress * 0.5}>
          <Cloud ref={cloud0} {...config} bounds={[5, 1, 1]} />
          <Cloud
            concentrate="outside"
            growth={100}
            color="#ffccdd"
            opacity={0.3 + stormProgress * 0.7}
            seed={0.3}
            bounds={200}
            volume={200 + stormProgress * 50}
          />
        </Clouds>
        <Rain stormProgress={stormProgress} />
      </group>
    </>
  )
}

function Rain({ stormProgress }) {
  const rainRef = useRef()
  const rainCount = 20000
  const rainSize = 0.5
  const rainArea = 750
  const rainSpeed = 3

  const drops = useMemo(() => {
    const arr = []
    for (let i = 0; i < rainCount; i++) {
      arr.push({
        x: (Math.random() - 0.5) * rainArea,
        y: Math.random() * rainArea,
        z: (Math.random() - 0.5) * rainArea,
      })
    }
    return arr
  }, [])

  useFrame(() => {
    if (!rainRef.current) return
    const dummy = new THREE.Object3D()

    for (let i = 0; i < rainCount; i++) {
      drops[i].y -= rainSpeed
      if (drops[i].y < -rainArea / 2) drops[i].y = rainArea / 2

      dummy.position.set(drops[i].x, drops[i].y, drops[i].z)
      dummy.updateMatrix()
      rainRef.current.setMatrixAt(i, dummy.matrix)
    }

    rainRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={rainRef} args={[null, null, rainCount]}>
      <cylinderGeometry args={[0.02, 0.02, rainSize, 8]} />
      <meshStandardMaterial
        color="#a0c4ff"
        emissive="#a0c4ff"
        emissiveIntensity={0.5}
        transparent
        opacity={Math.min(1, 0.8 * stormProgress + 0.2)}
        roughness={0.5}
        metalness={0.1}
      />
    </instancedMesh>
  )
}
