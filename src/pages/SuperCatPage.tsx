import React, {useState} from 'react';
import BouncingCat from '../components/BouncingCat.tsx';
import useCatAudio from "./useCatAudio.tsx";

const SuperCatPage: React.FC = () => {
  const [catImageUrl, setCatImageUrl] = useState<string[]>([`https://cataas.com/cat`]);
  const audioRef = useCatAudio();

  const fetchRandomCat = async () => {
    for (let i = 0; i < 100; i++) {
      console.log("Cat pushed!");
      catImageUrl.push(`https://cataas.com/cat?t=${i}`);
    }
    setCatImageUrl([...catImageUrl]);
  };

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .catch(error => console.error("Error playing audio:", error));
    }
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Super Cat Page</h1>
      {catImageUrl.map((url, key) => <BouncingCat imageUrl={url} key={key} onLoad={playMusic}/>)}
      {catImageUrl.length === 1 && <>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          Are you ready for the super bombardment of cats?
        </p>
        <button
          onClick={fetchRandomCat}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Yes
        </button>
      </>}
    </div>
  );
};

export default SuperCatPage;
