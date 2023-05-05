import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { easing } from "maath";

const useCoolCameraRig = (
  ref: React.RefObject<Group>,
  dampX: number,
  dampY: number,
  moveCam?: boolean,
  cameraPos?: [number, number, number]
) => {
  useFrame((state, delta) => {
    easing.damp3(
      // @ts-ignore
      ref.current?.rotation,
      [state.pointer.y / dampY, state.pointer.x / dampX, 0],
      0.2,
      delta
    );
    if (moveCam) {
      cameraPos = cameraPos || [0, 0, 0];
      easing.damp3(
        state.camera.position,
        [
          cameraPos[0] + Math.sin(state.pointer.x / 4) * -3,
          cameraPos[1] + state.pointer.y * 0.3,
          cameraPos[2] + Math.cos(state.pointer.x / 4) * 5,
        ],
        0.5,
        delta
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
};

export default useCoolCameraRig;
