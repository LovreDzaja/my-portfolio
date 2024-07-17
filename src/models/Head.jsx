/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import scene from "../assets/3d/nch_crescendo_masters_10.26_crack__license_key.glb";

const Head = (props) => {
    const { nodes, materials } = useGLTF(scene);
    const { viewport } = useThree();
    const groupRef = useRef();

    const { scale } = useMemo(() => {
        const boundingBox = nodes.Object_6.geometry.boundingBox || new THREE.Box3().setFromObject(nodes.Object_6);
        const modelHeight = boundingBox.max.y - boundingBox.min.y;
        const modelWidth = boundingBox.max.x - boundingBox.min.x;

        const scaleFactor = viewport.width < 768 ? 0.6 : 0.9;
        const targetSize = Math.min(viewport.width, viewport.height) * scaleFactor;
        const scaleToFitWidth = targetSize / modelWidth;
        const scaleToFitHeight = targetSize / modelHeight;
        const finalScale = Math.min(scaleToFitWidth, scaleToFitHeight);

        return {
            scale: finalScale
        };
    }, [viewport.width, viewport.height, nodes.Object_6.geometry.boundingBox]);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const noddingAngle = 0.1 * Math.sin(time * 2);
        groupRef.current.rotation.set(props.rotation[0], props.rotation[1], 0.33 + noddingAngle);
    });

    return (
        <group ref={groupRef} {...props} dispose={null} scale={[scale, scale, scale]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.material_0}
            />
        </group>
    );
};

useGLTF.preload(scene);

export default Head;
