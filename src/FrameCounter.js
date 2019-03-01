const FrameCounter = (video, fps, callback) => {
  let id = null;
  let prevFrame = 0;

  const counter = () => {
    const frame = Math.trunc(video.currentTime * fps);

    if (frame !== prevFrame) {
      prevFrame = frame;
      callback(frame);
    }

    id = requestAnimationFrame(counter);
  };

  const onPlay = () => {
    id = requestAnimationFrame(counter);
  };

  const onPause = () => {
    cancelAnimationFrame(id);
  };

  const destructor = () => {
    cancelAnimationFrame(id);
    video.removeEventListener('play', onPlay);
    video.removeEventListener('pause', onPause);
  };

  video.addEventListener('play', onPlay);
  video.addEventListener('pause', onPause);

  return destructor;
};

export default FrameCounter;
