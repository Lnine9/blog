import { Dispatch, SetStateAction, useState } from "react";

export function useLatestState<S>(initialState: S): [S, (_: S) => void, S] {
  const [state, _setState] = useState<S>(initialState);
  const [latest, _setLatest] = useState<S>(initialState);
  const setState = (val: S) => {
    _setState(val);
    _setLatest(state);
  };

  return [state, setState, latest];
}

import type { DependencyList } from "react";
import { useEffect } from "react";

function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps: DependencyList
) {
  function isGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>
  ): val is AsyncGenerator<void, void, void> {
    return typeof val[Symbol.asyncIterator] === "function";
  }
  useEffect(() => {
    const e = effect();
    let cancelled = false;
    async function execute() {
      if (isGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (cancelled || result.done) {
            break;
          }
        }
      } else {
        await e;
      }
    }
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
}

export default useAsyncEffect;
