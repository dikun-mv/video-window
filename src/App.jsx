import React, { useState, useRef, useCallback } from 'react';

import FrameCounter from '@/FrameCounter';

const App = () => {
  const [frame, setFrame] = useState(0);
  const [isPIPActive, setPIPState] = useState(false);

  const windowPIP = useRef(null);

  const openPIP = useCallback(() => {
    if (!windowPIP.current) {
      const windowTmp = window.open(`${process.env.PUBLIC_URL}/pip.html`, '_blank', 'resizable');

      windowTmp.onload = () => {
        const video = windowTmp.document.getElementsByTagName('video')[0];

        video.src = `${process.env.PUBLIC_URL}/sample.mp4`;
        const destructor = FrameCounter(video, 30, setFrame);

        windowTmp.onbeforeunload = () => {
          windowPIP.current = null;

          destructor();
          setPIPState(false);
          setFrame(0);
        }
      };

      windowPIP.current = windowTmp;
      setPIPState(true);
    }
  }, []);

  const closePIP = useCallback(() => {
    if (windowPIP.current) {
      windowPIP.current.close();
    }
  }, []);

  return (
    <div>
      <div>Frame: {frame}</div>
      <button onClick={isPIPActive ? closePIP : openPIP}>{isPIPActive ? 'Close PIP' : 'Open PIP'}</button>
    </div>
  );
};

export default App;
