import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { CameraControls } from '@react-three/drei'

export default function Model() {
    const model = useLoader(
        GLTFLoader,
        '/mecha/scene.gltf',
        (loader) => {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('./draco/')
            loader.setDRACOLoader(dracoLoader)
        }
    )

    return (
        <>
        <CameraControls />
        <group>
            <primitive
            object={model.scene}
            scale={10}
            position={[0, -13, 12]}
            rotation={[0, Math.PI / 5, 0]}
        />
        </group>
        </>
    )
}