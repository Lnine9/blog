import * as THREE from "three";
import React, { useImperativeHandle, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion } from "framer-motion-3d";
import { Group, QuadraticBezierCurve3, Vector3 } from "three";
import { Transition, useAnimationControls, Variants } from "framer-motion";
import glb from "./xbox_inalambric_controller_white-transformed.glb";
import useCoolCameraRig from "@/app/hooks/useCoolCameraRig";
import { easing } from "maath";

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
  };
};

const path = new QuadraticBezierCurve3(
  new Vector3(6, 0, 5),
  new Vector3(4.5, 0, -15),
  new Vector3(0, 0, 0)
).getPoints(50);
const pathX = path.map((p) => p.x);
const pathZ = path.map((p) => p.z);

const variants: Variants = {
  initial: {
    x: 6,
    z: 5,
  },
  enter: {
    x: pathX,
    z: pathZ,
    rotateY: [-Math.PI, 1.5 * Math.PI],
    transition: {
      duration: 1.5,
      ease: "linear",
    },
  },
  leave: {
    x: 0,
    z: 8,
    transition: {
      duration: 0.6,
      ease: "easeIn",
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

  const ref = useRef<Group>(null);

  useCoolCameraRig(ref, 5, 10);

  return (
    <group ref={ref} {...props} dispose={null}>
      <motion.mesh
        castShadow={true}
        geometry={nodes.Object_5.geometry}
        material={materials.material}
        position={[0, -0.5, 0.29]}
        rotation={[0.3, -Math.PI / 2, 0]}
        scale={0.2}
        variants={variants}
        animate={ctrl}
        initial="initial"
      />
    </group>
  );
}

export default React.forwardRef(Model);

useGLTF.preload(glb);
