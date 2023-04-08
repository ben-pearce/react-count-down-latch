import ReactDom from 'react-dom/client';
import * as ReactCountDownLatch from '../../src';
import React, { useEffect } from 'react';

const sleep = (m: number) => new Promise(r => setTimeout(r, m));

const SomeDeeplyNestedComponent = ({ takesMsToLoad }: { takesMsToLoad: number }): JSX.Element => {
  const { countDown } = ReactCountDownLatch.useCountDownLatch();

  useEffect(() => void sleep(takesMsToLoad).then(countDown), []);

  return (<p>Component!</p>);
};

const App = (): JSX.Element => {
  return (<ReactCountDownLatch.Provider start={3}>
    <ReactCountDownLatch.Overlay>
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'grey',
        position: 'absolute',
        top: 0
      }}>
        <h1 style={{
          padding: 0,
          margin: 0,
          fontFamily: 'arial'
        }}>Loading...</h1>
      </div>
    </ReactCountDownLatch.Overlay>
    <SomeDeeplyNestedComponent takesMsToLoad={2000} />
    <SomeDeeplyNestedComponent takesMsToLoad={2500} />
    <SomeDeeplyNestedComponent takesMsToLoad={1000} />
  </ReactCountDownLatch.Provider>);
};

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);
root.render(App());
