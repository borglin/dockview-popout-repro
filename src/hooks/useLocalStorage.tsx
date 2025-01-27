import React from "react";
import { safeParse } from "../utils/safeParse";

export const useLocalStorage = <T,>(
  key: string
): [T | null, (setter: T | null) => void] => {
  const [state, setState] = React.useState<T | null>(
    safeParse(localStorage.getItem(key))
  );

  React.useEffect(() => {
    const _state = localStorage.getItem("key");
    try {
      if (_state !== null) {
        setState(JSON.parse(_state));
      }
    } catch (err) {
      //
    }
  }, [key]);

  return [
    state,
    (_state: T | null) => {
      if (_state === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(_state));
        setState(_state);
      }
    },
  ];
};
