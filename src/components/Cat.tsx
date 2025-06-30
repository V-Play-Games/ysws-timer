import React, {useState, useRef, useEffect} from 'react';
import BouncingCat from './BouncingCat';

const Cat: React.FC = () => {
  const [catImageUrl, setCatImageUrl] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element but don't play it yet
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://github.com/fachinformatiker/undertale/raw/refs/heads/master/sound/audio/mus_temvillage.ogg');
      audioRef.current.loop = true;
    }
  }, []);

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      // Pause and reset the audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const fetchRandomCat = async () => {
    setLoading(true);
    if (catImageUrl) {
      const t = new Date().getTime();
      catImageUrl.push(`https://cataas.com/cat?t=${t}`)
    } else {
      setCatImageUrl(["https://cataas.com/cat"]);
    }
    // Note: Not setting loading to false here, will do it when image loads
  };

  const handleCatLoaded = () => {
    setLoading(false);

    // Play background music
    if (audioRef.current) {
      audioRef.current.play()
        .catch(error => console.error("Error playing audio:", error));
    }
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Cat Page</h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={fetchRandomCat}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Show Random Cat'}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {catImageUrl
        ? catImageUrl.map(url => <BouncingCat imageUrl={url} onLoad={handleCatLoaded}/>)
        : <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Click the button to see a cat!</p>
      }

      <div className="bg-gray-200 dark:bg-gray-700 p-8 rounded-lg max-w-2xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 italic">
          This page features cute cat content from cataas.com!
        </p>
      </div>
    </div>
  );
};

export default Cat;
