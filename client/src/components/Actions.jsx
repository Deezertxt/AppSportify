import { useNavigate } from 'react-router-dom';

function Actions({ audiobookId }) {
  const navigate = useNavigate();

  const handleListenClick = () => {
    navigate(`/reproductor/${audiobookId}`);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        className="bg-emerald-300 text-black border-2 border-black font-bold py-2 px-4 rounded"
        onClick={handleListenClick}
      >
        Escuchar
      </button>

      <button
        className="bg-emerald-300 text-black border-2 border-black font-bold py-2 px-4 rounded"
        onClick={handleListenClick}
      >
        Leer
      </button>
    </div>
  );
}

export default Actions;
