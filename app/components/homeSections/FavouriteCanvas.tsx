"use client";
import React, { Suspense, useRef, useState } from "react";
import CanvasLoader from "@/app/components/canvas/CanvasLoader";
import Burger from "@/app/components/models/burger/Burger";
import { Environment, Plane, SoftShadows, Text } from "@react-three/drei";
import { useAnimationControls } from "framer-motion";
import { LayoutCamera, MotionCanvas } from "framer-motion-3d";
import useAsyncEffect from "@/app/hooks/utils";
import Xbox from "@/app/components/models/xbox/Xbox_inalambric_controller_white";
import Dumbbells from "@/app/components/models/dumbbell/Dumbbells";

type AnimatedModel = {
  enter: () => void;
  leave: () => void;
};

type Props = {
  index: number;
  setLoading: (loading: boolean) => void;
};

const FavouriteCanvas = ({ index, setLoading }: Props) => {
  const cameraCtrl = useAnimationControls();

  const modelsRef = useRef<Array<AnimatedModel>>([]);

  const [latest, setLatest] = useState<number>(-1);

  const isMobile = window.matchMedia("(max-width: 768px").matches;

  useAsyncEffect(async () => {
    setLoading(true);
    if (latest >= 0 && modelsRef.current[latest]) {
      await modelsRef.current[latest].leave();
    }
    await cameraCtrl.start(
      {
        x: index * 15,
      },
      { duration: 0.8, ease: "easeInOut" }
    );
    if (modelsRef.current[index]) {
      await modelsRef.current[index].enter();
    }
    setLatest(index);
    setLoading(false);
  }, [index]);

  return (
    <MotionCanvas shadows>
      <Suspense fallback={<CanvasLoader />}>
        <Burger ref={(el) => (modelsRef.current[0] = el as AnimatedModel)} />
      </Suspense>
      <Suspense fallback={<CanvasLoader />}>
        <Xbox
          ref={(el) => (modelsRef.current[1] = el as AnimatedModel)}
          position-x={15}
        />
      </Suspense>
      <Suspense fallback={<CanvasLoader />}>
        <Dumbbells
          ref={(el) => (modelsRef.current[2] = el as AnimatedModel)}
          position-x={30}
        />
      </Suspense>
      <LayoutCamera
        position={[-2, 0.5, isMobile ? 12 : 7]}
        animate={cameraCtrl}
        makeDefault
      />
      <Texts />

      <Env />
    </MotionCanvas>
  );
};

const titleStyle = {
  font: "https://cdn.lnine9.icu/fonts/SmileySans-Oblique.ttf",
  fontSize: 1,
  color: "#333333",
  outlineOffsetX: "6%",
  outlineOffsetY: "6%",
  outlineBlur: "10%",
  outlineOpacity: 0.3,
  outlineColor: "#333333",
};

const descStyle = {
  font: "https://cdn.lnine9.icu/fonts/SmileySans-Oblique.ttf",
  fontSize: 0.4,
  color: "#696969",
};

const Texts = () => {
  return (
    <Suspense fallback={<CanvasLoader />}>
      <Text position={[0, 3.5, -4]} {...titleStyle}>
        美食
      </Text>
      <Text position={[0, 2.2, -2]} {...descStyle}>
        Delicious
      </Text>
      <Text position={[15, 3.5, -4]} {...titleStyle}>
        游戏
      </Text>
      <Text position={[15, 2.2, -2]} {...descStyle}>
        Game
      </Text>
      <Text position={[30, 3.5, -4]} {...titleStyle}>
        健身
      </Text>
      <Text position={[30, 2.2, -2]} {...descStyle}>
        Fitness
      </Text>
    </Suspense>
  );
};

const Env = () => {
  return (
    <Suspense>
      <SoftShadows size={7} samples={9} />
      <Environment files="/venice_sunset_1k.hdr" />
      <ambientLight intensity={0.08} />
      <directionalLight
        position={[0, 10, 0]}
        castShadow
        intensity={1}
        shadow-mapSize={1024}
      >
        <orthographicCamera
          far={12}
          near={5.6}
          left={-7.1}
          right={50}
          top={10}
          bottom={-6.7}
          attach="shadow-camera"
        />
      </directionalLight>
      <Plane
        receiveShadow={true}
        args={[100, 40]}
        position-y={-1.3}
        rotation-x={-0.5 * Math.PI}
      >
        <shadowMaterial transparent opacity={0.4} />
      </Plane>
    </Suspense>
  );
};

export default FavouriteCanvas;
