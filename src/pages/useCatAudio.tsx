import {useEffect, useRef} from "react";

function useCatAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // this block is NOT AI generated ISTG :heavysob:
  // Initialize audio element but don't play it yet
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/mus_temvillage.ogg');
      audioRef.current.loop = true;
    }
    // Clean up audio when component unmounts
    return () => {
      // Pause and reset the audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return audioRef;
}

export default useCatAudio;