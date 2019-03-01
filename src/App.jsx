import React, { useState, useEffect } from 'react';

import FrameCounter from '@/FrameCounter';

const App = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const windowPIP = window.open(`${process.env.PUBLIC_URL}/pip.html`, '_blank', 'resizable');

    windowPIP.onload = () => {
      const video = windowPIP.document.getElementsByTagName('video')[0];

      video.src = `${process.env.PUBLIC_URL}/sample.mp4`;
      windowPIP.onbeforeunload = FrameCounter(video, 30, setFrame);
    }

    return () => windowPIP.close();
  }, []);

  return (
    <div>Frame: {frame}</div>
  );
};

export default App;
