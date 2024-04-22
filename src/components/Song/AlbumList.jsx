import React, { useEffect, useState } from "react";
import { LASTFM_API_KEY } from "../../constants";

const AlbumList = ({ }) => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=soeemthant&period=7day&limit=6&api_key=${LASTFM_API_KEY}&format=json`
        );
        const data = await response.json();
        setAlbums(data.topalbums.album);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-evenly">
      {isLoading ? (
        <div role="status" className="mt-2">
          <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin fill-black dark:fill-zinc-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {albums.map((album, index) => (
            <a
              key={index}
              href={album.url}
              target="_blank"
              className="col-span-1 block w-full rounded-lg hover:underline"
            >
              <img src={album.image.find(img => img.size === 'extralarge')["#text"]} className="rounded-md w-full" alt={album.name} />
              <div className="py-2">
                <h3 className="text-lg font-semibold">{album.name}</h3>
                <span className="text-sm inline-block">{album.artist.name}</span>
              </div>
            </a>
          ))}
        </>
      )}
    </div>
  );
};

export default AlbumList;