import { ReactNode } from 'react';
type CountDownLatch = {
    countDown: () => void;
    count: number;
};
type CountDownLatchProviderProps = {
    children: ReactNode;
    start: number;
};
type OverlayProps = {
    children: ReactNode;
};
declare const Provider: ({ start, children }: CountDownLatchProviderProps) => JSX.Element;
declare const Overlay: ({ children }: OverlayProps) => JSX.Element;
declare const useCountDownLatch: () => CountDownLatch;
export { Provider, useCountDownLatch, Overlay };
