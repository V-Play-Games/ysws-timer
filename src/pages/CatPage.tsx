import React, {useState} from 'react';
import BouncingCat from '../components/BouncingCat.tsx';
import {Link} from "react-router-dom";
import useCatAudio from "./useCatAudio.tsx";

const CatPage: React.FC = () => {
  const [catImageUrl, setCatImageUrl] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useCatAudio();

  const fetchRandomCat = async () => {
    setLoading(true);
    if (catImageUrl) {
      const t = new Date().getTime();
      catImageUrl.push(`https://cataas.com/cat?t=${t}`)
    } else {
      setCatImageUrl(["https://cataas.com/cat"]);
    }
    // Note: Not setting loading to false here, will do it when image loads
    // Please, this comment AND code is NOT AI generated, I spent like an hour debugging ts
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
        <div className="flex justify-center items-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {catImageUrl
        ? catImageUrl.map((url, key) => <BouncingCat imageUrl={url} key={key} onLoad={handleCatLoaded}/>)
        : <p className="text-xl text-gray-600 dark:text-gray-300">Click the button to see a cat!</p>
      }
      <nav>
        <div className="bg-gray-200 dark:bg-gray-700 p-8 rounded-lg max-w-2xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300 italic">
            <Link to="/cat/super">This page features cute cat content from cataas.com!</Link>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default CatPage;
