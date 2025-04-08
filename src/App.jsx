import * as THREE from "three"
import { useRef, useMemo, useEffect, useState, StrictMode } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl, Points, PointMaterial } from "@react-three/drei"
import { useControls } from "leva"
import { useSound } from "use-sound"
import gsap from "gsap"


export default function App() {

  const [ stormProgress, setStormProgress ] = useState(0) // progression of storm as user enters site (0=sunny, 1=stormy)
  
  const stormProgressRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStormProgress((prev) => Math.min(prev + 0.01, 1))
    }, 80) 
    return () => clearInterval(interval) 
  }, [])

  useEffect(() => {
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 1,
      duration: 15,
      ease: "power1.inOut",
      onUpdate: () => {
        setStormProgress(obj.value)
      }
    })
  }, [])


  return <>
    <Canvas shadows camera={{ position: [20, 10, 20], fov: 70 }} >
      <Sky stormProgress={stormProgress} />
      <ambientLight intensity={1 - stormProgress * 0.5} />
      <spotLight position={[0, 10, 0]} decay={0} distance={45} penumbra={-1} intensity={10} />
      <spotLight position={[-50, 0, 10]} color="red" angle={0.15} decay={0} penumbra={-5} intensity={20} />
      <spotLight position={[50, -10, 10]} color="red" angle={0.4} decay={0} penumbra={-1} intensity={30} />
      <CameraControls />
    </Canvas>
    </>
}


function Rain({ stormProgress }) {
  const rainRef = useRef()

  const { rainCount, rainSize, rainArea, rainSpeed } = useControls({
    rainCount: { value: 5000, min: 100, max: 50000, step: 100 },
    rainSize: { value: 1, min: 0.01, max: 5, step: 0.01 },
    rainArea: { value: 500, min: 50, max: 1500, step: 10 },
    rainSpeed: { value: 1.5, min: 0.1, max: 5, step: 0.1 },
  })

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
  }, [rainCount, rainArea])

  useFrame(() => {
    if (rainRef.current) {
      const dummy = new THREE.Object3D()

      for (let i = 0; i < rainCount; i++) {
        drops[i].y -= rainSpeed
        if (drops[i].y < -rainArea / 2) {
          drops[i].y = rainArea / 2
        }

        dummy.position.set(drops[i].x, drops[i].y, drops[i].z)
        dummy.rotation.set(0, 0, 0)
        dummy.updateMatrix()
        rainRef.current.setMatrixAt(i, dummy.matrix)
      }

      rainRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={rainRef} args={[null, null, rainCount]}>
      <cylinderGeometry args={[0.02, 0.02, rainSize, 8]} />
      <meshStandardMaterial
        color={"#a0c4ff"}
        emissive={"#a0c4ff"}
        emissiveIntensity={0.3}
        transparent
        opacity={Math.min(1, 0.8 * stormProgress + 0.2)}
        roughness={0.5}
        metalness={0.1}
      />
    </instancedMesh>
  )
}

function Sky({ stormProgress }) {
  const ref = useRef()
  const cloud0 = useRef()
  const { color, x, y, z, range, azimuth, inclination, brightness, ...config } = useControls({
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 6, min: 0, max: 100, step: 0.1 },
    opacity: { value: 0, min: 0, max: 1, step: 0.01 },
    fade: { value: 1, min: 0, max: 400, step: 1 },
    growth: { value: 4, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
    x: { value: 5, min: 0, max: 100, step: 1 },
    y: { value: 1, min: 0, max: 100, step: 1 },
    z: { value: 1, min: 0, max: 100, step: 1 },
    azimuth: { value: 0.25, min: 0, max: 1, step: 0.01 },
    inclination: { value: 0.45, min: 0, max: 1, step: 0.01 },
    brightness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    // color: "#D6DDE0",
  })

  const sunPosition = useMemo(() => {
    const theta = Math.PI * inclination // vert angle
    const phi = 2 * Math.PI * azimuth // horiz angle
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.cos(theta)
    const z = Math.sin(theta) * Math.sin(phi)
    return [x, y, z]
  }, [azimuth, inclination])


  useFrame((state, delta) => {
    const slow = 0.0025
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 4) / 8
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) / 8
    cloud0.current.rotation.y -= delta * slow

  })


  return (
    <>
    <SkyImpl
    sunPosition={sunPosition}
    turbidity={10 + stormProgress * 10}
    rayleigh={Math.max(0.1, 1 - stormProgress)}
    mieCoefficient={0.005 + stormProgress * 0.02}
    mieDirectionalG={0.8}
    />
      <group ref={ref}>
        <Clouds
          material={THREE.MeshLambertMaterial}
          limit={400}
          range={range}
          opacity={0.5 + stormProgress * 0.5}
          >
            <Cloud ref={cloud0} {...config} bounds={[x, y, z]} />
            <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={0.3 + stormProgress * 0.7} seed={0.3} bounds={200} volume={200 + stormProgress} />
        </Clouds>
        <Rain stormProgress={stormProgress} />
      </group>
    </>

  )
}
