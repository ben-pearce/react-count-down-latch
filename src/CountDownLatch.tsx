import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';

type CountDownLatch = {
  countDown: () => void,
  count: number
}

type CountDownLatchProviderProps = {
  children: ReactNode,
  start: number
}

type OverlayProps = {
  children: ReactNode
}

const CountDownLatchContext = createContext<CountDownLatch>({} as CountDownLatch);

const Provider = ({ start, children }: CountDownLatchProviderProps): JSX.Element => {
  if (start <= 0) {
    throw new Error('Start must be greater than zero');
  }
  
  const [count, setCount] = useState<number>(start);
  const countRef = useRef<number>(start);

  const countDown = () => {
    if (countRef.current == 0) {
      throw new Error('Counter already reached zero');
    }

    countRef.current -= 1;
    setCount(countRef.current);
  };

  return <CountDownLatchContext.Provider value={{ countDown, count }}>
    { children }
  </CountDownLatchContext.Provider>;
};

const Overlay = ({ children }: OverlayProps): JSX.Element => {
  const { count } = useCountDownLatch();

  return <React.Fragment>
    { count > 0 && children }
  </React.Fragment>;
};

const useCountDownLatch = (): CountDownLatch => useContext(CountDownLatchContext);

export {
  Provider,
  useCountDownLatch,
  Overlay
};