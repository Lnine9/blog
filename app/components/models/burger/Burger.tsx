"use client";
import glb from "./scene-transformed.glb";
import * as THREE from "three";
import React, { useImperativeHandle, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MotionConfig, useAnimationControls, Variants } from "framer-motion";
import { motion } from "framer-motion-3d";
import useCoolCameraRig from "@/app/hooks/useCoolCameraRig";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_18: THREE.Mesh;
  };
  materials: {
    ["Material.004"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
  };
};

type Props = JSX.IntrinsicElements["group"];

const groupVar: Variants = {
  initial: { y: 8 },
  enter: { from: "initial", y: -0.4, rotateZ: 0.1, rotateX: 0.1 },
};

const var1: Variants = {
  initial: { rotateY: 5, y: 7 },
  enter: { rotateY: 0, y: 1.15 },
};
const var2: Variants = {
  initial: { rotateY: 3, y: 5.6 },
  enter: { rotateY: 0, y: 0.65 },
};
const var3: Variants = {
  initial: { rotateY: 5, y: 3.5 },
  enter: { rotateY: 0, y: 0.5 },
};
const var4: Variants = {
  initial: { rotateY: 3, y: 2.7 },
  enter: { rotateY: 0, y: 0.35 },
};
const var5: Variants = {
  initial: { rotateY: 2, y: 0 },
  enter: { rotateY: 0, y: 0 },
};
function Model({ ...rest }: Props, forwardRef) {
  const { nodes, materials } = useGLTF(glb) as GLTFResult;

  const ctrl = useAnimationControls();

  useImperativeHandle(forwardRef, () => ({
    enter: async () => {
      await ctrl.start("enter");
    },
    leave: async () => {
      await ctrl.start("initial");
    },
  }));

  const group = useRef<any>(null);

  useCoolCameraRig(group, 5, 10);

  return (
    <group ref={group} {...rest} dispose={null}>
      <MotionConfig transition={{ type: "spring", duration: 1.2 }}>
        <motion.group variants={groupVar} initial="initial" animate={ctrl}>
          <motion.mesh
            castShadow={true}
            geometry={nodes.Object_4.geometry}
            material={materials["Material.004"]}
            scale={[1.54, 0.48, 1.54]}
            variants={var1}
          />
          <motion.mesh
            geometry={nodes.Object_6.geometry}
            material={materials["Material.003"]}
            scale={[1.61, 0.05, 1.61]}
            variants={var2}
          />
          <motion.mesh
            geometry={nodes.Object_8.geometry}
            material={materials["Material.002"]}
            scale={[1.52, 0.21, 1.52]}
            variants={var3}
          />
          <motion.mesh
            geometry={nodes.Object_10.geometry}
            material={materials["Material.001"]}
            scale={1.45}
            variants={var4}
          />
          <motion.mesh
            geometry={nodes.Object_12.geometry}
            material={materials["Material.004"]}
            scale={[1.5, 0.36, 1.5]}
            rotation={[0, 0, Math.PI]}
            variants={var5}
          />
        </motion.group>
      </MotionConfig>
    </group>
  );
}

export default React.forwardRef(Model);

useGLTF.preload(glb);
