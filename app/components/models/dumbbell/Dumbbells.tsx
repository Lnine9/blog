import * as THREE from "three";
import React, { useImperativeHandle, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import glb from "./dumbbells-transformed.glb";
import { useAnimationControls, Variants } from "framer-motion";
import { Group } from "three";
import useCoolCameraRig from "@/app/hooks/useCoolCameraRig";
import { motion } from "framer-motion-3d";

type GLTFResult = GLTF & {
  nodes: {
    dumbbells_dumbbells_0: THREE.Mesh;
  };
  materials: {
    dumbbells: THREE.MeshStandardMaterial;
  };
};

const variants: Variants = {
  initial: {
    x: 0,
    y: 5,
    opacity: 1,
  },
  enter: {
    x: [0, 0],
    y: [5, -0.5],
    z: [0, 0],
    transition: {
      duration: 1.5,
      type: "spring",
      mass: 1,
      damping: 20,
      stiffness: 300,
      velocity: 2,
    },
  },
  leave: {
    x: 8,
    z: 6,
    rotateZ: -30,
    transition: {
      duration: 1.2,
      ease: "easeIn",
    },
    transitionEnd: {
      y: 5,
    },
  },
};

export function Model(props: JSX.IntrinsicElements["group"], forwardRef) {
  const { nodes, materials } = useGLTF(glb) as GLTFResult;
  const ctrl = useAnimationControls();

  useImperativeHandle(forwardRef, () => ({
    enter: async () => {
      await ctrl.start("enter");
    },
    leave: async () => {
      await ctrl.start("leave");
    },
  }));

  const group = useRef<any>(null);

  useCoolCameraRig(group, 5, 100);

  return (
    <group ref={group} {...props} dispose={null}>
      <motion.mesh
        castShadow={true}
        geometry={nodes.dumbbells_dumbbells_0.geometry}
        material={materials.dumbbells}
        variants={variants}
        scale={0.005}
        rotation-y={-0.35 * Math.PI}
        animate={ctrl}
        initial="initial"
      />
    </group>
  );
}

export default React.forwardRef(Model);

useGLTF.preload(glb);
